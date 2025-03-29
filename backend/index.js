const express = require("express");
const homeRoute = require("./routes/home");
const dataRoute = require("./routes/data")
const cors = require("cors");
require('dotenv').config();
const connectToMongoDb = require("./connection");

const app = express();
app.use(cors());

const requestCounts = {};

app.use((req, res, next) => {
    const route = req.path;
    requestCounts[route] = (requestCounts[route] || 0) + 1;
    console.log(`Route: ${route} | Request Count: ${requestCounts[route]}`);
    next();
});

// Initialize MongoDB connection before starting the server
 connectToMongoDb().then((db) => {
    if (!db) {
        console.error("Failed to connect to MongoDB");
        process.exit(1);
    }

    
    app.locals.db = db;

    app.use("/", homeRoute);
    app.use("/server", homeRoute);
    app.use("/data", dataRoute);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
});
