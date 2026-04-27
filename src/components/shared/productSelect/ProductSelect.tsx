import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TSelectValue = {
  value: string | number;
  label: string;
};

type ProductSelectProps = {
  options: TSelectValue[];
  placehold: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
};

const ProductSelect = ({ options, placehold }: ProductSelectProps) => {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[160px] h-[42px] rounded-full bg-[#1a1b26] border-white/[0.08] text-white/70 text-sm focus:ring-violet-500 focus:border-violet-500">
          <SelectValue placeholder={placehold} />
        </SelectTrigger>
        <SelectContent className="bg-[#1a1b26] border-white/[0.08] text-white">
          {options?.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ProductSelect;
