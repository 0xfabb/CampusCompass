import Club from "../models/Club.js";
import {
  addClubSchema,
  getClubSchema,
} from "../validations/clubVerification.js";

export const addserverControl = async (req, res) => {
  try {
    const validatedClub = addClubSchema.safeParse(req.body);
    if (!validatedClub.success) {
      return res.status(400).json({ error: validatedClub.error.errors });
    }

    const lastclub = await Club.findOne().sort({ id: -1 });
    const newId = lastclub ? lastclub.id + 1 : 1;
    const newClub = await Club.create({ id: newId, ...validatedClub.data });
    res.status(201).json({ msg: "Club added successfully", club: newClub });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.errors ? error.errors : error.message });
  }
};

export const getserverdataControl = async (req, res) => {
  try {
    const validatedClubdetails = getClubSchema.safeParse({
      serverId: Number(req.query["server"]),
    });
    if (!validatedClubdetails.success) {
      return res
        .status(400)
        .json("Server id provided does not match any server");
    }
    const clubdetails = await Club.findOne({
      id: validatedClubdetails.data.serverId,
    });

    if (!clubdetails) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.json({ ServerDetails: clubdetails });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.errors ? error.errors : error.message });
  }
};

export const getserversearchcontrol = async (req, res) => {
  const searchServerName = req.query["name"];
  try {
    const fetchedServer = await Club.findOne({ clubName: searchServerName });
    if (!fetchedServer) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json({ ServerDetails: fetchedServer });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.errors ? error.errors : error.message });
  }
};
