import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePage from "./pages/Home/Home";
import QuestionsPage from "./pages/Home/tabs/Questions";
import PublicRoomsPage from "./pages/Home/tabs/PublicRooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<QuestionsPage />} />
          <Route path="rooms" element={<PublicRoomsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
