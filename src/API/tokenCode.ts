import type { oauthType } from "@/Types";
import useTokenStore from "@/Store/token";
import api from "./api";
import type { NavigateFunction } from "react-router-dom";

export const TokenCode = async (
  code: string,
  type: oauthType,
  navigate: NavigateFunction
) => {
  try {
    const res = await api.post(`/auth//oauth/success`, { code: code });
    const tokenValue = res.data.token;
    useTokenStore.getState().setAuthWithToken(tokenValue);
    console.log(type);
    // console.log("받은 토큰:", tokenValue);
    if (res.data.role === "UNVERIFIED") {
      navigate("/info");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
