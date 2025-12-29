import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/API/api";
import MainCard from "@/components/MainCard";
import MainHeader from "@/components/MainHeader";
import useTokenStore from "@/Store/token";

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

  const [posts, setPosts] = useState<Post[]>([]);
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

  const fetchPosts = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get(`/main/${tab}/${sortType}`, {
        params: { size: 10 },
      });

      const list =
        tab === "blog" ? res.data.blog ?? [] : res.data.portfolio ?? [];

      const newPosts: Post[] = list.map((item: any) => ({
        id: tab === "blog" ? item.blog_id : item.portfolio_id,
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
      }));

      setPosts(newPosts);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [tab, sortType]);

  useEffect(() => {
    fetchPosts();
  }, [tab, sortType, fetchPosts]);

  const handleCardClick = (type: "blog" | "portfolio", id: number) => {
    navigate(`/${type}/${id}`);
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

      <div className="flex flex-col items-center gap-10 w-full max-w-3xl">
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
            onClick={(id) => handleCardClick(tab, id)}
          />
        ))}
      </div>

      {loading && <p>로딩 중...</p>}
      {!loading && posts.length === 0 && <p>게시글이 없습니다.</p>}
    </div>
  );
};

export default MainPage;
