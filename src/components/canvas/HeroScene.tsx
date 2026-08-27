"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/store/scrollStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { detectDeviceCapabilities } from "@/lib/webglDetect";

interface HeroSceneProps {
  activeFlavor?: "jhal" | "misti";
}

function TexturedPackPlane({ activeFlavor = "jhal" }: { activeFlavor: "jhal" | "misti" }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const { viewport } = useThree();

  const jhalUrl = "/10_rs_jhal_red_new.webp";
  const mistiUrl = "/10_rs_misti_new.webp";
  const currentUrl = activeFlavor === "jhal" ? jhalUrl : mistiUrl;

  useEffect(() => {
    let isMounted = true;
    textureLoader.load(currentUrl, (loadedTex) => {
      if (isMounted) {
        loadedTex.generateMipmaps = true;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.magFilter = THREE.LinearFilter;
        setTexture(loadedTex);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentUrl, textureLoader]);

  // Pointer tilt & scroll-driven motion
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.targetX = x * 0.15;
      pointer.current.targetY = y * 0.15;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Smooth lerp pointer
    pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.05;
    pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.05;

    const progress = useScrollStore.getState().progress;

    // Section 1 (0 - 0.15): Subtle hero float & pointer tilt
    // Section 2 (0.15 - 0.40): Camera pull back & y shift
    // Section 3 (0.40 - 0.60): Defocus/dim
    // Section 4 (0.60 - 0.75): Fade out before shelf
    const rotY = Math.sin(progress * Math.PI * 1.5) * 0.35 + pointer.current.x;
    const rotX = -0.05 + pointer.current.y + progress * 0.1;
    const posY = Math.sin(Date.now() * 0.0015) * 0.05 - progress * 1.8;
    const posZ = -progress * 1.2;

    meshRef.current.rotation.y = rotY;
    meshRef.current.rotation.x = rotX;
    meshRef.current.position.y = posY;
    meshRef.current.position.z = posZ;

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (mat) {
      if (progress > 0.65) {
        mat.opacity = Math.max(0, 1 - (progress - 0.65) / 0.15);
      } else {
        mat.opacity = 1;
      }
    }
  });

  const planeWidth = Math.min(2.4, viewport.width * 0.35);
  const planeHeight = planeWidth * 1.35;

  if (!texture) return null;

  return (
    <mesh ref={meshRef} position={[viewport.width > 5 ? 1.2 : 0, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.35}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Ambient floating spiced particles (handful scatter motif)
function SpiceParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 35;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#C9982E"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

// Adaptive FPS Monitor
function FPSMonitor({ onLowFps }: { onLowFps: () => void }) {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const lowFpsCount = useRef(0);

  useFrame(() => {
    frameCount.current += 1;
    const now = performance.now();
    if (now - lastTime.current >= 1000) {
      const fps = frameCount.current;
      frameCount.current = 0;
      lastTime.current = now;

      if (fps < 28) {
        lowFpsCount.current += 1;
        if (lowFpsCount.current >= 2) {
          onLowFps();
        }
      } else {
        lowFpsCount.current = 0;
      }
    }
  });

  return null;
}

export default function HeroScene({ activeFlavor = "jhal" }: HeroSceneProps) {
  const isReducedMotion = useReducedMotion();
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  const setLowFpsFallback = useScrollStore((state) => state.setLowFpsFallback);
  const isLowFpsFallback = useScrollStore((state) => state.isLowFpsFallback);

  useEffect(() => {
    const caps = detectDeviceCapabilities();
    if (caps.supportsWebGL && !caps.isLowTier && !isReducedMotion) {
      setShouldRenderCanvas(true);
    } else {
      setShouldRenderCanvas(false);
    }
  }, [isReducedMotion]);

  if (!shouldRenderCanvas || isLowFpsFallback) {
    return null; // Gracefully bypasses canvas; static DOM LCP element handles visual
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={1.4} color="#FBF3E7" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#C9982E" />
        <TexturedPackPlane activeFlavor={activeFlavor} />
        <SpiceParticles />
        <FPSMonitor
          onLowFps={() => {
            setLowFpsFallback(true);
            setShouldRenderCanvas(false);
          }}
        />
      </Canvas>
    </div>
  );
}
