import ClassCoordinator from "../models/CCmodel.js";
import { classCoordinatorSchema } from "../validations/ccValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = "Pheonix";

export const newCC_control = async (req, res) => {
  const newCCdetails = req.body;

  const newCCparsed = classCoordinatorSchema.safeParse(newCCdetails);
  if (!newCCparsed.success) {
    res.status(401).json({ error: newCCparsed.error.errors });
  }
  try {
    const { password, ...rest } = newCCparsed.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCC = await ClassCoordinator.create({
      ...rest,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { teacherEmail: newCC.teacherEmail, id: newCC._id },
      jwtsecret,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      msg: "Class Coordinator Sign Up is success!",
      Token: token,
      details: newCC,
    });
  } catch (error) {
    res.status(400).json({ msg: "There is some problem" });
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
      ccdata: ccdetails,
      token: token,
      verificationStatus: isVerified,
    });
  } catch (error) {
    res.status(401).json({ msg: "No Class Coordinator is Registered" });
  }
};

