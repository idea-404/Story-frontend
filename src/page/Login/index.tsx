import { LoginSection1, LoginSection2, LoginSection3 } from "@/components";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTokenStore from "@/Store/token";

const Login = () => {
  const { search } = useLocation();
  const setToken = useTokenStore((state) => state.setToken);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    console.log("카카오 인가코드:", code);

    const fetchToken = async () => {
      if (!code) return;
      try {
        const res = await axios.post("/v1/auth/kakao", { code });
        const tokenValue = res.data.token;
        setToken(tokenValue);
        console.log("받은 토큰:", tokenValue);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [search]);

  return (
    <main className="flex items-center flex-col">
      <LoginSection1 />
      <LoginSection2 />
      <LoginSection3 />
    </main>
  );
};
export default Login;
