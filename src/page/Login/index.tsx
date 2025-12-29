import { LoginSection1, LoginSection2, LoginSection3 } from "@/components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenCode } from "@/API/tokenCode";
import type { oauthType } from "@/Types";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const provider = localStorage.getItem("oauth_provider") as oauthType | null;

    if (provider) {
      TokenCode(provider, navigate);
      localStorage.removeItem("oauth_provider");
    }
  }, []);

  return (
    <main className="flex items-center flex-col">
      <LoginSection1 />
      <LoginSection2 />
      <LoginSection3 />
    </main>
  );
};
export default Login;
