import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // Use your backend URL in production

// This function will run before every request to attach the token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    // The header name must be exactly 'x-auth-token'
    req.headers['x-auth-token'] = token;
  }
  return req;
});


// Auth routes
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Post routes
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);