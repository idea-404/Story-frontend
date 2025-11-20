const section2 = () => {
  return (
    <div className="flex flex-col w-[31.25rem] px-[0.625rem] mb-[6.25rem] gap-[0.625rem]">
      <div className="font-medium text-[1.25rem] text-[#828387]">
        이메일로 로그인
      </div>
      <div className="flex flex-col gap-[1.125rem]">
        <input
          type="email"
          placeholder="이메일로 로그인"
          className="w-full border-[0.0625rem] h-[3.5rem] rounded-[0.625rem] px-[1.25rem]"
        />
        <button className="w-full h-[3.5rem] bg-primary-main3 text-white rounded-[0.625rem] text-[1.375rem] font-bold ">
          로그인
        </button>
      </div>
      <div className="flex gap-[1.125rem] text-primary-main1 justify-end">
        <div>Story가 처음이라면?</div>
        <div>회원가입</div>
      </div>
    </div>
  );
};

export default section2;
