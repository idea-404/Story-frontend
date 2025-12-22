import api from "@/API/api";

export const write = async (
  title: string,
  content: string,
  introduce: string
) => {
  try {
    const res = await api.post(`/portfolio/write`, {
      title,
      content,
      introduce,
    });
    if (res.status === 201) {
      alert("포트폴리오가 성공적으로 저장되었습니다.");
    } else if (res.status === 400) {
      alert("제목이나 내용 추가 후 다시 시도해주세요.");
    } else if (res.status === 401) {
      alert("로그인 후 이용해주세요.");
    }
  } catch (error) {
    console.error("포트폴리오 저장 오류:", error);
    alert("백엔드 서버 비상!!!!!!!!!");
  }
};
