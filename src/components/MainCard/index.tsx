import { useState } from 'react';
import { Like } from '../../assets';
import { Comment } from '../../assets';

type MainCardProps = {
  id: number;
  author: string;
  authorImg: string;
  title: string;
  preview: string;
  likes: number;
  list: number;
  comment: number;
  thumbnail: string;
  time: string;
  onClick?: (id: number) => void;
};

export default function MainCard({
  id,
  author,
  authorImg,
  title,
  preview,
  likes,
  list,
  comment,
  thumbnail,
  time,
  onClick,
}: MainCardProps) {
  // 좋아요 버튼 UseState
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div
      className="w-full max-w-2xl bg-white rounded-xl shadow p-4 flex justify-between items-start"
      onClick={() => onClick && onClick(id)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-black">
          <img src={authorImg} alt={author} className="w-8 h-8 rounded-full" />
          <span className="font-medium">{author}</span>
          <span className="text-black text-xs">{time}</span>
        </div>

        <h2 className="mt-2 text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-black line-clamp-2">{preview}</p>

        <div className="mt-3 flex gap-4 text-black text-sm items-center">
          <span>조회 {list}</span>

          <button
            onClick={handleLike}
            className="flex items-center gap-1 focus:outline-none"
          >
            <Like
              className={`w-5 h-5 transition ${
                liked ? 'text-purple-400' : 'text-gray-400'
              }`}
            />

            <span className={liked ? 'text-purple-400' : 'text-gray-400'}>
              {likeCount}
            </span>
          </button>

          <span>
            <Comment />
            {comment}
          </span>
        </div>
      </div>

      {thumbnail && (
        <img
          src={thumbnail}
          className="w-45 h-45 rounded-lg object-cover ml-4"
        />
      )}
    </div>
  );
}
