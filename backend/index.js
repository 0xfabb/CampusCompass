import express from "express";
import connectDB from "./config/db.js";
import homeRoute from "./routes/home.js";
import serverRoute from "./routes/club.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

const requestCounts = {};

app.use((req, res, next) => {
  const route = req.path;
  requestCounts[route] = (requestCounts[route] || 0) + 1;
  console.log(`Route: ${route} | Request Count: ${requestCounts[route]}`);
  next();
});

app.use("/", homeRoute);
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });
app.use("/api", serverRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
