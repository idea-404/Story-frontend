import api from "@/API/api";
import axios from "axios";

interface Comment {
  comment_id: number;
  nickname: string;
  content: string;
  createAt: string;
}

interface CommentResponse {
  portfolio_id: number;
  comment: Comment[];
}

export const GetComments = async (
  id: number,
  type: string
): Promise<CommentResponse | null> => {
  try {
    const res = await api.get(`/${type}/${id}`);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        alert("댓글을 불러올 수 없습니다.");
      } else if (status === 401) {
        alert("로그인 후 이용해주세요.");
      } else {
        alert("백엔드 서버 비상!!!!!!!!!");
      }
      console.error("댓글 불러오기 오류:", error);
    } else {
      console.error("댓글 불러오기 오류:", error);
      alert("예상치 못한 오류가 발생했습니다.");
    }
    return null;
  }
};
