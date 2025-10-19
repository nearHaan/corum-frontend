import { Button } from "../../../components/Button";
import { RoomBox } from "../../../components/RoomBox";

export default function PublicRoomsPage() {
  return (
    <div className="flex-1 w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 p-3">
        <RoomBox id="123" name="RoomName" onClick={(id: string) => {}} />
        <RoomBox id="123" name="RoomName2" onClick={(id: string) => {}} />
        <RoomBox id="123" name="RoomName3" onClick={(id: string) => {}} />
        <RoomBox id="123" name="RoomName4" onClick={(id: string) => {}} />
      </div>
    </div>
  );
}
