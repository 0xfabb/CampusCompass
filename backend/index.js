import express from "express";
import connectDB from "./config/db.js";
import homeRoute from "./routes/home.js";
import serverRoute from "./routes/club.js";
import ccRoute from "./routes/ccpart.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
connectDB();


const requestCounts = {};

app.use((req, res, next) => {
  const route = req.path;
  requestCounts[route] = (requestCounts[route] || 0) + 1;
  console.log(`Route: ${route} | Request Count: ${requestCounts[route]}`);
  next();
});

app.use("/", homeRoute);
app.use("/api", serverRoute);
app.use("/api", ccRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
