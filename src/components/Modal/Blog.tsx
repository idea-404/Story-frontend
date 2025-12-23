import { useState } from "react";
import { PublishBlog } from "@/assets";
import { blogwrite } from "@/API";

export default function Blog({
  setEnd,
  title,
  body,
}: {
  setEnd: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  body: string;
}) {
  const [text, setText] = useState(body.slice(0, 64));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <input
        type="file"
        className="hidden"
        id="imageUpload"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
          }
        }}
      />
      <div className="flex w-[560px] rounded-3xl bg-white p-6">
        <div className="flex w-1/2 flex-col items-center justify-center rounded-2xl bg-gray-100 p-5">
          <PublishBlog className="ml-35" />

          <button
            onClick={() => {
              document.getElementById("imageUpload")?.click();
            }}
            className="mt-4 rounded-xl bg-primary-main1 px-4 py-2 text-center text-sm text-white"
          >
            썸네일 선택하기
          </button>
        </div>

        <div className="ml-4 flex w-1/2 flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 64))}
            placeholder="소개 글을 입력해 주세요."
            className="h-36 resize-none rounded-2xl bg-gray-100 p-4 text-sm outline-none placeholder:text-gray-400"
          />

          <div className="mt-1 text-right text-sm text-primary-main1">
            {text.length}/64
          </div>

          <div className="mt-auto flex justify-end gap-3">
            <button
              onClick={() => setEnd(false)}
              className="rounded-xl bg-gray-100 px-5 py-2 text-sm"
            >
              취소
            </button>
            <button
              onClick={async () => {
                await blogwrite(title, body, text);
                setEnd(false);
              }}
              className="rounded-xl bg-primary-main1 px-5 py-2 text-sm text-white"
            >
              출간하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
