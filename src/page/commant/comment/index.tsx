import { useState } from "react";

const Commantintput = () => {
  const [text, settext] = useState("");
  return (
    <div className="flex flex-col justify-center w-[32rem]">
      <div className="w-[32rem] text-[1.25rem]">10개의 댓글</div>
      <div className="w-[32rem] h-[7.25rem] bg-[#EFF0F2] rounded-[0.4375rem] mt-[0.5rem] px-[1rem] pt-[1rem]">
        <textarea
          value={text}
          onChange={(e) => settext(e.target.value.slice(0, 160))}
          placeholder="댓글을 입력하세요."
          className="h-[4rem] w-[30rem] border-0 outline-none focus:outline-none resize-none bg-transparent"
        />
        <div className="flex justify-end text-primary-main1">
          {text.length}/160
        </div>
      </div>
      <div className="flex justify-end ">
        <button className="bg-primary-main3 px-[1rem] py-[0.13rem] rounded-[0.4375rem] mt-[0.75rem]">
          댓글 작성
        </button>
      </div>
    </div>
  );
};
export default Commantintput;
