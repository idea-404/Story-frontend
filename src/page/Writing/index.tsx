import { useRef, useState } from "react";
import { Print, Inputheader } from "@/components";
import { Line5 } from "@/assets";

const Writing = () => {
  const [text, setText] = useState<string>("내용을 입력해 주세요.");

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
    <div className="flex justify-center gap-[2.88rem]">
      <div className="flex flex-col mt-[2.88rem]">
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="w-[37.5rem] h-[2.25rem] mb-[0.75rem] px-[0.75rem] py-[0.62rem] text-[1.875rem] border-0 outline-none focus:outline-none focus:ring-0"
        />
        <Inputheader />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Velog처럼 Markdown을 입력해보세요..."
          onPaste={handlePaste}
          className="h-[61.85vh] mt-[1rem] border-0 outline-none focus:outline-none focus:ring-0 resize-none"
        />
      </div>
      <Line5 />
      <Print title="asdf" body={text} />
    </div>
  );
};

export default Writing;
