import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MainCard from "@/components/MainCard";
import MainHeader from "@/components/MainHeader";

/**
 * 게시글 정보를 나타내는 타입
 * @typedef  {Object} Post
 * @property {number} id - 작성자 ID
 * @property {string} author - 작성자 이름
 * @property {string} authorImg - 작성자 이미지 URL
 * @property {string} title - 글 제목
 * @property {string} view - 글 미리보기 내용
 * @property {number} like - 좋아요 수
 * @property {number} list - 조회 수
 * @property {number} comment - 댓글 수
 * @property {string} thumbnail - 썸네일 이미지 URL
 * @property {string} time - 업로드된 시간
 */

type Post = {
  id: number;
  author: string;
  authorImg: string;
  title: string;
  view: string;
  like: number;
  list: number;
  comment: number;
  thumbnail: string | null;
  time: string;
};

const MainPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [tab, setTab] = useState<"blog" | "portfolio">("blog");

  const fetchPosts = useCallback(
    async (pageToFetch: number = page) => {
      if (loading || !hasMore) return;
      setLoading(true);

      try {
        const response = await axios.get("/api/posts", {
          params: { page: pageToFetch, limit, type: tab },
        });

        const newPosts: Post[] = response.data.data ?? [];

        if (!newPosts || newPosts.length === 0) {
          if (pageToFetch === 1) setPosts([]);
          setHasMore(false);
        } else {
          if (pageToFetch === 1) {
            setPosts(newPosts);
          } else {
            setPosts((prev) => [...prev, ...newPosts]);
          }
          setPage(pageToFetch + 1);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    },
    [limit, loading, hasMore, page, tab]
  );

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPosts(1);
  }, [tab, fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        fetchPosts(page);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPosts, loading, hasMore, page]);

  const handleCardClick = (id: number) => {
    console.log(`Card with id ${id} clicked`);
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
      />

      <div className="flex flex-col gap-[2.75rem] w-full max-w-3xl">
        {posts.map((post) => (
          <MainCard
            key={post.id}
            id={post.id}
            author={post.author}
            authorImg={post.authorImg}
            title={post.title}
            view={post.view}
            like={post.like}
            list={post.list}
            comment={post.comment}
            thumbnail={post.thumbnail}
            time={post.time}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {loading && <p>로딩 중..</p>}
      {!hasMore && <p>마지막입니다.</p>}
    </div>
  );
};

export default MainPage;
