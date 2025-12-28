export const HandleKakaoLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = "http://dlskawls.shop:25405/login/oauth2/code/kakao";
  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code`;

  // OAuth 제공자 저장
  localStorage.setItem("oauth_provider", "kakao");
  window.location.href = KAKAO_AUTH_URL;
};
