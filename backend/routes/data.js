const express = require("express");
const router = express.Router();

router.get("/data", async (req, res) => {
    try {
        const db = req.app.locals.db; 
        const collection = db.collection("Servers");
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data from MongoDB" });
    }
});

module.exports = router;
