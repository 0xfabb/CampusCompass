import { Menu } from "lucide-react";
import "react";
import { useState } from "react";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const SideToggle = () => {
    setSidebar((prevValue) => !prevValue);
  };

  return (
    <div>
      <div
        className={`bg-gray-800 bg-opacity-75 backdrop-blur-md h-screen overflow-hidden transition-all duration-500 ease-out ${
          sidebar ? "w-[300px]" : "w-[110px]"
        }`}
      >
        <div className="p-3 m-2">
          <button onClick={SideToggle} className="focus:outline-none">
            <Menu
              color="white"
              className="cursor-pointer transition-transform duration-500 ease-in-out size-9"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
