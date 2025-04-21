import axios from "axios";
import Sidebar from "../components/ui/Sidebar";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import FollowButton from "../components/ui/FollowButton";

const Servers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [serverDetails, setServerDetails] = useState(null);
  const [serverName, setServerName] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverId, setServerId] = useState();

  const resetState = () => {
    setServerDetails(null);
    setServerName(null);
    setErrorMsg(null);
  };

  useEffect(() => {
    resetState();
  }, [searchValue]);

  const getClubs = async () => {
    if (!searchValue.trim()) {
      setErrorMsg("Please enter the name of club");
      setServerDetails(null);
      setServerName(null);
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      const encodedSearchValue = encodeURIComponent(searchValue);
      const response = await axios.get(
        `http://localhost:3000/api/searchserver?name=${encodedSearchValue}`
      );

      if (!response.data.ServerDetails) {
        setLoading(false);
        setErrorMsg("No club found");
        setServerDetails(null);
        setServerName(null);
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setServerDetails(response.data.ServerDetails.clubData);
        setServerName(response.data.ServerDetails.clubName);
        setServerId(response.data.ServerDetails.id);
      }, 1000);
    } catch (error) {
      console.error("Error fetching club data:", error);
      setErrorMsg("Failed to fetch club details.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-2 bg-opacity-75 backdrop-blur-md h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center overflow-y-scroll hide-scrollbar p-6">
        <div className="relative w-full mb-7 max-w-[800px]">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getClubs();
              }
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="search"
            placeholder=" Search Club"
            className="w-full h-12 px-12 py-6 text-white bg-dark-1 border-2 border-neutral-200 rounded-3xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none pr-20"
          />
          <button
            onClick={getClubs}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-3xl hover:bg-red-600 transition"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-white">Loading...</p>}
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        {serverName && (
          <div className="flex flex-col gap-2 items-center justify-center mt-12">
            <div
              className="bg-dark-3 bg-opacity-75 backdrop-blur-md text-white 
        w-[400px] md:w-[480px] lg:w-[820px] h-[220px] p-6 rounded-xl shadow-lg 
        transform opacity-0 translate-y-[-20px] animate-fade-in"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-dark-1 rounded-full flex items-center justify-center text-gray-300 font-bold text-lg">
                  📌
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-400">
                    {serverName}
                  </h2>
                  <p className="text-gray-300 text-sm">{serverDetails}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <FollowButton serverId={serverId} name={serverName} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Servers;
