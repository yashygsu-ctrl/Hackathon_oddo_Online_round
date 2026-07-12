import React from 'react';
import useStore from '../store/useStore';

const Topbar = () => {
  const user = useStore(state => state.user);
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

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">{user.name}</span>
        <div className="flex items-center border border-primary/50 rounded-full bg-transparent overflow-hidden">
          <span className="px-3 py-1 text-xs text-primary border-r border-primary/50">{user.role}</span>
          <span className="px-2 py-1 text-xs text-gray-300 bg-gray-800">{initials}</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
