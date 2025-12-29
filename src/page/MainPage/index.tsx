import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "@/API/api";
import MainCard from "@/components/MainCard";
import MainHeader from "@/components/MainHeader";
import useTokenStore from "@/Store/token";

axios.defaults.baseURL = "/api/v1/main";

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

type SortType = "view" | "like" | "comment";

const MainPage = () => {
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"blog" | "portfolio">("blog");
  const [sortType, setSortType] = useState<SortType>("view");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return;

    api.post(`/auth/verify?token=${token}`).then((res) => {
      useTokenStore.getState().setAuthWithToken(res.data.token);
      if (res.data.role === "UNVERIFIED") navigate("/info");
    });
  }, [navigate]);

  const fetchPosts = useCallback(
    async (cursor: number | null = null) => {
      if (loading || !hasMore) return;

      setLoading(true);

      try {
        const res = await api.get(`/main/${tab}/${sortType}`, {
          params: {
            lastId: cursor,
            size: 10,
          },
        });

        const list = res.data.data ?? [];

        const newPosts: Post[] = list.map((item: any) => ({
          id: item.id,
          userId: item.userId,
          nickname: item.nickname,
          profileImage: item.profileImage,
          title: item.title,
          content: item.content,
          like: item.like,
          view: item.view,
          comment: item.comment,
          thumbnail: item.thumbnail,
          time: item.createdAt,
        }));

        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) =>
            cursor === null ? newPosts : [...prev, ...newPosts]
          );
          setLastId(newPosts[newPosts.length - 1].id);
        }
      } catch (e) {
        console.error("게시글 불러오기 실패", e);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [tab, sortType, loading, hasMore]
  );

  useEffect(() => {
    setPosts([]);
    setLastId(null);
    setHasMore(true);
    fetchPosts(null);
  }, [tab, sortType, fetchPosts]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchPosts(lastId);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchPosts, lastId, hasMore, loading]);

  const handleCardClick = (id: number) => {
    navigate(`/${tab}/${id}`);
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center">
      <MainHeader
        activeTab={tab}
        onSelectTab={setTab}
        ViewChange={setSortType}
        activeSort={sortType}
        onNavigate={() => {}}
      />

      <div className="flex flex-col gap-10 w-full max-w-3xl">
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

      {loading && <p>로딩 중...</p>}
      {!loading && !hasMore && <p>더 이상 글이 없습니다.</p>}
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default MainPage;
