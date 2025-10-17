type RoomProps = {
  id: string;
  name: string;
};

export const RoomBox: React.FC<RoomProps> = ({ id, name }) => {
  return (
    <div className="h-45 w-45 bg-neutral-100 rounded-2xl flex items-center justify-center">
      <p className="text-black text-lg">{name}</p>
    </div>
  );
};
