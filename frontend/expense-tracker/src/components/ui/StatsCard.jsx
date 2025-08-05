import React from 'react';
import { formatCurrency } from '../../utils/helper';

const StatsCard = ({ title, amount, icon: Icon, color = 'primary', isCurrency = true }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
    green: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white',
    red: 'bg-gradient-to-br from-red-500 to-pink-600 text-white',
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white'
  };

  return (
    <div className={`p-6 rounded-2xl shadow-lg border border-gray-100 ${colorClasses[color]} relative overflow-hidden group`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm opacity-90 font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2 tracking-tight">
              {typeof amount === 'number' && isCurrency ? formatCurrency(amount) : amount}
            </p>
          </div>
          {Icon && (
            <div className="ml-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Icon size={28} className="opacity-90" />
              </div>
            </div>
          )}
        </div>
        
        {/* Subtle animation indicator */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;