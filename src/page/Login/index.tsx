import { LoginSection1, LoginSection2, LoginSection3 } from "@/components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get("code");

    console.log("카카오 인가코드:", code);
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
