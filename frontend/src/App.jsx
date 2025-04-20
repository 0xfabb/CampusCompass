import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Servers from "./pages/servers";
import Idle from "./pages/Idle";
import Server from "./pages/Server";
import LandingPage from "./pages/LandingPage";
import AuthDashboard from "./pages/AuthDashboard";
import CCSignup from "./pages/ccsignup";
import CCLogin from "./pages/cclogin";
import CCDashboard from "./pages/CCDashboard";
import RequireAuth from "./components/CheckAuth";
import CheckAuthStudent from "./components/CheckAuthStudent";
import StudentSignUp from "./pages/StudentSignUp";
import StudentLogin from "./pages/StudentLogin";
import { ManageClass, AnnouncementClass, ScheduleClass } from "./pages/CCDashboard";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <CheckAuthStudent>
              <Idle />
            </CheckAuthStudent>
          }
        />
        <Route path="/authdashboard" element={<AuthDashboard />} />
        <Route path="/ccsignup" element={<CCSignup />} />
        <Route path="/studentsignup" element={<StudentSignUp />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/cclogin" element={<CCLogin />} />
        <Route path="/servers" element={<Servers />} />
        <Route path="/server/:serverId" element={<Server />} />
        <Route element={<Server />} />
        <Route
          path="/ccdashboard"
          element={
            <RequireAuth>
              <CCDashboard />
            </RequireAuth>
          }
        />
        <Route path="/manage-class" element={<ManageClass />} />
        <Route path="/announcement-class" element={<AnnouncementClass />} />
        <Route path="/schedule-class" element={<ScheduleClass />} />

      </Routes>
    </Router>
  );
}

export default App;
