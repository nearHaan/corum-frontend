import { Outlet } from "react-router-dom";
import { Button } from "../../components/Button";
import { ArrowRightFromLineIcon, CircleQuestionMark } from "lucide-react";
import SideBarButton from "../../components/sidebar_btn";

export default function HomePage() {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center font-mono text-black">
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
          <Button type="submit" loading={false}>
            Ask a question
          </Button>
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
        </div>
      </header>
      <main className="w-full h-full flex items-center justify-center">
        <div className="w-80 h-screen shadow-[2px_0px_#00000020] flex flex-col">
          <div className="p-5 gap-y-2 flex flex-col items-center">
            <SideBarButton
              isActive={true}
              title="Questions"
              icon={CircleQuestionMark}
            />
            <SideBarButton
              isActive={false}
              title="Public Rooms"
              icon={ArrowRightFromLineIcon}
            />
          </div>
          <div className="p-5">//</div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
