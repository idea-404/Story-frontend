import { useState } from "react";
import ResendMail from "@/components/Modal/ResendMail";
import Delete from "@/components/Modal/Delete";
import AIFeedback from "@/components/Modal/AIFeedback";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-purple-400 px-4 py-2 text-white"
      >
        재전송 모달 열기
      </button>
      <Delete />
      <ResendMail />
      <AIFeedback />
    </>
  );
}
