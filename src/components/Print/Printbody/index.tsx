import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
const Printbody = ({ body }: { body: string }) => {
  const buttonStyle =
    "py-[0.47rem] px-[2.03rem] bg-[#EFF0F2] rounded-[0.9375rem] text-primary-main1 font-bold";
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
        <button className={buttonStyle}>임시저장</button>
        <button className={buttonStyle}>작성완료</button>
      </div>
    </div>
  );
};

export default Printbody;
