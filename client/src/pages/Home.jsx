import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";

const Home = () => {
    const [designs, setDesigns] = useState([]);

    const fetchDesigns = async () => {
        try {
            const res = await axios.get(
                ((import.meta.env.VITE_API_URL || 'http://localhost:5000') + "/api/designs?limit=4")
            );
            setDesigns(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDesigns();
    }, []);

    return (
        <div className="pt-20 pb-16">
            {/* HERO SECTION */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599643478524-fb66f45696d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-background/70" />
                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                        Elegance in Every Detail
                    </h1>
                    <p className="text-lg md:text-xl text-primary font-medium tracking-widest uppercase">
                        Timeless Gold & Diamond Jewellery
                    </p>
                    <div className="pt-8">
                        <Link to="/search" className="inline-block bg-primary hover:bg-primary-light text-background font-bold tracking-widest uppercase px-8 py-4 rounded-sm transition-all shadow-[0_0_20px_rgba(232,184,70,0.3)] hover:shadow-[0_0_30px_rgba(232,184,70,0.5)]">
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* SHOP BY CATEGORY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-serif text-3xl md:text-5xl text-white">Shop By Category</h2>
                    <div className="h-1 w-24 bg-primary mx-auto opacity-50"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 [&>*]:flex-1 [&>*]:min-w-[140px] [&>*]:max-w-[200px]">
                    <CategoryCard
                        name="Rings"
                        image="https://images.unsplash.com/photo-1599643478514-4fb4c11b8543?w=600&q=80"
                    />
                    <CategoryCard
                        name="Kada"
                        image="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"
                    />
                    <CategoryCard
                        name="Necklace"
                        image="https://images.unsplash.com/photo-1620353916719-21b938facb4e?w=600&q=80"
                    />
                    <CategoryCard
                        name="Earrings"
                        image="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80"
                    />
                    <CategoryCard
                        name="Bracelet"
                        image="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80"
                    />
                    <CategoryCard
                        name="Tikka"
                        image="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80"
                    />
                    <CategoryCard
                        name="Punjabi Set"
                        image="https://images.unsplash.com/photo-1599643477874-ceba1bb2312b?w=600&q=80"
                    />
                </div>
            </section>

            {/* FEATURED DESIGNS */}
            <section className="bg-surface py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="font-serif text-3xl md:text-5xl text-white">Featured Designs</h2>
                        <div className="h-1 w-24 bg-primary mx-auto opacity-50"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {designs.length === 0 ? (
                            <p className="text-textSecondary text-center col-span-full">Loading exquisite designs...</p>
                        ) : (
                            designs.map((design) => (
                                <ProductCard key={design._id} design={design} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center border-t border-border mt-12 bg-background">
                <h2 className="font-serif text-3xl mb-16 text-primary">The Dashmesh Promise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center text-primary text-2xl font-serif">1</div>
                        <h3 className="text-xl font-medium text-white tracking-widest">Certified Gold</h3>
                        <p className="text-textSecondary text-sm">100% BIS hallmarked and internationally certified.</p>
                    </div>
                    <div className="space-y-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center text-primary text-2xl font-serif">2</div>
                        <h3 className="text-xl font-medium text-white tracking-widest">Master Craftsmanship</h3>
                        <p className="text-textSecondary text-sm">Created by artisans with generations of expertise.</p>
                    </div>
                    <div className="space-y-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center text-primary text-2xl font-serif">3</div>
                        <h3 className="text-xl font-medium text-white tracking-widest">Lifetime Care</h3>
                        <p className="text-textSecondary text-sm">Complimentary maintenance and polishing services.</p>
                    </div>
                    <div className="space-y-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center text-primary text-2xl font-serif">4</div>
                        <h3 className="text-xl font-medium text-white tracking-widest">Secure Experience</h3>
                        <p className="text-textSecondary text-sm">Safe, transparent, and reliable purchasing globally.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;