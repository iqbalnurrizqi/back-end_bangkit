import {  Router } from "express";
import { forgotPassword, loginAuth, registerAuth } from "../controller/auth.controller";
import { authenticateToken } from "../middleware/authMiddleware";


const router = Router();

// Register User
router.post("/register", registerAuth);

// Login User
router.post("/login", loginAuth);

// Forgot Password Endpoint
router.post("/forget-password", forgotPassword);


export default router;
