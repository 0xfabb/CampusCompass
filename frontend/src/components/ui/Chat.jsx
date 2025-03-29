import { useState, useEffect } from "react";
import axios from "axios";

function Chat({ serverId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/messages?serverId=${serverId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => console.log("Error fetching messages:", error));
  }, [serverId]);

  return (
    <div className="chat-container bg-dark-3 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Announcements</h2>
      <div className="messages overflow-y-auto h-[720px] bg-dark-4 p-4 rounded-lg">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className="message p-4 my-3 bg-dark-5 rounded-lg shadow-md"
            >
              <p className="text-sm text-gray-400 mb-1">
                {new Date(message.timestamp).toLocaleString()}
              </p>
              <p className="text-white text-lg">{message.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No announcements yet.</p>
        )}
      </div>
    </div>
  );
}

export default Chat;