import { Line, Search } from "@/assets";

type MainHeaderProps = {
  onNavigate: (path: string) => void;
  activeTab: "blog" | "portfolio";
  onSelectTab: (tab: "blog" | "portfolio") => void;
  ViewChange: (sortType: "views" | "likes" | "comments") => void;
};

export default function MainHeader({
  onNavigate,
  activeTab,
  onSelectTab,
  ViewChange,
}: MainHeaderProps) {
  return (
    <header className="flex items-center justify-between w-[37.5rem] h-[2.875rem] mx-auto pt-4 pb-14">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            onSelectTab("blog");
            onNavigate("/blog");
          }}
          className={`
            transition-all duration-200 font-semibold
            ${
              activeTab === "blog"
                ? "text-primary-main1 text-2xl font-bold"
                : "text-gray-300 text-lg font-semibold hover:text-primary-main3"
            }
          `}
        >
          블로그
        </button>
        <Line />
        <button
          onClick={() => {
            onSelectTab("portfolio");
            onNavigate("/portfolio");
          }}
          className={`
            transition-all duration-200 font-semibold
            ${
              activeTab === "portfolio"
                ? "text-primary-main1 text-2xl font-bold"
                : "text-gray-300 text-lg font-semibold hover:text-primary-main3"
            }
          `}
        >
          포트폴리오
        </button>
      </div>

      <div className="flex gap-6 text-gray-400 font-bold">
        <button onClick={() => ViewChange("views")}>조회수순</button>
        <button onClick={() => ViewChange("likes")}>좋아요순</button>
        <button onClick={() => ViewChange("comments")}>댓글순</button>
        <button onClick={() => onNavigate("/search")}>
          <Search />
        </button>
      </div>
    </header>
  );
}
