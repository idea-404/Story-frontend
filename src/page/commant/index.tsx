import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import Printheader from "./Printheader";
import { Arrow } from "@/assets";
import { useNavigate } from "react-router-dom";
const Commant = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("asdfasdf");
  const [body, setBody] = useState("# asdfasdf");

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => navigate(-1)} className="w-[37.5rem] mt-[1.88rem]">
        <Arrow />
      </button>
      <Printheader />
      <div>
        <h1 className="text-[#3C3C3E] text-[1.875rem] font-medium leading-normal pb-[0.87rem]">
          {title}
        </h1>
        <hr className="h-[0.125rem] bg-[#CBCCCE] w-[35.75rem]" />
      </div>
      <div className="flex flex-col gap-[2.75rem]">
        <div className="w-[35.75rem] h-[59.26vh] mt-[1rem] overflow-y-scroll overflow-x-hidden prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
export default Commant;
