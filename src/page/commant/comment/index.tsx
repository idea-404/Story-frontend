const Commantintput = () => {
  return (
    <div className="flex flex-col justify-center w-[32rem]">
      <div className="w-[32rem] text-[1.25rem]">10개의 댓글</div>
      <div className="w-[32rem] h-[7.25rem] bg-[#EFF0F2] rounded-[0.4375rem] mt-[0.5rem] px-[1rem] pt-[1rem]">
        <textarea
          placeholder="댓글을 입력하세요."
          className="h-[4rem] w-[30rem]"
        />
        <div className="flex justify-end text-primary-main1">123/160</div>
      </div>
    </div>
  );
};
export default Commantintput;
