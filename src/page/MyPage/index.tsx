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

  const [representativePostId, setRepresentativePostId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const res = await api.get("/api/v1/mypage/view");
        const data = res.data;

        setUserData({
          ...data,
          portfolio: Array.isArray(data.portfolio) ? data.portfolio : [],
          blog: Array.isArray(data.blog) ? data.blog : [],
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPage();
  }, []);

  // 대표글 설정
  const handleRepresentativeToggle = async (postId: number) => {
  try {
    await api.patch(`/api/v1/portfolio/open/${postId}`);

    setRepresentativePostId(postId);
  } catch (e) {
    console.error("대표글 설정 실패", e);
    alert("대표글 설정에 실패했습니다.");
  }
};

  // 수정할때 카드 클릭
  const handleCardClick = (postId: number) => {
    if (mode === "edit") {
      if (activeTab === "portfolio") {
        navigate(`/portfolio/write/${postId}`);
      } else {
        navigate(`/blog/write/${postId}`);
      }
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

  // 삭제 확정
  const handleDeleteConfirm = async () => {
    if (!targetPostId) return;

    try {
      const deleteUrl =
        activeTab === "portfolio"
          ? `/api/v1/portfolio/delete/${targetPostId}`
          : `/api/v1/blog/delete/${targetPostId}`;

      await api.delete(deleteUrl);

      const res = await api.get("/api/v1/mypage/view");
      const data = res.data;

      setUserData({
        ...data,
        portfolio: Array.isArray(data.portfolio) ? data.portfolio : [],
        blog: Array.isArray(data.blog) ? data.blog : [],
      });

      setMode("none");
      setTargetPostId(null);
      setIsDeleteModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (!userData) return null;

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
          <div className="absolute left-223 top-1 flex gap-3">
            {mode === "none" ? (
              <>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-purple-100 hover:text-primary-main1"
                >
                  수정
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-purple-100 hover:text-primary-main1"
                >
                  삭제
                </button>
              </>
            ) : (
              <button
                onClick={handleCancelMode}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
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
              userId={1}
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
              isFavorite={representativePostId === post.id}
              onFavoriteClick={handleRepresentativeToggle}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}

      <Delete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
