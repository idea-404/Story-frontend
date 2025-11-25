export const handleKakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/login";
  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${REST_API_KEY}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code`;

  window.location.href = KAKAO_AUTH_URL;
};
