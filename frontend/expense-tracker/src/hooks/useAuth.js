import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { setAuthToken, removeAuthToken } from '../utils/helper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (response) => {
      setAuthToken(response.data.token);
      localStorage.setItem('userName', response.data.name);
      sessionStorage.setItem('authenticated', 'true');
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: () => {
      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return () => {
    // Only clear session storage for current tab
    sessionStorage.removeItem('authenticated');
    queryClient.clear();
    toast.success('Logged out successfully');
    navigate('/login');
  };
};