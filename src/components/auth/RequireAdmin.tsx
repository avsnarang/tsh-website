import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function RequireAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (!user) {
          setIsAdmin(false);
          return;
        }

        const { data, error } = await supabase
          .from('management_users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          setError('Failed to verify admin access');
          setIsAdmin(false);
          return;
        }

        setIsAdmin(!!data);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setError('Failed to verify admin access');
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [user]);

  if (error) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-md mx-auto text-center">
          <div className="text-neutral-dark">Verifying access...</div>
        </div>
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin-portal/login" />;
}