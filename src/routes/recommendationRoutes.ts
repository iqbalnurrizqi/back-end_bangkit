import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { db } from "../config/firebaseConfig";

const router = Router();

router.post("/", authenticateToken,);

export default router;
