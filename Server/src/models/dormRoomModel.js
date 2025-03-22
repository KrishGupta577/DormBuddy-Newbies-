import mongoose from "mongoose";

const dormRoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  occupants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  rent: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  facilities: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DormRoom = mongoose.model("DormRoom", dormRoomSchema);

export default DormRoom;
