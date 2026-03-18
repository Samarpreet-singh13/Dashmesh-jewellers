import { Link } from "react-router-dom";

const CategoryCard = ({ name, image }) => {
    return (
        <Link to={`/category/${name.toLowerCase()}`} className="group relative block overflow-hidden rounded-sm aspect-[4/5] sm:aspect-[3/4]">
            {/* Background Image */}
            <img 
                src={image} 
                alt={name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Dark/Gold Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 border border-transparent group-hover:border-primary/20 transition-colors duration-300">
                <h3 className="font-serif text-2xl text-white mb-1 drop-shadow-lg">{name}</h3>
                <span className="text-primary text-sm uppercase tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore Collection →
                </span>
            </div>
        </Link>
    );
};

export default CategoryCard;