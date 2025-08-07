import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { removeAuthToken } from '../utils/helper';
import toast from 'react-hot-toast';

// Global logout that affects all tabs
export const useGlobalLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return () => {
    removeAuthToken(); // This will trigger storage event in other tabs
    sessionStorage.removeItem('authenticated');
    queryClient.clear();
    toast.success('Logged out from all tabs');
    navigate('/login');
  };
};