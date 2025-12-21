import { create } from "zustand";

interface TermsState {
  isAgreed: boolean;
  setIsAgreed: (agreed: boolean) => void;
}

export const useTermsStore = create<TermsState>((set) => ({
  isAgreed: false,
  setIsAgreed: (agreed) => set({ isAgreed: agreed }),
}));
