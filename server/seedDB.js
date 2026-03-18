import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Design from './models/Design.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB...");

        // Clear existing default testing data if needed (optional)
        // console.log("Clearing old data...");
        // await User.deleteMany({});
        // await Design.deleteMany({});

        // 1. Seed Admin
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                username: 'admin',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('✅ Admin user created (username: admin, password: admin123)');
        } else {
            console.log('⚡ Admin already exists.');
        }

        // 2. Seed Mock Designs
        if (await Design.countDocuments() === 0) {
            console.log("Seeding sample designs...");
            
            const sampleDesigns = [
                {
                    title: "Royal 22k Gold Bridal Necklace",
                    description: "An elegant traditional necklace set perfect for weddings and deepawali.",
                    price: 150000,
                    category: "Necklaces",
                    tags: ["bridal", "wedding", "shaadi", "heavy", "kundal"],
                    image: "https://images.unsplash.com/photo-1599643478524-fb5244098775?w=800&q=80"
                },
                {
                    title: "Diamond Studded Engagement Ring",
                    description: "A gorgeous solitaire diamond ring suitable for the perfect proposal.",
                    price: 85000,
                    category: "Rings",
                    tags: ["diamond", "solitaire", "engagement", "anguthi"],
                    image: "https://images.unsplash.com/photo-1605100806140-1a77dc627ea4?w=800&q=80"
                },
                {
                    title: "Traditional Gold Jhumka Earrings",
                    description: "Handcrafted 24k yellow gold jhumkas that honor timeless heritage.",
                    price: 45000,
                    category: "Earrings",
                    tags: ["jhumka", "earrings", "traditional", "sona", "yellow"],
                    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80"
                }
            ];

            await Design.insertMany(sampleDesigns);
            console.log('✅ Mock designs perfectly populated in Database.');
        } else {
            console.log('⚡ Designs collection already has items. No mockup data injected.');
        }

        console.log("Seeding routine completed successfully.");
        process.exit(0);

    } catch (error) {
        console.log("Error during seeding setup:", error);
        process.exit(1);
    }
};

seedDatabase();
