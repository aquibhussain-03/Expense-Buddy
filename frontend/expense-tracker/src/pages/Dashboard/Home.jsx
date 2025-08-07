import React from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiActivity } from 'react-icons/fi';
import StatsCard from '../../components/ui/StatsCard';
import TransactionList from '../../components/ui/TransactionList';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';
import { useTransactions, useTransactionStats } from '../../hooks/useTransactions';

const Home = () => {
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
  const { data: stats = {}, isLoading: statsLoading } = useTransactionStats();



  if (transactionsLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="space-y-8 animate-fadeIn">


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