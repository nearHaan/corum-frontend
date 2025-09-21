import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center font-mono text-black">
      <header className="w-full flex items-center justify-evenly shadow-[0px_2px_#00000020] z-30">
        <h2 className="text-lg my-2 mx-5">CORUM</h2>
        <div className="rounded my-2 mx-auto w-80 ring-1 ring-[#00000020]">
          <input
            className="p-2"
            type="text"
            placeholder="Search"
            autoComplete="false"
          />
        </div>
        <div>Ask</div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
