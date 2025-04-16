export const studentverifycheck = async (req, res) => {
  const token = req.cookies.token;
  console.log("This is mine" , token);
  
  if (!token) {
    return res.status(401).json({ auth: false });
  }

  try {
    const decoded = await jwt.verify(token, jwtsecret);
    return res.status(200).json({ auth: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ auth: false });
  }
};