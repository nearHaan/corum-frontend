import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center font-mono">
      <div className="max-illusBreak:hidden h-screen w-full border-r-1 border-[#8e8e8e] flex flex-col items-center justify-center">
        <img
          className="max-w-sm"
          alt="illustration"
          src="src/assets/login-illustration.png"
        />
        <h3 className="max-w-lg text-[30px] px-10 font-bold text-black">
          Your next big idea starts here
        </h3>
      </div>
      <Outlet />
    </div>
  );
}
