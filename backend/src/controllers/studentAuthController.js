import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = "Pheonix";

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
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultServer = {
        name: `${department} - ${className}`, // Ex: ECE - A2
        serverId: `${department.toLowerCase()}-${className.toLowerCase()}`, // Ex: ece-a2
      };

    const newStudent = new Student({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      department: department,
      class: className,
      discordServers: [defaultServer]
    });

    await newStudent.save();
    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      message: "Student registered successfully.",
      detaials: studentDetails,
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
