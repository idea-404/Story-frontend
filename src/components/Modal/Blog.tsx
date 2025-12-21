import { useState } from "react";
import { PublishBlog } from "@/assets";

export default function Blog() {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex w-[560px] rounded-3xl bg-white p-6">
        <div className="flex w-1/2 flex-col items-center justify-center rounded-2xl bg-gray-100 p-5">
          <PublishBlog className="ml-35" />

          <div className="mt-4 rounded-xl bg-primary-main1 px-4 py-2 text-center text-sm text-white">
            썸네일 선택하기
          </div>
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
            <button className="rounded-xl bg-gray-100 px-5 py-2 text-sm">
              취소
            </button>
            <button className="rounded-xl bg-primary-main1 px-5 py-2 text-sm text-white">
              출간하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
