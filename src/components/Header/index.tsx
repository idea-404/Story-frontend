import { Logo, Person, Pen } from "@/assets";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const nooutput = ["/blog/write", "/portfolio/write"];
  return (
    <header className="flex justify-center border-b-[0.125rem] border-[#EFF0F2]">
      <div className="flex w-[37.5rem] h-[5.375rem] justify-between items-center">
        <div onClick={() => navigate("/")}>
          <Logo />
        </div>
        {!(pathname === "/signin") && (
          <div className={"flex gap-[1.25rem]"}>
            {!nooutput.includes(pathname) && (
              <div
                className={
                  "flex items-center gap-[0.625rem] py-[0.375rem] px-[0.875rem] border-[0.025rem] rounded-[1.5rem] font-medium cursor-pointer text-[#3C3C3E] hover:bg-[#3C3C3E] hover:text-white transition-colors"
                }
                onClick={() => navigate("/blog/write")}
              >
                글 작성 <Pen />
              </div>
            )}
            <div onClick={() => navigate("/mypage")}>
              <Person />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
