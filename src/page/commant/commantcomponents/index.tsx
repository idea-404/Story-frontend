import { Person } from "@/assets";

const Commantcomponents = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-[32rem] mt-[3.75rem] mb-[1.25rem]">
        <div className="flex items-center gap-[0.96rem]">
          <Person h={40} />
          <div className="text-black text-[1.25rem]">1110 이남진</div>
        </div>
        <div className="flex items-center text-[#828387]">2025-20-20</div>
      </div>
      <div className="w-[32rem] px-[1rem]"></div>
    </div>
  );
};
export default Commantcomponents;
