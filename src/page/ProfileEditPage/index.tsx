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
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        const res = await api.get("/api/v1/mypage/view", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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
  }, [navigate]);

  if (loading) return <div>로딩 중...</div>;

  return <ProfileEdit initialData={userData} onBack={() => navigate(-1)} />;
}
