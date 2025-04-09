import express from "express";
import {
  addMsgContorl,
  getMsgControl,
} from "../controllers/addmsgContoller.js";

const router = express.Router();

router.post("/addmsg", addMsgContorl);
router.get("/getmsg", getMsgControl);

export default router;
