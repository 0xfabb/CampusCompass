const express = require("express");

const router = express.Router();

router.get("/api/server", (req, res) => {
  return res.json("Here is the server information");
});

module.exports = router;
