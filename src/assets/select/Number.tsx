import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Number = () => {
  const numbers = Array.from({ length: 18 }, (_, i) => i + 1);
  const { control } = useFormContext();
  return (
    <Controller
      name="number"
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-[8.5rem] h-[3.5rem] text-[1.375rem] text-[#828387] rounded-[0.75rem] shadow-none">
            <SelectValue placeholder="번호" />
          </SelectTrigger>
          <SelectContent className="bg-white border-0 text-[1.375rem] font-normal align-center max-h-[11.625rem]">
            <SelectGroup className=" h-[11.625rem] mb-[0.75rem]">
              {numbers.map((num) => (
                <SelectItem
                  key={num}
                  value={num > 9 ? String(num) : `0${num}`}
                  className="text-[1.375rem] mt-[0.25rem]"
                >
                  {num}번
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};
export default Number;
