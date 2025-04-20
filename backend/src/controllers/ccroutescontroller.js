import ClassCoordinator from "../models//CCmodel.js";
import Student from "../models/Student.js";
import { classCoordinatorSchema } from "../validations/ccValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET_KEY;
console.log("The secret was found and it is - ", jwtsecret);

export const newCC_control = async (req, res) => {
  const newCCdetails = req.body;
  console.log(newCCdetails);

  const newCCparsed = classCoordinatorSchema.safeParse(newCCdetails);
  console.log(newCCparsed);
  if (!newCCparsed.success) {
    return res.status(400).json({ error: newCCparsed.error.errors });
  }
  try {
    const { password, ...rest } = newCCparsed.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newCC = await ClassCoordinator.create({
      ...rest,
      password: hashedPassword,
      isVerified: false,
    });
    console.log(newCC);
    const token = jwt.sign(
      { teacherEmail: newCC.teacherEmail, id: newCC._id },
      jwtsecret,
      { expiresIn: "7d" }
    );
    console.log(token);

    res.cookie("cc_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("verifyStatus", newCC.isVerified, {
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      msg: "Class Coordinator Sign Up is success!",
      token: token,
      details: newCC,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Error signing up" });
  }
};

export const ccdatacontrol = async (req, res) => {
  const token = req.cookies.cc_token;
  console.log("The token recieved for ccdata is", token);
  try {
    const decoded = jwt.verify(token, jwtsecret);
    const email = decoded.teacherEmail;
    console.log("The details are - ", decoded, email);

    const ccdetails = await ClassCoordinator.findOne({ teacherEmail: email });
    if (!ccdetails) {
      return res.status(401).json({
        msg: "Class Coordinator not registered",
      });
    }
    const isVerified = ccdetails.isVerified;

    res.status(200).json({
      success: true,
      ccdata: ccdetails,
      verificationStatus: isVerified,
    });
  } catch (error) {
    res.status(401).json({ msg: "No Class Coordinator is Registered" });
  }
};

export const ccloginControl = async (req, res) => {
  const { teacherEmail, password } = req.body;
  try {
    const ccdetails = await ClassCoordinator.findOne({ teacherEmail });
    if (!ccdetails) {
      res.status(401).json({
        msg: "Class Coordinator not registered",
      });
    }
    const isVerified = ccdetails.isVerified;

    const isMatch = await bcrypt.compare(password, ccdetails.password);
    if (!isMatch) {
      res.status(401).json({
        msg: "Invalid Password Entered",
      });
    }
    const token = jwt.sign(
      { teacherEmail: teacherEmail, id: ccdetails._id },
      jwtsecret,
      { expiresIn: "7d" }
    );

    res.cookie("cc_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("verifyStatus", isVerified, {
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      ccdata: ccdetails,
      token: token,
      verificationStatus: isVerified,
    });
  } catch (error) {
    res.status(401).json({ msg: "No Class Coordinator is Registered" });
  }
};

export const classDataControl = async (req, res) => {
  const token = req.cookies.cc_token;
  console.log("The token for class data exists ", token);
  try {
    const decoded = jwt.verify(token, jwtsecret);
    const email = decoded.teacherEmail;
    console.log("Teacher's email was found here - ", email);
    const teacherDetails = await ClassCoordinator.findOne({
      teacherEmail: email,
    });
    const className = teacherDetails.section;
    const branch = teacherDetails.department;
    console.log("The section was found here - ", className, branch);
    const Students = await Student.find({
      class: className,
      department: branch,
    });
    const studentNames = [];
    for (let i = 0; i < Students.length; i++) {
      studentNames.push(Students[i].fullname);
    }
    console.log("Students collected were - ", studentNames);
    res.status(200).json({
      Msg: "Fetched the list of students in this section",
      students: studentNames,
    });
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

export const removeStudentControl = async (req, res) => {
  const token = req.cookies.cc_token;
  if (!token) {
    return res.status(400).json("Unauthorized Access");
  }
  console.log("Token for removing this student found - ", token);
  const decoded = jwt.verify(token, jwtsecret);
  const email = decoded.teacherEmail;
  const teacherFound = await ClassCoordinator.findOne({ teacherEmail: email });
  if (!teacherFound) {
    return res.status(400).json("No such teacher exists");
  } else {
    const studentDet = req.body;

    if (!studentDet) {
      return res.status(400).json({
        msg: "Please send the details of the students",
      });
    }
    console.log("Student's details are found and these are - ", studentDet);
    try {
      const studentName = studentDet.fullname;
      const student = await Student.findOne({ fullname: studentName });
      if (!student) {
        return res.status(400).json({
          msg: "No such user is found",
        });
      }
      console.log("Student details are found - ", student);
      await Student.deleteOne({ fullname: studentName });
      res.status(200).json({
        msg: "Student was removed successfully",
      });
    } catch (error) {
      return res.status(400).json("Something went wrong...");
    }
  }
};
