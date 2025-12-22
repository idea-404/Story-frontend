import api from "@/API/api";
import type { conversionType } from "@/Types";
import { useAiResponseStore } from "@/Store/AiResponse";

export const Aireq = async (
  body: string,
  id: number,
  setConversionType: React.Dispatch<React.SetStateAction<conversionType>>
) => {
  try {
    const res = await api.post(`/${id}`, {
      question: body,
    });
    setConversionType("ing");

    if (res.status === 200) {
      useAiResponseStore.getState().setResponse(res.data);
      setConversionType("Ok");
    } else if (res.status === 400) {
      alert("다시시도 해주세요.");
      setConversionType("failed");
    } else if (res.status === 401) {
      setConversionType("failed");
      alert("로그인 후 이용해주세요.");
    } else if (res.status === 429) {
      setConversionType("failed");
      alert("영역을 800자 설정해주세요.");
    }
  } catch (error) {
    setConversionType("failed");
    console.error("포트폴리오 저장 오류:", error);
    alert("백엔드 서버 비상!!!!!!!!!");
  }
};
