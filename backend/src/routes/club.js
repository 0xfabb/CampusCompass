import express from "express";
import {
  addserverControl,
  getserverdataControl,
  getserversearchcontrol,
} from "../controllers/serverDataController.js";

const router = express.Router();

router.post("/addserver", addserverControl);
router.get("/serverdata", getserverdataControl);
router.get("/searchserver", getserversearchcontrol)

export default router;
