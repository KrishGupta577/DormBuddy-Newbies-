import mongoose from "mongoose";
import DormRoom from "./src/models/dormRoomModel.js"; // Adjust the path as needed

// MongoDB Connection
mongoose.connect("mongodb+srv://krishnagupta2022:krish67890@cluster0.527ki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Connection error", err));

// Sample facilities
const facilityOptions = [
  "WiFi", "Air Conditioning", "Laundry", "Shared Kitchen",
  "Gym Access", "Private Bathroom", "Study Desk", "Game Room",
  "CCTV Security", "Common Lounge"
];

// Generate 50 Dummy Dorm Rooms
const dummyRooms = Array.from({ length: 50 }, (_, i) => ({
  roomNumber: `R${100 + i}`,  // Room numbers from R100 to R149
  capacity: Math.floor(Math.random() * 4) + 1, // Random capacity (1-4)
  occupants: [], // Empty occupants initially
  rent: Math.floor(Math.random() * 3000) + 4000, // Rent between 4000-7000
  isAvailable: Math.random() > 0.3, // 70% available, 30% occupied
  facilities: facilityOptions
    .sort(() => 0.5 - Math.random()) // Shuffle facilities
    .slice(0, Math.floor(Math.random() * 4) + 1) // Pick 1-4 random facilities
}));

// Insert Data
DormRoom.insertMany(dummyRooms)
  .then(() => {
    console.log("50 Dummy Dorm Rooms Inserted Successfully!");
    mongoose.connection.close(); // Close connection
  })
  .catch((error) => console.error("Error inserting dorm rooms:", error));
