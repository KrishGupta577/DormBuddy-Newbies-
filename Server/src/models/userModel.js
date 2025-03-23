import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    age: { type: Number, min: 16 },
    gender: { type: String, enum: ["male", "female", "other"], },
    occupation: { type: String, enum: ["student", "job", "unemployed"], default: "student" },
    phone_number: { type: String, trim: true },
    profileUrl: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },

    sleepSchedule: {
      type: String,
      enum: ["night owl", "early bird"],
      default: "night owl",
    },
    cleanliness: {
      type: String,
      enum: ["messy", "clean", "very clean"],
      default: "clean",
    },
    socialPreference: {
      type: String,
      enum: ["introvert", "extrovert", "neutral"],
      default: "neutral",
    },
    dietary: {
      type: String,
      enum: ["veg", "non-veg", "vegan", "No Preference"],
      default: "No Preference",
    },

    smoking: { type: Boolean, default: false },
    drinking: { type: Boolean, default: false },
    budget: { type: Number, min: 1000, max: 50000, },
    location: { type: String, default: "Not Specified" },
    dormId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DormRoom',
      default: null
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);
export default UserModel;
