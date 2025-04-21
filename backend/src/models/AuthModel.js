import mongoose from "mongoose";

const AuthoritySchema = new mongoose.Schema({
  authorityName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  recoveryEmail: {
    type: String,
    required: true
  },
  recoveryMobile: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'moderator'], 
    default: 'admin'
  },
  accessLevel: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  accountLocked: {
    type: Boolean,
    default: false
  }
});

const Authority =  mongoose.model('Authority', AuthoritySchema);

export default Authority;