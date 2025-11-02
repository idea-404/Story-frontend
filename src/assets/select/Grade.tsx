import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Grade = () => {
  return (
    <Select>
      <SelectTrigger className="w-[8.5rem] h-[3.5rem] text-[1.375rem] text-[#828387] rounded-[0.75rem]">
        <SelectValue placeholder="학년" />
      </SelectTrigger>
      <SelectContent className="bg-white border-0 text-[1.375rem] font-normal align-center max-h-[11.625rem]">
        <SelectGroup className="h-[11.625rem] mb-[0.75rem]">
          <SelectItem value="1" className="text-[1.375rem] mt-[0.25rem] ">
            1학년
          </SelectItem>
          <SelectItem value="2" className=" text-[1.375rem] mt-[0.25rem]">
            2학년
          </SelectItem>
          <SelectItem value="3" className="text-[1.375rem] mt-[0.25rem]">
            3학년
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default Grade;
