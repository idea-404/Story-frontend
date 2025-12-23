import api from "@/API/api";
import axios from "axios";

interface BlogData {
  blog_id: number;
  nickname: string;
  title: string;
  introduce: string;
  content: string;
  like: number;
  view: number;
  createdAt: string;
  comment: number;
}

export const WriteCheck = async (
  id: number,
  type: string
): Promise<BlogData | null> => {
  try {
    const res = await api.get(`/${type}/${id}`, {});
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        alert("존재하지 않는 포트폴리오입니다.");
      }
      console.error("포트폴리오 저장 오류:", error);
    } else {
      console.error("포트폴리오 저장 오류:", error);
      alert("예상치 못한 오류가 발생했습니다.");
    }
    return null;
  }
};
