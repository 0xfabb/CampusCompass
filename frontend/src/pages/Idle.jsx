import Sidebar from "../components/ui/Sidebar";
import LottieAnimation from "../components/ui/LottieAnimation";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



const Idle = () => {
  const [name, setName] = useState("");
  const [servers, setServers] = useState();

  useEffect(() => {
    const fetchDetails = () => {
      axios
        .get("http://localhost:3000/api/student/followed", { withCredentials: true })
        .then((response) => {
          const fetchedName = response.data.name;
          const followed = response.data.followedServers;
          console.log(fetchedName);
          console.log(followed);
          setName(fetchedName);
          setServers(followed);
        })
        .catch((err) => {
          console.log("There was an error with the API call", err);
        });
    };    
    fetchDetails();
  }, []);

  return (
    <div className="flex min-h-screen bg-dark-2 bg-opacity-75 backdrop-blur-md">
      <Sidebar />

      <div className="flex flex-col items-center justify-center flex-grow text-center space-y-8">
        <h1 className="text-white text-5xl font-bold">
          Good Afternoon, <span className="text-red-400">{name}</span> 👋
        </h1>

        <div className="flex justify-center items-center w-full h-[250px]">
          <LottieAnimation />
        </div>

        <Link to="/servers">
          <button className="text-gray-300 font-bold cursor-pointer mt-9 text-2xl px-7 py-3 bg-dark-1 rounded-lg shadow-md flex items-center gap-2">
            <Search className="w-6 h-6" />
            Select a Server to Check Chats
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Idle;
