import { SigninPerson, Star } from "@/assets";
import { Class, Grade, Number } from "@/assets";
import { useState } from "react";

interface FormState {
  user_name: string;
  student_id: string;
  major: string;
}

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  /*학번*/
  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const handleSelectNumber = (value: string) => {
    setSelectedNumber(value);
    setForm((prev) => ({
      ...prev,
      student_id: `${selectedGrade}${selectedClass}${value}`,
    }));
  };

  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const handleSelectGrade = (value: string) => {
    setSelectedGrade(value);
    setForm((prev) => ({
      ...prev,
      student_id: `${value}${selectedClass}${selectedNumber}`,
    }));
  };

  const [selectedClass, setSelectedClass] = useState<string>("");
  const handleSelectClass = (value: string) => {
    setSelectedClass(value);
    setForm((prev) => ({
      ...prev,
      student_id: `${selectedGrade}${value}${selectedNumber}`,
    }));
  };

  return (
    <div className="flex flex-col items-center my-5 font-medium">
      <div className="py-[2.875rem] mt-[0.125rem]">
        <SigninPerson />
      </div>
      <div className="w-[31.25rem] flex flex-col items-center gap-[2.25rem]">
        <div className="flex flex-col gap-[0.5rem] w-full ">
          <div className="flex text-[1.25rem]">
            이름&nbsp;
            <Star />
          </div>
          <input
            type="text"
            placeholder="이름을 입력해 주세요."
            name="name"
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
            <Grade onChange={handleSelectGrade} />
            <Class onChange={handleSelectClass} />
            <Number onChange={handleSelectNumber} />
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] w-full">
          <div className="flex text-[1.25rem]">
            전공&nbsp;
            <Star />
          </div>
          <input
            type="text"
            placeholder="전공을 선택해 주세요."
            className="border-1 p-[0.625rem] rounded-[0.75rem] h-[3.5rem]"
            name="major"
            value={form.major}
            onChange={handleChange}
          />
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
