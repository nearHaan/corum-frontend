import { useNavigate } from "react-router-dom";

interface SideBarButtonProps {
  icon: React.ElementType;
  title: string;
  isActive: boolean;
  toLink: string;
  onClick: Function;
}

export default function SideBarButton({
  icon: Icon,
  title,
  isActive,
  toLink,
  onClick,
}: SideBarButtonProps) {
  const navigate = useNavigate();
  function onTap() {
    onClick(title);
    navigate(toLink);
  }
  return (
    <div
      onClick={onTap}
      className={`cursor-pointer flex items-center gap-x-2 w-full ${
        isActive ? "bg-green-100" : ""
      } p-2 rounded-xl`}
    >
      <Icon />
      <p>{title}</p>
    </div>
  );
}
