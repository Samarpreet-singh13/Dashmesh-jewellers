import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Design from './models/Design.js';

dotenv.config();

// Base arrays for procedural generation
const categories = ['Rings', 'Necklaces', 'Earrings', 'Kada'];

const imagePools = {
    'Rings': [
        'https://images.unsplash.com/photo-1605100804763-247f67b8548e?w=800&q=80'
    ],
    'Necklaces': [
        'https://images.unsplash.com/photo-1599643478524-fb5244098775?w=800&q=80'
    ],
    'Earrings': [
        'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80'
    ],
    'Kada': [
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ]
};

const adjectives = ["Royal", "Elegant", "Traditional", "Modern", "Classic", "Vintage", "Heavy", "Lightweight", "Intricate", "Premium", "Exquisite", "Handcrafted", "Bridal", "Minimalist", "Festive"];
const localNames = {
    'Rings': ["Anguthi", "Chhalla", "Band"],
    'Necklaces': ["Haar", "Mangalsutra", "Mala", "Choker", "Rani Haar"],
    'Earrings': ["Jhumka", "Bali", "Studs", "Kanchodi", "Chandbali"],
    'Kada': ["Chudi", "Kangan", "Bangle", "Pochi", "Kada"]
};

const materials = ["22k Gold", "24k Gold", "18k Rose Gold", "Platinum", "925 Sterling Silver", "Kundan", "Polki", "Diamond studded"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1) + min) * 1000;

const generateDesigns = (count) => {
    let designs = [];
    for (let i = 0; i < count; i++) {
        const category = getRandom(categories);
        const adj = getRandom(adjectives);
        const local = getRandom(localNames[category]);
        const material = getRandom(materials);
        
        const title = `${adj} ${material} ${category.slice(0, -1)} (${local})`;
        
        // Dynamic description
        const weight = (Math.random() * (50 - 5) + 5).toFixed(2);
        const description = `This ${adj.toLowerCase()} piece represents the finest craftsmanship of Dashmesh Jewellers. Known locally as '${local}', this stunning ${category.toLowerCase().slice(0, -1)} is crafted from premium ${material}. It features an intricate design suitable for both festive occasions and grand events. Estimated Weight: ${weight}g.`;
        
        const price = getRandomPrice(10, 500); // Between 10,000 to 500,000
        const image = getRandom(imagePools[category]);
        
        // Tags mixing general and local terms
        const tags = [
            category.toLowerCase(), 
            local.toLowerCase(), 
            adj.toLowerCase(), 
            material.toLowerCase().includes("gold") ? "sona" : "metal",
            "jewellery",
            weight > 20 ? "heavy" : "light"
        ];
        
        designs.push({
            title,
            description,
            price,
            category,
            tags,
            image
        });
    }
    return designs;
};

const seedMassiveDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");
        
        console.log("Clearing old designs...");
        await Design.deleteMany({});
        
        console.log("Generating 250 dynamic designs...");
        const newDesigns = generateDesigns(250);
        
        console.log("Inserting designs into database (this may take a few seconds)...");
        await Design.insertMany(newDesigns);
        
        console.log(`✅ Successfully populated database with ${newDesigns.length} stunning aesthetic designs!`);
        process.exit(0);
    } catch (error) {
        console.log("Error inside database execution:", error);
        process.exit(1);
    }
}

seedMassiveDB();
