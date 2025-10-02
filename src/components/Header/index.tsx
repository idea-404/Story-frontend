import { Logo, Person } from "@/assets";

const Header = () => {
  return (
    <header className="flex justify-center">
      <div className="flex w-[37.5rem] justify-between content-center">
        <div>
          <Logo />
        </div>
        <div className="flex ">
          <div>글작성</div>
          <Person />
        </div>
      </div>
    </header>
  );
};

export default Header;
