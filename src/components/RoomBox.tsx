type RoomProps = {
  id: string;
  name: string;
  onClick: Function;
};

export const RoomBox: React.FC<RoomProps> = ({ id, name, onClick }) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="cursor-pointer h-45 w-45 bg-neutral-100 rounded-2xl flex items-center justify-center"
    >
      <p className="text-black text-lg">{name}</p>
    </div>
  );
};
