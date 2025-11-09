import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      navigate('/');
      window.location.reload(); // To update navbar
    } catch (error) {
      // --- THIS IS THE UPDATED PART ---
      console.error('Login failed:', error.response); // Log the full error for debugging

      // Check if the server sent a specific error message
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg); // Show "Invalid credentials"
      } else {
        // Otherwise, show a generic network/server error
        alert('Login failed. An unexpected error occurred. Please try again.');
      }
      // --- END OF UPDATE ---
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>      
      </form>
    </div>
  );
};

export default LoginPage;