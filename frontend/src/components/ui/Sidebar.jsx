import { LogOut, Menu } from "lucide-react";
import "react";
import axios from "axios";
import { useState } from "react";
import ClubPicStyle from "./ClubPicStyle";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [id, setId] = useState();

  const navigate = useNavigate();

  const getClubs = () => {
    axios
      .get("http://localhost:3000/api/student/followed", {
        withCredentials: true,
      })
      .then((Response) => {
        setClubs(Response.data.followedServers);
        setId(Response.data.followedServers[0].serverId);
      })
      .catch((err) => console.log("An error while fetching clubs", err));
  };

  const SideToggle = () => {
    setSidebar((prevValue) => !prevValue);
    getClubs();
  };

  const logoutControl = async () => {
    setTimeout(async () => {
        try {
        await axios.get("http://localhost:3000/api/student/logout-student", {
          withCredentials: true,
        });
        navigate("/studentlogin");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }, 1000);
  };

  return (
    <div>
      <div
        className={`bg-dark-1  bg-opacity-75 backdrop-blur-md h-screen overflow-hidden transition-all duration-500 ease-out ${
          sidebar ? "w-[300px]" : "w-[115px]"
        }`}
      >
        <div className="p-3 m-2">
          <button onClick={SideToggle} className="focus:outline-none">
            <Menu
              color="white"
              className="m-3 cursor-pointer transition-transform duration-500 ease-in-out size-9"
            />
          </button>
        </div>

        {sidebar ? (
          <>
            <div className="clubnames clubs max-h-[550px] overflow-y-scroll hide-scrollbar">
              <Link to="/servers">
                <div className="m-4 flex items-center justify-center gap-2 px-6 py-3 rounded-lg shadow-md bg-dark-2 text-gray-300 font-semibold text-lg hover:bg-dark-3 hover:text-white transition-all duration-300 transform hover:scale-105">
                  <Plus className="w-6 h-6" />
                  <span>Find more Servers</span>
                </div>
              </Link>

              {clubs.map((club, index) => (
                <Link to={`/server/${club.serverId}`} key={index}>
                  <div className="max-h-[550px] overflow-y-scroll hide-scrollbar overflow-x-hidden scroll-m-2 flex items-center p-3 mx-2 rounded-lg cursor-pointer hover:bg-dark-3 transition-all">
                    <div className="text-white text-lg font-medium">
                      {club.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <ClubPicStyle />
        )}
        <div
          className={`p-4 m-4 flex items-center ${
            sidebar ? "flex-row space-x-4" : "flex-col space-y-4"
          }`}
        >
          <button>
            <LogOut
              onClick={logoutControl}
              className="text-red-600 w-8 h-8 cursor-pointer hover:text-gray-300 transition-all"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
