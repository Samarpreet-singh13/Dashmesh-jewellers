import { ShieldCheck, Gem, Award } from "lucide-react";

const About = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-background">
            
            {/* HER0 / Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">Our Legacy</h1>
                <div className="h-1 w-24 bg-primary mx-auto mb-8 opacity-50"></div>
                <p className="text-lg md:text-xl text-textSecondary max-w-3xl mx-auto font-light leading-relaxed">
                    For generations, Dashmesh Jewellers has stood as a beacon of uncompromising purity, master craftsmanship, and timeless elegance. We craft not just jewellery, but heirlooms that carry the weight of tradition and the brilliance of modern design.
                </p>
            </div>

            {/* Split Content section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[4/5] bg-surface overflow-hidden border border-border shadow-2xl">
                         <img 
                            src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Master Craftsmanship"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 border-[16px] border-background/20 m-6 rounded-sm mix-blend-overlay"></div>
                    </div>
                    
                    <div className="space-y-8">
                        <div>
                            <h2 className="font-serif text-3xl text-white mb-4">Craftsmanship Beyond Compare</h2>
                            <p className="text-textSecondary leading-relaxed">
                                Every piece in our collection is meticulously handcrafted by artisans whose skills have been passed down through generations. From the initial sketch to the final polish, our jewels reflect a profound dedication to artistry.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="font-serif text-3xl text-white mb-4">The Purity Promise</h2>
                            <p className="text-textSecondary leading-relaxed">
                                Trust is the foundation of our craft. We strictly utilize 100% BIS Hallmarked Gold and internationally certified diamonds. When you acquire a piece from Dashmesh Jewellers, you are investing in authenticity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Grid */}
            <div className="bg-surface border-y border-border py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center">
                                <Gem className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl text-white tracking-widest uppercase">Finest Materials</h3>
                            <p className="text-textSecondary text-sm">Sourcing only the most exquisite gems, unblemished diamonds, and precious metals.</p>
                        </div>

                        <div className="space-y-4 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl text-white tracking-widest uppercase">Unwavering Trust</h3>
                            <p className="text-textSecondary text-sm">Transparent pricing, lifetime buy-back guarantees, and impeccable ethical standards.</p>
                        </div>

                        <div className="space-y-4 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full border border-primary text-primary flex items-center justify-center">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl text-white tracking-widest uppercase">Bespoke Excellence</h3>
                            <p className="text-textSecondary text-sm">Offering tailored customizations to bring your personal visions strictly to life.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
