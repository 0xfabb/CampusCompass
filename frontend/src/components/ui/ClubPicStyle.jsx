import "react";
import ClubPhotos from "./ClubPhotos";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ClubPicStyle = () => {
  const [color, setColor] = useState(true);

  const handleColor = () => {
    setColor((prevValue) => !prevValue);
  };

  return (
    <div className="max-h-[550px] overflow-y-scroll overflow-x-hidden scroll-m-2 hide-scrollbar hover:scrollbar-thin hover:scrollbar-thumb-gray-700">
      <Link to="/servers">
        <div className="w-20 h-20 m-4 cursor-pointer bg-gray-900 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl hover:bg-gray-700 hover:text-white shadow-md transition-transform duration-300 transform hover:scale-115">
          <Plus />
        </div>
      </Link>

      {ClubPhotos.map((clubpic) => (
        <div
          key={clubpic.id}
          className="w-20 h-20 m-4 cursor-pointer bg-gray-900 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-md"
        >
          {color ? (
            <img
              className="w-20 h-20 m-4 cursor-pointer rounded-full shadow-md transition-transform duration-300 transform hover:scale-115"
              src={clubpic.imagedark}
              alt=""
              onMouseEnter={handleColor}
              onMouseLeave={handleColor}
            />
          ) : (
            <img
              className="w-20 h-20 m-4 cursor-pointer rounded-full shadow-md transition-transform duration-300 transform hover:scale-115"
              src={clubpic.image}
              alt=""
              onMouseEnter={handleColor}
              onMouseLeave={handleColor}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ClubPicStyle;
