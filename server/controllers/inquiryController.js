import Inquiry from "../models/Inquiry.js";
import jwt from "jsonwebtoken";

export const submitInquiry = async (req, res) => {
    try {
        const { name, phone, message, designId } = req.body;
        
        let userId = null;
        
        // Optionally attach the registered user's ID
        const token = req.header("Authorization")?.split(" ")[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallbacksecret");
                userId = decoded.id;
            } catch (err) {
                // If token is invalid, just proceed as anonymous guest
                console.log("Guest inquiry or invalid token.");
            }
        }

        const newInquiry = new Inquiry({ name, phone, message, designId, userId });
        await newInquiry.save();
        res.status(201).json({ message: "Inquiry submitted successfully", newInquiry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 }).populate("designId", "title image");
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
