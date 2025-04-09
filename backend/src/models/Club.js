import mongoose from "mongoose";

const clubschema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    clubName: {
      type: String,
      required: true,
      unique: true,
    },
    clubData: {
      type: String,
      required: true,
    },
    memberCount: {
      type: Number,
    },
    clubSec: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubschema);
export default Club;
