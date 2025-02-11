import { LogOut, Menu, Sun } from "lucide-react";
import "react";
import { useState } from "react";
import Clubs from "./Clubs";
import ClubPicStyle from "./ClubPicStyle";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const SideToggle = () => {
    setSidebar((prevValue) => !prevValue);
  };

  const handleLogout = () => {
    alert("Do You want to Logout?");
    alert("Logged Out!")
  };

  return (
    <div>
      <div
        className={`bg-gray-800  bg-opacity-75 backdrop-blur-md h-screen overflow-hidden transition-all duration-500 ease-out ${
          sidebar ? "w-[300px]" : "w-[110px]"
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
          <div className="clubnames clubs max-h-[550px] overflow-y-scroll hide-scrollbar">
            {Clubs.map((club) => (
              <div
                key={club.id}
                className="max-h-[550px] overflow-y-scroll hide-scrollbar overflow-x-hidden scroll-m-2 flex items-center p-3 mx-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-all"
              >
                <div className="text-white text-lg font-medium">
                  {club.clubname}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ClubPicStyle />
        )}

        <div
          className={`p-4 m-4 flex items-center ${
            sidebar ? "flex-row space-x-4" : "flex-col space-y-4"
          }`}
        >
          <Sun className="text-white w-8 h-8 -ml-1.5 cursor-pointer hover:text-yellow-400 transition-all" />
          <button onClick={handleLogout}>
            <LogOut className="text-red-600 w-8 h-8 cursor-pointer hover:text-gray-300 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
