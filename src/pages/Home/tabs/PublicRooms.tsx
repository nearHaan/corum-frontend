import { Button } from "../../../components/Button";
import { RoomBox } from "../../../components/RoomBox";

export default function PublicRoomsPage() {
  return (
    <div className="flex-1 w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
        <RoomBox id="123" name="RoomName" />
        <RoomBox id="123" name="RoomName2" />
        <RoomBox id="123" name="RoomName3" />
        <RoomBox id="123" name="RoomName4" />
      </div>
    </div>
  );
}
