import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isTokenValid, clearAuthData, setSessionAuth, isSessionAuthenticated } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    // Set session auth on component mount
    if (isTokenValid()) {
      setSessionAuth();
    }
  }, []);

  // Check both token validity and session authentication
  if (!isTokenValid()) {
    clearAuthData();
    return <Navigate to="/login" replace />;
  }
  
  if (!isSessionAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;