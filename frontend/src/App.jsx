import './App.css';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Rgesiter';

function App() {
  const [currentPage, setCurrentPage] = useState('register'); // 'login' eller 'register'

  return (
    <div>
      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-center space-x-0">
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-8 py-3 font-medium transition-colors border-b-2 ${
              currentPage === 'login'
                ? 'text-blue-600 border-blue-600 bg-blue-50'
                : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentPage('register')}
            className={`px-8 py-3 font-medium transition-colors border-b-2 ${
              currentPage === 'register'
                ? 'text-blue-600 border-blue-600 bg-blue-50'
                : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Content */}
      {currentPage === 'login' ? <Login /> : <Register />}
    </div>
  );
}

export default App;
