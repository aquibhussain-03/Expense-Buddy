import React from 'react';
import { formatCurrency } from '../../utils/helper';

const StatsCard = ({ title, amount, icon: Icon, color = 'primary', isCurrency = true }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-purple-500/25',
    green: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/25',
    red: 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-red-500/25',
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-blue-500/25'
  };

  return (
    <div className={`p-6 rounded-3xl shadow-xl ${colorClasses[color]} relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs opacity-90 font-medium mb-2">{title}</p>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
              {typeof amount === 'number' && isCurrency ? formatCurrency(amount) : amount}
            </p>
          </div>
          {Icon && (
            <div className="ml-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Icon size={32} className="opacity-90" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;