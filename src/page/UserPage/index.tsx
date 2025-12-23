import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/API/api";
import { ProfileHeader, MyPageHeader, MainCard, Introduce } from "@/components";

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
};

type UserData = {
  nickname: string;
  studentId: string;
  introduce: string;
  profileImage: string;
  portfolio: Post[];
  blog: Post[];
};

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"blog" | "portfolio" | "intro">(
    "blog"
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUserProfile = async () => {
      try {
        const res = await api.get(`/api/v1/profile/${id}`);
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

    fetchUserProfile();
  }, [id]);

  if (loading) return <div>로딩중...</div>;
  if (!userData) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  const posts = activeTab === "portfolio" ? userData.portfolio : userData.blog;

  return (
    <div className="flex flex-col items-center">
      <ProfileHeader
        nickname={userData.nickname}
        studentId={userData.studentId}
        profileImage={userData.profileImage}
        showEditButton={false}
      />

      <MyPageHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNavigate={() => {}}
      />

      {activeTab === "intro" && <Introduce introduce={userData.introduce} />}

      {(activeTab === "portfolio" || activeTab === "blog") && (
        <div className="mt-10 flex flex-col gap-6">
          {posts.map((post) => (
            <MainCard
              key={post.id}
              postId={post.id}
              userId={id ? parseInt(id, 10) : 0}
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
