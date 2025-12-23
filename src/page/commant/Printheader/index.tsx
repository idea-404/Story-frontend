import { Person } from "@/assets";

const Printheader = ({
  nickname,
  date,
  studentNumber,
}: {
  nickname: string;
  date: string;
  studentNumber: string;
}) => {
  return (
    <div className="flex justify-between w-[37.5rem] mt-[2rem] mb-[1.75rem]">
      <div className="flex items-center gap-[0.96rem]">
        <Person h={72} />
        <div className="text-black text-[1.25rem]">
          {studentNumber} {nickname}
        </div>
      </div>
      <div className="flex items-center text-[#828387]">{date}</div>
    </div>
  );
};

export default Printheader;
