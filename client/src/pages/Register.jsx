import { useState } from "react";
import axios from "axios";
import { Lock, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await axios.post(((import.meta.env.VITE_API_URL || 'http://localhost:5000') + "/api/auth/user/register"), { 
                username, 
                password 
            });
            
            localStorage.setItem("userToken", res.data.token);
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-2">Request Access</h2>
                <p className="mt-2 text-sm text-primary uppercase tracking-widest text-center">
                    Dashmesh Jewellers
                </p>
                <div className="mt-4 text-textSecondary text-sm">
                    Create an account to browse our exclusive jewelry catalog and inquiry options.
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-surface py-8 px-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-border sm:rounded-sm sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {error && (
                            <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">
                                Choose Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-textSecondary" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-10 bg-background border border-border text-white focus:ring-primary focus:border-primary sm:text-sm py-3"
                                    placeholder="Enter new username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">
                                Create Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-textSecondary" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-10 bg-background border border-border text-white focus:ring-primary focus:border-primary sm:text-sm py-3"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-bold uppercase tracking-widest text-background bg-primary hover:bg-primary-light focus:outline-none disabled:opacity-50 transition-colors"
                            >
                                {isLoading ? "Creating Account..." : "Register Now"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-textSecondary text-sm">
                            Already have access?{" "}
                            <Link to="/" className="text-primary hover:text-white transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
