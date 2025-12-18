import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeadingSelect = ({
  value = "body",
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [selected, setSelected] = useState(value);

  const handleChange = (newValue: string) => {
    setSelected(newValue);
    onChange?.(newValue);
  };

  return (
    <Select onValueChange={handleChange} value={selected}>
      <SelectTrigger className="w-[7.5rem] h-[2.5rem]">
        <SelectValue placeholder="본문" />
      </SelectTrigger>
      <SelectContent className="bg-white border-0 text-[1.375rem] font-normal">
        <SelectGroup>
          <SelectItem value="body" className="text-[1.375rem] mt-[0.25rem]">
            본문
          </SelectItem>
          <SelectItem value="h1" className="text-[2rem] mt-[0.25rem]">
            제목 1
          </SelectItem>
          <SelectItem value="h2" className="text-[1.75rem] mt-[0.25rem]">
            제목 2
          </SelectItem>
          <SelectItem value="h3" className="text-[1.5rem] mt-[0.25rem]">
            제목 3
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default HeadingSelect;
