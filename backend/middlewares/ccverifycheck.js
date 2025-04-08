export const ccverifycheck = (req, res) => {
  const ccToken = res.cookies;
  if (!ccToken) {
    res.status(400).json({
      msg: "Access to resource denied, please login first",
    });
  }
};
