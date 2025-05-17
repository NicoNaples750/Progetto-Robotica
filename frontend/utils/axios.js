import axios from 'axios';

// Configura base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Modifica con la tua URL di backend
});

// Aggiungi il token nelle richieste se è presente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
