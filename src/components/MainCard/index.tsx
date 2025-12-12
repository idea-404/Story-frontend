import { Like, Comment } from "@/assets";

type MainCardProps = {
  userId: number;
  nickname: string;
  profileImage: string;
  title: string;
  content: string;
  like: number;
  view: number;
  comment: number;
  thumbnail: string | null;
  type: "portfolio" | "blog";
  time: string;
  onClick?: (id: number) => void;
};

/**ISO 시간*/
function formatTime(isoString: string) {
  const date = new Date(isoString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (isNaN(diff)) return "";

  if (diff < 60) return `${Math.floor(diff)}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}주 전`;

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function MainCard({
  userId,
  nickname,
  profileImage,
  title,
  content,
  like,
  view,
  comment,
  thumbnail,
  type,
  time,
  onClick,
}: MainCardProps) {
  return (
    <div
      className="w-[600px] h-[208px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-4 flex justify-between items-start"
      onClick={() => onClick && onClick(userId)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-black">
          <img src={profileImage} className="w-8 h-8 rounded-full" />
          <span className="font-semibold">{nickname}</span>
          <span className="text-gray-300 font-semibold text-xs">
            {formatTime(time)}
          </span>
        </div>

        <h2 className="mt-2 text-[23px] font-medium">{title}</h2>
        <p className="mt-4 text-sm text-black font-regular line-clamp-2">
          {content}
        </p>

        <div className="mt-7 flex gap-6 text-gray-300 text-xs items-center font-medium">
          <span>조회 {view}</span>

          <button className="flex items-center gap-1 focus:outline-none group cursor-pointer">
            <Like className="w-4 h-4 text-gray-300 transition group-hover:text-primary-main1" />
            <span className="text-gray-300 transition group-hover:text-primary-main1">
              {like}
            </span>
          </button>

          <button className="flex items-center gap-1 focus:outline-none group cursor-pointer">
            <Comment className="w-4 h-4 text-gray-300 transition group-hover:text-primary-main1" />
            <span className="text-gray-300 transition group-hover:text-primary-main1">
              {comment}
            </span>
          </button>
        </div>
      </div>

      {type === "blog" && thumbnail && (
        <img
          src={thumbnail}
          className="w-45 h-45 rounded-lg object-cover ml-4"
        />
      )}
    </div>
  );
}
