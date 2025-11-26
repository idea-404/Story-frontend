import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/email";
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

const Section2 = () => {
  const { pathname } = useLocation();
  const loginType = pathname === "/login" ? "로그인" : "회원가입";
  const start = pathname === "/login" ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("폼 데이터:", data);
    // 로그인/회원가입 API 호출
  };

  return (
    <div className="flex flex-col w-[31.25rem] px-[0.625rem] gap-[0.625rem]">
      <div className="font-medium text-[1.25rem] text-[#828387]">
        이메일로 {loginType}
      </div>
      <form
        className="flex flex-col gap-[1.125rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="이메일을 입력하세요."
          {...register("email")}
          className={`w-full h-[3.5rem] rounded-[0.625rem] px-[1.25rem] text-[1.375rem] placeholder-[#CBCCCE] text-[#3C3C3E] border-[0.0625rem] focus:outline-none ${
            errors.email
              ? "border-[#F84F4F] focus:border-[#F84F4F]"
              : "border-gray-300 focus:border-primary-main3"
          }`}
        />

        <button
          className={`w-full h-[3.5rem]  text-white rounded-[0.625rem] text-[1.375rem] font-bold ${
            !isValid
              ? "bg-primary-main3 cursor-not-allowed"
              : "bg-primary-main1"
          }`}
          disabled={!isValid}
        >
          {loginType}
        </button>
      </form>
      <div
        className={`flex items-center gap-[1.125rem] text-primary-main1 justify-end h-[2.25rem] pt-[0.5rem]`}
      >
        {errors.email && (
          <div className="text-[#F84F4F] text-sm mr-auto">
            {errors.email.message as string}
          </div>
        )}
        {start && <div>Story가 처음이라면?</div>}
        <button className="underline">{start ? "회원가입" : "로그인"}</button>
      </div>
    </div>
  );
};

export default Section2;
