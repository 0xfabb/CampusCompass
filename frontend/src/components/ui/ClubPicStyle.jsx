import "react";
import ClubPhotos from "./ClubPhotos";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ClubPicStyle = () => {
  return (
    <div className="max-h-[550px] overflow-y-scroll overflow-x-hidden scroll-m-2 hide-scrollbar hover:scrollbar-thin hover:scrollbar-thumb-gray-700">
      <Link to="/servers">
        <div className="w-20 h-20 m-4 cursor-pointer bg-gray-900 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-md">
          <Plus />
        </div>
      </Link>

      {ClubPhotos.map((clubpic) => (
        <div
          key={clubpic.id}
          className="w-20 h-20 m-4 cursor-pointer bg-gray-900 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-md"
        >
          📌
        </div>
      ))}
    </div>
  );
};

export default ClubPicStyle;
