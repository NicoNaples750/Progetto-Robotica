import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/missioni', label: 'Missioni' },
  { path: '/report', label: 'Report' },
  { path: '/temperature', label: 'Temperature' },
  { path: '/aggiorna-skill', label: 'Aggiorna Skill' },
  { path: '/immagini-panoramiche', label: 'Immagini Panoramiche' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/grafici-missioni', label: 'Grafici Missioni' }
];

export default function Sidebar({ activePage }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside className="bg-white shadow-lg w-64 min-h-screen fixed">
      <div className="p-6 font-bold text-xl border-b">Robot Dashboard</div>
      <nav className="mt-4 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-6 py-2 hover:bg-gray-100 ${
              location.pathname === item.path ? 'bg-gray-200 font-semibold' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-start px-6 py-2 text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </nav>
    </aside>
  );
}