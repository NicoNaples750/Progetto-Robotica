import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Aggiunge il token JWT a ogni richiesta
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;