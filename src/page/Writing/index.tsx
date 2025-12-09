import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const Writing = () => {
  const [text, setText] = useState("");
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "pretendard, sans-serif",
      }}
      className="prose"
    >
      {/* 미리보기 영역 (왼쪽) */}
      <div
        style={{
          width: "50%",
          padding: "20px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
        className="prose"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {text}
        </ReactMarkdown>
      </div>

      <textarea
        style={{
          width: "50%",
          padding: "20px",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Velog처럼 Markdown을 입력해보세요..."
      />
    </div>
  );
};

export default Writing;
