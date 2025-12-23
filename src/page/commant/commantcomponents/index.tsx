import { Person } from "@/assets";

interface Comment {
  comment_id: number;
  user_id: number;
  content: string;
  createAt: string;
}

interface CommantcomponentsProps {
  comments: Comment[];
}

const Commantcomponents = ({ comments }: CommantcomponentsProps) => {
  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <div key={comment.comment_id} className="mb-[2rem]">
          <div className="flex justify-between w-[32rem] mt-[3.75rem] mb-[1.25rem]">
            <div className="flex items-center gap-[0.96rem]">
              <Person h={40} />
              <div className="text-black text-[1.25rem]">{comment.user_id}</div>
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
