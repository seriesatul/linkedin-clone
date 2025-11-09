import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(formData);
      localStorage.setItem('token', data.token);
      navigate('/');
      window.location.reload(); // To update navbar
    } catch (error) {
      // --- THIS IS THE UPDATED PART ---
      console.error('Registration failed:', error.response); // Log the full error for debugging

      // Check if the server sent a specific error message
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg); // Show the specific message from the backend (e.g., "User already exists")
      } else {
        // Otherwise, show a generic network/server error
        alert('Registration failed. An unexpected error occurred. Please check the console.');
      }
      // --- END OF UPDATE ---
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;