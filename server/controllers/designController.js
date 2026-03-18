import Design from "../models/Design.js";
import { expandSearchQuery } from "../utils/searchHelper.js";

/* =========================
   CREATE DESIGN
========================= */

export const addDesign = async (req, res) => {
    try {

        const { title, description, price, category, tags } = req.body;
        
        let parsedTags = [];
        if (tags) {
            if (Array.isArray(tags)) parsedTags = tags;
            else parsedTags = tags.split(',').map(tag => tag.trim());
        }

        const design = new Design({
            title,
            description,
            price,
            category,
            tags: parsedTags,
            image: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : undefined
        });

        await design.save();

        res.status(201).json(design);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* =========================
   GET ALL DESIGNS (WITH AI KEYWORD EXPANSION)
========================= */

export const getDesigns = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const search = req.query.search || "";
        const tagsParam = req.query.tags || ""; // e.g., "Male,Gold"

        let query = {};
        let andConditions = [];

        if (search) {
            // Expand native/local words using the simulated AI mapping (e.g. "shaadi" -> "wedding")
            const searchTerms = expandSearchQuery(search);
            const regexQueries = searchTerms.map(term => new RegExp(term, 'i'));

            andConditions.push({
                $or: [
                    { title: { $in: regexQueries } },
                    { description: { $in: regexQueries } },
                    { tags: { $in: regexQueries } },
                    { category: { $in: regexQueries } }
                ]
            });
        }

        if (tagsParam) {
            const filterTags = tagsParam.split(',').map(tag => tag.trim()).filter(Boolean);
            
            // For strict filtering, each tag is an AND condition (must exist somewhere in the document)
            filterTags.forEach(tag => {
                const tagRegex = new RegExp(`\\b${tag}\\b`, 'i'); // word boundary for exact match
                andConditions.push({
                    $or: [
                        { title: tagRegex },
                        { description: tagRegex },
                        { tags: tagRegex },
                        { category: tagRegex }
                    ]
                });
            });
        }

        if (andConditions.length > 0) {
            query.$and = andConditions;
        }

        const designs = await Design
            .find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        res.json(designs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



/* =========================
   GET SINGLE DESIGN
========================= */

export const getSingleDesign = async (req, res) => {
    try {

        const design = await Design.findById(req.params.id);

        if (!design) {
            return res.status(404).json({ message: "Design not found" });
        }

        res.json(design);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* =========================
   DELETE DESIGN
========================= */

export const deleteDesign = async (req, res) => {
    try {

        const design = await Design.findById(req.params.id);

        if (!design) {
            return res.status(404).json({ message: "Design not found" });
        }

        await design.deleteOne();

        res.json({ message: "Design deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* =========================
   UPDATE DESIGN
========================= */

export const updateDesign = async (req, res) => {
    try {

        const { title, description, price, category, tags } = req.body;

        const design = await Design.findById(req.params.id);

        if (!design) {
            return res.status(404).json({ message: "Design not found" });
        }

        design.title = title || design.title;
        design.description = description || design.description;
        design.price = price || design.price;
        design.category = category || design.category;
        
        // Handle tags (can be passed as array or comma-separated string)
        if (tags) {
             if (Array.isArray(tags)) {
                 design.tags = tags;
             } else {
                 design.tags = tags.split(',').map(tag => tag.trim());
             }
        }

        if (req.file) {
            design.image = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const updatedDesign = await design.save();

        res.json(updatedDesign);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* =========================
   GET DESIGN BY CATEGORY
========================= */

export const getDesignByCategory = async (req, res) => {
    try {

        const designs = await Design.find({
            category: new RegExp(`^${req.params.category}$`, 'i')
        });

        res.json(designs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};