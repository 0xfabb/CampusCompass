const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("This is Homepage");
});

app.listen(process.env.PORT || 5001, (req, res) =>
  console.log("Server is running on Port 5001")
);
