import { X } from "lucide-react";

type TagButtonProps = {
  id: string;
  name: string;
  selected: boolean;
  toggle: () => void;
};

export const TagButton: React.FC<TagButtonProps> = ({
  id,
  name,
  selected,
  toggle,
}) => {
  return (
    <div
      onClick={toggle}
      className={`w-fit px-4 py-2 ${
        !selected ? "bg-neutral-100" : "bg-green-100"
      } rounded-full flex gap-x-1 items-center cursor-pointer`}
    >
      <p className={`${!selected ? "text-neutral-400" : "text-black"} text-sm`}>
        {name}
      </p>
      {selected && <X size={15} color="black" />}
    </div>
  );
};
