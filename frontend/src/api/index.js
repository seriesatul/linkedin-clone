import axios from 'axios';

// Ensure the baseURL is correct for local development
const API = axios.create({ baseURL: 'https://linkedin-clone-backend-i9og.onrender.com/api' });

// Add logs to the interceptor to trace the request
API.interceptors.request.use((req) => {
  console.log("--- Axios Interceptor Triggered ---");
  const token = localStorage.getItem('token');
  
  if (token) {
    req.headers['x-auth-token'] = token;
    console.log("Interceptor: Token found and attached to header.");
  } else {
    console.log("Interceptor: No token found in localStorage.");
  }
  
  console.log("Interceptor: Final request config being sent:", req);
  return req;
});


// Auth routes
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);


// Post routes
export const fetchPosts = () => API.get('/posts');

// Add logs to the createPost function itself
export const createPost = (newPost) => {
  console.log("--- createPost function called ---");
  console.log("Data to be sent:", newPost);
  return API.post('/posts', newPost);
};


export const likePost = (id) => API.put(`/posts/${id}/like`);
export const commentOnPost = (id, commentData) => API.post(`/posts/${id}/comment`, commentData);