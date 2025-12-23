import { useState, useEffect } from "react";
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
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  // Blob URL cleanup
  useEffect(() => {
    return () => {
      if (thumbnailUrl && thumbnailUrl.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="thumbnailUpload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          console.log("파일 선택됨:", file);
          if (file) {
            // 이전 Blob URL 정리
            if (thumbnailUrl && thumbnailUrl.startsWith("blob:")) {
              URL.revokeObjectURL(thumbnailUrl);
            }
            // 새 Blob URL 생성
            const blobUrl = URL.createObjectURL(file);
            console.log("Blob URL 생성:", blobUrl);
            setThumbnailUrl(blobUrl);
          }
        }}
      />
      <div className="flex w-[560px] rounded-3xl bg-white p-6">
        <div className="flex w-1/2 flex-col gap-4 rounded-2xl bg-gray-100 p-5">
          <div className="flex flex-1 min-h-[200px] items-center justify-center overflow-hidden rounded-2xl bg-white">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="썸네일"
                className="max-h-full max-w-full object-contain"
                onLoad={() => console.log("이미지 로드 완료")}
                onError={() => console.log("이미지 로드 실패")}
              />
            ) : (
              <PublishBlog />
            )}
          </div>

          <button
            onClick={() => {
              console.log("버튼 클릭됨");
              const input = document.getElementById(
                "thumbnailUpload"
              ) as HTMLInputElement;
              console.log("Input 요소:", input);
              if (input) {
                console.log("input.click() 호출");
                input.click();
              }
            }}
            className="rounded-xl bg-primary-main1 px-4 py-2 text-center text-sm text-white"
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
