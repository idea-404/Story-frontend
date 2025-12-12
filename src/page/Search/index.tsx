import { useState } from "react";
import axios from "axios";
import MainCard from "@/components/MainCard";
import Search from "@/components/Search/index";

axios.defaults.baseURL = "/api/v1/main";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/search`, {
        params: { keyword, lastId, size: 10 },
      });

      setResult(res.data.data || []);
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
        {result.length === 0 && (
          <p className="text-sm text-gray-500">더 이상 표시할 글이 없습니다.</p>
        )}

        {result.map((item: any) => {
          const isPortfolio = item.portfolio_id !== null;
          const isBlog = item.blog_id !== null;

          return (
            <MainCard
              key={item.id}
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
