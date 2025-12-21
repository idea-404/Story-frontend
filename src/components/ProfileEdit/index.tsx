import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
  onSubmit: (data: {
    nickname: string;
    studentId: string;
    major: string;
    introduce: string;
    profileImage: string;
  }) => void;
  onBack: () => void;
};

export default function ProfileSettings({
  initialData,
  onSubmit,
  onBack,
}: ProfileSettingsProps) {
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [touched, setTouched] = useState(false);

  const methods = useForm({
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
    setName(initialData.nickname);
    setProfileImage(initialData.profileImage);
    setIntro(initialData.introduce);

    if (initialData.studentId) {
      const id = initialData.studentId.toString();
      methods.setValue("grade", id[0] || "");
      methods.setValue("class", id[1] || "");
      methods.setValue("number", id.slice(2) || "");
    }

    if (initialData.major) {
      methods.setValue("major", initialData.major);
    }
  }, [initialData, methods]);

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

  const handleSubmit = () => {
    if (!isFormValid) {
      setTouched(true);
      return;
    }

    const values = methods.getValues();
    const studentId = `${values.grade}${values.class}${values.number}`;

    onSubmit({
      nickname: name,
      studentId,
      major: values.major,
      introduce: intro,
      profileImage,
    });
  };

  const getInputClassName = (hasValue: boolean) => {
    const baseClass =
      "h-[3.5rem] w-full rounded-lg border px-4 shadow-none text-gray-700 focus:outline-none";
    if (touched && !hasValue) {
      return `${baseClass} border-red-500 focus:border-red-500`;
    }
    return `${baseClass} focus:border-purple-500`;
  };

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-screen flex-col items-center bg-white p-6">
        <div className="mb-6 w-[31.5rem]">
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

          <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-purple-500 text-white hover:bg-purple-600">
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
          <label className="mb-2 flex items-center text-sm font-medium text-gray-900">
            이름 <Star />
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={getInputClassName(name.trim() !== "")}
          />
        </div>

        <div className="mb-6 w-[31.5rem]">
          <label className="mb-2 flex items-center text-sm font-medium text-gray-900">
            학번 <Star />
          </label>
          <div className="flex gap-3">
            <Grade error={touched && grade === ""} />
            <Class error={touched && classValue === ""} />
            <Number error={touched && number === ""} />
          </div>
        </div>

        <div className="mb-6 w-[31.5rem]">
          <label className="mb-2 flex items-center text-sm font-medium text-gray-900">
            전공 <Star />
          </label>
          <Major error={touched && major === ""} />
        </div>

        <div className="mb-8 w-[31.5rem]">
          <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-900">
            <span>소개글</span>
            <span className="text-primary-main1">{intro.length}/128</span>
          </label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            maxLength={128}
            className="h-[10rem] w-full resize-none rounded-lg border p-4 shadow-none text-gray-700 focus:border-primary-main1 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="h-[3.5rem] w-[31.5rem] rounded-lg bg-primary-main1 font-medium text-white hover:bg-primary-main2"
        >
          수정
        </button>

        <div className="mb-10 w-[31.5rem] flex items-center justify-end font-normal text-[0.875rem] text-primary-main1 mt-4">
          <Star />
          <span className="underline ml-1">필수 항목을 모두 입력해주세요.</span>
        </div>
      </div>
    </FormProvider>
  );
}
