import { useState, useEffect } from "react";
import axios from "axios";
import { Send } from "react-feather";

function Chat({ serverId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMsg = async () => {
      const res = await axios.get(
        `http://localhost:3001/api/chat/getmsg?club=CodingClub`
      );
      try {
        console.log(res.data.messages);
        const messageArray = res.data.messages;
        console.log(messageArray);

        setMessages(messageArray);
      } catch (error) {
        console.log("There is this error ", error);
      }
    };
    fetchMsg();
  }, []);

  return (
    <div className="chat-container bg-dark-3 p-6 rounded-lg shadow-lg flex flex-col h-[820px]">
      <h2 className="text-2xl font-bold text-white mb-4">Announcements</h2>
      <div className="messages overflow-y-auto bg-dark-4 p-4 rounded-lg flex-1">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className="message p-4 my-3 bg-dark-5 rounded-lg shadow-md"
            >
              <p className="text-sm text-gray-400 mb-1">
                {new Date(message.timestamp).toLocaleString()}
              </p>
              <p className="text-white text-lg">{message.original_text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No announcements yet.</p>
        )}
      </div>

      <div className="mt-4 flex justify-between rounded-full ">
        <input
          type="text"
          placeholder="  Type a message..."
          className="w-full h-18 bg-dark-2 text-white rounded-2xl p-5 outline-none"
        />
        <div className="p-5 bg-red-500 text-gray-50 mr-4 rounded-2xl ">
          <button className="flex gap-3 cursor-pointer ">
            <Send /> <p className="text-xl font-bold">Send</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
