import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ALUMNI_ROUTES, ADMIN_ROUTES } from '../../constants/routes';

export default function RoleRedirect() {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      console.log("No valid user found, redirecting to login");
      navigate(ALUMNI_ROUTES.LOGIN, {
        state: { from: location.pathname },
        replace: true
      });
      return;
    }

    if (userRole === 'admin') {
      console.log("Admin user detected, redirecting to admin dashboard");
      navigate(ADMIN_ROUTES.DASHBOARD, { replace: true });
      return;
    }
  }, [user, loading, userRole, navigate]);

  // Return null as this is just a redirect component
  return null;
}