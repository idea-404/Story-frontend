import { Line } from "@/assets";

type MainHeaderProps = {
  onNavigate: (path: string) => void;
  activeTab: "blog" | "portfolio" | "intro";
  onSelectTab: (tab: "blog" | "portfolio" | "intro") => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function MainHeader({
  onNavigate,
  activeTab,
  onSelectTab,
  onEdit,
  onDelete,
}: MainHeaderProps) {
  return (
    <header className="mx-auto flex h-[2.875rem] w-[37.5rem] items-center justify-between pt-4 pb-14">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            onSelectTab("blog");
            onNavigate("/blog");
          }}
          className={`
            transition-all duration-200
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
            transition-all duration-200
            ${
              activeTab === "portfolio"
                ? "text-primary-main1 text-2xl font-bold"
                : "text-gray-300 text-lg font-semibold hover:text-primary-main3"
            }
          `}
        >
          포트폴리오
        </button>

        <Line />

        <button
          onClick={() => {
            onSelectTab("intro");
            onNavigate("/intro");
          }}
          className={`
            transition-all duration-200
            ${
              activeTab === "intro"
                ? "text-primary-main1 text-2xl font-bold"
                : "text-gray-300 text-lg font-semibold hover:text-primary-main3"
            }
          `}
        >
          소개글
        </button>
      </div>
    </header>
  );
}
