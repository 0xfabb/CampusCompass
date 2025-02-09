import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import servers from "./pages/servers";
import dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/servers" Component={servers}></Route>
          <Route path="/home" Component={dashboard}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
