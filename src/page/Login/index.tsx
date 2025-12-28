import { LoginSection1, LoginSection2, LoginSection3 } from "@/components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenCode } from "@/API/tokenCode";
import type { oauthType } from "@/Types";

const Login = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    const provider = localStorage.getItem("oauth_provider") as oauthType | null;

    if (code && provider) {
      TokenCode(code, provider, navigate);
      localStorage.removeItem("oauth_provider");
    }
  }, [search, navigate]);

  return (
    <main className="flex items-center flex-col">
      <LoginSection1 />
      <LoginSection2 />
      <LoginSection3 />
    </main>
  );
};
export default Login;
