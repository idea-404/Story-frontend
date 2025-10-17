import { SearchPurple } from "@/assets";

const Search = () => {
  return (
    <div className="flex items-center w-full max-w-sm px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus-within:border-purple-400">
      <SearchPurple />
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default Search;
