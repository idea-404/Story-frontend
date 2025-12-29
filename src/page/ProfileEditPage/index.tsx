import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/API/api";
import useTokenStore from "@/Store/token";
import { ProfileEdit } from "@/components";

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const { auth } = useTokenStore(); // Zustand store 사용

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nickname: "",
    studentId: "",
    major: "",
    introduce: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/mypage/view", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        setUserData({
          nickname: res.data.nickname ?? "",
          studentId: res.data.studentId ?? "",
          major: res.data.major ?? "",
          introduce: res.data.introduce ?? "",
          profileImage: res.data.profileImage ?? "",
        });
      } catch (error: any) {
        if (error.response?.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
          return;
        }
        console.error("유저 정보 불러오기 실패:", error);
        alert("유저 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.token, navigate]);

  if (loading) return <div>로딩 중...</div>;

  return <ProfileEdit initialData={userData} onBack={() => navigate(-1)} />;
}
