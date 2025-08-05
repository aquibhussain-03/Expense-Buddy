import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiTrendingDown, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { useLogout } from '../../hooks/useAuth';

const Sidebar = () => {
  const logout = useLogout();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard', color: 'from-blue-500 to-purple-600' },
    { to: '/income', icon: FiTrendingUp, label: 'Income', color: 'from-green-500 to-emerald-600' },
    { to: '/expense', icon: FiTrendingDown, label: 'Expense', color: 'from-red-500 to-pink-600' },
  ];

  const userName = localStorage.getItem('userName') || 'User';

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl h-screen fixed left-0 top-0 z-20 border-r border-gray-700">
      {/* Header with Logo */}
      <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ET</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ExpenseTracker</h1>
            <p className="text-xs text-purple-100 opacity-80">Financial Management</p>
          </div>
        </div>
      </div>


      
      {/* Navigation */}
      <nav className="mt-4 px-4 space-y-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="block"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`
                flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform group relative overflow-hidden
                ${
                  isActive 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105` 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50 hover:scale-105'
                }
                ${
                  hoveredItem === index && !isActive ? 'shadow-lg' : ''
                }
              `}>
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                )}
                
                {/* Icon with background */}
                <div className={`
                  p-2 rounded-lg mr-3 transition-all duration-300
                  ${
                    isActive 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                  }
                `}>
                  <item.icon size={18} />
                </div>
                
                {/* Label */}
                <span className="font-medium text-sm">{item.label}</span>
                
                {/* Hover effect */}
                {hoveredItem === index && !isActive && (
                  <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Settings Section */}
      <div className="absolute bottom-20 left-4 right-4">
        <button className="flex items-center w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 rounded-xl group">
          <div className="p-2 rounded-lg mr-3 bg-gray-700/50 group-hover:bg-gray-600/50 transition-all duration-300">
            <FiSettings size={18} />
          </div>
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 transition-all duration-300 rounded-xl group transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
        >
          <div className="p-2 rounded-lg mr-3 bg-gray-700/50 group-hover:bg-white/20 transition-all duration-300">
            <FiLogOut size={18} />
          </div>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 right-0 w-32 h-32 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-0 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-xl"></div>
    </div>
  );
};

export default Sidebar;