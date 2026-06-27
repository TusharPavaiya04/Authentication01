import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { verifyMail } from '../emailVerify/verifyMail.js';

export const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword 
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "10m" }
        );

        newUser.token = token;
        await newUser.save();

        await verifyMail(token, email);

        const userResponse={
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            isVerified:newUser.isVerified
        }
        return res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email.",
            data: userResponse
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const verification = async (req, res) => {
    try {
        const { token } = req.body; // ✅ from frontend

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel.findById(decoded.id);


         if (user.token !== token) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification token"
            });
        }
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

 if (user.isVerified) {
            return res.status(200).json({
                success: true,
                message: "Email already verified"
            });
        }

        user.isVerified = true;
        user.token = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

