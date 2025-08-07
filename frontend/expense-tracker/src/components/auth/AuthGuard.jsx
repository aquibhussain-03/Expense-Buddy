import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid, clearAuthData, setSessionAuth, clearSessionAuth } from '../../utils/auth';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!isTokenValid()) {
        clearAuthData();
        clearSessionAuth();
        navigate('/login', { replace: true });
        return;
      }
      setSessionAuth();
    };

    // Check auth on mount and window focus
    checkAuth();
    
    const handleFocus = () => checkAuth();
    const handleStorage = (e) => {
      // Only logout all tabs if token is completely removed
      if (e.key === 'token' && !e.newValue) {
        clearSessionAuth();
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, [navigate]);

  return children;
};

export default AuthGuard;