import ClassCoordinator from "../models//CCmodel.js";
import { classCoordinatorSchema } from "../validations/ccValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = "Pheonix";

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
    console.log(hashedPassword)

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

