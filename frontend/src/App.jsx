import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css'; 

const App = () => {
  // Use state to manage authentication status for proper reactivity
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount and when token changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (useful for multi-tab scenarios)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* The main application container */}
      <div className="min-h-screen w-full bg-gray-100 flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        {/* 
          Main content container with proper centering and padding
          - flex-1 ensures it takes remaining height
          - Removes padding for login/register pages for better full-screen design
        */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? (
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                  <HomePage />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            
            <Route path="/login" element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
              )
            } />
            
            <Route path="/register" element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <RegisterPage setIsAuthenticated={setIsAuthenticated} />
              )
            } />

            {/* 404 Catch-all route */}
            <Route path="*" element={
              <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            } />
          </Routes>
        </main>

        {/* Optional Footer */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} LinkedIn-Clone-By-Atul. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;