import React, { useState, useEffect } from 'react';
import { Moon, Sun, LogOut } from 'lucide-react';
import useStore from '../store/useStore';

const Topbar = () => {
  const user = useStore(state => state.user);
  const logout = useStore(state => state.logout);
  const isDarkMode = useStore(state => state.isDarkMode);
  const toggleDarkMode = useStore(state => state.toggleDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  if (!user) return null;

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  return (
    <div className="h-16 border-b border-[#333333] bg-[#111111] flex items-center justify-between px-6 font-sans">
      <div className="flex-1">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-64 px-4 py-1.5 bg-transparent border border-[#444] rounded-lg text-sm text-gray-200 focus:outline-none focus:border-primary placeholder:text-gray-600"
        />
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleDarkMode}
          className="text-gray-400 hover:text-white transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{user.name}</span>
          <div className="flex items-center border border-primary/50 rounded-full bg-transparent overflow-hidden">
            <span className="px-3 py-1 text-xs text-primary border-r border-primary/50">{user.role}</span>
            <span className="px-2 py-1 text-xs text-gray-300 bg-gray-800">{initials}</span>
          </div>
        </div>

        <button 
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          className="text-gray-500 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
