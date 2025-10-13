import { useEffect, useState } from 'react';
import axios from 'axios';
import MainCard from '@/components/MainCard';
import MainHeader from '@/components/MainHeader';

/**
 * 게시글 정보를 나타내는 타입
 * @typedef {Object} Post
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
  thumbnail: string;
  time: string;
};

/**
 * 메인 페이지 컴포넌트
 * - 서버에서 게시글 데이터 호출
 * - 무한 스크롤로 추가 데이터를 로드
 * @component
 * @returns {JSX.Element} 메인 페이지 UI
 */
const MainPage = () => {
  /** @type {[Post[], Function]} 게시글 목록 상태 */
  const [posts, setPosts] = useState<Post[]>([]);

  /** @type {[number, Function]} 현재 페이지 번호 */
  const [page, setPage] = useState(1);

  /** @type {[number, Function]} 한 페이지당 요청할 게시글 수 */
  const [limit] = useState(10);

  /** @type {[boolean, Function]} 로딩 중 상태 */
  const [loading, setLoading] = useState(false);

  /** @type {[boolean, Function]} 더 불러올 데이터가 있는지 확인 */
  const [hasMore, setHasMore] = useState(true);

  /**
   * 서버에서 게시글 데이터를 받아오는 함수
   * - 이미 로딩 중이거나 더 이상 불러올 데이터가 없으면 실행 안됨
   * - 새 데이터를 받아오면 기존 posts에 이음
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get('/api/posts', {
        params: { page, limit },
      });
      const newPosts = response.data.data;

      if (!newPosts || newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }

    setLoading(false);
  };

  /**
   * 컴포넌트가 처음 렌더링할때 게시글을 불러옴
   */
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * 스크롤이 맨 끝으로 가면 자동으로 다음 데이터를 부름
   */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        fetchPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  /**
   * 카드 클릭할때 실행되는 핸들러
   * @param {number} id - 클릭한 카드의 ID
   */
  const handleCardClick = (id: number) => {
    console.log(`Card with id ${id} clicked`);
  };

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col items-center">
      <MainHeader onNavigate={(page) => console.log(`Navigate to ${page}`)} />
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
