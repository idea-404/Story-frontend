import useTokenStore from "@/Store/token";
import api from "./api";
import type { NavigateFunction } from "react-router-dom";

interface FormState {
  user_name: string;
  student_id: string;
  major: string;
}

export const info = async (
  form: FormState,
  introduce: string,
  navigate: NavigateFunction
) => {
  try {
    const res = await api.post(`/auth/signup/inform`, {
      nickname: form.user_name,
      studentId: form.student_id,
      major: form.major,
      introduce: introduce,
      // profileImage: String,
    });
    const tokenValue = res.data.token;
    useTokenStore.getState().setAuthWithToken(tokenValue);
    navigate("/");
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
