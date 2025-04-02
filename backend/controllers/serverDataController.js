import Club from "../models/Club.js";
import extractedServerId from "../routes/club.js";


const addserverControl = async (req, res) => {
    const clubdetails = req.body;
    const newClub = await Club.create(clubdetails);
    console.log(
      `Club with these details have been added to the database - ${JSON.stringify(
        newClub,
        null,
        2
      )}`
    );
    res.json({
      msg: "Added the club",
    });
  }















async (req, res) => {
  const id = extractedServerId;

  try {
    const server = Club.findById(id);
    if (!server) {
      console.log("There is no such Server");
    } else {
      console.log("Server with this id is found - ", server);
    }
  } catch {}
};
export default serverDataController;
