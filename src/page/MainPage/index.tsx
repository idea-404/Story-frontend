import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "@/API/api";
import MainCard from "@/components/MainCard";
import MainHeader from "@/components/MainHeader";

axios.defaults.baseURL = "/api/v1/main";

/**
 * 게시글 타입
 * @typedef {Object} Post
 * @property {number} id - 게시글 ID
 * @property {number} userId - 작성자(유저) ID
 * @property {string} nickname - 작성자 닉네임
 * @property {string} profileImage - 작성자 프사 URL
 * @property {string} title - 글 제목
 * @property {string} content - 글 미리보기
 * @property {number} like - 좋아요 수
 * @property {number} view - 조회 수
 * @property {number} comment - 댓글 수
 * @property {string|null} thumbnail - 썸네일 이미지 URL (없으면 null)
 * @property {string} time - 업로드 시간
 */

type Post = {
  id: number;
  userId: number;
  nickname: string;
  profileImage: string;
  title: string;
  content: string;
  like: number;
  view: number;
  comment: number;
  thumbnail: string | null;
  time: string;
};

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          const res = await api.post("/auth/verify", { token });
          console.log("토큰 검증 성공:", res.data);

          if (res.data.role === "UNVERIFIED") {
            navigate("/info");
          }
        } catch (verifyError) {
          console.error("토큰 검증 오류:", verifyError);
        }
      }
    };

    verifyToken();
  }, [navigate]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tab, setTab] = useState<"blog" | "portfolio">("blog");
  const [sortType, setSortType] = useState<"view" | "like" | "comment">("view");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(
    async (
      currentLastId: number | null = lastId,
      currentTab: "blog" | "portfolio" = tab
    ) => {
      if (currentLastId !== null && (loading || !hasMore)) return;

      setLoading(true);

      try {
        const baseURL = currentTab === "blog" ? "/blog" : "/portfolio";
        const response = await axios.get(`${baseURL}/${sortType}`, {
          params: {
            lastId: currentLastId,
            size: limit,
          },
        });

        const newPosts: Post[] = (response.data.data ?? []).map(
          (
            item: Omit<Post, "id"> & { blog_id?: number; portfolio_id?: number }
          ) => ({
            id: (item.blog_id ?? item.portfolio_id)!,
            userId: item.userId,
            nickname: item.nickname,
            profileImage: item.profileImage,
            title: item.title,
            content: item.content,
            like: item.like,
            view: item.view,
            comment: item.comment,
            thumbnail: item.thumbnail,
            time: item.time,
          })
        );

        if (newPosts.length === 0) {
          if (currentLastId === null) setPosts([]);
          setHasMore(false);
        } else {
          setPosts((prev) =>
            currentLastId === null ? newPosts : [...prev, ...newPosts]
          );
          setLastId(newPosts[newPosts.length - 1].id);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [limit, sortType, tab, loading, hasMore, lastId]
  );

  useEffect(() => {
    setPosts([]);
    setHasMore(true);
    setLastId(null);
    setLoading(true);
    fetchPosts(null, tab);
  }, [tab, sortType]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchPosts(lastId, tab);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchPosts, loading, hasMore, lastId, tab]);

  const handleCardClick = (id: number) => {
    if (tab === "blog") {
      navigate(`/blog/${id}`);
    } else {
      navigate(`/portfolio/${id}`);
    }
  };

  const handleTabChange = (newTab: "blog" | "portfolio") => {
    if (newTab === tab) return;
    setTab(newTab);
  };

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col items-center">
      <MainHeader
        onNavigate={(page) => console.log(`Navigate to ${page}`)}
        activeTab={tab}
        onSelectTab={handleTabChange}
        ViewChange={setSortType}
        activeSort={sortType}
      />

      <div className="flex flex-col gap-[2.75rem] w-full max-w-3xl">
        {posts.map((post) => (
          <MainCard
            key={post.id}
            postId={post.id}
            userId={post.userId}
            nickname={post.nickname}
            profileImage={post.profileImage}
            title={post.title}
            content={post.content}
            like={post.like}
            view={post.view}
            comment={post.comment}
            thumbnail={post.thumbnail}
            time={post.time}
            type={tab}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {loading && <p className="text-gray-500">로딩 중..</p>}
      {!loading && !hasMore && (
        <p className="text-gray-500">더 이상 표시할 글이 없습니다.</p>
      )}

      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default MainPage;
