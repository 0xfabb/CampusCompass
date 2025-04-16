import "react";
import { useState } from "react";
import axios from "axios";

const FollowButton = ({ serverId, name }) => {
  const [follow, setFollow] = useState(false);
  const [followCount, setFollowCount] = useState(false);

  const FollowToggle = async () => {
    const data = {
      serverId: serverId,
      name: name,
    };

    try {
      setTimeout(async () => {
        setFollowCount((prev) => !prev);
        setFollow((prev) => !prev);

        await axios.post("http://localhost:3000/api/student/addfollow", data, {
          withCredentials: true,
        });

        alert(followCount ? "Left Server" : "Joined Server");
      }, 600);
    } catch (error) {
      console.error("Error while following/unfollowing:", error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div>
      <button
        className="btn relative py-2 px-4 border-white border-[1px] bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 w-36 h-12 rounded-2xl cursor-pointer text-white text-center font-bold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        onClick={FollowToggle}
      >
        <h3 className="text-sm">{follow ? "Leave Server" : "Join Server"}</h3>
      </button>
    </div>
  );
};

export default FollowButton;
