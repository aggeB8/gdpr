import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null; 
  }

  return (
    <nav className="bg-slate-900 border-b-2 border-slate-700 text-white px-8 py-4 flex justify-between items-center shadow-lg relative z-50">
      <Link to="/" className="text-2xl font-bold tracking-wider hover:text-blue-400 transition-colors">
        💬 Yap
      </Link>
      
      <div className="flex items-center space-x-3">
        {/* Home Button */}
        <Link 
          to="/" 
          className="px-6 py-2 rounded-full font-semibold text-slate-300 hover:text-blue-300 hover:bg-blue-950/40 transition-all duration-200 hover:shadow-lg"
        >
          🏠 Home
        </Link>
        
        {/* Profile Button */}
        <Link 
          to="/profile" 
          className="px-6 py-2 rounded-full font-semibold text-slate-300 hover:text-purple-300 hover:bg-purple-950/40 transition-all duration-200 hover:shadow-lg"
        >
          👤 Profile
        </Link>
        
        {/* Settings Button */}
        <Link
          to="/login"
          className="px-6 py-2 rounded-full font-semibold text-slate-300 hover:text-teal-300 hover:bg-teal-950/40 transition-all duration-200 hover:shadow-lg"
        >
          ⚙️ Settings
        </Link>

        {/* Logout/Login Section */}
        {user ? (
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-700">
            <span className="text-sm text-slate-400">{user.name}</span>
            <button
              onClick={logout}
              className="px-6 py-2 rounded-full font-semibold bg-red-950 text-red-200 hover:text-red-100 hover:bg-red-900 transition-all duration-200 hover:shadow-lg border border-red-800 hover:border-red-700"
            >
              🚪 Logga ut
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-6 py-2 rounded-full font-semibold bg-slate-800 text-blue-300 hover:text-blue-200 hover:bg-slate-700 transition-all duration-200 hover:shadow-lg border border-slate-700 hover:border-blue-600"
          >
            🔑 Logga In
          </Link>
        )}
      </div>
    </nav>
  );
}
