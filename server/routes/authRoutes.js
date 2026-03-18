import express from "express";
import { loginAdmin, registerAdmin, loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// Admin specialized login
router.post("/login", loginAdmin);
// router.post("/register", registerAdmin); // Can be enabled manually to create the first admin

// Public Customer login/register
router.post("/user/login", loginUser);
router.post("/user/register", registerUser);

export default router;
