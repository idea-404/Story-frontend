const Printbody = () => {
  const buttonStyle =
    "py-[0.47rem] px-[2.03rem] bg-[#EFF0F2] rounded-[0.9375rem] text-primary-main1 font-bold";
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="w-[35.75rem] h-[40rem] mt-[3.75rem] overflow-y-scroll">
        내용이 들어가는 부분입니다.
      </div>
      <div className="flex justify-end gap-[2.25rem]">
        <button className={buttonStyle}>임시저장</button>
        <button className={buttonStyle}>작성완료</button>
      </div>
    </div>
  );
};

export default Printbody;
