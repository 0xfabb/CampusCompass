import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

export const studentLoginCheck = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password." });
    }
    const studentDetails = await Student.findOne({ email });
    if (!studentDetails) {
      return res.status(404).json({ message: "Student not found." });
    }

    const isVerified = await bcrypt.compare(password, studentDetails.password);
    if (!isVerified) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: studentDetails._id, email: studentDetails.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
