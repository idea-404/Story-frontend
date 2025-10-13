import { Google, Kakao, Line2 } from "@/assets";
import { Logincomponents } from "@/components";

const Login = () => {
  return (
    <main className="flex items-center flex-col ">
      <div className="w-[32.5rem] my-[5.5rem] text-[2rem] font-medium flex flex-col">
        <div>당신의</div>
        <div>
          <span className="text-primary-main1">Story</span>를
        </div>
        <div>시작해 보세요!</div>
      </div>

      <Logincomponents />

      <div className="w-[32.5rem] flex flex-col justify-center gap-4">
        <div className="flex items-center gap-4">
          <Line2 />
          소셜 로그인
          <Line2 />
        </div>
        <div className="flex flex-col gap-[0.875rem]">
          <button className="flex gap-[1.625rem] w-[32.5rem] h-[3.375rem] justify-center items-center bg-[#EFF0F2] rounded-[0.625rem]">
            <Google />
            <div className="font-bold text-[1.25rem]">구글 계정으로 로그인</div>
          </button>
          <button className="flex gap-[0.5rem] w-[32.5rem] h-[3.375rem] justify-center items-center bg-[#F7E44C] rounded-[0.625rem]">
            <Kakao />
            <div className="font-bold text-[1.25rem]">
              카카오 계정으로 로그인
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};
export default Login;
