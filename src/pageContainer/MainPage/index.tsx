import MainCard from '@/components/MainCard';
import MainHeader from '@/components/MainHeader';

const MainPage = () => {
  // MainCard에 전달할 데이터들 예시로 넣음
  const samplePost = {
    id: 1,
    author: '서연',
    authorImg:
      'https://i.pinimg.com/736x/9f/a6/10/9fa6106823290d1eb82e3af50aff2798.jpg',
    title: '프론트엔드란 무엇일까?',
    preview:
      '안녕안녕나는서연이야프론트엔드를하고있지정말재밌는것같아매우만족하고있지만가끔힘들때도있지그래도재밌으니까열심히하고있어왜냐고?난취업을해야하니깐ㅎㅎㅎ내가진짜어떻게든취업을해볼게기다려라',
    likes: 32,
    list: 150,
    comment: 5,
    thumbnail:
      'https://i.pinimg.com/736x/9f/a6/10/9fa6106823290d1eb82e3af50aff2798.jpg',
    time: '5분 전',
  };

  const handleCardClick = (id: number) => {
    console.log(`Card with id ${id} was clicked!`);
  };

  return (
    <div className="p-4 bg-white min-h-screen flex flex-col items-center">
      <MainHeader onNavigate={(page) => console.log(`Navigate to ${page}`)} />

      <MainCard
        id={samplePost.id}
        author={samplePost.author}
        authorImg={samplePost.authorImg}
        title={samplePost.title}
        preview={samplePost.preview}
        likes={samplePost.likes}
        list={samplePost.list}
        comment={samplePost.comment}
        thumbnail={samplePost.thumbnail}
        time={samplePost.time}
        onClick={handleCardClick}
      />
    </div>
  );
};

export default MainPage;
