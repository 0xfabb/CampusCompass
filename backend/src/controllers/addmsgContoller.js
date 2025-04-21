import Chat from "../models/Chatmodel.js";
import bcrypt from "bcryptjs";

export const addMsgContorl = async (req, res) => {
  const msgData = req.body;

  const isHashedmsg = await bcrypt.hash(msgData.text, 12);
  try {
    const msgDetails = await Chat.create({
      ...msgData,
      text: isHashedmsg,
      original_text: msgData.text,
    });
    res.status(200).json({
      msg: "Your message is sent.",
      details: msgDetails,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Something is not right here",
    });
  }
};

export const getMsgControl = async (req, res) => {
  const ClubName = req.query.club;
  console.log("Checking for club name fetch", ClubName);
  try {
    const allMessages = await Chat.find({
     club: ClubName,
    });
    console.log("Checking for the type of allMessages", allMessages);
    res.status(200).json({
        messages: allMessages,
    });
  } catch (err) {
    return res.status(400).json({ 
      msg: "Message is not found",
    });
  }
};
