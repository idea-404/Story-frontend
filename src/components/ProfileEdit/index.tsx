import { useState, useEffect } from "react";
import { ChevronLeft, Camera } from "lucide-react";
import { Arrow, Person } from "@/assets";

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
  const [grade, setGrade] = useState(1);
  const [classNum, setClassNum] = useState(1);
  const [number, setNumber] = useState(1);
  const [major, setMajor] = useState("기능반");
  const [intro, setIntro] = useState("");

  useEffect(() => {
    setName(initialData.nickname);
    setProfileImage(initialData.profileImage);
    setMajor(initialData.major);
    setIntro(initialData.introduce);

    if (initialData.studentId) {
      const id = initialData.studentId.toString();
      setGrade(parseInt(id[0]) || 1);
      setClassNum(parseInt(id[1]) || 1);
      setNumber(parseInt(id.slice(2)) || 1);
    }
  }, [initialData]);

  // 프로필 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 수정 버튼 클릭
  const handleSubmit = () => {
    // studentId 조합 (예: 1학년 2반 10번 -> "1210")
    const studentId = `${grade}${classNum}${number
      .toString()
      .padStart(2, "0")}`;

    onSubmit({
      nickname: name,
      studentId,
      major,
      introduce: intro,
      profileImage,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-6">
      {/* 뒤로가기 버튼 */}
      <div className="mb-6 w-[31.5rem]">
        <button className="text-purple-500" onClick={onBack}>
          <Arrow />
        </button>
      </div>

      {/* 프로필 이미지 */}
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
          <Camera className="h-5 w-5" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* 이름 */}
      <div className="mb-6 w-[31.5rem]">
        <label className="mb-2 flex items-center text-sm font-medium text-gray-900">
          이름 <span className="ml-1 text-purple-500">★</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[3.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:border-purple-500 focus:outline-none"
        />
      </div>

      {/* 학번 */}
      <div className="mb-6 w-[31.5rem]">
        <label className="mb-2 flex items-center text-sm font-medium text-gray-900">
          학번 <span className="ml-1 text-purple-500">★</span>
        </label>
        <div className="flex gap-3">
          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
            className="h-[3.5rem] flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 text-gray-700 focus:border-purple-500 focus:outline-none"
          >
            <option value={1}>1학년</option>
            <option value={2}>2학년</option>
            <option value={3}>3학년</option>
          </select>
          <select
            value={classNum}
            onChange={(e) => setClassNum(Number(e.target.value))}
            className="h-[3.5rem] flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 text-gray-700 focus:border-purple-500 focus:outline-none"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}반
              </option>
            ))}
          </select>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            className="h-[3.5rem] flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:border-purple-500 focus:outline-none"
            min={1}
            max={30}
          />
        </div>
      </div>

      {/* 전공 */}
      <div className="mb-6 w-[31.5rem]">
        <label className="mb-2 flex items-center text-sm font-medium text-gray-900">
          전공 <span className="ml-1 text-purple-500">★</span>
        </label>
        <select
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="h-[3.5rem] w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 text-gray-700 focus:border-purple-500 focus:outline-none"
        >
          <option value="기능반">기능반</option>
          <option value="취업반">취업반</option>
          <option value="프론트엔드">프론트엔드</option>
          <option value="백엔드">백엔드</option>
        </select>
      </div>

      {/* 소개글 */}
      <div className="mb-8 w-[31.5rem]">
        <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-900">
          <span>소개글</span>
          <span className="text-purple-400">{intro.length}/128</span>
        </label>
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          maxLength={128}
          className="h-[10rem] w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-700 focus:border-primary-main1 focus:outline-none"
        />
      </div>

      {/* 수정 버튼 */}
      <button
        onClick={handleSubmit}
        className="h-[3.5rem] w-[31.5rem] rounded-lg bg-primary-main1 font-medium text-white hover:bg-primary-main2"
      >
        수정
      </button>
    </div>
  );
}
