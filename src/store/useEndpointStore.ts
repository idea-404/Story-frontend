import { create } from "zustand";

interface EndpointState {
  endpoint: string;
  setEndpoint: (newEndpoint: string) => void;
}
export const useEndpointStore = create<EndpointState>((set) => ({
  endpoint: "",
  setEndpoint: (newEndpoint) => set({ endpoint: newEndpoint }),
}));
