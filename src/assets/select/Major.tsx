import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Major = () => {
  return (
    <Select>
      <SelectTrigger className="w-[31.25rem] h-[3.5rem] text-[1.375rem] text-[#828387] rounded-[0.75rem]">
        <SelectValue placeholder="전공을 선택해 주세요." />
      </SelectTrigger>
      <SelectContent className="bg-white border-0 text-[1.375rem] font-normal align-center max-h-[11.625rem]">
        <SelectGroup className=" h-[11.625rem] mb-[0.75rem]">
          <SelectItem
            value="frontend"
            className="text-[1.375rem] mt-[0.25rem] "
          >
            프론트엔드
          </SelectItem>
          <SelectItem value="backend" className=" text-[1.375rem] mt-[0.25rem]">
            백엔드
          </SelectItem>
          <SelectItem value="design" className="text-[1.375rem] mt-[0.25rem]">
            디자인
          </SelectItem>
          <SelectItem value="devops" className="text-[1.375rem] mt-[0.25rem]">
            devops
          </SelectItem>
          <SelectItem
            value="functional group"
            className="text-[1.375rem] mt-[0.25rem]"
          >
            기능반
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default Major;
