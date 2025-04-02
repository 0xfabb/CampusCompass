import express from "express";
import Club from "../models/Club.js";

const router = express.Router();

let serverId;

router.post("/addserver", );

router.get("/serverdata", async (req, res) => {
  serverId = Number(req.query["server"]);
  const clubdetails = await Club.findOne({ id: serverId });

  res.json({
    ServerDetails: `Here is the data for this particular server with id as ${serverId}, details - ${JSON.stringify(
      clubdetails,
      null,
      2
    )}`,
  });
});

export default router;
export const extractedServerId = serverId;
