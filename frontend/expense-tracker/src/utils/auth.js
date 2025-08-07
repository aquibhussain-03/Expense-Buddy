// Centralized auth utilities
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('profileImage');
};

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Session storage for tab-specific authentication
export const setSessionAuth = () => {
  if (isTokenValid()) {
    sessionStorage.setItem('authenticated', 'true');
  }
};

export const isSessionAuthenticated = () => {
  return sessionStorage.getItem('authenticated') === 'true' && isTokenValid();
};

export const clearSessionAuth = () => {
  sessionStorage.removeItem('authenticated');
};