import { useState, useEffect } from "react";
import axios from "axios";
import { Search as SearchIcon, X, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Search = () => {
    const [query, setQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    
    // Mobile filter toggle
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const filterGroups = [
        {
            name: "Gender",
            options: ["Female", "Male", "Unisex"]
        },
        {
            name: "Material",
            options: ["Gold", "Silver", "Platinum", "Diamond", "Rose Gold", "Polki", "Kundan"]
        },
        {
            name: "Category",
            options: ["Rings", "Necklaces", "Earrings", "Kada", "Bangles", "Bracelet", "Tikka", "Punjabi Set"]
        },
        {
            name: "Occasion",
            options: ["Wedding", "Bridal", "Casual", "Festive", "Party"]
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim() !== "" || selectedFilters.length > 0) {
                performSearch();
            } else {
                setResults([]);
                setHasSearched(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, selectedFilters]);

    const performSearch = async () => {
        setIsSearching(true);
        setHasSearched(true);
        try {
            const tagsQuery = selectedFilters.join(',');
            const res = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/designs?search=${encodeURIComponent(query)}&limit=50&tags=${encodeURIComponent(tagsQuery)}`);
            setResults(res.data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setQuery("");
    };

    const toggleFilter = (option) => {
        setSelectedFilters(prev => 
            prev.includes(option) 
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const clearFilters = () => {
        setSelectedFilters([]);
    };

    return (
        <div className="min-h-screen bg-background pt-20 flex flex-col md:flex-row">
            
            {/* Mobile Filter Toggle */}
            <div className="md:hidden p-4 border-b border-border bg-surface flex justify-between items-center sticky top-20 z-40">
                <button 
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="flex items-center gap-2 text-textSecondary hover:text-white"
                >
                    <Filter className="w-5 h-5" /> 
                    {showMobileFilters ? "Hide Filters" : "Show Filters"}
                    {selectedFilters.length > 0 && (
                        <span className="bg-primary text-background rounded-full px-2 py-0.5 text-xs font-bold font-sans ml-2">
                            {selectedFilters.length}
                        </span>
                    )}
                </button>
            </div>

            {/* LEFT SIDEBAR: Filters */}
            <aside className={`
                ${showMobileFilters ? "block" : "hidden"} 
                md:block w-full md:w-72 bg-surface/50 border-r border-border 
                md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-y-auto z-30
            `}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-serif text-xl text-white">Filters</h2>
                        {selectedFilters.length > 0 && (
                            <button onClick={clearFilters} className="text-xs text-primary hover:underline uppercase tracking-widest">
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="space-y-8">
                        {filterGroups.map((group) => (
                            <div key={group.name} className="border-t border-border/50 pt-4">
                                <h3 className="text-sm text-textSecondary uppercase tracking-widest font-medium mb-4">{group.name}</h3>
                                <div className="space-y-3">
                                    {group.options.map((option) => (
                                        <label key={option} className="flex items-center gap-3 cursor-pointer group/label">
                                            <div className="relative flex items-center justify-center w-5 h-5 border border-textSecondary rounded-sm bg-background group-hover/label:border-primary transition-colors">
                                                <input 
                                                    type="checkbox"
                                                    className="opacity-0 absolute inset-0 cursor-pointer"
                                                    checked={selectedFilters.includes(option)}
                                                    onChange={() => toggleFilter(option)}
                                                />
                                                {selectedFilters.includes(option) && (
                                                    <div className="w-3 h-3 bg-primary" />
                                                )}
                                            </div>
                                            <span className={`text-sm ${selectedFilters.includes(option) ? "text-white font-medium" : "text-textSecondary group-hover/label:text-white transition-colors"}`}>
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* RIGHT MAIN AREA */}
            <main className="flex-1 flex flex-col min-w-0">
                
                {/* STICKY SEARCH BAR */}
                <div className="sticky top-20 md:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border p-4 md:p-8">
                    <div className="max-w-4xl relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchIcon className="h-6 w-6 text-primary group-focus-within:scale-110 transition-transform" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by keywords, tags, or local terms..."
                            className="block w-full pl-14 pr-12 py-4 border border-border bg-surface text-white placeholder-textSecondary focus:outline-none focus:border-primary transition-colors text-lg rounded-sm shadow-xl"
                        />
                        {query && (
                            <button 
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-textSecondary hover:text-white transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        )}
                    </div>
                </div>

                {/* RESULTS GRID */}
                <div className="p-4 md:p-8">
                    {/* Results State */}
                    {isSearching ? (
                        <div className="flex justify-center flex-col items-center py-20 gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            <p className="text-textSecondary animate-pulse">Searching catalog...</p>
                        </div>
                    ) : hasSearched && results.length === 0 ? (
                        <div className="text-center py-20 border border-border bg-surface/50 rounded-sm">
                            <SearchIcon className="h-12 w-12 text-border mx-auto mb-4" />
                            <h3 className="font-serif text-2xl text-white mb-2">No designs found</h3>
                            <p className="text-textSecondary">
                                We couldn't find any pieces matching your search or filters.
                            </p>
                            <button onClick={() => { clearSearch(); clearFilters(); }} className="mt-6 text-primary hover:underline uppercase tracking-widest text-sm font-bold">
                                Clear all search criteria
                            </button>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-6">
                            <div className="flex items-end justify-between border-b border-border pb-4">
                                <h2 className="text-white font-serif text-2xl">
                                    Search Results
                                </h2>
                                <span className="text-textSecondary text-sm uppercase tracking-widest">{results.length} designs found</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {results.map((design) => (
                                    <ProductCard key={design._id} design={design} />
                                ))}
                            </div>
                        </div>
                    ) : (
                         <div className="text-center py-24">
                            <h3 className="font-serif text-3xl text-white mb-4">Discover Extraordinary</h3>
                            <p className="text-textSecondary max-w-xl mx-auto">
                                Use the search bar above or select filters from the sidebar to explore our extensive catalog of magnificent jewellery.
                            </p>
                        </div>
                    )}
                </div>

            </main>

        </div>
    );
};

export default Search;
