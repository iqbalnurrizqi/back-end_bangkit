import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { addNewUser, deleteUser, getAllUsers, updateUser } from "../controller/user.controller";
import { getProfileData, updateProfile, updateProfileData } from "../controller/profile.controller";
import multer from "multer";



const router = Router();

// Get All  (DONE)
router.get("/", authenticateToken, getAllUsers);

// Add New User (DONE)
router.post("/", addNewUser);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);


// Get Profile Data
router.get("/profile",authenticateToken, getProfileData );

// Untuk memperbarui data profil pengguna
router.put("/profile",authenticateToken, updateProfile);

// Setup Multer for file upload
const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter: (req, file, cb) => {
        console.log("File received:", file); // Debug: Log file info
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG or PNG images are allowed."));
        }
    },
});

// Upload/Update Profile Photo
router.post("/profile/photo", authenticateToken, upload.single("photo"), (req, res) => {
    console.log("File received:", req.file);
    res.status(200).send("Photo uploaded successfully!");
});

export default router;
