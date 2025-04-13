import jwt from "jsonwebtoken";

const jwtsecret = "Pheonix"; // Make sure this matches the one used for signing

export const ccverifycheck = (req, res) => {
  const token = req.cookies.cc_token;
  if (!token) {
    return res.status(401).json({ auth: false });
  }

  try {
    const decoded = jwt.verify(token, jwtsecret);
    return res.status(200).json({ auth: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ auth: false });
  }
};


export const cclogout = (req, res) => {
  res.clearCookie("cc_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", 
  });

  res.clearCookie("verifyStatus");

  return res.status(200).json({ message: "Logged out successfully" });
};
