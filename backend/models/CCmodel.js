import mongoose from "mongoose";

const classcoordinator = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    department: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    teacherEmail: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ClassCoordinator = mongoose.model("classcoordinator", classcoordinator);

classcoordinator.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.__v;
      delete ret.isVerified;
      return ret;
    },
  });
export default ClassCoordinator;
