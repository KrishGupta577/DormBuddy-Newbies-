import express from 'express'
import { changePassword, changeTheme, profileUpdate, registerUser, userDelete, userLogin } from '../controllers/userController.js'
import authMiddleware from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.post('/delete',authMiddleware,userDelete)
userRouter.post('/preferences',changeTheme)
userRouter.post('/profile-update',profileUpdate)
userRouter.post('/change-password',authMiddleware,changePassword)

export default userRouter