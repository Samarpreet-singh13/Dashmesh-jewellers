import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

const ProductCard = ({ design }) => {
    if (!design) return null;

    // Safely extract the image, guarding against empty arrays
    const imageUrl = (design.images && design.images.length > 0) 
        ? design.images[0] 
        : (design.image || "https://images.unsplash.com/photo-1599643477874-ceba1bb2312b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80");
    
    return (
        <div className="bg-surface rounded-sm border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(232,184,70,0.1)] group flex flex-col h-full">
            
            <Link to={`/design/${design._id}`} className="block flex-1">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-black/40">
                    <img
                        src={imageUrl}
                        alt={design.title || design.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-2">
                    <p className="text-xs text-primary tracking-widest uppercase">{design.category || "Jewellery"}</p>
                    <h3 className="font-serif text-lg text-textPrimary truncate">{design.title || design.name}</h3>
                    
                    <div className="flex items-center justify-end mt-2 pt-4 border-t border-border">
                        <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                </div>
            </Link>

            {/* WhatsApp Action (Outside Link to prevent nested <a> tags) */}
            <div className="px-5 pb-5 mt-auto">
                <div className="border-t border-border pt-4">
                    <a 
                        href={`https://wa.me/919812907424?text=${encodeURIComponent(`I want to order the ${design.title || design.name} with ID: ${design._id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-green-600/10 hover:bg-green-600 text-green-500 hover:text-white font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 rounded-sm text-xs"
                    >
                        <Phone className="w-4 h-4" /> Order on WhatsApp
                    </a>
                </div>
            </div>

        </div>
    );
};

export default ProductCard;