import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Category = () => {
    const { category } = useParams();
    const [designs, setDesigns] = useState([]);
    const [sort, setSort] = useState("newest");
    const [isLoading, setIsLoading] = useState(true);

    const fetchDesigns = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/designs/category/${category}`
            );
            let data = res.data;
            if (sort === "low") {
                data = data.sort((a, b) => a.price - b.price);
            }
            if (sort === "high") {
                data = data.sort((a, b) => b.price - a.price);
            }
            if (sort === "newest") {
                data = data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            }
            setDesigns(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDesigns();
    }, [category, sort]);

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background">
            
            {/* Header Banner */}
            <div className="bg-surface border-y border-border py-12 mb-12 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 capitalize">
                    {category} Collection
                </h1>
                <div className="max-w-2xl mx-auto px-4">
                    <p className="text-textSecondary">
                        Explore our handcrafted, premium selection of {category}. Each piece tells a story of timeless elegance and master craftsmanship.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filters / Sort */}
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-border">
                    <p className="text-textSecondary text-sm uppercase tracking-widest">
                        {designs.length} Products Found
                    </p>
                    <div className="flex items-center gap-3">
                        <label className="text-textSecondary text-sm uppercase tracking-widest">Sort:</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-transparent border border-border text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary rounded-sm py-2 pl-3 pr-8 appearance-none outline-none"
                        >
                            <option value="newest" className="bg-surface">Newest Arrivals</option>
                            <option value="low" className="bg-surface">Price: Low to High</option>
                            <option value="high" className="bg-surface">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : designs.length === 0 ? (
                    <div className="text-center py-24 bg-surface rounded-sm border border-border">
                        <p className="text-textSecondary text-lg">No designs currently available in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {designs.map((design) => (
                            <ProductCard key={design._id} design={design} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Category;