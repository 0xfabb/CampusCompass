import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Servers from "./pages/Servers";
import Idle from "./pages/Idle";
import Server  from "./pages/Server"; // Corrected

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Idle />} />
        <Route path="/servers" element={<Servers />} />
        <Route path="/server/:serverId" element={<Server />} /> {/* Corrected */}
      </Routes>   
    </Router>
  );
}

export default App;
