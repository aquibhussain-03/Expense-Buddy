import React, { useState, useRef, useEffect } from 'react';
import { FiCamera, FiUser, FiBell, FiSearch, FiChevronDown } from 'react-icons/fi';

const Header = ({ title, subtitle }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  // Get user name from localStorage or token
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

  // Load user profile on component mount
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
    <header className="bg-gradient-to-r from-white via-blue-50 to-purple-50 shadow-lg border-b border-gray-100 px-8 py-5">
      <div className="flex items-center justify-between">
        {/* Left Section - Page Title */}
        <div className="flex-1">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-slate-600 font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search transactions, categories..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
            <FiBell size={22} className="group-hover:scale-110 transition-transform" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
          </button>

          {/* Welcome Message & Profile */}
          <div className="flex items-center space-x-4">
            {/* Welcome Message */}
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {userName}
              </p>
            </div>

            {/* Profile Picture */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/60 transition-all duration-200 group"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-200">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{getInitials(userName)}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Camera overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <FiCamera className="text-white" size={16} />
                  </div>
                </div>
                
                <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} size={16} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{userName}</p>
                    <p className="text-sm text-gray-500">Manage your account</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                      <FiCamera size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Change Profile Picture</p>
                      <p className="text-xs text-gray-500">Upload a new photo</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors group"
                  >
                    <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors">
                      <FiUser size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">View Profile</p>
                      <p className="text-xs text-gray-500">Account settings</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hidden file input */}
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