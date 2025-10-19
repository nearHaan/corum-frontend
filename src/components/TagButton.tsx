import { X } from "lucide-react";
import { useState } from "react";

type TagButtonProps = {
  id: string;
  name: string;
};

export const TagButton: React.FC<TagButtonProps> = ({ id, name }) => {
  const [status, setStatus] = useState(false);
  return (
    <div
      onClick={() => setStatus(!status)}
      className={`w-min px-4 py-2 ${
        !status ? "bg-neutral-100" : "bg-green-100"
      } rounded-full flex gap-x-1 items-center cursor-pointer`}
    >
      <p className={`${!status ? "text-neutral-400" : "text-black"} text-sm`}>
        {name}
      </p>
      {status && <X size={15} color="black" />}
    </div>
  );
};
