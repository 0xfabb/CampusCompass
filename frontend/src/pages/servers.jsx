import Sidebar from "../components/ui/Sidebar";
import "react";
import ClubCard from "../components/ui/ClubCard";

const Dashboard = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 backdrop-blur-md  h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center overflow-y-scroll p-6">
        <input
          type="search"
          placeholder="Search Server"
          className="w-full max-w-[800px] sticky mb-9 h-12 px-4 py-3 m-4 text-white bg-gray-800 border-2 border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <ClubCard />
      </div>
    </div>
  );
};

export default Dashboard;
