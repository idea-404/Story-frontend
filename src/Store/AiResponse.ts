import { create } from "zustand";

interface AiResponseState {
  response: string;
  setResponse: (response: string) => void;
  resetResponse: () => void;
}

export const useAiResponseStore = create<AiResponseState>((set) => ({
  response: "",
  setResponse: (response) => set({ response }),
  resetResponse: () => set({ response: "" }),
}));
