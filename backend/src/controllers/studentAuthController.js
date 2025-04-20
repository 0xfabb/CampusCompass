import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
console.log("The secret was found and it is - ", JWT_SECRET);

let firstClass = 12;
export const studentSignUpControl = async (req, res) => {
  try {
    const studentDetails = req.body;
    if (!studentDetails) {
      res.status(401).json("Please fill all the details");
    }
    const {
      fullname,
      email,
      password,
      department,
      class: className,
    } = studentDetails;
    console.log(studentDetails);
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newId = firstClass++;

    const defaultServer = {
      name: `${department} - ${className}`,
      serverId: newId,
    };

    const newStudent = new Student({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      department: department,
      class: className,
      discordServers: [defaultServer],
    });

    await newStudent.save();
    console.log(newStudent);
    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "Student registered successfully.",
      details: studentDetails,
      token: token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const studentLoginControl = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json("Please enter the details");
    }
    const studentDetails = await Student.findOne({ email: email });
    const isVerified = await bcrypt.compare(password, studentDetails.password);
    if (!isVerified) {
      return res.status(401).json({ msg: "Wrong Password Entered" });
    }
    const token = jwt.sign(
      { id: studentDetails._id, email: studentDetails.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful.",
      student: {
        id: studentDetails._id,
        fullname: studentDetails.fullname,
        email: studentDetails.email,
        department: studentDetails.department,
        class: studentDetails.class,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const logoutStudentControl = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("This is the logout fetched token - ", token);
    if (!token) {
      return res.status(400).json({ message: "No token found to clear" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", 
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", err);
    return res
      .status(500)
      .json({ message: "Logout failed due to server error" });
  }
};
