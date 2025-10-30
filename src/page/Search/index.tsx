import { useState, useCallback } from "react";
import axios from "axios";
import Search from "@/components/Search";

type SearchResult = {
  title?: string;
  name?: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get<SearchResult[]>(
        "http://localhost:8080/api/search",
        {
          params: { query },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="p-4">
      <Search value={query} onChange={setQuery} onSearch={handleSearch} />
      {loading && <p>검색 중</p>}
      <ul>
        {results.map((item, index) => (
          <li key={index} className="border-b py-2">
            {item.title || item.name || JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
