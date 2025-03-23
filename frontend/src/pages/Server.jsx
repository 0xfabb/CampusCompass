import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import axios from "axios";

function ServerDetails() {
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
      <div className="flex  bg-dark-2 bg-opacity-75 backdrop-blur-md">
        <Sidebar />
        <div className="server-details  text-white p-6">
          <h1 className="text-2xl font-bold ">Server: {serverName}</h1>
          <p className="pt-3 mt-2">{serverDetails}</p>
        </div>
      </div>
    </>
  );
}

export default ServerDetails;
