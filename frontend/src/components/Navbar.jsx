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
        // This assumes your payload is { user: { id: '...' } }
        // For displaying name, we'd need to fetch it or include it in the token
        // Let's just confirm the user is logged in for now
        setUser(decodedToken.user); // Store the user object from the token
      } catch (error) {
        console.error("Invalid token:", error);
        // Handle invalid token, e.g., logout user
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
    <nav className="navbar">
      <Link to="/" className="navbar-brand">LinkedIn Clone</Link>
      <div className="navbar-links">
        {user ? (
          <>
            {/* We don't have the name, so let's just say welcome */}
            <span>Welcome!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;