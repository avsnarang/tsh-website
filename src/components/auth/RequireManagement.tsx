import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function RequireManagement() {
  const { user } = useAuth();
  const [isManagement, setIsManagement] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkManagement = async () => {
      try {
        if (!user) {
          setIsManagement(false);
          return;
        }

        const { data, error } = await supabase
          .from('management_users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking management status:', error);
          setError('Failed to verify management access');
          setIsManagement(false);
          return;
        }

        setIsManagement(!!data);
      } catch (error) {
        console.error('Error checking management status:', error);
        setError('Failed to verify management access');
        setIsManagement(false);
      }
    };

    checkManagement();
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

  if (isManagement === null) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-md mx-auto text-center">
          <div className="text-neutral-dark">Verifying access...</div>
        </div>
      </div>
    );
  }

  return isManagement ? <Outlet /> : <Navigate to="/admin-portal/login" />;
}