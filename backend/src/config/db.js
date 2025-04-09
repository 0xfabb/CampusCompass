import mogoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mogoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb Connected - ${conn.connection.host}`);
  } catch (error) {
    console.log("An error with MongoDB", error);
  }
};



export default connectDB;
