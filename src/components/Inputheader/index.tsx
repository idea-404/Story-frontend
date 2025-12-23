import { RefObject, useState } from "react";
import HeadingSelect from "@/assets/select/HeadingSelect";
import { Line3, Line4, Dotline, Quotes, Code, Link, Image } from "@/assets";

interface InputheaderProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  headingType: string;
  setHeadingType: React.Dispatch<React.SetStateAction<string>>;
}

const Inputheader = ({
  textareaRef,
  setText,
  headingType,
  setHeadingType,
}: InputheaderProps) => {
  const insertMarkdown = (value: string, wrapper = true) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    let newText: string;
    if (wrapper) {
      // 양쪽에 값을 감싸는 경우 (Bold, Italic 등)
      newText =
        textarea.value.slice(0, start) +
        value +
        textarea.value.slice(start, end) +
        value +
        textarea.value.slice(end);
    } else {
      // 단순 삽입 (링크, 이미지 등)
      newText =
        textarea.value.slice(0, start) + value + textarea.value.slice(end);
    }

    setText(newText);

    setTimeout(() => {
      if (!textarea) return;
      const newPos = wrapper ? end + value.length * 2 : start + value.length;
      textarea.selectionStart = start;
      textarea.selectionEnd = newPos;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="flex gap-[0.55rem] items-center w-[37.5rem]">
      <div>
        <HeadingSelect
          value={headingType}
          onChange={(value) => {
            setHeadingType(value);
            if (value !== "body") {
              insertMarkdown(value, false);
            }
          }}
        />
      </div>
      <Line4 />
      <div className="flex gap-[1.88rem] px-[0.74rem]">
        <button className="font-bold" onClick={() => insertMarkdown("**")}>
          B
        </button>
        <button className="italic" onClick={() => insertMarkdown("*")}>
          I
        </button>
        <button
          className="underline"
          onClick={() => insertMarkdown("- [ ] ", false)}
        >
          U
        </button>
        <button className="line-through" onClick={() => insertMarkdown("~~")}>
          S
        </button>
      </div>
      <Line4 />
      <div className="flex gap-[0.75rem] items-center px-[0.55rem]">
        <button onClick={() => insertMarkdown("---\n", false)}>
          <Line3 />
        </button>
        <button onClick={() => insertMarkdown("- ", false)}>
          <Dotline />
        </button>
        <button onClick={() => insertMarkdown("```\n\n```", false)}>
          <Code />
        </button>
        <button onClick={() => insertMarkdown("> ", false)}>
          <Quotes />
        </button>
      </div>
      <Line4 />
      <div className="flex gap-[1.88rem] px-[0.89rem]">
        <button onClick={() => insertMarkdown("[]() ", false)}>
          <Link />
        </button>
        <button>
          <Image />
        </button>
      </div>
    </div>
  );
};

export default Inputheader;
