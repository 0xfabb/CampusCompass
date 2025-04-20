import express from "express";
import {
  newCC_control,
  ccdatacontrol,
  ccloginControl,
  classDataControl,
  removeStudentControl
} from "../controllers/ccroutescontroller.js";
import { ccverifycheck, cclogout } from "../middlewares/ccverifycheck.js";
const router = express.Router();

router.post("/ccsignup", newCC_control);
router.post("/cclogin", ccloginControl)
router.get("/ccdata" ,ccdatacontrol);
router.get("/classdata", classDataControl);
router.post("/remove-student", removeStudentControl)
router.get("/check-auth", ccverifycheck);
router.get("/cclogout", cclogout );


export default router;
