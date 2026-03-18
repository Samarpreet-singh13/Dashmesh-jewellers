import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, List, LogOut, MessageSquare } from "lucide-react";
import { useEffect } from "react";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex justify-between items-center mb-12 border-b border-border pb-6">
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl text-white">Admin Dashboard</h1>
                        <p className="text-primary text-sm tracking-widest uppercase mt-2">Dashmesh Jewellers Control Panel</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-textSecondary hover:text-red-400 transition-colors uppercase text-sm tracking-widest"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <Link to="/admin/add" className="bg-surface border border-border p-8 rounded-sm hover:border-primary/50 hover:shadow-[0_0_15px_rgba(232,184,70,0.1)] transition-all group">
                        <PlusCircle className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-xl font-serif text-white mb-2">Add New Design</h2>
                        <p className="text-textSecondary text-sm">Upload new jewellery pieces to the catalog.</p>
                    </Link>

                    <Link to="/admin/designs" className="bg-surface border border-border p-8 rounded-sm hover:border-primary/50 hover:shadow-[0_0_15px_rgba(232,184,70,0.1)] transition-all group">
                        <List className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-xl font-serif text-white mb-2">Manage Designs</h2>
                        <p className="text-textSecondary text-sm">View, edit, or delete existing jewellery pieces.</p>
                    </Link>

                    <Link to="/admin/inquiries" className="bg-surface border border-border p-8 rounded-sm hover:border-primary/50 hover:shadow-[0_0_15px_rgba(232,184,70,0.1)] transition-all group">
                        <MessageSquare className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h2 className="text-xl font-serif text-white mb-2">View Inquiries</h2>
                        <p className="text-textSecondary text-sm">Check customer messages and pricing requests.</p>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;