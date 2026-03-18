import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    try {
        // Decode the JWT token payload to check the role
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        if (payload.role !== "admin") {
            // Not an admin, redirect away
            return <Navigate to="/home" replace />;
        }
    } catch (error) {
        // If token is invalid or tampered with
        localStorage.removeItem("adminToken");
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
