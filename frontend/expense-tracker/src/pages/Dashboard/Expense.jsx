import React, { useState } from 'react';
import { FiPlus, FiTrendingDown, FiX } from 'react-icons/fi';
import TransactionForm from '../../components/forms/TransactionForm';
import TransactionList from '../../components/ui/TransactionList';
import PieChart from '../../components/charts/PieChart';
import { useTransactions, useCreateTransaction, useUpdateTransaction } from '../../hooks/useTransactions';

const Expense = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  const { data: transactions = [] } = useTransactions();
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleSubmit = (data) => {
    const transactionData = { ...data, type: 'expense' };
    
    if (editingTransaction) {
      updateTransaction.mutate(
        { id: editingTransaction._id, data: transactionData },
        {
          onSuccess: () => {
            setEditingTransaction(null);
            setShowForm(false);
          }
        }
      );
    } else {
      createTransaction.mutate(transactionData, {
        onSuccess: () => setShowForm(false)
      });
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
                <FiTrendingDown className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Expenses
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Total: ${totalExpense.toFixed(2)} • {expenseTransactions.length} transactions</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative z-10"
            >
              <FiPlus className="mr-2" size={18} />
              Add Expense
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Form */}
          <div className="xl:col-span-1">
            {showForm ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-all duration-300 animate-slideIn">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                      {editingTransaction ? 'Edit Expense' : 'Add New Expense'}
                    </h2>
                    <button
                      onClick={handleCancel}
                      className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/20"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <TransactionForm
                    onSubmit={handleSubmit}
                    defaultValues={editingTransaction}
                    type="expense"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-16 h-16 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 transform hover:scale-110 cursor-pointer"
                >
                  <FiPlus className="text-red-600" size={24} />
                </button>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Track your expenses</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Click the "Add Expense" button to record a new expense</p>
              </div>
            )}
          </div>

          {/* Chart and List */}
          <div className="xl:col-span-3 space-y-8">
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <PieChart transactions={expenseTransactions} type="expense" />
            </div>
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <TransactionList transactions={expenseTransactions} onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
