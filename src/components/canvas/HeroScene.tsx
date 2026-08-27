"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/store/scrollStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { detectDeviceCapabilities } from "@/lib/webglDetect";

// Soft blurred circular gradient orb texture generator
function useCircleGradientTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Smooth blurred radial falloff (soft golden glow fading smoothly to transparent)
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.75)");
    gradient.addColorStop(0.55, "rgba(255, 255, 255, 0.25)");
    gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.05)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(64, 64, 64, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

// Sparse, delicate ambient gold dust orbs with smooth scroll parallax
function SpiceParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const circleTexture = useCircleGradientTexture();
  const count = 14; // Sparse and elegant

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const progress = useScrollStore.getState().progress;

    // Subtle ambient float
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;

    // Smooth vertical parallax drift
    pointsRef.current.position.y = -progress * 2.8;
  });

  if (!circleTexture) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        size={0.11}
        color="#C9982E"
        transparent
        opacity={0.4}
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.NormalBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  const isReducedMotion = useReducedMotion();
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
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
    return null;
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
        <SpiceParticles />
      </Canvas>
    </div>
  );
}
