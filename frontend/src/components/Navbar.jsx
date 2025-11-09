import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // This is your existing logic, it's perfect.
        setUser(decodedToken.user); // Store the user object from the token
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    window.location.reload();
  };

  return (
    // We start by defining a white background and a shadow.
    <nav className="bg-white shadow-sm">
      {/* This div centers the content and adds padding. 'mx-auto' is for centering. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flexbox is used to align items. 'h-16' sets a fixed height. */}
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Brand/Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              LinkedIn Clone
            </Link>
          </div>

          {/* Right Side: Links and Buttons */}
          {/* 'hidden md:block' makes this section disappear on small screens (mobile-first approach) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user ? (
                // This will be shown if the user IS logged in
                <>
                  <span className="text-gray-800 font-medium">Welcome!</span>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // This will be shown if the user is NOT logged in
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Optional: Mobile Menu Button can be added here later */}
          {/* <div className="md:hidden"> ... </div> */}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;