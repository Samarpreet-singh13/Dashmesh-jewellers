import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Design from "./pages/Design";
import Category from "./pages/Category";
import Search from "./pages/Search";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDesigns from "./pages/admin/AdminDesigns";
import AddDesign from "./pages/admin/AddDesign";
import EditDesign from "./pages/admin/EditDesign";
import AdminInquiries from "./pages/admin/AdminInquiries";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-page-fade flex-1 flex flex-col min-h-screen relative">
      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/design/:id" element={<Design />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/designs" element={<ProtectedRoute><AdminDesigns /></ProtectedRoute>} />
        <Route path="/admin/add" element={<ProtectedRoute><AddDesign /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><EditDesign /></ProtectedRoute>} />
        <Route path="/admin/inquiries" element={<ProtectedRoute><AdminInquiries /></ProtectedRoute>} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;