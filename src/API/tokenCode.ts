import type { oauthType } from "@/Types";
import setToken from "@/Store/token";
import axios from "axios";

export const TokenCode = async (code: string, type: oauthType) => {
  try {
    const res = await axios.post(`/v1/auth/${type}`, { code: code });
    const tokenValue = res.data.token;
    setToken(tokenValue);
    // console.log("받은 토큰:", tokenValue);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
