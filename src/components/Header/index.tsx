import { Logo, Person, Pen } from "@/assets";

const Header = () => {
  return (
    <header className="flex justify-center">
      <div className="flex w-[37.5rem] h-[5.375rem] justify-between items-center">
        <div>
          <Logo />
        </div>
        <div className="flex gap-[1.25rem]">
          <div className="flex items-center gap-[0.625rem] py-[0.375rem] px-[0.875rem] border-[0.025rem] rounded-[1.5rem]">
            글작성 <Pen />
          </div>
          <Person />
        </div>
      </div>
    </header>
  );
};

export default Header;
