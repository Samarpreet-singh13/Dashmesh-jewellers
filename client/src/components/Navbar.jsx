import { Link, useLocation } from "react-router-dom";
import { Search, Menu, User, Gem, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsCategoryOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed w-full z-50 top-0 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Brand */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Gem className="text-primary w-8 h-8" />
                        <Link to="/home" className="font-serif text-2xl font-bold tracking-wider text-primary">
                            DASHMESH
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/home" className="text-textSecondary hover:text-primary transition-colors text-sm uppercase tracking-widest">Home</Link>
                        
                        {/* Dropdown for Categories */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-textSecondary group-hover:text-primary transition-colors text-sm uppercase tracking-widest py-6">
                                Categories <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute left-0 top-full w-56 bg-surface border border-border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 rounded-sm overflow-hidden z-50">
                                <Link to="/category/rings" className="block px-6 py-3 text-sm text-textSecondary hover:text-white hover:bg-white/5 uppercase tracking-widest border-b border-border/50 transition-colors">Rings</Link>
                                <Link to="/category/kada" className="block px-6 py-3 text-sm text-textSecondary hover:text-white hover:bg-white/5 uppercase tracking-widest border-b border-border/50 transition-colors">Kada</Link>
                                <Link to="/category/necklace" className="block px-6 py-3 text-sm text-textSecondary hover:text-white hover:bg-white/5 uppercase tracking-widest border-b border-border/50 transition-colors">Necklaces</Link>
                                <Link to="/category/earrings" className="block px-6 py-3 text-sm text-textSecondary hover:text-white hover:bg-white/5 uppercase tracking-widest border-b border-border/50 transition-colors">Earrings</Link>
                                <Link to="/category/bracelet" className="block px-6 py-3 text-sm text-textSecondary hover:text-white hover:bg-white/5 uppercase tracking-widest border-b border-border/50 transition-colors">Bracelet</Link>
                                <Link to="/category/tikka" className="block px-6 py-3 text-sm text-textSecondary hover:text-white hover:bg-white/5 uppercase tracking-widest border-b border-border/50 transition-colors">Tikka</Link>
                                <Link to="/category/punjabi set" className="block px-6 py-3 text-sm text-textSecondary hover:text-white hover:bg-white/5 uppercase tracking-widest transition-colors">Punjabi Set</Link>
                            </div>
                        </div>

                        <Link to="/about" className="text-textSecondary hover:text-primary transition-colors text-sm uppercase tracking-widest">About Us</Link>
                        <Link to="/contact" className="text-textSecondary hover:text-primary transition-colors text-sm uppercase tracking-widest">Contact</Link>
                    </div>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-6 text-textSecondary">
                        <Link to="/search" className="hover:text-primary transition-colors" title="Search"><Search className="w-5 h-5" /></Link>
                        <Link to="/admin/login" className="hover:text-primary transition-colors" title="Admin Portal"><User className="w-5 h-5" /></Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-textSecondary hover:text-primary transition-colors p-2"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`md:hidden absolute top-20 left-0 w-full bg-surface border-b border-border transition-all duration-300 origin-top overflow-hidden shadow-2xl ${isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 py-6 space-y-4 flex flex-col">
                    <Link to="/home" className="text-textSecondary hover:text-white block text-sm uppercase tracking-widest border-b border-border/50 pb-2">Home</Link>
                    
                    <div>
                        <button 
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
                            className="flex items-center justify-between w-full text-textSecondary hover:text-white text-sm uppercase tracking-widest border-b border-border/50 pb-2"
                        >
                            Categories <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        {/* Mobile Accordion */}
                        <div className={`overflow-hidden transition-all duration-300 ${isCategoryOpen ? "max-h-64 mt-2" : "max-h-0"}`}>
                            <div className="pl-4 py-2 space-y-4 border-l border-border/50 ml-2">
                                <Link to="/category/rings" className="text-textSecondary hover:text-primary block text-sm uppercase tracking-widest">Rings</Link>
                                <Link to="/category/kada" className="text-textSecondary hover:text-primary block text-sm uppercase tracking-widest">Kada</Link>
                                <Link to="/category/necklace" className="text-textSecondary hover:text-primary block text-sm uppercase tracking-widest">Necklaces</Link>
                                <Link to="/category/earrings" className="text-textSecondary hover:text-primary block text-sm uppercase tracking-widest">Earrings</Link>
                                <Link to="/category/bracelet" className="text-textSecondary hover:text-primary block text-sm uppercase tracking-widest">Bracelet</Link>
                                <Link to="/category/tikka" className="text-textSecondary hover:text-primary block text-sm uppercase tracking-widest">Tikka</Link>
                                <Link to="/category/punjabi set" className="text-textSecondary hover:text-primary block text-sm uppercase tracking-widest">Punjabi Set</Link>
                            </div>
                        </div>
                    </div>

                    <Link to="/about" className="text-textSecondary hover:text-white block text-sm uppercase tracking-widest border-b border-border/50 pb-2">About Us</Link>
                    <Link to="/contact" className="text-textSecondary hover:text-white block text-sm uppercase tracking-widest">Contact</Link>
                    
                    <div className="pt-6 mt-4 flex gap-6 justify-center border-t border-border">
                        <Link to="/search" className="text-textSecondary hover:text-primary flex flex-col items-center gap-1 text-xs uppercase tracking-widest">
                            <Search className="w-5 h-5" /> Search
                        </Link>
                        <Link to="/admin/login" className="text-textSecondary hover:text-primary flex flex-col items-center gap-1 text-xs uppercase tracking-widest">
                            <User className="w-5 h-5" /> Admin
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;