import ClassCoordinator from "../models/CCmodel.js";

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
