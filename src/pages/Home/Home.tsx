import { Outlet } from "react-router-dom";
import { Button } from "../../components/Button";
import { ArrowRightFromLineIcon, CircleQuestionMark } from "lucide-react";
import SideBarButton from "../../components/sidebar_btn";
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Questions");
  // const myrooms = ["project-group", "hobby-project"];
  const quickTags = ["node.js", "python", "C++", "C++", "C++", "C++"];
  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center text-black">
      <header className="relative sticky top-0 w-full flex items-center justify-between shadow-[0px_2px_#00000020] z-30 px-5">
        <h2 className="text-2xl my-2">CORUM</h2>
        <div className="flex-1 max-w-md rounded-lg my-2 mx-5 ring-1 ring-[#00000020]">
          <input
            className="p-2 w-full"
            type="text"
            placeholder="Search"
            autoComplete="false"
          />
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <a
            href="/new-question"
            className="h-10 px-4 py-1 bg-[#147324] text-white text-sm rounded-md flex items-center"
          >
            Ask a Question
          </a>
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
        </div>
      </header>
      <main className="w-full min-h-screen h-full flex items-start justify-center">
        <div className="w-80 h-full shadow-[2px_0px_#00000020] flex flex-col">
          <div className="p-5 gap-y-2 flex flex-col items-center">
            <SideBarButton
              isActive={activeTab === "Questions"}
              onClick={setActiveTab}
              title="Questions"
              toLink="/"
              icon={CircleQuestionMark}
            />
            <SideBarButton
              isActive={activeTab === "Rooms"}
              onClick={setActiveTab}
              title="Rooms"
              toLink="/rooms"
              icon={ArrowRightFromLineIcon}
            />
          </div>
          {/* <div className="p-5">
            <p className="text-lg mb-3">My Rooms</p>
            <div className="flex flex-col">
              {myrooms.map((item) => (
                <p className="text-gray-500">{item}</p>
              ))}
            </div>
          </div> */}
        </div>
        <Outlet />
        <div className="max-lg:hidden w-80 h-full shadow-[-2px_0px_#00000020] flex flex-col">
          <div className="p-5 w-full gap-y-2 flex flex-col">
            <p className="text-lg mb-3">Inbox</p>
            <div className="flex flex-col rounded-lg bg-gray-100 p-2">
              <p className="text-gray-400 text-xs mb-1">New Answer</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-lg mb-3">Quich Tags</p>
            <div className="grid grid-cols-2 gap-2 w-fit">
              {quickTags.map((item) => (
                <p className="text-gray-500 mx-1 text-sm rounded-full py-1 px-2 bg-gray-100 w-fit">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
