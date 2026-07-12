import React from 'react';
import { NavLink } from 'react-router-dom';
import useStore from '../store/useStore';

const Sidebar = () => {
  const user = useStore(state => state.user) || { role: 'Fleet Manager' };

  const allItems = [
    { name: 'Dashboard', path: '/dashboard', roles: ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'] },
    { name: 'Fleet', path: '/fleet', roles: ['Fleet Manager', 'Dispatcher', 'Financial Analyst'] },
    { name: 'Drivers', path: '/drivers', roles: ['Fleet Manager', 'Safety Officer'] },
    { name: 'Trips', path: '/trips', roles: ['Dispatcher', 'Safety Officer'] },
    { name: 'Maintenance', path: '/maintenance', roles: ['Fleet Manager'] },
    { name: 'Fuel & Expenses', path: '/expenses', roles: ['Financial Analyst'] },
    { name: 'Analytics', path: '/analytics', roles: ['Fleet Manager', 'Financial Analyst'] },
    { name: 'Settings', path: '/settings', roles: ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'] },
  ];

  const menuItems = allItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="w-64 h-screen bg-[#111111] border-r border-[#333333] flex flex-col font-sans">
      <div className="p-6">
        <h2 className="text-2xl font-normal text-gray-200">
          TransitOps
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive ? 'border border-primary text-primary bg-transparent' : 'border border-transparent text-gray-400 hover:text-gray-200'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
