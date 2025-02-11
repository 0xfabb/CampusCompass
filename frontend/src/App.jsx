import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Servers from "./pages/Servers";
import Idle from "./pages/idle";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Idle />} />
          <Route path="/servers" element={<Servers />} />
          {/* <Route path="/home" element={<Dashboard />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
