import React from 'react';
import { useAuth } from '../src/context/AuthContext.js';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <h2>Benvenuto, {user.username}!</h2>
          <p>Ruolo: {user.role}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Non sei loggato</p>
      )}
    </div>
  );
}
