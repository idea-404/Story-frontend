import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/API/api";
import useTokenStore from "@/Store/token";
import { ProfileHeader, MyPageHeader, MainCard, Introduce } from "@/components";
import Delete from "@/components/Modal/Delete";

type Post = {
  userid: number;
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
  const { auth } = useTokenStore();

  const [activeTab, setActiveTab] = useState<"blog" | "portfolio" | "intro">(
    "blog"
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState<Mode>("none");
  const [targetPostId, setTargetPostId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [zerodogPostIds, setZerodogPostIds] = useState<number[]>([]);

  const fetchMyPage = async () => {
    if (!auth.token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const res = await api.get("/mypage/view", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const data = res.data;

      const portfolio = Array.isArray(data.portfolio) ? data.portfolio : [];
      const blog = Array.isArray(data.blog) ? data.blog : [];

      setUserData({
        nickname: data.nickname,
        studentId: data.studentId,
        introduce: data.introduce,
        profileImage: data.profileImage,
        portfolio,
        blog,
      });

      setZerodogPostIds(
        portfolio.filter((p: Post) => p.zerodog).map((p: Post) => p.id)
      );
    } catch (e: any) {
      const status = e.response?.status;
      if (status === 400 || status === 403) {
        alert("정보 입력이 필요합니다.");
        navigate("/info");
        return;
      }
      alert("마이페이지 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPage();
  }, []);

  const handleZerodogToggle = async (postId: number) => {
    if (!auth.token) return;

    try {
      await api.patch(`/portfolio/open/${postId}`, null, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setZerodogPostIds((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );
    } catch {
      alert("공개여부 변경 실패");
    }
  };

  const handleCardClick = (post: Post) => {
    if (mode === "edit") {
      const path =
        activeTab === "portfolio"
          ? `/portfolio/write/${post.id}`
          : `/blog/write/${post.id}`;

      navigate(path, {
        state: { post },
      });
      return;
    }

    if (mode === "delete") {
      setTargetPostId(post.id);
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

  const handleDeleteConfirm = async () => {
    if (!targetPostId || !auth.token) return;

    const url =
      activeTab === "portfolio"
        ? `/portfolio/delete/${targetPostId}`
        : `/blog/delete/${targetPostId}`;

    await api.delete(url, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    await fetchMyPage();
    setMode("none");
    setTargetPostId(null);
    setIsDeleteModalOpen(false);
  };

  if (loading) return null;
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
          <div className="absolute left-222 top-1 flex gap-3">
            {mode === "none" ? (
              <>
                <button onClick={handleEditClick}>수정</button>
                <button onClick={handleDeleteClick}>삭제</button>
              </>
            ) : (
              <button onClick={handleCancelMode}>취소</button>
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
              userId={post.userid}
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
              onClick={() => handleCardClick(post)}
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
