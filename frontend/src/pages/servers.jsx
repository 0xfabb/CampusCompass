import Sidebar from "../components/ui/Sidebar";
import ClubCard from "../components/ui/ClubCard";
import { Search } from "lucide-react";
import { useState } from "react";
import Clubs from "../components/ui/Clubs"; // Ensure this is an array

const Servers = () => {
  const [searchValue, setSearchValue] = useState("");

  
  const filteredClubs = Array.isArray(Clubs)
    ? Clubs.filter((club) =>
        club.clubname.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <div className="bg-dark-2 bg-opacity-75 backdrop-blur-md h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center overflow-y-scroll hide-scrollbar p-6">
     
        <div className="relative w-full mb-7 max-w-[800px]">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="search"
            placeholder="Search Club"
            className="w-full h-12 px-12 py-3 text-white bg-dark-1 border-2 border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Display filtered clubs */}
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))
        ) : (
          <p className="text-white">No clubs found.</p>
        )}
      </div>
    </div>
  );
};

export default Servers;
