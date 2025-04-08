import express from "express";
import { ccfetchControl } from "../controllers/ccFetchController.js";

const router = express.Router();

router.get("/uvcc", ccfetchControl);

export default router;
