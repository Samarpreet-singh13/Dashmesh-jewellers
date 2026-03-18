import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, MessageCircle, Phone } from "lucide-react";

const Design = () => {
    const { id } = useParams();
    const [design, setDesign] = useState(null);
    const [showInquiry, setShowInquiry] = useState(false);
    
    // Inquiry Form State
    const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
    const [submitStatus, setSubmitStatus] = useState(null);

    const fetchDesign = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/designs/${id}`);
            setDesign(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDesign();
    }, [id]);

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus("submitting");
        try {
            await axios.post(((import.meta.env.VITE_API_URL || '') + "/api/inquiries"), {
                ...formData,
                designId: design._id
            });
            setSubmitStatus("success");
            setFormData({ name: "", phone: "", message: "" });
            setTimeout(() => { setShowInquiry(false); setSubmitStatus(null); }, 3000);
        } catch (error) {
            console.log(error);
            setSubmitStatus("error");
        }
    };

    if (!design) return (
        <div className="flex justify-center items-center min-h-screen bg-background pt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    const imageUrl = design.images?.[0] || design.image || "https://images.unsplash.com/photo-1599643477874-ceba1bb2312b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="bg-surface border border-border rounded-sm overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left: Image Box */}
                    <div className="w-full md:w-1/2 bg-black/50 p-6 md:p-12 flex items-center justify-center">
                        <img
                            src={imageUrl}
                            alt={design.title}
                            className="max-w-full max-h-[600px] object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Right: Details Box */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center border-l border-border relative">
                        
                        <p className="text-primary tracking-widest uppercase text-sm mb-4">
                            {design.category} Collection
                        </p>
                        
                        <h1 className="font-serif text-3xl md:text-5xl text-white mb-6">
                            {design.title}
                        </h1>
                        
                        <div className="prose prose-invert max-w-none text-textSecondary mb-10 leading-relaxed">
                            <p>{design.description || "An exquisite piece crafted with precision. For detailed specifications and customization options, please inquire."}</p>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-6 mb-10 border-t border-border pt-6">
                            <div className="flex items-center gap-2 text-textSecondary text-sm">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                100% Certified
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            {!showInquiry ? (
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={() => setShowInquiry(true)}
                                        className="w-full py-4 bg-primary hover:bg-primary-light text-background font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-5 h-5" /> Inquire About This Piece
                                    </button>
                                    
                                    <a 
                                        href={`https://wa.me/919812907424?text=${encodeURIComponent(`Hello! I am interested in ordering this design: ${design.title}. Weight: ${design.weight || "N/A"}.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 rounded-sm"
                                    >
                                        <Phone className="w-5 h-5" /> Order via WhatsApp
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-background p-6 border border-border mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <h3 className="font-serif text-xl text-white mb-4">Send an Inquiry</h3>
                                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                                        <input 
                                            type="text" placeholder="Your Name" required
                                            className="w-full bg-surface border border-border p-3 text-white focus:border-primary outline-none"
                                            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                        <input 
                                            type="tel" placeholder="Phone Number" required
                                            className="w-full bg-surface border border-border p-3 text-white focus:border-primary outline-none"
                                            value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                        <textarea 
                                            placeholder="Message or Customization Request (Optional)"
                                            className="w-full bg-surface border border-border p-3 text-white h-24 focus:border-primary outline-none"
                                            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        />
                                        <div className="flex gap-4">
                                            <button 
                                                type="submit" 
                                                disabled={submitStatus === "submitting"}
                                                className="flex-1 py-3 bg-primary hover:bg-primary-light text-background font-bold uppercase disabled:opacity-50"
                                            >
                                                {submitStatus === "submitting" ? "Sending..." : "Submit Inquiry"}
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setShowInquiry(false)}
                                                className="px-6 py-3 border border-border text-textSecondary hover:text-white uppercase"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        {submitStatus === "success" && (
                                            <p className="text-green-400 text-sm mt-2">Inquiry sent successfully! We will contact you soon.</p>
                                        )}
                                        {submitStatus === "error" && (
                                            <p className="text-red-400 text-sm mt-2">Failed to send inquiry. Please try again.</p>
                                        )}
                                    </form>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Design;