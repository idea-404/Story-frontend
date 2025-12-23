import api from "@/API/api";
import axios from "axios";

export const Commentpush = async (id: number, type: string, text: string) => {
  try {
    const res = await api.post(`/${type}/comment/${id}`, {
      content: text,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 403) {
        alert("댓글 작성 권한이 없습니다.");
      }
      console.error("댓글 작성 오류:", error);
    } else {
      console.error("댓글 작성 오류:", error);
      alert("예상치 못한 오류가 발생했습니다.");
    }
  }
};
