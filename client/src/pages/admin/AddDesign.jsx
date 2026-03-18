import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

const AddDesign = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("image", image);

        try {
            const token = localStorage.getItem("adminToken");
            await axios.post(
                ((import.meta.env.VITE_API_URL || '') + "/api/designs/add"),
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus("success");
            setTitle(""); setDescription(""); setPrice(""); setCategory(""); setTags(""); setImage(null);
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            console.log(error);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-8">
                    <Link to="/admin/dashboard" className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors uppercase text-sm tracking-widest mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="font-serif text-3xl md:text-4xl text-white">Add New Design</h1>
                </div>

                <div className="bg-surface border border-border rounded-sm p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    
                    {status === "success" && (
                        <div className="mb-6 p-4 bg-green-900/30 border border-green-500 flex items-center gap-3 text-green-200">
                            <CheckCircle className="w-5 h-5" /> Design successfully added to catalog!
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Title / Name</label>
                                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-background border border-border text-white p-3 focus:border-primary outline-none" placeholder="e.g. Royal Gold Necklace" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Category</label>
                                <select required value={category} onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-background border border-border text-white p-3 focus:border-primary outline-none appearance-none">
                                    <option value="" className="text-gray-500">Select Category</option>
                                    <option value="Rings">Rings</option>
                                    <option value="Necklaces">Necklaces</option>
                                    <option value="Kada">Kada</option>
                                    <option value="Earrings">Earrings</option>
                                    <option value="Bangles">Bangles</option>
                                    <option value="Bracelet">Bracelet</option>
                                    <option value="Tikka">Tikka</option>
                                    <option value="Punjabi Set">Punjabi Set</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Price (₹)</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                                    className="w-full bg-background border border-border text-white p-3 focus:border-primary outline-none" placeholder="e.g. 50000" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Keywords / Search Tags</label>
                                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
                                    className="w-full bg-background border border-border text-white p-3 focus:border-primary outline-none" placeholder="e.g. jhumka, wedding, traditional" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Description</label>
                            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-background border border-border text-white p-3 focus:border-primary outline-none" placeholder="Detailed description of the piece..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">Design Image</label>
                            <div className="border border-border border-dashed bg-background p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors">
                                <Upload className="w-8 h-8 text-primary mb-3" />
                                <span className="text-textSecondary text-sm mb-2">{image ? image.name : "Click to select or drag & drop"}</span>
                                <input type="file" required onChange={(e) => setImage(e.target.files[0])}
                                    className="text-white text-sm opacity-100" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border mt-8 flex justify-end">
                            <button type="submit" disabled={status === "loading"}
                                className="bg-primary hover:bg-primary-light text-background font-bold uppercase tracking-widest py-3 px-8 transition-colors disabled:opacity-50 min-w-[200px]">
                                {status === "loading" ? "Uploading..." : "Publish Design"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDesign;