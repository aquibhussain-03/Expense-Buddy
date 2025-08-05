import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Immediate check - no async state
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
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileImage');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;