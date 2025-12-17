import { Person } from "@/assets";

const Printheader = () => {
  return (
    <div className="flex items-center gap-[0.96rem] py-[1.63rem]">
      <Person h={72} />
      <div className="text-black font-pretendard text-[1.25rem] font-medium leading-normal tracking-[0.05rem]">
        1110 이남진
      </div>
    </div>
  );
};

export default Printheader;
