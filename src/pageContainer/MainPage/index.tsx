import { useEffect, useState } from 'react';
import axios from 'axios';
import MainCard from '@/components/MainCard';
import MainHeader from '@/components/MainHeader';

type Post = {
  //일단 Post로 타입 정의함 나중에 바꿀수도
  id: number; //작성자 id
  author: string; //작성자 이름
  authorImg: string; //작성자 이미지
  title: string; //글 제목
  preview: string; //글 미리보기
  likes: number; //좋아요 수
  list: number; //조회 수
  comment: number; //댓글 수
  thumbnail: string; //썸네일 이미지
  time: string; //올라온 시간
};

const MainPage = () => {
  const [posts, setPosts] = useState<Post[]>([]); //게시글 배열 상태인데 처음은 빈 배열임
  const [page, setPage] = useState(1); //초기 페이지 1
  const [limit] = useState(10); // 한 페이지당 10개까지 요청
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 확인

  const fetchPosts = async () => {
    //비동기 함수!!
    if (loading || !hasMore) return; // 더 불러올 데이터가 없거나 로딩중이면 여기서 종료
    setLoading(true); //자 이제? 요청 시작, 로딩은 true로

    try {
      const response = await axios.get('/api/posts', {
        //api에 요청 나중에 바꿀 예정임..
        params: { page, limit }, // 쿼리스트링으로 page와 limit 전달
      });
      const newPosts = response.data.data;

      if (!newPosts || newPosts.length === 0) {
        //새로 받은 newPosts(빋을 블로그)가 더이상 없다면 hasMore를 false로
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]); //기존에 있는 posts에 새로 받은 newPosts를 추가
        setPage((prev) => prev + 1); //다음 페이지를 위해 page 증가
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    //컴포넌트가 처음 렌더링 될 때 한번만 실행
    fetchPosts(); //처음에 최신 데이터 한번 불러오기
  }, []);

  // 자 여기부터 무한 스크롤 이벤트 정의
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= // 현재 보이는 화면 아래 위치
          document.body.offsetHeight - 300 && // 문서 전체 높이 - 300px (조금 일찍 불러오기 위해)
        !loading && // 로딩중이 아니고
        hasMore // 더 불러올 데이터가 있을 때만!!
      ) {
        fetchPosts(); //스크롤이 바닥에 가까워지면 요청해서 더 불러오기
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleCardClick = (id: number) => {
    console.log(`Card with id ${id} clicked`);
  };

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col items-center">
      <MainHeader onNavigate={(page) => console.log(`Navigate to ${page}`)} />

      {posts.map((post) => (
        <MainCard
          key={post.id}
          id={post.id}
          author={post.author}
          authorImg={post.authorImg}
          title={post.title}
          preview={post.preview}
          likes={post.likes}
          list={post.list}
          comment={post.comment}
          thumbnail={post.thumbnail}
          time={post.time}
          onClick={handleCardClick}
        />
      ))}

      {loading && <p>로딩 중..</p>}
      {!hasMore && <p>마지막에 도달하셨습니다!</p>}
    </div>
  );
};

export default MainPage;
