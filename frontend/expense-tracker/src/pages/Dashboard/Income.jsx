import React, { useState } from 'react';
import { FiPlus, FiTrendingUp, FiX } from 'react-icons/fi';
import TransactionForm from '../../components/forms/TransactionForm';
import TransactionList from '../../components/ui/TransactionList';
import PieChart from '../../components/charts/PieChart';
import { useTransactions, useCreateTransaction, useUpdateTransaction } from '../../hooks/useTransactions';

const Income = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  const { data: transactions = [] } = useTransactions();
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();

  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleSubmit = (data) => {
    const transactionData = { ...data, type: 'income' };
    
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <FiTrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Income
                </h1>
                <p className="text-gray-600 mt-1">Total: ${totalIncome.toFixed(2)} • {incomeTransactions.length} transactions</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FiPlus className="mr-2" size={18} />
              Add Income
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Form */}
          <div className="xl:col-span-1">
            {showForm ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 animate-slideIn">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                      {editingTransaction ? 'Edit Income' : 'Add New Income'}
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
                    type="income"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPlus className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to add income?</h3>
                <p className="text-gray-600">Click the "Add Income" button to get started</p>
              </div>
            )}
          </div>

          {/* Chart and List */}
          <div className="xl:col-span-3 space-y-8">
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <PieChart transactions={incomeTransactions} type="income" />
            </div>
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <TransactionList transactions={incomeTransactions} onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
