const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json("This is Homepage");
});

router.get("/server", (req, res) => {
  const serverId = Number(req.query["server"]);
  res.json({
    ServerDetails: `Here is the data for this particular server with id as ${serverId}`,
  });
  console.log("The server is hit");
});

module.exports = router;
