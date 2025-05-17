import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');

  // Se l'utente non è autenticato, lo redirigi alla pagina di login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Se l'utente è autenticato, mostra la componente passata come prop
  return <Component {...rest} />;
};

export default ProtectedRoute;
