export const handleGoogleLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/login";

  const GOOGLE_AUTH_URL =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&prompt=consent` +
    `&access_type=offline`;

  window.location.href = GOOGLE_AUTH_URL;
};
