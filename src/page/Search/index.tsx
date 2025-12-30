import { useState } from "react";
import MainCard from "@/components/MainCard";
import Search from "@/components/Search/index";
import api from "@/API/api";

type SearchItem = {
  id: number;
  userId: number;
  nickname: string;
  title: string;
  content: string;
  like: number;
  view: number;
  comment: number;
  createdAt?: string;
  thumbnail: string | null;
  profileImage?: string | null;

  __type: "portfolio" | "blog";
};

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<SearchItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await api.get("/main/search", {
        params: {
          keyword,
          size: 10,
        },
      });

      const payload = res.data?.data ?? res.data ?? {};

      const portfolio = Array.isArray(payload.portfolio)
        ? payload.portfolio
        : [];
      const blog = Array.isArray(payload.blog) ? payload.blog : [];

      const merged: SearchItem[] = [
        ...portfolio.map((x: any) => ({ ...x, __type: "portfolio" as const })),
        ...blog.map((x: any) => ({ ...x, __type: "blog" as const })),
      ];

      setResult(merged);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setResult([]);
      setHasSearched(true);
    }
  };

  return (
    <div className="w-full flex justify-center pt-16">
      <div className="w-full max-w-3xl px-4">
        <Search
          value={keyword}
          onChange={(v) => setKeyword(v)}
          onSearch={handleSearch}
        />

        <div className="w-full flex flex-col gap-6 mt-4">
          {hasSearched && result.length === 0 && (
            <p className="text-sm text-center text-gray-500">
              더 이상 표시할 글이 없습니다.
            </p>
          )}

          {result.map((item) => (
            <MainCard
              key={`${item.__type}-${item.id}`}
              postId={item.id}
              type={item.__type}
              userId={item.userId}
              nickname={item.nickname}
              profileImage={item.profileImage ?? ""}
              title={item.title}
              content={item.content}
              like={item.like}
              view={item.view}
              comment={item.comment}
              thumbnail={item.thumbnail}
              time={item.createdAt ?? ""}
              onClick={(id) => console.log(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
