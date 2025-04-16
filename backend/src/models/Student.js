import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  discordServers: [{
    name: { type: String, required: true },
    serverId: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
  }]
});


studentSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
