import express from "express";
import { newCC_control, ccdatacontrol } from "../controllers/ccroutescontroller.js";
const router = express.Router();

router.post("/ccsignup", newCC_control);
router.get("/ccdata", ccdatacontrol );

export default router;
