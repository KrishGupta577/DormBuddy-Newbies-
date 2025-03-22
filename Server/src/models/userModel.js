import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      return this.login_type === 'email'; // Password required only for email login
    },
  },
  age: {
    type: Number,
    min: 16, // Ensures valid age
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  occupation: {
    type: String,
    default: "Unemployed",
  },
  phone_number: {
    type: String,
    trim: true,
  },
  profileUrl: {
    type: String,
    default: "",
  },
  credentialUrl: {
    type: String,
    default: "",
  },
  sleepSchedule: {
    type: String,
    enum: ["Night Owl", "Early Bird"],
  },
  cleanliness: {
    type: String,
    enum: ["Messy", "Clean", "Very Clean"],
  },
  socialPreference: {
    type: String,
    enum: ["Introvert", "Extrovert", "Neutral"],
  },
  dietary: {
    type: String,
    enum: ["Veg", "Non-Veg", "Vegan"],
  },
  smoking: {
    type: Boolean,
    default: false,
  },
  drinking: {
    type: Boolean,
    default: false,
  },
  budget: {
    type: Number,
    min: 1000, // Minimum budget for validation
  },
  location: {
    type: String,
  },
}, { timestamps: true });

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);
export default UserModel;
