import "react";
import ClubPhotos from "./ClubPhotos";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ClubPicStyle = () => {
  return (
    <div className="max-h-[550px] overflow-y-scroll overflow-x-hidden scroll-m-2 hide-scrollbar">
      <Link to="/servers">
        {" "}
        <div className="w-18 h-18 m-4 cursor-pointer bg-gray-700 rounded-full flex items-center justify-center text-gray-300 font-bold text-lg ">
          <Plus />
        </div>
      </Link>

      {ClubPhotos.map((clubpic) => (
        <div
          key={clubpic.id}
          className="w-18 h-18 m-4 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 font-bold text-lg "
        >
          📌
        </div>
      ))}
    </div>
  );
};

export default ClubPicStyle;
