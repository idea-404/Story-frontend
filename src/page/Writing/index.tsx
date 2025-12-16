import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Print } from "@/components";

const Writing = () => {
  const [text, setText] = useState<string>("");

  // textarea DOM 접근
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 커서 위치에 Markdown 문법 삽입
  const ad = (value: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      text.slice(0, start) +
      value +
      text.slice(start, end) +
      value +
      text.slice(end);

    setText(newText);

    setTimeout(() => {
      if (!textarea) return;
      textarea.selectionStart = start;
      textarea.selectionEnd = end + value.length * 2;
      textarea.focus();
    }, 0);
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault(); // 기본 붙여넣기 막기

        const file = item.getAsFile();
        if (!file) return;

        await uploadImageAndInsert(file);
      }
    }
  };

  const uploadImageAndInsert = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await res.json();

    insertAtCursor(`![image](${url})`);
  };

  const insertAtCursor = (value: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    setText((prev) => prev.slice(0, start) + value + prev.slice(end));

    setTimeout(() => {
      const pos = start + value.length;
      textarea.selectionStart = textarea.selectionEnd = pos;
      textarea.focus();
    }, 0);
  };

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
      <div className="prose">
        <Print />

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {text}
        </ReactMarkdown>
      </div>

      <textarea
        ref={textareaRef}
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
        onPaste={handlePaste}
      />
      <button onClick={() => ad("~~")}>asdf</button>
    </div>
  );
};

export default Writing;
