// This is a simulated AI search hook. 
// In a production app, you would swap this logic out with a call to OpenAI or Google Gemini 
// to extract meaning and synonyms from natural language queries.

const synonymMap = {
    // English -> Native/Local
    "wedding": ["shaadi", "vivah", "bridal", "heavy"],
    "necklace": ["haar", "mangalsutra", "mala", "choker"],
    "earrings": ["jhumka", "bali", "studs", "kanchodi"],
    "bangles": ["chudi", "kada", "kangan"],
    "ring": ["anguthi", "chhalla", "band"],
    "gold": ["sona", "swarna", "22k", "24k"],
    "silver": ["chandi", "sterling", "925"],
    "diamond": ["hira", "heera", "solitaire"],
    
    // Native/Local -> English
    "shaadi": ["wedding", "bridal", "marriage"],
    "mangalsutra": ["necklace", "black beads", "auspicious"],
    "jhumka": ["earrings", "dangling"],
    "kada": ["bangles", "bracelet", "thick"],
    "sona": ["gold", "yellow"]
};

export const expandSearchQuery = (query) => {
    if (!query) return [];

    const words = query.toLowerCase().split(/\s+/);
    let expandedTerms = new Set([...words]);

    words.forEach(word => {
        // Find if this word maps to any synonyms
        for (const [key, synonyms] of Object.entries(synonymMap)) {
            if (key === word || synonyms.includes(word)) {
                expandedTerms.add(key);
                synonyms.forEach(syn => expandedTerms.add(syn));
            }
        }
    });

    return Array.from(expandedTerms);
};
