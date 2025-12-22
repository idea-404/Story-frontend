import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useAiResponseStore } from "@/Store/AiResponse";

const Ok = () => {
  const { response } = useAiResponseStore();

  return (
    <div className="mt-[1.25rem] ml-[7.5rem] w-[35rem] h-[75.93vh] rounded-[1.25rem] shadow-[-0.5px_-0.5px_20px_0.1px_#EFF0F2,0.5px_0.5px_20px_0.1px_#EFF0F2] flex flex-col items-center justify-center">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};
export default Ok;
