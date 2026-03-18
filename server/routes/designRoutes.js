import express from "express";
import upload from "../middleware/upload.js";

import {
addDesign,
getDesigns,
deleteDesign,
updateDesign,
getDesignByCategory,
getSingleDesign
} from "../controllers/designController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/add", authMiddleware, upload.single("image"), addDesign);
router.get("/", getDesigns);
router.get("/:id", getSingleDesign);
router.put("/:id", authMiddleware, upload.single("image"), updateDesign);
router.delete("/:id", authMiddleware, deleteDesign);
router.get("/category/:category", getDesignByCategory);
export default router;