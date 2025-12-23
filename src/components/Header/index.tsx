import { Logo, Person, Pen } from "@/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SelectWrite from "@/components/Modal/SelectWrite";

const nooutput = ["/blog/write", "/portfolio/write"];
const nooutput2 = ["/login", "/signin", "/info"];

const Header = () => {
  const navigate = useNavigate();
  const [whiteMode, setWhiteMode] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="flex justify-center border-b-[0.125rem] border-[#EFF0F2]">
      <div className="flex w-[37.5rem] h-[5.375rem] justify-between items-center">
        <button onClick={() => navigate("/")}>
          <Logo />
        </button>
        {!nooutput2.includes(pathname) && (
          <div className={"flex gap-[1.25rem]"}>
            {!nooutput.includes(pathname) && (
              <button
                className={
                  "flex items-center gap-[0.625rem] py-[0.375rem] px-[0.875rem] border-[0.025rem] rounded-[1.5rem] font-medium text-[#3C3C3E] hover:bg-[#3C3C3E] hover:text-white transition-colors"
                }
                onClick={() => navigate("/blog/write")}
              >
                글 작성 <Pen />
              </button>
            )}
            <button onClick={() => navigate("/mypage")}>
              <Person />
            </button>
          </div>
        )}
      </div>
      {whiteMode && <SelectWrite />}
    </header>
  );
};

export default Header;
