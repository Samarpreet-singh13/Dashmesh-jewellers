import express from "express";
import { submitInquiry, getInquiries, updateInquiryStatus } from "../controllers/inquiryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitInquiry); // Public route for customers
router.get("/", authMiddleware, getInquiries); // Protected route for admin
router.put("/:id", authMiddleware, updateInquiryStatus); // Protected route for admin

export default router;
