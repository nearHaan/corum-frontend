interface SideBarButtonProps {
  icon: React.ElementType;
  title: string;
  isActive: boolean;
}

export default function SideBarButton({
  icon: Icon,
  title,
  isActive,
}: SideBarButtonProps) {
  return (
    <div
      className={`flex items-center gap-x-2 w-full ${
        isActive ? "bg-green-100" : ""
      } p-2 rounded-xl`}
    >
      <Icon />
      <p>{title}</p>
    </div>
  );
}
