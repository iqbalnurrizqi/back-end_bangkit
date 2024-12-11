
// Endpoint yang memerlukan autentikasi
import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { getProfile, updateProfile } from "../controller/profile.controller";

const router = Router();

// Get Profile Endpoint
router.get("/", authenticateToken, getProfile
);

// Update Profile Endpoint
<<<<<<< HEAD
router.put("/", authenticateToken, updateProfile);
=======
router.put("/", updateProfile);



>>>>>>> 436bc12c236936ddc5fa695960915ee183b3379c

export default router;

