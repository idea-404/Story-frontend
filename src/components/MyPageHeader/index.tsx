import { Line } from "@/assets";
import React from "react";

type TabId = "blog" | "portfolio" | "intro";

type MainHeaderProps = {
  onNavigate: (path: string) => void;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const tabs = [
  { id: "blog" as const, label: "블로그", path: "/blog" },
  { id: "portfolio" as const, label: "포트폴리오", path: "/portfolio" },
  { id: "intro" as const, label: "소개글", path: "/intro" },
];

export default function MainHeader({
  onNavigate,
  activeTab,
  onSelectTab,
}: MainHeaderProps) {
  return (
    <header className="mx-auto flex h-[2.875rem] w-[37.5rem] items-center justify-between pt-4 pb-14">
      <div className="flex items-center gap-3">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            {index > 0 && <Line />}
            <button
              onClick={() => {
                onSelectTab(tab.id);
                onNavigate(tab.path);
              }}
              className={`
                transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "text-primary-main1 text-2xl font-bold"
                    : "text-gray-300 text-lg font-semibold hover:text-primary-main3"
                }
              `}
            >
              {tab.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    </header>
  );
}
