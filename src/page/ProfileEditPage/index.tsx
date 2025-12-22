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

  // 기존 유저 정보 불러오기
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
      const accessToken = localStorage.getItem("accessToken");

      const res = await api.patch(
        "/api/v1/mypage/jeongbo",
        {
          nickname: formData.nickname,
          studentId: formData.studentId,
          major: formData.major,
          introduce: formData.introduce,
          profileImage: formData.profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 수정된 유저 정보가 담긴 토큰 저장
      if (res.data?.token) {
        localStorage.setItem("accessToken", res.data.token);
      }

      alert("프로필이 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  if (loading) return null;

  return (
    <ProfileEdit
      initialData={userData}
      onBack={() => navigate(-1)}
    />
  );
}
