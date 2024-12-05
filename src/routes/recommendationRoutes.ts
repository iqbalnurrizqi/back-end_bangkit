import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { db } from "../config/firebaseConfig";
import { recommendationController } from "../controller/recommendation.controller";

const router = Router();

router.post("/", authenticateToken, recommendationController);

export default router;
