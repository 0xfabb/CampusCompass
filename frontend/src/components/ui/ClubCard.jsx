import "react";
import FollowButton from "./FollowButton";
import Clubs from "./Clubs";

const ClubCard = () => {
  return (
    <div className="content-center">
      <div className="gap-2 flex flex-col">
        {Clubs.map((club) => (
          <div
            key={club.id}
            className="bg-gray-800 bg-opacity-75 backdrop-blur-md text-white w-[400px] md:w-[480px] lg:w-[820px] h-[220px] p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform"
          >
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 font-bold text-lg">
                📌
              </div>

              <div className="flex flex-col justify-between flex-1">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-400">
                  {club.clubname}
                </h2>
                <p className="text-gray-300 text-sm">{club.Description}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <FollowButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubCard;
