const Logincomponents = () => {
  return (
    <div className="flex flex-col w-[31.25rem] px-[0.625rem]">
      <div className="font-medium text-[1.25rem] text-[#828387]">
        이메일로 로그인
      </div>
      <div>
        <input
          type="email"
          placeholder="이메일로 로그인"
          className="w-full border-[0.0625rem] h-[3.5rem]"
        />
        <button className="w-full h-[3.5rem] bg-primary-main3">로그인</button>
      </div>
      <div className="flex gap-[0.3125rem] text-primary-main1 justify-end">
        <div>Story가 처음이라면?</div>
        <div>회원가입</div>
      </div>
    </div>
  );
};

export default Logincomponents;
