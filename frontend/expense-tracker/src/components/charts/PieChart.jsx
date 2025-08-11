import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FiPieChart, FiCircle } from 'react-icons/fi';
import { CHART_COLORS } from '../../utils/data';
import { formatCurrency } from '../../utils/helper';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions, type = 'expense' }) => {
  const [chartType, setChartType] = useState('donut');
  const filteredTransactions = transactions.filter(t => t.type === type);
  
  const categoryData = filteredTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
  const topCategories = Object.entries(categoryData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const data = {
    labels: topCategories.map(([category]) => category),
    datasets: [
      {
        data: topCategories.map(([,amount]) => amount),
        backgroundColor: CHART_COLORS.slice(0, topCategories.length),
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
    cutout: chartType === 'donut' ? '60%' : '0%',
  };

  const colorMap = {
    expense: 'from-red-500 to-pink-600',
    income: 'from-green-500 to-emerald-600'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className={`bg-gradient-to-r ${colorMap[type]} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white capitalize">
              {type} by Category
            </h3>
            <p className="text-white/80 text-xs">
              Total: {formatCurrency(total)}
            </p>
          </div>
          
          {/* Chart Type Toggle */}
          <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-1">
            <button
              onClick={() => setChartType('pie')}
              className={`p-2 rounded-md transition-all duration-200 ${
                chartType === 'pie'
                  ? 'bg-white text-gray-700 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Pie Chart"
            >
              <FiPieChart size={16} />
            </button>
            <button
              onClick={() => setChartType('donut')}
              className={`p-2 rounded-md transition-all duration-200 ${
                chartType === 'donut'
                  ? 'bg-white text-gray-700 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="Donut Chart"
            >
              <FiCircle size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {Object.keys(categoryData).length > 0 ? (
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Chart */}
            <div className="w-32 h-32 sm:w-48 sm:h-48 relative flex-shrink-0">
              <Pie data={data} options={options} />
              {chartType === 'donut' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{topCategories.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Categories</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="flex-1 space-y-2 sm:space-y-3 w-full">
              {topCategories.map(([category, amount], index) => {
                const percentage = ((amount / total) * 100).toFixed(1);
                return (
                  <div key={category} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div 
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: CHART_COLORS[index] }}
                      ></div>
                      <span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-200 truncate">{category}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-100">{formatCurrency(amount)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gray-400">📊</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No {type} data available</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Add some {type} transactions to see the breakdown</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;