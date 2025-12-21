import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Class = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="class"
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-[8.5rem] h-[3.5rem] text-[1.375rem] text-[#828387] rounded-[0.75rem] shadow-none">
            <SelectValue placeholder="반" />
          </SelectTrigger>
          <SelectContent className="bg-white border-0 text-[1.375rem] font-normal align-center max-h-[11.625rem]">
            <SelectGroup className=" h-[11.625rem] mb-[0.75rem]">
              <SelectItem value="1" className="text-[1.375rem] mt-[0.25rem] ">
                1반
              </SelectItem>
              <SelectItem value="2" className=" text-[1.375rem] mt-[0.25rem]">
                2반
              </SelectItem>
              <SelectItem value="3" className="text-[1.375rem] mt-[0.25rem]">
                3반
              </SelectItem>
              <SelectItem value="4" className="text-[1.375rem] mt-[0.25rem]">
                4반
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};
export default Class;
