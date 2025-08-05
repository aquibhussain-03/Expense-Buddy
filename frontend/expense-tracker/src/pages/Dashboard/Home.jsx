import React from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiDownload, FiActivity } from 'react-icons/fi';
import StatsCard from '../../components/ui/StatsCard';
import TransactionList from '../../components/ui/TransactionList';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';
import { useTransactions, useTransactionStats } from '../../hooks/useTransactions';
import { exportToExcel } from '../../utils/helper';

const Home = () => {
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
  const { data: stats = {}, isLoading: statsLoading } = useTransactionStats();

  const handleExport = () => {
    exportToExcel(transactions, 'expense-tracker-transactions');
  };

  if (transactionsLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="space-y-8 animate-fadeIn">
        {/* Export Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleExport}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FiDownload className="mr-2" size={18} />
            Export to Excel
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatsCard
              title="Total Balance"
              amount={stats.balance || 0}
              icon={FiDollarSign}
              color="primary"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatsCard
              title="Total Income"
              amount={stats.totalIncome || 0}
              icon={FiTrendingUp}
              color="green"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatsCard
              title="Total Expense"
              amount={stats.totalExpense || 0}
              icon={FiTrendingDown}
              color="red"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <StatsCard
              title="No.of Transactions "
              amount={stats.transactionCount || 0}
              icon={FiActivity}
              color="blue"
              isCurrency={false}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <PieChart transactions={transactions} type="expense" />
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <PieChart transactions={transactions} type="income" />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="transform hover:scale-[1.01] transition-all duration-300">
          <BarChart transactions={transactions} />
        </div>

        {/* Recent Transactions */}
        <div className="transform hover:scale-[1.01] transition-all duration-300">
          <TransactionList 
            transactions={transactions.slice(0, 10)} 
            onEdit={() => {}} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;