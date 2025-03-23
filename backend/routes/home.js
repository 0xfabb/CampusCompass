const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json("This is Homepage");
});

router.get("/server", (req, res) => {
  const serverId = Number(req.query["server"]);
  if (serverId === 1) {
    res.json({
      serverName: "The Pheonix Club",
      ServerDetails:
        "The Phoenix Club is a dynamic programming community dedicated to fostering innovation, collaboration, and skill-building among tech enthusiasts. Rising from the ashes of conventional learning, we provide a space where developers of all levels can explore coding, open-source contributions, hackathons, and cutting-edge technologies.",
    });
  } else {
    res.json(
      `Here is the data for this particular server with id as ${serverId}`
    );
  }
  console.log("The server is hit");
});

module.exports = router;
