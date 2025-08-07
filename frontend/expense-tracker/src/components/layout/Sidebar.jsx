import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiTrendingDown, FiDownload } from 'react-icons/fi';
import { useTransactions } from '../../hooks/useTransactions';
import { exportToExcel } from '../../utils/helper';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { data: transactions = [] } = useTransactions();

  const handleExport = () => {
    exportToExcel(transactions, 'expense-tracker-transactions');
  };

  const navItems = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/income', icon: FiTrendingUp, label: 'Income' },
    { to: '/expense', icon: FiTrendingDown, label: 'Expense' },
  ];

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen z-50 transition-all duration-500 ease-in-out
        w-72 
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-500/10 dark:shadow-black/20
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-indigo-50/20 to-transparent dark:from-gray-800/30 dark:via-gray-700/20 pointer-events-none"></div>
        
        {/* Header */}
        <div className="relative p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-lg font-bold text-white">EB</span>
              </div>
              <div className="transition-all duration-300 ease-in-out">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">ExpenseBuddy</h1>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Financial Management</p>
              </div>
            </div>
            
            {/* Close Button - Mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
              aria-label="Close Sidebar"
            >
              <div className="w-5 h-5 relative">
                <div className="absolute top-2 w-4 h-0.5 bg-current rotate-45 transition-all duration-300"></div>
                <div className="absolute top-2 w-4 h-0.5 bg-current -rotate-45 transition-all duration-300"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleNavClick}
                className="block group"
                title={item.label}
                aria-label={item.label}
              >
                <div className={`
                  relative flex items-center px-3 py-4 rounded-2xl transition-all duration-300 ease-in-out
                  ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white backdrop-blur-sm shadow-lg shadow-indigo-500/30' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-700/50'
                  }
                `}>
                  {/* Active glow border */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full shadow-lg shadow-indigo-500/50"></div>
                  )}
                  
                  {/* Icon */}
                  <div className={`
                    p-2.5 rounded-xl transition-all duration-300 flex-shrink-0 group-hover:scale-110
                    ${
                      isActive 
                        ? 'bg-white/20 shadow-lg shadow-white/20' 
                        : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                    }
                  `}>
                    <item.icon size={20} className={`transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white'
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <span className={`font-semibold text-sm ml-4 tracking-wide transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Active pulse indicator */}
                  {isActive && (
                    <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
                  )}
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>

        {/* Export Section */}
        <div className="p-3">
          <button
            onClick={handleExport}
            className="flex items-center w-full px-3 py-3 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 transition-all duration-300 rounded-xl group border border-transparent hover:border-green-400/30"
            title="Export to Excel"
            aria-label="Export to Excel"
          >
            <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20 transition-all duration-300 flex-shrink-0 group-hover:scale-110">
              <FiDownload size={18} />
            </div>
            <span className="font-medium text-sm ml-3 tracking-wide transition-all duration-300">Export to Excel</span>
          </button>
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-20 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 -left-10 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>
      </div>
    </>
  );
};

export default Sidebar;