import ClassCoordinator from "../models/CCmodel.js";
import Authority from "../models/AuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET_KEY;
console.log("I have also got the key as - ", jwtsecret);

export const ccfetchControl = async (req, res) => {
  try {
    const unVerifiedCC = await ClassCoordinator.find({
      isVerified: false,
    });
    res.status(200).json({
      msg: "This is the list of unverified CCs",
      data: unVerifiedCC,
    });
  } catch (err) {
    res.status(401).json({
      msg: "Some error while fetching the CCs",
    });
  }
};

export const authLoginControl = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json("Please enter the details for user");
  }
  try {
    const AuthEmail = data.authEmail;
    const password = data.password;
    console.log("This is the fetched auth email - ", AuthEmail);
    const authDetails = await Authority.findOne({ email: AuthEmail });
    console.log("Found details and these are - ", authDetails);
    const hashedPass = authDetails.passwordHash;
    console.log("Found hashed password - ", hashedPass);
    const isVerified = await bcrypt.compare(password, hashedPass);
    console.log("The verification state is - ", isVerified);
    if (!isVerified) {
      res.status(400).json("The passwords do not match");
    }
    const token = jwt.sign({ email: AuthEmail }, jwtsecret, {
      expiresIn: "7d",
    });
    console.log("The token was generated successfully - ", token);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      msg: "Found the auth account",
      details: "Fuck! you don't need to know this",
    });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getAuthControl = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
  }
  console.log("Found the Auth token from API", token);
  try {
    const decoded = await jwt.verify(token, jwtsecret);
    const authEmail = decoded.email;
    console.log("The email found from JWT", authEmail);
    if (!authEmail) {
      res.status(400).json("Auth email verification error through the JWT");
    }
    res.status(200).json("The auth account exists");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
