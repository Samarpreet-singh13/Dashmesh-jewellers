import mongoose from "mongoose";
import dotenv from "dotenv";
import Design from "./models/Design.js";

dotenv.config();

const IMAGES = [
    "https://images.unsplash.com/photo-1599643477874-ceba1bb2312b?w=600&q=80",
    "https://images.unsplash.com/photo-1599643478514-4fb4c11b8543?w=600&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    "https://images.unsplash.com/photo-1620353916719-21b938facb4e?w=600&q=80",
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
    "https://images.unsplash.com/photo-1589422051680-60b5ff36df52?w=600&q=80",
    "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
    "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80"
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
   console.log("Connected to DB");
   const designs = await Design.find({});
   for(let d of designs) {
       const img = IMAGES[Math.floor(Math.random() * IMAGES.length)];
       d.images = [img];
       d.image = img;
       await d.save();
   }
   console.log(`Updated images for ${designs.length} designs.`);
   process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
