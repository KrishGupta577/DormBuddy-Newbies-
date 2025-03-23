import dormRoomModel from '../models/dormRoomModel.js'
import userModel from '../models/userModel.js'

const addDormRoom = async (req, res) => {
    try {

    } catch (error) {

    }
}

const deleteDormRoom = async (req, res) => {
    try {

    } catch (error) {

    }
}

const changeDormRoomInformation = async (req, res) => {

}

const findUserRoom = async (req, res) => {

    const { userId } = req.body

    try {
        const room = await dormRoomModel.findOne({ occupants: userId }).populate("occupants", "name email");
        if (!room) {
            return { success: false, message: "User is not assigned to any room." };
        }

        return res.json({ success: true, room });

    } catch (error) {
        console.error("Error finding user's room:", error);
        return { success: false, message: "Server error" };
    }
};


const addRoommate = async (req, res) => {
    try {
        const { userId, roommateId, dormId } = req.body;

        // Check if dorm exists and is available
        const dorm = await dormRoomModel.findById(dormId);
        if (!dorm || !dorm.isAvailable) {
            return res.status(400).json({ success: false, message: "Selected dorm is not available." });
        }

        // Update user's chosen room and roommate
        const user = await userModel.findByIdAndUpdate(userId, { dormId, roommateId }, { new: true });

        // Update the room to add the new occupant
        if (!dorm.occupants.includes(userId)) {
            dorm.occupants.push(userId);
        }
        if (!dorm.occupants.includes(roommateId)) {
            dorm.occupants.push(roommateId);
        }

        // Update dorm availability
        if (dorm.occupants.length >= dorm.capacity) {
            dorm.isAvailable = false;
        }

        await dorm.save();

        return res.status(200).json({ success: true, message: "Roommate assigned successfully!", user });
    } catch (error) {
        console.error("Error assigning roommate:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const addTask = async (req, res) => {
    try {
      const { dormId, userId, task } = req.body;
  
      if (!dormId || !userId || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Find the room
      const room = await dormRoomModel.findById(dormId);
      if (!room) return res.status(404).json({ message: "Room not found" });
  
      // Create the new task
      const newTask = {
        description : task.description,
        createdAt: new Date(),
        addedBy: userId,
        status: "pending",
      };
  
      // Add the task to the room's tasks array
      room.tasks.push(newTask);
      await room.save();
  
      res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Error saving task", error: error.message });
    }
  };


export { addDormRoom, deleteDormRoom, changeDormRoomInformation, findUserRoom, addRoommate, addTask }