import { SigninPerson, Star } from "@/assets";

const Signin = () => {
  return (
    <div className="flex flex-col items-center my-5">
      <div className="py-[2.875rem] mt-[0.125rem]">
        <SigninPerson />
      </div>
      <div className="w-[31.25rem] flex flex-col items-center gap-[2.25rem]">
        <div className="flex flex-col gap-[0.5rem] w-full ">
          <div className="flex">
            이름
            <Star />
          </div>
          <input
            type="text"
            placeholder="ㅁㄴㅇㄹㄴ"
            className="border-1 p-[0.625rem] rounded-[0.75rem]"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex">
            학번
            <Star />
          </div>
          <div className="flex flex-wrap">
            <input type="dropdown" className="border-1 " />
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex">
            전공
            <Star />
          </div>
          <input
            type="text"
            placeholder="ㅁㄴㅇㄹㄴ"
            className="border-1 p-[0.625rem] rounded-[0.75rem]"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex justify-between">
            <div>소개글</div>
            <div className="text-primary-main1">123/123</div>
          </div>
          <textarea
            placeholder="안녕하세요 저는 ..."
            className="border-1 p-[0.625rem] h-[6.25rem] resize-none rounded-[0.75rem]"
          />
        </div>
        <button className="w-full bg-purple-400 text-white py-[0.875rem] rounded-[0.75rem]">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Signin;
