import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
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
  profileImage: string;
  name: string;
  intro: string;
  grade: string;
  class: string;
  number: string;
  major: string;
};

export default function ProfileSettings({
  initialData,
  onBack,
}: ProfileSettingsProps) {
  const methods = useForm<FormValues>({
    defaultValues: {
      profileImage: "",
      name: "",
      intro: "",
      grade: "",
      class: "",
      number: "",
      major: "",
    },
    mode: "onChange", // formState.isValid 사용 가능
  });

  const { handleSubmit, setValue, watch, control, formState } = methods;
  const { isValid, isSubmitted, errors } = formState;

  const grade = watch("grade");
  const classValue = watch("class");
  const number = watch("number");
  const major = watch("major");

  useEffect(() => {
    setValue("name", initialData.nickname);
    setValue("profileImage", initialData.profileImage);
    setValue("intro", initialData.introduce);

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

  const onSubmit = async (data: FormValues) => {
    const studentId = `${data.grade}${data.class}${data.number}`;

    try {
      const res = await api.patch("/api/v1/mypage/jeongbo", {
        nickname: data.name,
        studentId,
        major: data.major,
        introduce: data.intro,
        profileImage: data.profileImage,
      });

      const { token, role } = res.data;
      if (token) localStorage.setItem("accessToken", token);
      if (role) localStorage.setItem("role", role);

      alert("프로필이 수정되었습니다.");
      onBack();
    } catch (e) {
      console.error(e);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("profileImage", reader.result as string, {
        shouldValidate: true,
      });
    };
    reader.readAsDataURL(file);
  };

  const getInputClassName = (hasValue: boolean) => {
    const base =
      "h-[3.5rem] w-full rounded-lg border px-4 text-gray-700 focus:outline-none";
    if (isSubmitted && !hasValue) {
      return `${base} border-red-500`;
    }
    return `${base} focus:border-primary-main1`;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col items-center bg-white p-6"
      >
        <div className="mb-4 w-[31.5rem]">
          <button type="button" onClick={onBack}>
            <Arrow />
          </button>
        </div>

        <div className="relative mb-8">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
            <Controller
              name="profileImage"
              control={control}
              render={({ field }) =>
                field.value ? (
                  <img
                    src={field.value}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )
              }
            />
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
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                className={getInputClassName(!!field.value.trim())}
              />
            )}
          />
        </div>

        <div className="mb-6 w-[31.5rem]">
          <label className="mb-2 flex items-center text-sm font-medium">
            학번 <Star />
          </label>
          <div className="flex gap-12">
            <Grade error={isSubmitted && grade === ""} />
            <Class error={isSubmitted && classValue === ""} />
            <Number error={isSubmitted && number === ""} />
          </div>
        </div>

        <div className="mb-6 w-[31.5rem]">
          <label className="mb-2 flex items-center text-sm font-medium">
            전공 <Star />
          </label>
          <Major error={isSubmitted && major === ""} />
        </div>

        <div className="mb-8 w-[31.5rem]">
          <label className="mb-2 flex justify-between text-sm font-medium">
            소개글
            <Controller
              name="intro"
              control={control}
              render={({ field }) => (
                <span className="text-primary-main1">
                  {field.value.length}/128
                </span>
              )}
            />
          </label>
          <Controller
            name="intro"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                maxLength={128}
                className="h-[10rem] w-full resize-none rounded-lg border p-4"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="h-[3.5rem] w-[31.5rem] rounded-lg bg-primary-main1 text-white"
        >
          수정
        </button>

        <div className="mt-4 flex w-[31.5rem] items-center justify-end gap-1 text-sm text-primary-main1 underline decoration-primary-main1">
          <Star />
          <span>필수 항목을 모두 입력해 주세요.</span>
        </div>
      </form>
    </FormProvider>
  );
}
