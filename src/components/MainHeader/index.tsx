import { useState } from 'react';
import { Line, Search } from '@/assets';

export default function Header({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const [active, setActive] = useState<'blog' | 'portfolio'>('blog');

  const handleClick = (tab: 'blog' | 'portfolio', path: string) => {
    setActive(tab);
    onNavigate(path);
  };

  return (
    <header className="flex items-center justify-between mt-6 my-7">
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleClick('blog', '/blog/list')}
          className={`
            transition-all duration-200 font-semibold
            ${
              active === 'blog'
                ? 'text-primary-main1 text-xl font-bold'
                : 'text-gray-300 text-lg font-semibold hover:text-primary-main3'
            }
          `}
        >
          블로그
        </button>
        <Line />
        <button
          onClick={() => handleClick('portfolio', '/portfolio/list')}
          className={`
            transition-all duration-200 font-semibold
            ${
              active === 'portfolio'
                ? 'text-primary-main1 text-xl font-bold'
                : 'text-gray-300 text-lg font-semibold hover:text-primary-main3'
            }
          `}
        >
          포트폴리오
        </button>
      </div>

      <div className="flex gap-6 text-gray-500 ml-65">
        <span>조회수순</span>
        <span>좋아요순</span>
        <span>댓글순</span>
        <button>
          <Search />
        </button>
      </div>
    </header>
  );
}
