const Header = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex gap-4 text-lg font-semibold">
        <button className="text-purple-300" onClick={() => onNavigate('blog')}>
          블로그
        </button>
        <button
          className="text-gray-400"
          onClick={() => onNavigate('portfolio')}
        >
          포트폴리오
        </button>
      </div>
      <div className="flex gap-6 text-gray-500">
        <span>조회수순</span>
        <span>좋아요순</span>
        <span>댓글순</span>
        <button>🔍</button>
      </div>
    </header>
  );
};

export default Header;
