import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Servers from "./pages/servers";
import Idle from "./pages/Idle";
import Server from "./pages/Server";
import LandingPage from "./pages/LandingPage";
import AuthDashboard from "./pages/AuthDashboard";
import CCSignup from "./pages/ccsignup";
import CCLogin from "./pages/cclogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Idle />} />
        <Route path="/authdashboard" element={<AuthDashboard />} />
        <Route path="/ccsignup" element={<CCSignup />} />
        <Route path="/cclogin" element={<CCLogin />} />
        <Route path="/servers" element={<Servers />} />
        <Route path="/server/:serverId" element={<Server />} />
      </Routes>
    </Router>
  );
}

export default App;
