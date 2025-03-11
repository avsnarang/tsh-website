/**
 * Helper functions for auth storage management
 */

/**
 * Clears all Supabase-related storage items from localStorage
 * @param {boolean} onlyAdminSessions - If true, only clear admin sessions
 * @returns {string[]} Array of keys that were removed
 */
export const clearSupabaseStorage = (onlyAdminSessions = false): string[] => {
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
      if (onlyAdminSessions) {
        try {
          const sessionData = localStorage.getItem(key);
          if (sessionData) {
            const parsed = JSON.parse(sessionData);
            if (parsed) {
              keysToRemove.push(key);
            }
          }
        } catch (e) {
          console.error('Error parsing session data:', e);
        }
      } else {
        keysToRemove.push(key);
      }
    }
  }
  
  const loginInProgress = sessionStorage.getItem('login_in_progress');
  if (loginInProgress) {
    return [];
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
  
  return keysToRemove;
};

/**
 * Checks if there are any Supabase sessions in localStorage
 * @returns {boolean} True if sessions exist
 */
export const hasSupabaseSessions = (): boolean => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
      return true;
    }
  }
  return false;
}; 
