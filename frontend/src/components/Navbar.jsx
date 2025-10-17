import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null; //  gömmer Navbar på login/register
  }

  return (
    <nav className="bg-blue-600 text-white px-8 py-3 flex justify-between items-center shadow-md relative z-50">
      <Link to="/" className="text-xl font-bold tracking-wide">
        twitterClone
      </Link>
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">
          {" "}
          Home{" "}
        </Link>
        <Link to="/profile" className="hover:underline">
          {" "}
          Profile{" "}
        </Link>
        <Link
          to="/login"
          className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100"
        >
          {" "}
          Settings{" "}
        </Link>

        {user && (
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100"
          >
            Logga ut ({user.name})
          </button>
        )}
        <Link
          to="/login"
          className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100"
        >
          Logga In
        </Link>
      </div>
    </nav>
  );
}
