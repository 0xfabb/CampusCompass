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


router.get("/data", async (req, res) => {
  try {
      const db = req.app.locals.db; // Access the database from the Express app
      const collection = db.collection("Servers");
      const data = await collection.find({}).toArray();
      res.json(data);
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
});

module.exports = router;
