import { useParams } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";


function ServerDetails() {
  const { serverId } = useParams();

  return (
    <>
    <div className="flex  bg-dark-2 bg-opacity-75 backdrop-blur-md">
        <Sidebar />
    <div className="server-details  text-white p-6">
      <h1 className="text-2xl font-bold">Server: {serverId}</h1>
      <p>Content for server {serverId} will be displayed here...</p>
    </div>
    </div>
    </>
  );
}

export default ServerDetails;
