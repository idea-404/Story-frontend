import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { write } from "@/API";
const Printbody = ({
  title,
  body,
  setEnd,
}: {
  title: string;
  body: string;
  setEnd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const buttonStyle =
    "py-[0.47rem] px-[2.03rem] bg-[#EFF0F2] rounded-[0.9375rem] text-primary-main1 font-bold";
  const writeType = location.pathname.includes("/blog/write")
    ? "blog"
    : location.pathname.includes("/portfolio/write")
    ? "portfolio"
    : "unknown";
  return (
    <div className="flex flex-col gap-[2.75rem]">
      <div className="w-[35.75rem] h-[59.26vh] mt-[1rem] overflow-y-scroll overflow-x-hidden prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {body}
        </ReactMarkdown>
      </div>
      <div className="flex justify-end gap-[2.25rem]">
        {writeType === "portfolio" && (
          <button
            onClick={() => write(title, body, body.slice(0, 64))}
            className={buttonStyle}
          >
            임시저장
          </button>
        )}
        <button onClick={() => setEnd(true)} className={buttonStyle}>
          작성완료
        </button>
      </div>
    </div>
  );
};

export default Printbody;
