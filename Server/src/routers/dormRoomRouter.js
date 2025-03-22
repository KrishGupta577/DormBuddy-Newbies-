import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import { addDormRoom, deleteDormRoom } from '../controllers/dormRoomController.js'

const dormRoomRouter = express.Router()

dormRoomRouter.post('/add',authMiddleware,addDormRoom)
dormRoomRouter.post('/delete',authMiddleware,deleteDormRoom)


export default dormRoomRouter