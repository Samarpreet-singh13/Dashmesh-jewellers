import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    designId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Design"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["new", "read", "responded", "contacted"],
        default: "new"
    }
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);
