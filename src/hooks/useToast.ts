import { useCallback } from 'react';

export const useToast = () => {
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    // For now, just console.log the message
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can implement a proper toast notification system later
  }, []);

  return { showToast };
};
