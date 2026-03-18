import { Link } from "react-router-dom";
import { Gem, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-surface border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Gem className="text-primary w-6 h-6" />
                            <Link to="/" className="font-serif text-xl font-bold tracking-wider text-primary">
                                DASHMESH
                            </Link>
                        </div>
                        <p className="text-textSecondary text-sm leading-relaxed">
                            Elegant gold and diamond jewellery crafted with tradition, precision, and excellence. Serving timeless beauty.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-textSecondary hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-textSecondary hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-textSecondary hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-textSecondary hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link to="/about" className="text-textSecondary hover:text-primary transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-textSecondary hover:text-primary transition-colors text-sm">Contact Us</Link></li>
                            <li><Link to="/admin/login" className="text-textSecondary hover:text-primary transition-colors text-sm opacity-50">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-6">Categories</h4>
                        <ul className="space-y-4">
                            <li><Link to="/category/rings" className="text-textSecondary hover:text-primary transition-colors text-sm">Luxury Rings</Link></li>
                            <li><Link to="/category/kada" className="text-textSecondary hover:text-primary transition-colors text-sm">Traditional Kada</Link></li>
                            <li><Link to="/category/necklace" className="text-textSecondary hover:text-primary transition-colors text-sm">Bridal Necklaces</Link></li>
                            <li><Link to="/category/earrings" className="text-textSecondary hover:text-primary transition-colors text-sm">Elegant Earrings</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-textSecondary">
                            <li>Phone: +91 9812907424</li>
                            <li>Email: info@dashmeshjewellers.com</li>
                            <li>Punjab, India</li>
                        </ul>
                    </div>

                </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-border bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-textSecondary text-xs">
                        © {new Date().getFullYear()} Dashmesh Jewellers. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;