import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthInitializer() {
  const location = useLocation();
  const { clearAdminSession } = useAuth();
  
  useEffect(() => {
    const isLoginPage = location.pathname.includes('/login');
    const loginInProgress = sessionStorage.getItem('login_in_progress');
    
    if (isLoginPage && !loginInProgress) {
      clearAdminSession();
    }
  }, [location.pathname, clearAdminSession]);
  
  return null;
} 
