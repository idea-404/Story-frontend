import { Line2 } from "@/assets";
import { Kakao, Google } from "@/assets";
import { handleKakaoLogin } from "@/API/kakao";

const section3 = () => {
  return (
    <div className="flex flex-col items-center gap-[0.5rem]">
      <div className="flex items-center gap-3 px-[0.625rem] h-[1.5rem]">
        <Line2 />
        소셜 로그인
        <Line2 />
      </div>
      <div className="flex gap-[4.5rem]">
        <button className="bg-[#EFF0F2] rounded-full p-[0.625rem]">
          <Google />
        </button>
        <button
          className="bg-[#F7E44C] rounded-full p-[0.625rem]"
          onClick={handleKakaoLogin}
        >
          <Kakao />
        </button>
      </div>
    </div>
  );
};

export default section3;
