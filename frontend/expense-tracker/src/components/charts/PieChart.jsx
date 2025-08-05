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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className={`bg-gradient-to-r ${colorMap[type]} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white capitalize">
              {type} by Category
            </h3>
            <p className="text-white/80 text-sm">
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
          <div className="flex items-center space-x-6">
            {/* Chart */}
            <div className="w-48 h-48 relative">
              <Pie data={data} options={options} />
              {chartType === 'donut' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{topCategories.length}</p>
                    <p className="text-sm text-gray-500">Categories</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="flex-1 space-y-3">
              {topCategories.map(([category, amount], index) => {
                const percentage = ((amount / total) * 100).toFixed(1);
                return (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: CHART_COLORS[index] }}
                      ></div>
                      <span className="font-medium text-gray-700">{category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{formatCurrency(amount)}</p>
                      <p className="text-sm text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gray-400">📊</span>
            </div>
            <p className="text-gray-500 font-medium">No {type} data available</p>
            <p className="text-gray-400 text-sm mt-1">Add some {type} transactions to see the breakdown</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;