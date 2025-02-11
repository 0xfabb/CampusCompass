import Sidebar from "../components/ui/Sidebar";
import "react";
import ClubCard from "../components/ui/ClubCard";
import { Search } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 backdrop-blur-md  h-screen flex">
      <Sidebar />

      <div className="flex-1 flex  flex-col items-center overflow-y-scroll hide-scrollbar p-6">
        <div className="relative w-full mb-7 max-w-[800px]">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="search"
            placeholder="Search Server"
            className="w-full h-12 px-12 py-3 text-white bg-gray-800 border-2 border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <ClubCard />
      </div>
    </div>
  );
};

export default Dashboard;
