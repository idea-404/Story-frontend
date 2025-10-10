import { Like, Comment } from '@/assets';

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
  return (
    <div
      className="w-[600px] h-[208px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-4 flex justify-between items-start"
      onClick={() => onClick && onClick(id)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-black">
          <img src={authorImg} alt={author} className="w-8 h-8 rounded-full" />
          <span className="font-semibold">{author}</span>
          <span className="text-gray-300 font-semibold text-xs">{time}</span>
        </div>

        <h2 className="mt-2 text-[23px] font-medium">{title}</h2>
        <p className="mt-4 text-sm text-black font-regular line-clamp-2">
          {preview}
        </p>

        <div className="mt-7 flex gap-6 text-gray-300 text-xs items-center font-medium">
          <span>조회 {list}</span>

          <button className="flex items-center gap-1 focus:outline-none group cursor-pointer">
            <Like className="w-4 h-4 text-gray-300 transition group-hover:text-primary-main1" />
            <span className="text-gray-300 transition group-hover:text-primary-main1">
              {likes}
            </span>
          </button>

          <span className="flex items-center gap-1 group cursor-pointer">
            <Comment className="w-4 h-4 text-gray-300 transition group-hover:text-primary-main1" />
            <span className="text-gray-300 transition group-hover:text-primary-main1">
              {comment}
            </span>
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
