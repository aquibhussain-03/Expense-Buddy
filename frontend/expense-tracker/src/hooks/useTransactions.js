import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionAPI.getAll().then(res => res.data),
  });
};

export const useTransactionStats = () => {
  return useQuery({
    queryKey: ['transaction-stats'],
    queryFn: () => transactionAPI.getStats().then(res => res.data),
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: transactionAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      queryClient.invalidateQueries(['transaction-stats']);
      toast.success('Transaction added successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add transaction');
    }
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => transactionAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      queryClient.invalidateQueries(['transaction-stats']);
      toast.success('Transaction updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update transaction');
    }
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: transactionAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      queryClient.invalidateQueries(['transaction-stats']);
      toast.success('Transaction deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete transaction');
    }
  });
};