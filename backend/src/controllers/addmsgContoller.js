import { text } from "express";
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
  const textId = Number(req.query.id);
  try {
    const textMsg = await Chat.findOne({
      id: textId,
    });
    const PlainText = textMsg.original_text;
    const msg = textMsg.text;
    const unHashedText = await bcrypt.compare(PlainText, msg);
    res.status(200).json({
      msg: "Message found",
      msg2: unHashedText,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Message is not found",
    });
  }
};
