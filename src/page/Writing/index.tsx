import { useRef, useState } from "react";
import { Print, Inputheader, AiPrint } from "@/components";
import { Ai, Line5, Out } from "@/assets";

const Writing = () => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [headingType, setHeadingType] = useState<string>("body");
  const [Aiasdf, setAiasdf] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.slice(0, 20));
  };

  return (
    <div className="flex justify-center gap-[2.88rem]">
      <div className="flex flex-col mt-[2.88rem]">
        <div className="flex">
          <input
            value={title}
            onChange={(e) => change(e)}
            type="text"
            placeholder="제목을 입력해 주세요."
            className="w-[34.125rem] h-[2.25rem] mb-[0.75rem] px-[0.75rem] py-[0.62rem] text-[1.875rem] border-0 outline-none focus:outline-none focus:ring-0"
          />
          <div className="w-[3.375rem] text-primary-main1 text-center">
            {title.length}/20
          </div>
        </div>

        <Inputheader
          textareaRef={textareaRef}
          setText={setText}
          headingType={headingType}
          setHeadingType={setHeadingType}
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            const newValue = e.target.value;
            const oldValue = text;

            // 줄바꿈이 추가되었는지 확인
            if (newValue.length > oldValue.length && newValue.endsWith("\n")) {
              setHeadingType("body");
            }

            setText(newValue);
          }}
          placeholder="내용을 입력해 주세요."
          onPaste={handlePaste}
          className="h-[59.26vh] mt-[1rem] border-0 outline-none focus:outline-none focus:ring-0 resize-none"
        />
        <div className="flex gap-[2.25rem] items-center">
          <button className="flex items-center gap-[0.63rem] py-[0.47rem] px-[1.81rem] bg-[#EFF0F2] rounded-[0.9375rem] text-primary-main1 font-bold">
            <Out />
            나가기
          </button>

          <button className="flex items-center gap-[0.63rem] py-[0.47rem] px-[1.03rem] bg-[#EFF0F2] rounded-[0.9375rem] text-primary-main1 font-bold">
            <Ai />
            AI 피드백
          </button>
        </div>
      </div>
      {Aiasdf && (
        <>
          <Line5 />
          <Print
            title={title ? title : "제목을 입력해 주세요."}
            body={text ? text : "내용을 입력해 주세요."}
          />
        </>
      )}
      {!Aiasdf && <AiPrint />}
    </div>
  );
};

export default Writing;
