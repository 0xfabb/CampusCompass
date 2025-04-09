import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    parent_id: {
      type: Number,
      unique: false,
      required: true,
    },
    text: {
      type: String,
      required: true,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    original_text: {
      type: String, 
      required: true,
    },
    sent_by: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Msg = mongoose.model("msg", msgSchema);
export default Msg;
