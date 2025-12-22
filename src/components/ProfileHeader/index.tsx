import { useNavigate } from "react-router-dom";
import { Arrow, Person } from "@/assets";

type ProfileHeaderProps = {
  nickname: string;
  studentId: string;
  profileImage: string;
  onBack?: () => void;
  showEditButton?: boolean;
};

export default function ProfileHeader({
  nickname,
  studentId,
  profileImage,
  onBack,
  showEditButton = true,
}: ProfileHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };

  const handleProfileEdit = () => {
    navigate("/profile-edit");
  };

  return (
    <header className="mx-auto w-[37.5rem] py-6">
      <button
        className="mb-4 flex h-6 w-6 items-center justify-center"
        onClick={handleBack}
      >
        <Arrow />
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <Person h={60} />
            )}
          </div>

          <span className="text-lg font-semibold text-gray-900">
            {studentId} {nickname}
          </span>
        </div>

        {showEditButton && (
          <button
            onClick={handleProfileEdit}
            className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-primary-main1 hover:bg-gray-200"
          >
            프로필 설정
          </button>
        )}
      </div>
    </header>
  );
}
