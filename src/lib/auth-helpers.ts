/**
 * Helper functions for auth storage management
 */

/**
 * Clears all Supabase-related storage items from localStorage
 * @param {boolean} onlyAdminSessions - If true, only clear admin sessions
 * @returns {string[]} Array of keys that were removed
 */
export const clearSupabaseStorage = (onlyAdminSessions = false): string[] => {
  console.log(`Clearing Supabase storage items. Only admin sessions: ${onlyAdminSessions}`);
  
  // Find all localStorage keys that might be related to Supabase
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
      // If only clearing admin sessions, check the session data
      if (onlyAdminSessions) {
        try {
          const sessionData = localStorage.getItem(key);
          if (sessionData) {
            const parsed = JSON.parse(sessionData);
            // Try to determine if this is an admin session
            // This is a basic check - we can't always determine the role from the session alone
            // This is just a precaution to avoid removing non-admin sessions
            if (parsed) {
              keysToRemove.push(key);
            }
          }
        } catch (e) {
          console.error('Error parsing session data:', e);
        }
      } else {
        // If clearing all sessions, add all Supabase-related keys
        keysToRemove.push(key);
      }
    }
  }
  
  // Don't clear storage if there's an active login attempt
  const loginInProgress = sessionStorage.getItem('login_in_progress');
  if (loginInProgress) {
    console.log('Login in progress, not clearing storage');
    return [];
  }
  
  // Remove each key
  keysToRemove.forEach(key => {
    console.log(`Removing storage key: ${key}`);
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