import { SigninPerson, Star } from "@/assets";
import { useState } from "react";

const Signin = () => {
  const [introduce, setintroduce] = useState("");
  const introduceCount = introduce.length;
  const change = (e) => {
    setintroduce(e.target.value);
  };

  return (
    <div className="flex flex-col items-center my-5 font-medium">
      <div className="py-[2.875rem] mt-[0.125rem]">
        <SigninPerson />
      </div>
      <div className="w-[31.25rem] flex flex-col items-center gap-[2.25rem]">
        <div className="flex flex-col gap-[0.5rem] w-full ">
          <div className="flex">
            이름&nbsp;
            <Star />
          </div>
          <input
            type="text"
            placeholder="이름을 입력해 주세요."
            className="border-1 p-[0.625rem] rounded-[0.75rem]"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex">
            학번&nbsp;
            <Star />
          </div>
          <div className="flex flex-wrap">
            <input type="dropdown" className="border-1 " />
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex">
            전공&nbsp;
            <Star />
          </div>
          <input
            type="text"
            placeholder="전공을 선택해 주세요."
            className="border-1 p-[0.625rem] rounded-[0.75rem]"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex justify-between">
            <div>소개글</div>
            <div className="text-primary-main1">{introduceCount}/123</div>
          </div>
          <textarea
            onChange={change}
            className="border-1 p-[0.625rem] h-[6.25rem] resize-none rounded-[0.75rem]"
          />
        </div>
        <button
          className="w-full bg-primary-main3 text-white py-[0.875rem] rounded-[0.75rem] font-bold text-[20px]
"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default Signin;
