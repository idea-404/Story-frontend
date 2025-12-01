import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/email";
import { z } from "zod";
import type { emailType } from "@/Types";
import { useState } from "react";
import { Check } from "@/assets";

type LoginFormData = z.infer<typeof loginSchema>;

const Section2 = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loginType = pathname === "/login" ? "로그인" : "회원가입";
  const start = pathname === "/login" ? true : false;
  const [emailState, setEmailState] = useState<emailType>("first");

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
    setEmailState("second");

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
        {emailState === "first" ? (
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
        ) : (
          <div className="flex w-full h-[3.5rem] bg-[#F1EBFF] rounded-[0.625rem] text-[1.375rem] px-[1.25rem] items-center gap-[1.25rem] text-[#828387]">
            <Check /> {loginType} 링크가 이메일로 전송되었습니다.
          </div>
        )}

        <button
          className={`w-full h-[3.5rem]  text-white rounded-[0.625rem] text-[1.375rem] font-bold ${
            !isValid
              ? "bg-primary-main3 cursor-not-allowed"
              : emailState === "first"
              ? "bg-primary-main1"
              : "bg-primary-main3"
          }`}
          disabled={!isValid}
        >
          {loginType}
        </button>
      </form>
      <div
        className={`flex items-center gap-[1.125rem] text-primary-main1 h-[2.25rem] pt-[0.5rem] ${
          emailState === "first" ? "justify-end" : ""
        }`}
      >
        {errors.email && (
          <div className="text-[#F84F4F] text-sm mr-auto">
            {errors.email.message as string}
          </div>
        )}
        {emailState === "second" && (
          <button
            className="underline"
            onClick={() => {
              setEmailState("first");
            }}
          >
            인증 메일이 전송 되지 않았나요?
          </button>
        )}
        {emailState === "first" && (
          <>
            {start && <div>Story가 처음이라면?</div>}
            <button
              className="underline"
              onClick={() => {
                navigate(start ? "/signin" : "/login");
              }}
            >
              {start ? "회원가입" : "로그인"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Section2;
