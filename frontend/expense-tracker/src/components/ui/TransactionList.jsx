import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { formatCurrency, formatDate } from '../../utils/helper';
import { useDeleteTransaction } from '../../hooks/useTransactions';

const TransactionList = ({ transactions, onEdit }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const deleteTransaction = useDeleteTransaction();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction.mutate(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="px-6 py-4 border-b hover:bg-gray-50 transition-colors relative"
              onMouseEnter={() => setHoveredId(transaction._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{transaction.title}</h4>
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-500">{transaction.category}</span>
                    <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                  </div>
                  {transaction.description && (
                    <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
                  )}
                </div>
                
                {hoveredId === transaction._id && (
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;