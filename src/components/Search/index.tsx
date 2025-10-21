import { SearchPurple } from "@/assets";

const Search = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center w-full max-w-sm px-3 py-2 bg-white border border-gray-700 rounded-full  focus-within:border-purple-400">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full outline-none text-gray-500 placeholder-gray-400"
        />
        <SearchPurple />
      </div>
    </div>
  );
};

export default Search;
