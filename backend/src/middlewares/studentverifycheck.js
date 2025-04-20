import jwt from "jsonwebtoken";


export const studentverifycheck = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("This is mine", token);

  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  console.log("The secret was found and it is - ", JWT_SECRET);

  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    console.log(email);
    res.status(200).json({
      msg: "THe is already logged in"
    });
    
    req.user = decoded; // Optionally attach user info to `req` for later use
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ auth: false, message: "Invalid token" });
  }
};
