import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/API/api";
import { ProfileEdit } from "@/components";

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nickname: "",
    studentId: "",
    major: "",
    introduce: "",
    profileImage: "",
  });

  // 초기 데이터 로드 (퍼블리싱용)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get("/api/v1/mypage/view");

        setUserData({
          nickname: res.data.nickname ?? "",
          studentId: res.data.studentId ?? "",
          major: res.data.major ?? "",
          introduce: res.data.introduce ?? "",
          profileImage: res.data.profileImage ?? "",
        });
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 프로필 수정 제출
  const handleSubmit = async (formData: {
    nickname: string;
    studentId: string;
    major: string;
    introduce: string;
    profileImage: string;
  }) => {
    try {
      await api.patch("/api/v1/mypage/edit", formData);

      alert("프로필이 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <ProfileEdit
      initialData={userData}
      onSubmit={handleSubmit}
      onBack={() => navigate(-1)}
    />
  );
}
