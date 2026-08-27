/**
 * Feature detection utilities for WebGL and device hardware tier.
 * Explicitly guards against Safari/iOS quirks where navigator.deviceMemory is undefined.
 */

export interface DeviceTierCapabilities {
  supportsWebGL: boolean;
  isLowTier: boolean;
  reason?: string;
}

export function detectDeviceCapabilities(): DeviceTierCapabilities {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { supportsWebGL: false, isLowTier: false, reason: "SSR" };
  }

  // 1. WebGL Context Detection
  let supportsWebGL = false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    supportsWebGL = Boolean(gl);
  } catch (e) {
    supportsWebGL = false;
  }

  if (!supportsWebGL) {
    return {
      supportsWebGL: false,
      isLowTier: true,
      reason: "WebGL context unavailable or disabled",
    };
  }

  // 2. Hardware Concurrency (CPU Cores)
  const cpuCores =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : 4;

  // 3. Safari-Safe Device Memory Check
  const hasDeviceMemory =
    typeof navigator !== "undefined" &&
    "deviceMemory" in navigator &&
    typeof (navigator as unknown as { deviceMemory?: number }).deviceMemory === "number";

  const deviceMemory = hasDeviceMemory
    ? (navigator as unknown as { deviceMemory: number }).deviceMemory
    : 4; // Default to safe assumption when undefined (Safari/iOS)

  // 4. Low Tier Evaluation
  const isLowCpu = cpuCores < 4;
  const isLowMemory = hasDeviceMemory && deviceMemory < 4;

  if (isLowCpu || isLowMemory) {
    return {
      supportsWebGL,
      isLowTier: true,
      reason: isLowCpu ? "Low CPU core count (<4)" : "Low RAM (<4GB)",
    };
  }

  return {
    supportsWebGL: true,
    isLowTier: false,
  };
}
