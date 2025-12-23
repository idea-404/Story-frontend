import { Person } from "@/assets";
import { useState, useEffect } from "react";
import { GetComments } from "@/API/Comment";

interface Comment {
  comment_id: number;
  nickname: string;
  content: string;
  createAt: string;
}

const Commantcomponents = ({ id, type }: { id: number; type: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const result = await GetComments(id, type);
      if (result) {
        setComments(result.comment);
      }
      setLoading(false);
    };
    fetchComments();
  }, [id, type]);

  if (loading) return <div>댓글 로딩 중...</div>;

  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <div key={comment.comment_id} className="mb-[2rem]">
          <div className="flex justify-between w-[32rem] mt-[3.75rem] mb-[1.25rem]">
            <div className="flex items-center gap-[0.96rem]">
              <Person h={40} />
              <div className="text-black text-[1.25rem]">
                {comment.nickname}
              </div>
            </div>
            <div className="flex items-center text-[#828387]">
              {comment.createAt}
            </div>
          </div>
          <div className="w-[32rem] px-[1rem]">{comment.content}</div>
        </div>
      ))}
    </div>
  );
};
export default Commantcomponents;
