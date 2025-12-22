import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/API/api";
import { ProfileHeader, MyPageHeader, MainCard, Introduce } from "@/components";
import Delete from "@/components/Modal/Delete";

type Post = {
  id: number;
  nickname: string;
  title: string;
  content: string;
  like: number;
  view: number;
  comment: number;
  createdAt: string;
  thumbnail?: string;
  zerodog: boolean;
};

type UserData = {
  nickname: string;
  studentId: string;
  introduce: string;
  profileImage: string;
  portfolio: Post[];
  blog: Post[];
};

type Mode = "none" | "edit" | "delete";

export default function MyPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"blog" | "portfolio" | "intro">(
    "blog"
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState<Mode>("none");
  const [targetPostId, setTargetPostId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 공개글 ID 목록
  const [zerodogPostIds, setZerodogPostIds] = useState<number[]>([]);

  const fetchMyPage = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const res = await api.get("/api/v1/mypage/view", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;

      const portfolio: Post[] = Array.isArray(data.portfolio)
        ? data.portfolio
        : [];
      const blog: Post[] = Array.isArray(data.blog) ? data.blog : [];

      setUserData({
        nickname: data.nickname,
        studentId: data.studentId,
        introduce: data.introduce,
        profileImage: data.profileImage,
        portfolio,
        blog,
      });

      setZerodogPostIds(
        portfolio.filter((post) => post.zerodog).map((post) => post.id)
      );
    } catch (e) {
      console.error(e);
      alert("마이페이지 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPage();
  }, []);

  const handleZerodogToggle = async (postId: number) => {
    const isOpen = zerodogPostIds.includes(postId);
    const token = localStorage.getItem("access-token");
    if (!token) return;

    try {
      await api.patch(`/api/v1/portfolio/open/${postId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setZerodogPostIds((prev) =>
        isOpen ? prev.filter((id) => id !== postId) : [...prev, postId]
      );
    } catch (e) {
      console.error("공개여부 변경 실패", e);
      alert("공개여부 변경에 실패했습니다.");
    }
  };

  const handleCardClick = (postId: number) => {
    if (mode === "edit") {
      navigate(
        activeTab === "portfolio"
          ? `/portfolio/write/${postId}`
          : `/blog/write/${postId}`
      );
      return;
    }

    if (mode === "delete") {
      setTargetPostId(postId);
      setIsDeleteModalOpen(true);
    }
  };

  const handleEditClick = () => {
    setMode("edit");
    alert("수정할 게시글을 선택하세요.");
  };

  const handleDeleteClick = () => {
    setMode("delete");
    alert("삭제할 게시글을 선택하세요.");
  };

  const handleCancelMode = () => {
    setMode("none");
    setTargetPostId(null);
  };

  // 게시글 삭제
  const handleDeleteConfirm = async () => {
    if (!targetPostId) return;
    const token = localStorage.getItem("access-token");
    if (!token) return;

    try {
      const deleteUrl =
        activeTab === "portfolio"
          ? `/api/v1/portfolio/delete/${targetPostId}`
          : `/api/v1/blog/delete/${targetPostId}`;

      await api.delete(deleteUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 삭제 후 데이터 다시 불러오기
      await fetchMyPage();

      setMode("none");
      setTargetPostId(null);
      setIsDeleteModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
  };

  if (loading || !userData) return null;

  const posts = activeTab === "portfolio" ? userData.portfolio : userData.blog;

  return (
    <div className="flex flex-col items-center">
      <ProfileHeader
        nickname={userData.nickname}
        studentId={userData.studentId}
        profileImage={userData.profileImage}
      />

      <div className="relative w-full">
        <MyPageHeader
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onNavigate={() => {}}
        />

        {(activeTab === "blog" || activeTab === "portfolio") && (
          <div className="absolute left-222 top-1 flex gap-3">
            {mode === "none" ? (
              <>
                <button
                  onClick={handleEditClick}
                  className="h-8 rounded-full border border-primary-main1 px-4 text-sm text-primary-main1 transition hover:bg-primary-main1 hover:text-white"
                >
                  수정
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="h-8 rounded-full border border-primary-main1 px-4 text-sm text-primary-main1 transition hover:bg-primary-main1 hover:text-white"
                >
                  삭제
                </button>
              </>
            ) : (
              <button
                onClick={handleCancelMode}
                className="h-8 rounded-full border border-gray-300 px-4 text-sm text-gray-500 transition hover:bg-gray-200"
              >
                취소
              </button>
            )}
          </div>
        )}
      </div>

      {activeTab === "intro" && <Introduce introduce={userData.introduce} />}

      {(activeTab === "portfolio" || activeTab === "blog") && (
        <div className="mt-10 flex flex-col gap-6">
          {posts.map((post) => (
            <MainCard
              key={post.id}
              postId={post.id}
              nickname={post.nickname}
              profileImage={userData.profileImage}
              title={post.title}
              content={post.content}
              like={post.like}
              view={post.view}
              comment={post.comment}
              thumbnail={post.thumbnail ?? null}
              type={activeTab}
              time={post.createdAt}
              showFavorite={activeTab === "portfolio" && mode === "none"}
              isFavorite={zerodogPostIds.includes(post.id)}
              onFavoriteClick={handleZerodogToggle}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}

      <Delete
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMode("none");
          setTargetPostId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
