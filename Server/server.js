import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from 'cors'
import { connectDB } from "./src/config/db.js"
import userRouter from "./src/routers/userRoutes.js"
import dormRoomRouter from "./src/routers/dormRoomRouter.js"


const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/user',userRouter)
app.use('/api/dormRoom',dormRoomRouter)


app.get('/',(req,res) => {
    res.send("Welcome to the Finance Tracker")
})

app.listen(PORT,() => {
    console.log(`Server started on http://localhost:${PORT}`);
    
})