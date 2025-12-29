import api from "@/API/api";
import type { conversionType } from "@/Types";
import { useAiResponseStore } from "@/Store/AiResponse";
import axios from "axios";

export const Aireq = async (
  body: string,
  id: number,
  setConversionType: React.Dispatch<React.SetStateAction<conversionType>>
) => {
  setConversionType("ing");
  try {
    const res = await api.post(`/ola/${id}`, {
      question: body,
    });
    if (res.status === 200) {
      useAiResponseStore.getState().setResponse(res.data.answer); //응답 확인하기
      setConversionType("Ok");
    }
  } catch (error) {
    setConversionType("failed");
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 400) {
        alert("다시시도 해주세요.");
      } else if (status === 401) {
        alert("로그인 후 이용해주세요.");
      } else if (status === 429) {
        alert("영역을 800자 설정해주세요.");
      } else {
        alert("백엔드 서버 비상!!!!!!!!!");
      }
      console.error("포트폴리오 저장 오류:", error);
    } else {
      console.error("포트폴리오 저장 오류:", error);
      alert("예상치 못한 오류가 발생했습니다.");
    }
  }
};
