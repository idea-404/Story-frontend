import type { oauthType } from "@/Types";
import useTokenStore from "@/Store/token";
import api from "./api";

export const TokenCode = async (code: string, type: oauthType) => {
  try {
    const res = await api.post(`/auth/${type}`, { token: code });
    const tokenValue = res.data.token;
    useTokenStore.getState().setAuthWithToken(tokenValue);
    // console.log("받은 토큰:", tokenValue);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
