import "react";
import Sidebar from "../components/ui/Sidebar";

const dashboard = () => {
  return (
    <div>
      <div className="cont flex gap-4 bg-gray-900 bg-opacity-75 backdrop-blur-md  h-screen">
        <Sidebar />
        <h1 className="text-white text-4xl p-8 m-4">This is Dashboard! </h1>
      </div>
    </div>
  );
};

export default dashboard;
