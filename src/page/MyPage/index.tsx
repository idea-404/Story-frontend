import { useEffect, useState } from "react";
import api from "@/API/api";
import { ProfileHeader, MyPageHeader, MainCard, Introduce } from "@/components";

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

        <div className="absolute left-223 top-1 flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-purple-100 hover:text-primary-main1 ">
            수정
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100  rounded-lg hover:bg-purple-100 hover:text-primary-main1">
            삭제
          </button>
        </div>
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
