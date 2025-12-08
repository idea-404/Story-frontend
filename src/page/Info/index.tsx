import { SigninPerson, Star, Class, Grade, Number, Major } from "@/assets";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { infoAPI } from "@/API";

interface FormState {
  user_name: string;
  student_id: string;
  major: string;
}
type ID = {
  grade: string;
  class: string;
  number: string;
  major: string;
};

const Signin = () => {
  /*소개글 설정*/
  const MAX = 128;
  const [introduce, setintroduce] = useState("");
  const introduceCount = introduce.length;
  const change = (e) => {
    setintroduce(e.target.value.slice(0, MAX));
  };

  const [form, setForm] = useState<FormState>({
    user_name: "",
    student_id: "",
    major: "",
  });

  const nameCount = form.user_name.length;
  /*이름 배열*/
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: nameCount < 10 ? value : e.target.value.slice(0, 10),
    }));
  };

  const methods = useForm<ID>({
    defaultValues: {
      grade: "",
      class: "",
      number: "",
      major: "",
    },
  });
  const { watch } = methods;
  const grade = watch("grade");
  const classValue = watch("class");
  const number = watch("number");
  const major = watch("major");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      student_id:
        grade && classValue && number ? `${grade}${classValue}${number}` : "",
      major: major,
    }));
  }, [grade, classValue, number, major]);

  const button = form.user_name && form.student_id && form.major ? true : false;

  return (
    <div className="flex flex-col items-center my-5 font-medium">
      <div className="py-[2.875rem] mt-[0.125rem]">
        <SigninPerson />
      </div>
      <div className="w-[31.25rem] flex flex-col items-center gap-[2.25rem]">
        <div className="flex flex-col gap-[0.5rem] w-full ">
          <div className="flex text-[1.25rem] justify-between">
            <div className="flex">
              이름&nbsp;
              <Star />
            </div>
            <div className="text-primary-main1 text-[1.125rem]">
              {nameCount}/10
            </div>
          </div>
          <input
            type="text"
            placeholder="이름을 입력해 주세요."
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            className="border-1 p-[0.625rem] rounded-[0.75rem] h-[3.5rem]"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex text-[1.25rem]">
            학번&nbsp;
            <Star />
          </div>
          <div className="flex flex-wrap justify-between">
            <FormProvider {...methods}>
              <Grade />
              <Class />
              <Number />
            </FormProvider>
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex text-[1.25rem]">
            전공&nbsp;
            <Star />
          </div>
          <FormProvider {...methods}>
            <Major />
          </FormProvider>
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex justify-between">
            <div className="text-[1.25rem]">소개글</div>
            <div className="text-primary-main1">
              {introduceCount}/{MAX}
            </div>
          </div>
          <textarea
            onChange={change}
            value={introduce}
            className="border-1 p-[0.625rem] h-[6.25rem] resize-none rounded-[0.75rem]"
          />
        </div>
        <div className="w-full">
          <button
            disabled={!button}
            className={`w-full text-white py-[0.875rem] rounded-[0.75rem] font-bold text-[20px] ${
              button ? " bg-primary-main2" : "bg-primary-main3"
            }`}
            onClick={() => infoAPI(form, introduce)}
          >
            완료
          </button>
          <div className="flex gap-[0.5rem] underline text-primary-main1 justify-end h-[35px] items-center">
            <Star /> 필수 항목을 모두 입력해 주세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
