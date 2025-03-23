import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import { addDormRoom, addRoommate, addTask, deleteDormRoom, findUserRoom } from '../controllers/dormRoomController.js'

const dormRoomRouter = express.Router()

dormRoomRouter.post('/add',authMiddleware,addDormRoom)
dormRoomRouter.post('/delete',authMiddleware,deleteDormRoom)
dormRoomRouter.get('/find-user-room',authMiddleware,findUserRoom)
dormRoomRouter.post('/add-roommate',authMiddleware,addRoommate)
dormRoomRouter.post('/add-task',authMiddleware,addTask)


export default dormRoomRouter