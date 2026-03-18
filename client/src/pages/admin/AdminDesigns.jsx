import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Edit } from "lucide-react";

const AdminDesigns = () => {
    const navigate = useNavigate();
    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/login");
        } else {
            fetchDesigns();
        }
    }, [navigate]);

    const fetchDesigns = async () => {
        try {
            const res = await axios.get(((import.meta.env.VITE_API_URL || 'http://localhost:5000') + "/api/designs"));
            setDesigns(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDesign = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this masterpiece?")) {
            return;
        }
        
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/designs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDesigns();
        } catch (error) {
            console.log(error);
            alert("Failed to delete design.");
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link to="/admin/dashboard" className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors uppercase text-sm tracking-widest mb-4">
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                        <h1 className="font-serif text-3xl md:text-4xl text-white">Manage Catalog</h1>
                    </div>
                    <Link to="/admin/add" className="bg-primary hover:bg-primary-light text-background font-bold uppercase tracking-widest px-6 py-3 transition-colors text-center text-sm inline-block">
                        + Add New Design
                    </Link>
                </div>

                <div className="bg-surface border border-border rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-background border-b border-border">
                                    <th className="p-5 text-textSecondary uppercase tracking-widest text-xs font-medium">Preview</th>
                                    <th className="p-5 text-textSecondary uppercase tracking-widest text-xs font-medium">Title</th>
                                    <th className="p-5 text-textSecondary uppercase tracking-widest text-xs font-medium">Category</th>
                                    <th className="p-5 text-textSecondary uppercase tracking-widest text-xs font-medium">Price</th>
                                    <th className="p-5 text-textSecondary uppercase tracking-widest text-xs font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {designs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-textSecondary">
                                            No designs found in the catalog.
                                        </td>
                                    </tr>
                                ) : (
                                    designs.map((design) => (
                                        <tr key={design._id} className="border-b border-border hover:bg-background/50 transition-colors">
                                            <td className="p-5">
                                                <div className="w-16 h-16 bg-black/50 border border-border overflow-hidden rounded-sm flex items-center justify-center">
                                                    <img src={design.image || design.images?.[0]} alt={design.title} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="p-5 text-white font-serif">{design.title}</td>
                                            <td className="p-5 text-primary text-sm uppercase tracking-widest">{design.category}</td>
                                            <td className="p-5 text-textSecondary font-medium">
                                                {design.price ? `₹ ${design.price.toLocaleString("en-IN")}` : "N/A"}
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link to={`/admin/edit/${design._id}`} className="p-2 text-textSecondary hover:text-primary transition-colors border border-transparent hover:border-primary/30 rounded-full">
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => deleteDesign(design._id)} className="p-2 text-textSecondary hover:text-red-400 transition-colors border border-transparent hover:border-red-400/30 rounded-full">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDesigns;