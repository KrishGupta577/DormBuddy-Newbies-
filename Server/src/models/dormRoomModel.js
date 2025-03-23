import mongoose from "mongoose";

const dormRoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
      default: 2
    },
    occupants: {
      type: [String],
      validate: {
        validator: function (occupants) {
          // Check that the number of occupants doesn't exceed the capacity
          return occupants.length <= this.capacity;
        },
        message: props => `A room can have a maximum of ${props.this.capacity} occupants.`
      }
    },
    rent: {
      type: Number,
      required: true,
      min: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    facilities: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      trim: true
    },
    floor: {
      type: Number,
      default: 1
    },
    building: {
      type: String,
      default: "Main"
    },
    tasks: [
      {
        description: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" }
      }
    ],
    maintenances: [
      {
        issue: { type: String, required: true }, // Description of the maintenance issue
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who reported it
        status: {
          type: String,
          enum: ["pending", "in-progress", "completed"],
          default: "pending"
        }, // Tracks status
        dateSubmitted: { type: Date, default: Date.now }, // When it was reported
        resolvedAt: { type: Date } // When it was resolved
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const DormRoomModel = mongoose.model("DormRoom", dormRoomSchema);

export default DormRoomModel;