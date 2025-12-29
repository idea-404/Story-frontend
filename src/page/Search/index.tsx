import { useState } from "react";
import MainCard from "@/components/MainCard";
import Search from "@/components/Search/index";
import api from "@/API/api";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await api.get("/main/search", {
        params: {
          keyword,
          size: 10,
        },
      });

      const data = res.data.data || [];
      setResult(data);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Search
        value={keyword}
        onChange={(v) => setKeyword(v)}
        onSearch={handleSearch}
      />

      <div className="flex flex-col gap-4 mt-6">
        {hasSearched && result.length === 0 && (
          <p className="text-sm text-center text-gray-500">
            더 이상 표시할 글이 없습니다.
          </p>
        )}

        {result.map((item: any) => {
          const isPortfolio = item.portfolio_id !== null;

          return (
            <MainCard
              key={item.id}
              postId={item.id}
              type={isPortfolio ? "portfolio" : "blog"}
              userId={item.userId}
              nickname={item.nickname}
              profileImage={item.profileImage}
              title={item.title}
              content={item.content}
              like={item.like}
              view={item.view}
              comment={item.comment}
              thumbnail={item.thumbnail}
              time={item.time}
              onClick={(id) => console.log(id)}
            />
          );
        })}
      </div>
    </div>
  );
}
