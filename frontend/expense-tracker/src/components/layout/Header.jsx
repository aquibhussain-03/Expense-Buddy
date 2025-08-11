import React, { useState, useRef, useEffect } from 'react';
import { FiCamera, FiLogOut, FiSun, FiMoon, FiSearch, FiChevronDown, FiMenu } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import { useLogout } from '../../hooks/useAuth';

const Header = ({ title, subtitle, isOpen, setIsOpen }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const logout = useLogout();

  const getUserName = () => {
    const userName = localStorage.getItem('userName');
    if (userName) return userName;
    
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.name || 'User';
      } catch (error) {
        return 'User';
      }
    }
    return 'User';
  };

  const userName = getUserName();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const userData = await response.json();
        if (response.ok && userData.profilePicture) {
          setProfileImage(`http://localhost:5000${userData.profilePicture}`);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    
    if (localStorage.getItem('token')) {
      loadUserProfile();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', file);
        
        const response = await fetch('http://localhost:5000/api/profile/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });
        
        const data = await response.json();
        if (response.ok) {
          const imageUrl = `http://localhost:5000${data.profilePicture}`;
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-8 py-4 lg:py-5 relative z-50">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button & Title */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 sm:p-2.5 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all duration-200 flex-shrink-0"
          >
            <FiMenu size={18} className="sm:w-6 sm:h-6" />
          </button>
          
          <div className="space-y-1 min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-800 dark:text-white truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium hidden sm:block truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-8 relative z-40">
          <div className="relative group w-full">
            <FiSearch className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-200 dark:border-gray-600 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 relative z-40"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-3 lg:space-x-6 flex-shrink-0">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="relative p-2 sm:p-2.5 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all duration-200 group"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <FiMoon size={16} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <FiSun size={16} className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Profile Section */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Welcome Message - Desktop only */}
            <div className="hidden xl:block text-right">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Welcome back,</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {userName}
              </p>
            </div>

            {/* Profile Picture */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200 group"
              >
                <div className="relative">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-200">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xs lg:text-sm">{getInitials(userName)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-black/40 rounded-lg sm:rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <FiCamera className="text-white" size={10} />
                  </div>
                </div>
                
                <FiChevronDown className={`hidden lg:block text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} size={16} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 sm:mt-3 w-44 sm:w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 sm:py-3 z-[9999] animate-fadeIn">
                  <div className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-semibold text-xs sm:text-base text-gray-800 dark:text-white truncate">{userName}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Manage your account</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                  >
                    <div className="p-1 sm:p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-2 sm:mr-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                      <FiCamera size={12} className="sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Change Profile Picture</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Upload a new photo</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                  >
                    <div className="p-1 sm:p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-2 sm:mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors">
                      <FiLogOut size={12} className="sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">Logout</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;