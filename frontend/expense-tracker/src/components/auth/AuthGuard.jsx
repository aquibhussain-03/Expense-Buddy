import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp < currentTime) {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          localStorage.removeItem('profileImage');
          navigate('/login', { replace: true });
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('profileImage');
        navigate('/login', { replace: true });
      }
    };

    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [navigate]);

  return children;
};

export default AuthGuard;