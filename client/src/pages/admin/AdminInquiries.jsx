import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Phone, Clock } from "lucide-react";

const AdminInquiries = () => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/login");
        } else {
            fetchInquiries();
        }
    }, [navigate]);

    const fetchInquiries = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get(((import.meta.env.VITE_API_URL || 'http://localhost:5000') + "/api/inquiries"), {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInquiries(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsContacted = async (id) => {
        try {
            const token = localStorage.getItem("adminToken");
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/inquiries/${id}`, { status: "contacted" }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchInquiries();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-8">
                    <Link to="/admin/dashboard" className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors uppercase text-sm tracking-widest mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="font-serif text-3xl md:text-4xl text-white">Customer Inquiries</h1>
                </div>

                <div className="bg-surface border border-border rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : inquiries.length === 0 ? (
                        <div className="p-12 text-center text-textSecondary text-lg">
                            <MessageCircle className="w-12 h-12 text-textSecondary/50 mx-auto mb-4" />
                            No inquiries received yet.
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {inquiries.map((inq) => (
                                <div key={inq._id} className="p-6 md:p-8 hover:bg-background/50 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-serif text-white">{inq.name}</h3>
                                                <span className={`text-xs uppercase tracking-widest px-2 py-1 rounded-sm ${inq.status === 'pending' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-green-900/30 text-green-400 border border-green-900'}`}>
                                                    {inq.status}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 text-textSecondary text-sm mb-4">
                                                <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-primary" /> {inq.phone}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> {new Date(inq.createdAt).toLocaleDateString()}</span>
                                            </div>

                                            {inq.message && (
                                                <div className="bg-background border border-border p-4 rounded-sm text-textSecondary text-sm italic mb-4">
                                                    "{inq.message}"
                                                </div>
                                            )}

                                            {inq.designId && (
                                                <p className="text-sm text-textSecondary">
                                                    Inquiring about Design ID: <Link to={`/design/${inq.designId._id || inq.designId}`} target="_blank" className="text-primary hover:underline">{inq.designId.title || 'View Design'}</Link>
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center md:items-start justify-end">
                                            {inq.status === "pending" && (
                                                <button 
                                                    onClick={() => markAsContacted(inq._id)}
                                                    className="bg-primary hover:bg-primary-light text-background font-bold tracking-widest uppercase text-xs py-2 px-4 transition-colors rounded-sm"
                                                >
                                                    Mark as Contacted
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminInquiries;
