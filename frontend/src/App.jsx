import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      
      {/* Navigation med Router Links */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-center space-x-0">
          <Link
            to="/"
            className={`px-8 py-3 font-medium transition-colors border-b-2 ${
              location.pathname === '/'
                ? 'text-blue-600 border-blue-600 bg-blue-50'
                : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/login"
            className={`px-8 py-3 font-medium transition-colors border-b-2 ${
              location.pathname === '/login'
                ? 'text-blue-600 border-blue-600 bg-blue-50'
                : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-8 py-3 font-medium transition-colors border-b-2 ${
              location.pathname === '/register'
                ? 'text-blue-600 border-blue-600 bg-blue-50'
                : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
