import { create } from "zustand";

interface AnimationState {
  animations: boolean;
  setAnimation: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  animations: false,
  setAnimation: () =>
    set({ animations: true }), // Toggle animation state without reactivity
}));

