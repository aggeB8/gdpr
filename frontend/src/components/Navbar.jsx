import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    
    // Visar inte Navbar på login och register sidor
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    return (
        <nav className="bg-blue-600 text-white px-8 py-3 flex justify-between items-center shadow-md">
            <Link to="/" className="text-xl font-bold tracking-wide"> 
                twitterClone
            </Link>
            <div className="flex space-x-4">
                <Link to="/" className="hover:underline"> Home </Link>
                <Link to="/profile" className="hover:underline"> Profile </Link>
                <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100"> Settings </Link>
            </div>
        </nav>
    );
}

