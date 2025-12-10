import useTokenStore from "@/Store/token";
import api from "./api";

interface FormState {
  user_name: string;
  student_id: string;
  major: string;
}

export const info = async (form: FormState, introduce: string) => {
  try {
    const res = await api.post(`/signup/inform`, {
      nickname: form.user_name,
      studentId: form.student_id,
      major: form.major,
      introduce: introduce,
      // profileImage: String,
    });
    const tokenValue = res.data.token;
    useTokenStore.getState().setAuthWithToken(tokenValue);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
