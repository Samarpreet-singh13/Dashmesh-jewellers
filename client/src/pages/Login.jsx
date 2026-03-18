import { useState } from "react";
import axios from "axios";
import { Lock, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
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
            const res = await axios.post(((import.meta.env.VITE_API_URL || '') + "/api/auth/user/login"), { 
                username, 
                password 
            });
            
            localStorage.setItem("userToken", res.data.token);
            navigate("/home");
        } catch (err) {
            let errorMessage = "Invalid credentials";
            if (!err.response && err.message === "Network Error") {
                errorMessage = "Server Down - Please try again later";
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-2">Welcome Back</h2>
                <p className="mt-2 text-sm text-primary uppercase tracking-widest text-center">
                    Dashmesh Jewellers Exclusive Catalog
                </p>
                <div className="mt-4 text-textSecondary text-sm">
                    Enter your credentials to browse our collections.
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-surface py-8 px-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-border sm:rounded-sm sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {error && (
                            <div className="bg-red-900/80 border-l-4 border-red-500 text-red-100 p-4 text-sm font-medium rounded-sm shadow-md flex items-center gap-3">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-textSecondary" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-10 bg-background border border-border text-white focus:ring-primary focus:border-primary sm:text-sm py-3"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-textSecondary uppercase tracking-widest mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-textSecondary" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-10 bg-background border border-border text-white focus:ring-primary focus:border-primary sm:text-sm py-3"
                                    placeholder="Enter password"
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
                                {isLoading ? "Authenticating..." : "Sign In to Catalog"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-textSecondary text-sm">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary hover:text-white transition-colors">
                                Request Access
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
