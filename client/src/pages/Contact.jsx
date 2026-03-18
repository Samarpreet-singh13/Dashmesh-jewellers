import { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await axios.post(((import.meta.env.VITE_API_URL || '') + "/api/inquiries"), formData);
            setStatus("success");
            setFormData({ name: "", phone: "", message: "" });
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.log(error);
            setStatus("error");
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">Contact Us</h1>
                    <div className="h-1 w-24 bg-primary mx-auto mb-8 opacity-50"></div>
                    <p className="text-lg text-textSecondary max-w-2xl mx-auto">
                        We are here to assist you with all your highly detailed requests, bespoke orders, and inquiries. Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    
                    {/* Left: Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="font-serif text-3xl text-white mb-8">Get In Touch</h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-surface border border-border rounded-sm">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-lg tracking-widest uppercase mb-1">Phone & WhatsApp</h3>
                                        <p className="text-textSecondary">Call us or drop a message anytime.</p>
                                        <a href="https://wa.me/919812907424" target="_blank" rel="noreferrer" className="text-primary hover:text-primary-light text-xl mt-2 block font-medium transition-colors">
                                            +91 98129 07424
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-surface border border-border rounded-sm">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-lg tracking-widest uppercase mb-1">Email Support</h3>
                                        <p className="text-textSecondary">Send us your detailed inquiries.</p>
                                        <a href="mailto:js18121978@gmail.com" className="text-primary hover:text-primary-light text-xl mt-2 block font-medium transition-colors">
                                            js18121978@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-surface border border-border rounded-sm">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-lg tracking-widest uppercase mb-1">Our Showroom</h3>
                                        <p className="text-textSecondary mt-2 leading-relaxed">
                                            Dashmesh Jewellers<br />
                                            (Detailed local address can be placed here)<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-surface border border-border p-8 md:p-10 shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent blur-2xl"></div>
                        <h2 className="font-serif text-3xl text-white mb-6 relative z-10">Send an Inquiry</h2>
                        
                        {status === "success" && (
                            <div className="mb-6 bg-green-900/40 border border-green-500 text-green-300 px-4 py-3 rounded-sm">
                                Your inquiry has been sent! Our team will contact you shortly.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="mb-6 bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded-sm">
                                Failed to send inquiry. Please check your connection or contact us directly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Full Name</label>
                                <input 
                                    type="text" required 
                                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-background border border-border text-white p-4 focus:border-primary outline-none focus:shadow-[0_0_10px_rgba(232,184,70,0.1)] transition-all" 
                                    placeholder="e.g. Rahul Sharma" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Phone Number</label>
                                <input 
                                    type="tel" required 
                                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full bg-background border border-border text-white p-4 focus:border-primary outline-none focus:shadow-[0_0_10px_rgba(232,184,70,0.1)] transition-all" 
                                    placeholder="e.g. +91 98765 43210" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Message</label>
                                <textarea 
                                    rows="5"
                                    value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-background border border-border text-white p-4 focus:border-primary outline-none focus:shadow-[0_0_10px_rgba(232,184,70,0.1)] transition-all resize-none" 
                                    placeholder="How can we assist you today?"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === "loading"}
                                className="w-full bg-primary hover:bg-primary-light text-background font-bold uppercase tracking-widest py-4 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? "Sending..." : <><Send className="w-4 h-4" /> Submit Inquiry</>}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
