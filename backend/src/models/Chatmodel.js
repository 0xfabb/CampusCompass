import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
  {
    parent_id: {
      type: Number,
      unique: false,
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
