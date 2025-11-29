export const HandleKakaoLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/login";
  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code`;

  window.location.href = KAKAO_AUTH_URL;
};
