const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectToMongoDb() {
    try {
        if (!db) {
            await client.connect();
            console.log("Connected to MongoDB");
            db = client.db("ServersData"); // Store DB instance globally
        }
        return db;
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectToMongoDb;
