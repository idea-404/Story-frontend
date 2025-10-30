import { SearchPurple } from "@/assets";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => Promise<void>;
}

const Search = ({ value, onChange, onSearch }: SearchProps) => {
  return (
    <div className="flex justify-center items-center h-screen -mt-82">
      <div className="flex items-center max-w-sm px-3 py-2 w-[460px] h-[46px] bg-white border-[0.5px] border-gray-700 rounded-2xl focus-within:border-purple-400">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색어를 입력하세요."
          className="w-full outline-none text-gray-500 placeholder-gray-400"
        />
        <button className="relative right-2" onClick={onSearch}>
          <SearchPurple />
        </button>
      </div>
    </div>
  );
};

export default Search;
