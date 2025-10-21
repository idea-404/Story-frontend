import { Logo, Person, Pen } from "@/assets";
import { useNavigate } from "react-router-dom";

const Header = ({ EndPoint }: { EndPoint: boolean }) => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-center border-b-[0.125rem] border-[#EFF0F2]">
      <div className="flex w-[37.5rem] h-[5.375rem] justify-between items-center">
        <div onClick={() => navigate("/")}>
          <Logo />
        </div>
        <div className={EndPoint ? "hidden" : "flex gap-[1.25rem]"}>
          <div
            className="flex items-center gap-[0.625rem] py-[0.375rem] px-[0.875rem] border-[0.025rem] rounded-[1.5rem] font-medium cursor-default
"
            onClick={() => navigate("/blog/write")}
          >
            글 작성 <Pen />
          </div>
          <div onClick={() => navigate("/mypage")}>
            <Person />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
