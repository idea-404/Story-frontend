export const HandleKakaoLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI =
    import.meta.env.VITE_APP_REDIRECT_URI || "http://localhost:5173/login";
  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code`;

  // OAuth 제공자 저장
  localStorage.setItem("oauth_provider", "kakao");
  window.location.href = KAKAO_AUTH_URL;
};
