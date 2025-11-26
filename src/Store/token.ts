import { create } from "zustand";
interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useTokenStore = create<TokenState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
export default useTokenStore;
