import { Person } from "@/assets";

const Printheader = () => {
  return (
    <div className="flex justify-between w-[37.5rem] mt-[2rem] mb-[1.75rem]">
      <div className="flex items-center gap-[0.96rem]">
        <Person h={72} />
        <div className="text-black text-[1.25rem]">1110 이남진</div>
      </div>
      <div className="flex items-center text-[#828387]">2025-20-20</div>
    </div>
  );
};

export default Printheader;
