import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/email";
import { z } from "zod";
import type { emailType } from "@/Types";
import { useState } from "react";
import { Check } from "@/assets";
import { useTermsStore } from "@/Store/terms";
import ResendMail from "../Modal/ResendMail";
import TermsModal from "../Terms";
import { Login } from "@/API";

type LoginFormData = z.infer<typeof loginSchema>;

const Section2 = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loginType = pathname === "/login" ? "로그인" : "회원가입";
  const start = pathname === "/login" ? true : false;
  const [emailState, setEmailState] = useState<emailType>("first");
  const { isAgreed, setIsAgreed } = useTermsStore();
  const [modal, setModal] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  setIsAgreed(start ? true : isAgreed);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("폼 데이터:", data);
    setEmailState("second");
    const type = pathname === "/login" ? "login" : "signin";
    await Login(data.email, type);
  };

  return (
    <div className="flex flex-col w-[31.25rem] gap-[0.625rem]">
      <div className="font-medium text-[1rem] text-[#828387]">
        이메일로 {loginType}
      </div>
      <form
        className="flex flex-col gap-[0.75rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {emailState === "first" ? (
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            {...register("email")}
            className={`w-full h-[3rem] rounded-[0.625rem] px-[1.25rem] text-[1.25rem] placeholder-[#CBCCCE] text-[#3C3C3E] border-[0.0625rem] focus:outline-none ${
              errors.email
                ? "border-[#F84F4F] focus:border-[#F84F4F]"
                : "border-gray-300 focus:border-primary-main3"
            }`}
          />
        ) : (
          <div className="flex w-full h-[3rem] bg-[#F1EBFF] rounded-[0.625rem] text-[1.375rem] px-[1.25rem] items-center gap-[1.25rem] text-[#828387]">
            <Check /> {loginType} 링크가 이메일로 전송되었습니다.
          </div>
        )}

        <button
          type="submit"
          className={`w-full h-[3rem] text-white rounded-[0.625rem] text-[1.25rem] font-bold ${
            !isValid || !isAgreed
              ? "bg-primary-main3 cursor-not-allowed"
              : emailState === "first"
              ? "bg-primary-main1"
              : "bg-primary-main3"
          }`}
          disabled={!isValid || !isAgreed}
        >
          {loginType}
        </button>
      </form>
      {loginType === "회원가입" && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={isAgreed}
            readOnly
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="terms" className="text-sm">
            <button
              onClick={() => {
                setTermsOpen(true);
              }}
              className="text-primary-main1 underline"
            >
              이용 약관 동의
            </button>
          </label>
        </div>
      )}
      <div
        className={`flex items-center gap-[1.125rem] text-primary-main1 h-[2.25rem] pt-[0.5rem] ${
          emailState === "first" ? "justify-end" : ""
        }`}
      >
        {errors.email && (
          <div className="text-[#F84F4F] text-sm mr-auto">
            {errors.email?.message}
          </div>
        )}
        {emailState === "second" && (
          <button
            className="underline"
            onClick={() => {
              setModal(true);
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
      {modal && (
        <ResendMail setEmailState={setEmailState} setModal={setModal} />
      )}
      {termsOpen && <TermsModal setTermsOpen={setTermsOpen} />}
    </div>
  );
};

export default Section2;
