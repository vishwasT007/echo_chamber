import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DebateRoom from "./pages/DebateRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/room/:roomId" element={<DebateRoom />} />
    </Routes>
  );
}

export default App;
