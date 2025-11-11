'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface ManagementContextType {
  isManagement: boolean;
  managementRole: string | null;
  checkManagementAccess: () => Promise<boolean>;
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export function ManagementProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isManagement, setIsManagement] = useState(false);
  const [managementRole, setManagementRole] = useState<string | null>(null);

  const checkManagementAccess = async () => {
    if (!user) {
      setIsManagement(false);
      setManagementRole(null);
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('management_users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        setIsManagement(false);
        setManagementRole(null);
        return false;
      }

      setIsManagement(true);
      setManagementRole(data.role);
      return true;
    } catch (error) {
      console.error('Error checking management access:', error);
      return false;
    }
  };

  useEffect(() => {
    checkManagementAccess();
  }, [user]);

  return (
    <ManagementContext.Provider value={{ isManagement, managementRole, checkManagementAccess }}>
      {children}
    </ManagementContext.Provider>
  );
}

export function useManagement() {
  const context = useContext(ManagementContext);
  if (context === undefined) {
    throw new Error('useManagement must be used within a ManagementProvider');
  }
  return context;
}