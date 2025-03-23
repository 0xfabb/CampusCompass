const express = require("express");
const serverRoute = require("./routes/home");
const homeRoute = require("./routes/home");
const cors = require("cors");

const app = express();
app.use(cors());

const requestCounts = {};

app.use((req, res, next) => {
  const route = req.path;

  if (!requestCounts[route]) {
    requestCounts[route] = 1;
  } else {
    requestCounts[route]++;
  }

  console.log(`Route: ${route} | Request Count: ${requestCounts[route]}`);

  next();
});

app.use("/", homeRoute);
app.use("/server", serverRoute);

app.listen(process.env.PORT || 5001, (req, res) =>
  console.log("Server is running on Port 5001")
);
