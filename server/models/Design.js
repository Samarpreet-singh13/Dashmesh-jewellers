import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number
    },

    category: {
        type: String,
        required: true
    },
    
    tags: [{
        type: String,
        trim: true
    }]

}, { timestamps: true });

export default mongoose.model("Design", designSchema);