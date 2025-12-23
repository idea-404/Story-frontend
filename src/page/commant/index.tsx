import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import Printheader from "./Printheader";
import { Arrow } from "@/assets";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Commantintput from "./comment";
import Commantcomponents from "./commantcomponents";
import { WriteCheck } from "@/API";

interface BlogData {
  blog_id: number;
  nickname: string;
  title: string;
  introduce: string;
  content: string;
  like: number;
  view: number;
  createdAt: string;
  comment: number;
  studentNumber: string;
}

const Commant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const pageType = location.pathname.includes("/blog") ? "blog" : "portfolio";

  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await WriteCheck(Number(id), pageType);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [id, pageType]);

  if (loading) return <div>로딩 중...</div>;
  if (!data) return <div>데이터를 불러올 수 없습니다.</div>;

  const title = data.title;
  const body = data.content;

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => navigate(-1)} className="w-[37.5rem] mt-[1.88rem]">
        <Arrow />
      </button>
      <Printheader
        nickname={data.nickname}
        date={data.createdAt}
        studentNumber={data.studentNumber}
      />
      <div>
        <h1 className="flex justify-between text-[#3C3C3E] text-[1.875rem] font-medium leading-normal pb-[0.87rem]">
          <div>{title}</div>
          <div className="text-[1rem] text-[#828387]">조회 {data.view}</div>
        </h1>
        <hr className="h-[0.125rem] bg-[#CBCCCE] w-[35.75rem]" />
      </div>
      <div className="flex flex-col gap-[2.75rem]">
        <div className="w-[35.75rem] mt-[1rem] prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {body}
          </ReactMarkdown>
        </div>
      </div>
      <hr className="mt-[4.63rem] mb-[1.25rem] h-[0.125rem] bg-[#CBCCCE] w-[35.75rem]" />
      <Commantintput />
      <Commantcomponents type={pageType} id={Number(id)} />
    </div>
  );
};
export default Commant;
