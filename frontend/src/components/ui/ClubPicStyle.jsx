import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ClubPicStyle = () => {
  const [hoverId, setHoverId] = useState(null);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/student/followed", {
        withCredentials: true,
      })
      .then((response) => {
        setClubs(response.data.followedServers);
      })
      .catch((err) => {
        console.log("Error fetching clubs:", err);
      });
  }, []);

  return (
    <div className="max-h-[550px] overflow-y-scroll overflow-x-hidden scroll-m-2 hide-scrollbar hover:scrollbar-thin hover:scrollbar-thumb-gray-700 flex flex-col items-center">
      <Link to="/servers">
        <div className="w-16 h-16 my-3 cursor-pointer bg-red-800 hover:bg-red-600 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl hover:text-white shadow-md transition-transform duration-300 transform hover:scale-110">
          <Plus />
        </div>
      </Link>

      {clubs.map((club, index) => (
        <Link to={`/server/${club.serverId}`} key={index}>
          <div
            className={`w-16 h-16 my-3 rounded-full bg-dark-2 text-white flex items-center justify-center text-sm font-semibold shadow-md transition-all duration-300 hover:bg-dark-3 cursor-pointer hover:scale-110 ${
              hoverId === index ? "ring-2 ring-gray-300" : ""
            }`}
            onMouseEnter={() => setHoverId(index)}
            onMouseLeave={() => setHoverId(null)}
            title={club.name}
          >
            {club.name.slice(0, 2).toUpperCase()}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ClubPicStyle;




      {/* {ClubPhotos.map((clubpic) => (
        <Link key={clubpic.id} to={`/server/${clubpic.id}`}>
          <div
            key={clubpic.id}
            className="w-20 h-20 m-4 cursor-pointer bg-gray-900 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-md"
          >
            <img
              className="w-20 h-20 m-4 cursor-pointer rounded-full shadow-md transition-transform duration-300 transform hover:scale-115"
              src={
                !hoverId || hoverId !== clubpic.id
                  ? clubpic.imagedark
                  : clubpic.image
              }
              alt=""
              onMouseEnter={() => setHoverId(clubpic.id)}
              onMouseLeave={() => setHoverId(null)}
            />
          </div>
        </Link>
      ))} */}