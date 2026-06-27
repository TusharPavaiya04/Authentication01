import express from 'express';
import { changePassword, forgotPassword,registerUser,verification,loginUser,logoutUser,verifyOtp } from '../Contoller/userController2.js';

const router=express.Router();

router.post('/register',registerUser);
router.post('/verify/:token',verification);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/verify-otp',verifyOtp);
router.post('/changePassword',changePassword);
router.post('/forgot-password',forgotPassword);

export default router;