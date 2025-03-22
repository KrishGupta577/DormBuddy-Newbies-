import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from 'validator'
import { mailSender } from "../utils/myMailer.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log(req.body)
        const exist = await userModel.findOne({ email })

        if (exist) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be of atleast 8 characters" })
        }

        console.log(exist)

        // Hashing Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            email: email,
            password: hashedPassword,
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, message: "User registered.", token, form: true })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exists." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Email or Password is Incorrect' })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const userDelete = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findByIdAndDelete(userId)

        if (!user) {
            return res.json({ success: false, message: 'User not found.' })
        }

        res.json({ success: true, message: 'User Deleted.' })

    } catch (error) {
        console.log(error)
    }
}

const changeTheme = async (req, res) => {
    const { userId, theme } = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { 'preferences.theme': theme },
            { new: true }
        );
        res.json({ success: true, message: 'Preferences updated', preferences: user.preferences });

    } catch (error) {
        res.json({ error: 'Failed to update preferences' });
        console.log(error)
    }
}

const profileUpdate = async (req, res) => {

    const { userId, name, monthly_income } = req.body
    try {
        const {
            name,
            email,
            age,
            gender,
            occupation,
            phone_number,
            profileUrl,
            credentialUrl,
            sleepSchedule,
            cleanliness,
            socialPreference,
            dietary,
            smoking,
            drinking,
            budget,
            location,
        } = req.body;

        // Validate required fields
        if (!name || !budget || !location) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        // // Check if email already exists
        const existingUser = await userModel.findOneAndUpdate(
            { email }, // Find user by email
            {
                name,
                age,
                gender,
                occupation,
                phone_number,
                profileUrl,
                credentialUrl,
                sleepSchedule,
                cleanliness,
                socialPreference,
                dietary,
                smoking,
                drinking,
                budget,
                location,
            },
            { new: true, upsert: true } // Return updated document & create new if not exists
        );

        res.status(201).json({success:true, message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
}


const changePassword = async (req, res) => {

    const { userId, currentPassword, newPassword } = req.body
    try {
        const user = await userModel.findById(userId)

        if (user.login_type == 'google') {
            return res.json({ success: false, message: 'Cannot change Password as User Is logged in using Google.' })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        const newPassMatch = await bcrypt.compare(newPassword, user.password)

        console.log(newPassMatch)

        if (!isMatch) {
            return res.json({ success: false, message: 'Current Password is Incorrect' })
        }

        if (newPassMatch) {
            return res.json({ success: false, message: 'New password must be different from the current password' })
        }

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(newPassword, salt)

        user.password = password
        user.save()

        res.json({ success: true, message: 'Password Changed.' })

    } catch (error) {
        console.log(error)
    }
}

export { registerUser, userLogin, userDelete, changeTheme, profileUpdate, changePassword }