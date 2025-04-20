import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
console.log("The secret was found and it is - ", JWT_SECRET);

export const addFollowControl = async (req, res) => {
  try {
    const { serverId, name } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const alreadyFollowing = student.discordServers.some(
      (server) => server.serverId === serverId
    );

    if (!alreadyFollowing) {
      student.discordServers.push({ name, serverId });
      await student.save();
    }

    res.status(200).json({
      message: "Server followed successfully",
      followed: student.discordServers,
    });
  } catch (err) {
    console.error("Add Follow Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFollowControl = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      res.status(401).json("Unauthorized, Login First");
    }
    const email = decoded.email;
    const student = await Student.findOne({ email });
    console.log(student.fullname);
    console.log(student.discordServers);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json({
      followedServers: student.discordServers,
      name: student.fullname,
    });
  } catch (err) {
    return res.status(500).json("Server Error");
  }
};
