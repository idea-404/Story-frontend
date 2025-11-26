import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MainCard from "@/components/MainCard";
import MainHeader from "@/components/MainHeader";

/**
 * 게시글 타입
 * @typedef  {Object} Post
 * @property {number} id - 작성자 ID
 * @property {string} author - 작성자 이름
 * @property {string} authorImg - 작성자 이미지 URL
 * @property {string} title - 글 제목
 * @property {string} view - 글 미리보기 내용
 * @property {number} like - 좋아요 수
 * @property {number} list - 조회 수
 * @property {number} comment - 댓글 수
 * @property {string|null} thumbnail - 썸네일 이미지 URL
 * @property {string} time - 업로드된 시간
 */
type Post = {
  id: number;
  userId: number;
  nickname: string;
  profileImage: string;
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
  const [lastId, setLastId] = useState<number | null>(null);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tab, setTab] = useState<"blog" | "portfolio">("blog");
  const [sortType, setSortType] = useState<"views" | "likes" | "comments">(
    "views"
  );

  /**
   * 게시글 불러오기
   */
  const fetchPosts = useCallback(
    async (
      currentLastId: number | null = lastId,
      currentTab: "blog" | "portfolio" = tab
    ) => {
      if (currentLastId !== null && (loading || !hasMore)) return;

      setLoading(true);
      const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 300));

      try {
        const baseURL = currentTab === "blog" ? "/blog" : "/portfolio";
        const response = await axios.get(`${baseURL}/${sortType}`, {
          params: {
            lastId: currentLastId,
            size: limit,
          },
        });

        const newPosts: Post[] = response.data.data ?? [];

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
        await minLoadingTime;
      } finally {
        setLoading(false);
      }
    },
    [limit, sortType, tab, loading, hasMore, lastId]
  );

  /**
   * 탭/정렬 변경 시 초기화
   */
  useEffect(() => {
    setPosts([]);
    setHasMore(true);
    setLastId(null);
    setLoading(true);
    fetchPosts(null, tab);
  }, [tab, sortType, fetchPosts]);

  /**
   * 무한 스크롤
   */
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (nearBottom && !loading && hasMore) {
        fetchPosts(lastId, tab);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPosts, loading, hasMore, lastId, tab]);

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
        ViewChange={setSortType}
        activeSort={sortType}
      />

      <div className="flex flex-col gap-[2.75rem] w-full max-w-3xl">
        {posts.map((post) => (
          <MainCard
            key={post.id}
            userId={post.userId}
            nickname={post.nickname}
            profileImage={post.profileImage}
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
