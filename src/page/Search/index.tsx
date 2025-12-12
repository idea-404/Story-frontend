import { useState } from "react";
import axios from "axios";
import MainCard from "@/components/MainCard";
import Search from "@/components/Search/index";

axios.defaults.baseURL = "/api/v1/main";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [lastId, setLastId] = useState(0);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/search`, {
        params: {
          keyword,
          lastId,
          size: 10,
        },
      });

      const data = res.data.data || [];
      setResult(data);

      if (data.length > 0) {
        const nextLastId = data[data.length - 1].id;
        setLastId(nextLastId);
        console.log("다음 요청에서 사용할 lastId:", nextLastId);
      }
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
          <p className="text-sm text-center text-gray-500">
            더 이상 표시할 글이 없습니다.
          </p>
        )}

        {result.map((item: any) => {
          const isPortfolio = item.portfolio_id !== null;

          return (
            <MainCard
              key={item.id}
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
