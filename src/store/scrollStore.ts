import { create } from "zustand";

interface ScrollState {
  progress: number;
  activeSection: string;
  isReducedMotion: boolean;
  isLowFpsFallback: boolean;
  setProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
  setReducedMotion: (reduced: boolean) => void;
  setLowFpsFallback: (fallback: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  activeSection: "hero",
  isReducedMotion: false,
  isLowFpsFallback: false,
  setProgress: (progress) => set({ progress }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setReducedMotion: (isReducedMotion) => set({ isReducedMotion }),
  setLowFpsFallback: (isLowFpsFallback) => set({ isLowFpsFallback }),
}));
