import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
//토큰 타입 정의
interface DecodedToken {
  sub: string;
  userId: number;
  nickname: string;
  studentId: number;
  profileImage: string;
  major: string;
  introduce: string;
  role: string;
}
//zustand 타입정의
interface AuthState {
  auth: {
    token: string | null;
    user: DecodedToken | null;
  };
  setAuthWithToken: (token: string) => void;
  clearAuth: () => void;
}

const useTokenStore = create<AuthState>((set) => ({
  auth: { token: null, user: null },
  setAuthWithToken: (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      set({
        auth: {
          token: token,
          user: decoded,
        },
      });
    } catch (err) {
      console.error("JWT decode error:", err);
      set({
        auth: { token: null, user: null },
      });
    }
  },

  clearAuth: () => {
    set({
      auth: { token: null, user: null },
    });
  },
}));
export default useTokenStore;
