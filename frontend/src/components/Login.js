// frontend/src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Invio la richiesta di login al backend
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });

      // Salvo il token JWT in localStorage
      localStorage.setItem('token', response.data.token);

      // Messaggio di successo
      console.log('Login successful', response.data);

      // Puoi aggiungere un redirect dopo il login
      // For example: router.push('/dashboard');
    } catch (err) {
      setError('Credenziali non valide');
      console.error('Login error', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
