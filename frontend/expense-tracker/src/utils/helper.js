import { format } from 'date-fns';
import * as XLSX from 'xlsx';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const exportToExcel = (transactions, filename = 'transactions') => {
  const data = transactions.map(transaction => ({
    Date: formatDate(transaction.date),
    Title: transaction.title,
    Category: transaction.category,
    Type: transaction.type,
    Amount: transaction.amount,
    Description: transaction.description || ''
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('profileImage');
};