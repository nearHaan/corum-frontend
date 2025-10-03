import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";
import HomePage from "./pages/Home/Home";
import QuestionsPage from "./pages/Home/tabs/Questions";
import PublicRoomsPage from "./pages/Home/tabs/PublicRooms";
import LoginTab from "./pages/Auth/tabs/LoginTab";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<LoginTab />} />
          <Route path="rooms" element={<PublicRoomsPage />} />
        </Route>
        <Route path="/" element={<HomePage />}>
          <Route index element={<QuestionsPage />} />
          <Route path="rooms" element={<PublicRoomsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
