import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import api from "@/API/api";
import { Arrow, Camera, Star } from "@/assets";
import Grade from "@/assets/select/Grade";
import Class from "@/assets/select/Class";
import Number from "@/assets/select/Number";
import Major from "@/assets/select/Major";

type ProfileSettingsProps = {
  initialData: {
    nickname: string;
    studentId: string;
    major: string;
    introduce: string;
    profileImage: string;
  };
  onBack: () => void;
};

type FormValues = {
  grade: string;
  class: string;
  number: string;
  major: string;
};

export default function ProfileSettings({
  initialData,
  onBack,
}: ProfileSettingsProps) {
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [touched, setTouched] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      grade: "",
      class: "",
      number: "",
      major: "",
    },
  });

  const { watch, setValue, getValues } = methods;

  const grade = watch("grade");
  const classValue = watch("class");
  const number = watch("number");
  const major = watch("major");

  useEffect(() => {
    setName(initialData.nickname);
    setProfileImage(initialData.profileImage);
    setIntro(initialData.introduce);

    if (initialData.studentId) {
      const id = initialData.studentId;
      setValue("grade", id[0] ?? "");
      setValue("class", id[1] ?? "");
      setValue("number", id.slice(2) ?? "");
    }

    if (initialData.major) {
      setValue("major", initialData.major);
    }
  }, [initialData, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const isFormValid =
    name.trim() !== "" &&
    grade !== "" &&
    classValue !== "" &&
    number !== "" &&
    major !== "";

  const handleSubmit = async () => {
    if (!isFormValid) {
      setTouched(true);
      return;
    }

    const values = getValues();
    const studentId = `${values.grade}${values.class}${values.number}`;

    try {
      const res = await api.patch("/api/v1/mypage/jeongbo", {
        nickname: name,
        studentId,
        major: values.major,
        introduce: intro,
        profileImage,
      });

      const { token, role } = res.data;

      // 토큰 갱신
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      if (role) {
        localStorage.setItem("role", role);
      }

      alert("프로필이 수정되었습니다.");
      onBack();
    } catch (e) {
      console.error(e);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  const getInputClassName = (hasValue: boolean) => {
    const base =
      "h-[3.5rem] w-full rounded-lg border px-4 text-gray-700 focus:outline-none";
    if (touched && !hasValue) {
      return `${base} border-red-500`;
    }
    return `${base} focus:border-primary-main1`;
  };

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-screen flex-col items-center bg-white p-6">
        <div className="mb-4 w-[31.5rem]">
          <button onClick={onBack}>
            <Arrow />
          </button>
        </div>

        <div className="relative mb-8">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-main1 text-white">
            <Camera />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-6 w-[31.5rem]">
          <label className="mb-2 flex items-center text-sm font-medium">
            이름 <Star />
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={getInputClassName(name.trim() !== "")}
          />
        </div>

        <div className="mb-6 w-[31.5rem]">
          <label className="mb-2 flex items-center text-sm font-medium">
            학번 <Star />
          </label>
          <div className="flex gap-12">
            <Grade error={touched && grade === ""} />
            <Class error={touched && classValue === ""} />
            <Number error={touched && number === ""} />
          </div>
        </div>

        <div className="mb-6 w-[31.5rem]">
          <label className="mb-2 flex items-center text-sm font-medium">
            전공 <Star />
          </label>
          <Major error={touched && major === ""} />
        </div>

        <div className="mb-8 w-[31.5rem]">
          <label className="mb-2 flex justify-between text-sm font-medium">
            소개글
            <span className="text-primary-main1">{intro.length}/128</span>
          </label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            maxLength={128}
            className="h-[10rem] w-full resize-none rounded-lg border p-4"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="h-[3.5rem] w-[31.5rem] rounded-lg bg-primary-main1 text-white"
        >
          수정
        </button>

        <div className="mt-4 flex w-[31.5rem] items-center justify-end gap-1 text-sm text-primary-main1 underline decoration-primary-main1">
          <Star />
          <span>필수 항목을 모두 입력해 주세요.</span>
        </div>
      </div>
    </FormProvider>
  );
}
