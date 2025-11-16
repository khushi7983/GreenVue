import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  // Check if token exists and is not expired
  const isAuthenticated = () => {
    if (!token) return false;
    
    try {
      // Parse JWT token to check expiration
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Check if token is expired
      if (tokenData.exp < currentTime) {
        localStorage.removeItem('token');
        return false;
      }
      
      return true;
    } catch (error) {
      // If token is malformed, remove it
      localStorage.removeItem('token');
      return false;
    }
  };
  
  if (!isAuthenticated()) {
    // Redirect to login with the current location to return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 