import { useEffect, useState } from "react";
import axios from "axios";

interface SearchItem {
  id: number;
  title: string;
  content: string;
}

const Search = () => {
  const [posts, setPosts] = useState<SearchItem[]>([]);

  useEffect(() => {
    axios
      .get<SearchItem[]>("/api/search")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {posts.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Search;
