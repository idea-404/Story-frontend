import { useEffect, useState } from "react";
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

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "portfolio" | "intro">(
    "blog"
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [representativePostId, setRepresentativePostId] = useState<
    number | null
  >(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState<Set<number>>(
    new Set()
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleRepresentativeToggle = async (postId: number) => {
    try {
      const newRepresentativeId =
        representativePostId === postId ? null : postId;

      if (newRepresentativeId === null) {
        await api.delete("/api/v1/portfolio/representative");
      } else {
        await api.post("/api/v1/portfolio/representative", {
          postId: newRepresentativeId,
        });
      }

      setRepresentativePostId(newRepresentativeId);
    } catch (error) {
      console.error("대표글 지정/해제 실패:", error);
    }
  };

  const handleCardClick = (postId: number) => {
    if (isEditMode) {
      setSelectedPostIds((prev) => {
        const newSelected = new Set(prev);
        if (newSelected.has(postId)) {
          newSelected.delete(postId);
        } else {
          newSelected.add(postId);
        }
        return newSelected;
      });
    } else {
      console.log("게시글 상세:", postId);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setSelectedPostIds(new Set());
  };

  const handleDeleteClick = () => {
    if (selectedPostIds.size === 0) {
      alert("삭제할 게시글을 선택해주세요.");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // 선택된 게시글들 삭제 API 호출
      await Promise.all(
        Array.from(selectedPostIds).map((postId) =>
          api.delete(`/api/v1/posts/${postId}`)
        )
      );

      // 삭제 후 데이터 다시 불러오기
      const res = await api.get("/api/v1/mypage/view");
      const data = res.data;

      setUserData({
        ...data,
        portfolio: Array.isArray(data.portfolio) ? data.portfolio : [],
        blog: Array.isArray(data.blog) ? data.blog : [],
      });

      setIsEditMode(false);
      setSelectedPostIds(new Set());
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedPostIds(new Set());
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
            {!isEditMode ? (
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
              <>
                <button
                  onClick={handleDeleteClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  삭제 ({selectedPostIds.size})
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
              </>
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
              showFavorite={activeTab === "portfolio" && !isEditMode}
              isFavorite={representativePostId === post.id}
              onFavoriteClick={handleRepresentativeToggle}
              onClick={handleCardClick}
              isSelected={selectedPostIds.has(post.id)}
              isEditMode={isEditMode}
            />
          ))}
        </div>
      )}

      <Delete
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
