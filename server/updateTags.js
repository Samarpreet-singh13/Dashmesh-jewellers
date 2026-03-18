import mongoose from "mongoose";
import dotenv from "dotenv";
import Design from "./models/Design.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
   console.log("Connected to DB");
   const designs = await Design.find({});
   for(let d of designs) {
       const gender = Math.random() > 0.2 ? "Female" : "Male";
       const materials = ["Gold", "Silver", "Diamond", "Platinum", "Rose Gold", "Polki", "Kundan"];
       const material = materials[Math.floor(Math.random() * materials.length)];
       
       if(!d.tags.includes(gender)) d.tags.push(gender);
       if(!d.tags.includes(material)) d.tags.push(material);
       await d.save();
   }
   console.log(`Updated ${designs.length} designs with Gender and Material tags.`);
   process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
