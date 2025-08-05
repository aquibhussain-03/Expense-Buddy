import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthGuard from './components/auth/AuthGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><AuthGuard><Layout title="Dashboard" subtitle="Your financial overview"><Home /></Layout></AuthGuard></ProtectedRoute>} />
          <Route path="/income" element={<ProtectedRoute><AuthGuard><Layout title="Income" subtitle="Track your earnings"><Income /></Layout></AuthGuard></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute><AuthGuard><Layout title="Expenses" subtitle="Monitor your spending"><Expense /></Layout></AuthGuard></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
};

const Root = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('profileImage');
      return <Navigate to="/login" replace />;
    }
    
    return <Navigate to="/dashboard" replace />;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileImage');
    return <Navigate to="/login" replace />;
  }
};

export default App;


