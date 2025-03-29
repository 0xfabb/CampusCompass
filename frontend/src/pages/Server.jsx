import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import axios from "axios";
import Chat from "../components/ui/Chat";

function Server() {
  const { serverId } = useParams();
  const [serverDetails, setServerDetails] = useState("");
  const [serverName, setServerName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/server?server=${serverId}`)
      .then((Response) => {
        console.log(Response.data);
        setServerDetails(Response.data.ServerDetails);
        setServerName(Response.data.serverName);
      })
      .catch((error) => console.log("Error : ", error));
  }, [serverId]);

  return (
    <>
      <div className="flex bg-dark-2 bg-opacity-75 backdrop-blur-md min-h-screen">
        <Sidebar />
        <div className="server-details text-white p-6 flex-grow">
          <h1 className="text-3xl font-bold mb-4">Server: {serverName}</h1>
          <p className="text-lg mb-6">{serverDetails}</p>
          <Chat serverId={serverId} />
        </div>
      </div>
    </>
  );
}

export default Server;