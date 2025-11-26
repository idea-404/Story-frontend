import { useLocation } from "react-router-dom";

const section2 = () => {
  const { pathname } = useLocation();
  const loginType = pathname === "/login" ? "로그인" : "회원가입";
  const start = pathname === "/login" ? true : false;
  return (
    <div className="flex flex-col w-[31.25rem] px-[0.625rem] gap-[0.625rem]">
      <div className="font-medium text-[1.25rem] text-[#828387]">
        이메일로 {loginType}
      </div>
      <div className="flex flex-col gap-[1.125rem]">
        <input
          type="email"
          placeholder="이메일을 입력하세요."
          className="w-full border-[0.0625rem] h-[3.5rem] rounded-[0.625rem] px-[1.25rem] text-[1.375rem] placeholder-[#CBCCCE] text-[#3C3C3E]"
        />
        <button className="w-full h-[3.5rem] bg-primary-main3 text-white rounded-[0.625rem] text-[1.375rem] font-bold ">
          {loginType}
        </button>
      </div>
      <div className="flex gap-[1.125rem] text-primary-main1 justify-end h-[2.25rem] pt-[0.5rem]">
        {start && <button>Story가 처음이라면?</button>}
        <button className="underline">{start ? "회원가입" : "로그인"}</button>
      </div>
    </div>
  );
};

export default section2;
