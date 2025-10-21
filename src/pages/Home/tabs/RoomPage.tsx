import { useEffect, useState } from "react";
import { RoomTextArea } from "../../../components/RoomTextArea";
import io from "socket.io-client";
import { Plus } from "lucide-react";
import { redirect, useNavigate } from "react-router-dom";

type TextAreaType = {
  title: string;
  body: string;
};

type RoomType = {
  _id: string;
  name: string;
  textAreas: TextAreaType[];
  inviteCode: string;
};

const socket = io("http://localhost:5000");

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/rooms", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.status === 403) {
          navigator("/auth");
        }
        const data = await res.json();
        setRooms(data.rooms || data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom?._id) {
      socket.emit("joinRoom", selectedRoom._id);
      console.log("Joined room:", selectedRoom._id);
    }
  }, [selectedRoom]);

  useEffect(() => {
    const handleTextAreaUpdate = ({
      roomId,
      textAreaIndex,
      body,
    }: {
      roomId: string;
      textAreaIndex: number;
      body: string;
    }) => {
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (room._id === roomId) {
            const updatedRoom = { ...room };
            updatedRoom.textAreas[textAreaIndex].body = body;

            if (selectedRoom?._id === roomId) {
              setSelectedRoom(updatedRoom);
            }

            return updatedRoom;
          }
          return room;
        })
      );
    };

    socket.on("textAreaUpdated", handleTextAreaUpdate);

    return () => {
      socket.off("textAreaUpdated", handleTextAreaUpdate);
    };
  }, [selectedRoom]);

  const handleTextChange = (index: number, newBody: string) => {
    if (!selectedRoom) return;

    const updatedRoom = { ...selectedRoom };
    updatedRoom.textAreas[index].body = newBody;
    setSelectedRoom(updatedRoom);

    socket.emit("updateTextArea", {
      roomId: selectedRoom._id,
      textAreaIndex: index,
      body: newBody,
    });
  };

  const createRoom = async () => {
    const roomName = prompt("Enter a room name");
    if (!roomName) return;

    try {
      const res = await fetch("http://localhost:5000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: roomName }),
      });

      const data = await res.json();

      if (res.ok) {
        setRooms((prev) => [...prev, data]);
        setSelectedRoom(data);
      } else {
        alert(`Error creating room: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  const joinRoom = async () => {
    const inviteCode = prompt("Enter the Invite Code");
    if (!inviteCode) return;

    try {
      const res = await fetch("http://localhost:5000/rooms/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ inviteCode }),
      });

      const data = await res.json();

      if (res.ok) {
        setRooms((prev) => [...prev, data]);
        setSelectedRoom(data);
        alert(`Joined room: ${data.name}`);
      } else {
        alert(`Error: ${data.error || "Failed to join room"}`);
      }
    } catch (err) {
      console.error("Error joining room:", err);
    }
  };

  const addTextArea = async () => {
    if (!selectedRoom) return;

    const title = prompt("Enter a title (example: filename)");
    if (!title) return;

    try {
      const res = await fetch(
        `http://localhost:5000/rooms/${selectedRoom._id}/textareas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const updatedRoom = { ...selectedRoom };
        updatedRoom.textAreas.push(data.textArea);
        setSelectedRoom(updatedRoom);

        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room._id === updatedRoom._id ? updatedRoom : room
          )
        );

        socket.emit("textAreaCreated", {
          roomId: updatedRoom._id,
          textArea: data.textArea,
          index: data.index,
        });
      } else {
        alert(`Error: ${data.error || "Failed to create text area"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error creating text area. Check console.");
    }
  };

  return (
    <div className="flex-1 h-full flex">
      {/* Sidebar: Room List */}
      <div className="w-64 border-r border-gray-300 p-3 flex flex-col gap-2 overflow-y-auto">
        <div className="flex items-center w-full gap-x-2">
          <button
            className="w-full bg-neutral-100 flex justify-center p-2 rounded"
            onClick={createRoom}
          >
            <Plus />
          </button>
          <button
            className="w-full bg-neutral-300 flex justify-center p-2 rounded"
            onClick={joinRoom}
          >
            Join
          </button>
        </div>

        {rooms.map((room) => (
          <div
            key={room._id}
            className={`p-2 rounded cursor-pointer ${
              selectedRoom?._id === room._id ? "bg-green-200" : "bg-gray-100"
            }`}
            onClick={() => setSelectedRoom(room)}
          >
            {room.name}
          </div>
        ))}
      </div>

      {/* Main Panel: Text Areas */}
      <div className="flex-1 p-3 flex flex-col gap-4 overflow-y-auto">
        {selectedRoom && (
          <>
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Invite Code: {selectedRoom.inviteCode}
              </p>
              <button
                className="w-fit bg-neutral-100 rounded p-2"
                onClick={addTextArea}
              >
                <Plus />
              </button>
            </div>
            {selectedRoom.textAreas.map((ta, idx) => (
              <RoomTextArea
                key={idx}
                id={`${selectedRoom._id}-${idx}`}
                title={ta.title}
                body={ta.body}
                onChange={(newBody) => handleTextChange(idx, newBody)}
              />
            ))}
          </>
        )}
        {!selectedRoom && (
          <div className="text-gray-500 text-center">
            Select a room to view text areas
          </div>
        )}
      </div>
    </div>
  );
}
