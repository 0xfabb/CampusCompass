import Sidebar from "../components/ui/Sidebar";
import "react";

const Idle = () => {
  return (
    <>
      <div className="cont flex flex-wrap gap-3.5 bg-gray-900 bg-opacity-75 backdrop-blur-md min-h-screen">
        <Sidebar />

        <h1 className="text-white text-4xl p-8 m-4">This is Idle Screen</h1>
      </div>
    </>
  );
};

export default Idle;
