import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}v1`,
});

// 요청 인터셉터: 모든 요청에 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    // localStorage에서 zustand persist 데이터 가져오기
    const storedData = localStorage.getItem("auth-storage");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const token = parsedData?.state?.auth?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("토큰 파싱 오류:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
