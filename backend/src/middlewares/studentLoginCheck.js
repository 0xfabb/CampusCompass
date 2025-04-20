import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET_KEY;
console.log("The secret was found and it is - ", jwtsecret);

export const studentLoginCheck = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token from login check for student is - ", token);

    if (!token) {
      return res.status(400).json({ message: "NO token found" });
    }
    const decoded = jwt.verify(token, jwtsecret);
    const email = decoded.email;
    console.log(email);
    

    if (!email) {
      return res.status(400).json({ message: "email can't be loaded." });
    }
    const studentDetails = await Student.findOne({ email });
    if (!studentDetails) {
      return res.status(404).json({ message: "Student not found." });
    }

    next();
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
