import HeadingSelect from "@/assets/select/HeadingSelect";
import { Line3, Line4, Dotline, Quotes, Code, Link, Image } from "@/assets";
const Inputheader = () => {
  return (
    <div className="flex gap-[0.55rem] items-center w-[37.5rem]">
      <div>
        <HeadingSelect />
      </div>
      <Line4 />
      <div className="flex gap-[1.88rem] px-[0.74rem]">
        <button className="font-bold">B</button>
        <button className="italic">I</button>
        <button className="underline">U</button>
        <button className="line-through">S</button>
      </div>
      <Line4 />
      <div className="flex gap-[0.75rem] items-center px-[0.55rem]">
        <button>
          <Line3 />
        </button>
        <button>
          <Dotline />
        </button>
        <button>
          <Code />
        </button>
        <button>
          <Quotes />
        </button>
      </div>
      <Line4 />
      <div className="flex gap-[1.88rem] px-[0.89rem]">
        <button>
          <Link />
        </button>
        <button>
          <Image />
        </button>
      </div>
    </div>
  );
};

export default Inputheader;
