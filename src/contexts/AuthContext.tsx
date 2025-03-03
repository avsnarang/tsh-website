import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthError, User, Session, UserResponse } from '@supabase/supabase-js';
import debounce from 'lodash.debounce';

type UserRole = 'admin' | 'alumni';

interface DBUser {
  id: string;
  email: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  sessionState: 'valid' | 'invalid' | 'unknown';
  profileDeleted: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<{ error: AuthError | null }>;
  clearAdminSession: () => Promise<void>;
  markProfileDeleted: () => void;
  resetProfileDeletedState: () => void;
}

// Create a storage key for detecting deleted profiles
const PROFILE_DELETED_KEY = 'tsh_profile_deleted';

const AuthContext = createContext<AuthContextType | null>(null);

// Helper function to check if we're on the login page or register page
const isAuthPage = () => {
  const path = window.location.pathname;
  return path.includes('/login') || path.includes('/register');
};

const fetchUserRole = async (userId: string): Promise<UserRole | null> => {
  try {
    console.log('Fetching role for user:', userId);
    
    const { data: authRoleData, error: authRoleError } = await supabase
      .from('auth_user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (authRoleError) {
      console.error('Error accessing auth_user_roles table:', authRoleError);
      return null;
    }

    if (authRoleData?.role) {
      console.log(`User role found: ${authRoleData.role}`);
      return authRoleData.role as UserRole;
    }

    console.log('No role found for user');
    return null;
    
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};

const createUserRecord = async (user: User, role: UserRole = 'alumni'): Promise<DBUser | null> => {
  let success = false;
  
  // Try to update user metadata first (this bypasses RLS)
  try {
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { role: role }
    });
    
    if (!metadataError) {
      console.log('Successfully updated user metadata with role');
      success = true;
    } else {
      console.error('Error updating user metadata:', metadataError);
    }
  } catch (err) {
    console.error('Error updating user metadata:', err);
  }
  
  // Try to create record in auth_user_roles table (this is the key change)
  try {
    console.log(`Creating user record in auth_user_roles table: userId=${user.id}, role=${role}`);
    const { error: authRoleError } = await supabase
      .from('auth_user_roles')
      .upsert([
        {
          user_id: user.id,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (authRoleError) {
      console.error('Error creating user record in auth_user_roles table:', authRoleError);
      if (authRoleError.code === 'PGRST301') {
        console.error('Row level security prevented role creation. Check RLS policies for auth_user_roles table.');
      }
    } else {
      console.log('Successfully created user record in auth_user_roles table');
      success = true;
    }
  } catch (err) {
    console.error('Exception creating user record in auth_user_roles table:', err);
  }
  
  // Try to create record in users table as fallback
  try {
    console.log(`Creating user record in users table: userId=${user.id}, role=${role}`);
    const { error: userError } = await supabase
      .from('users')
      .upsert([
        {
          id: user.id,
          email: user.email,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (userError) {
      console.error('Error creating user record in users table:', userError);
      if (userError.code === 'PGRST301') {
        console.error('Row level security prevented user creation. Check RLS policies for users table.');
      }
    } else {
      console.log('Successfully created user record in users table');
      success = true;
    }
  } catch (err) {
    console.error('Exception creating user record in users table:', err);
  }

  // IMPORTANT: No longer creating alumni profile automatically
  // This allows the Register component to handle this step explicitly
  console.log('Alumni profile creation is now handled by the Register component');

  return success ? {
    id: user.id,
    email: user.email || '',
    role: role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } : null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibilityChanged, setVisibilityChanged] = useState(false);
  const [lastSessionCheck, setLastSessionCheck] = useState(0);
  const [sessionState, setSessionState] = useState<'valid' | 'invalid' | 'unknown'>('unknown');
  // New state to track if a profile has been deleted
  const [profileDeleted, setProfileDeleted] = useState(() => {
    // Check localStorage for deleted profile flag on initialization
    return localStorage.getItem(PROFILE_DELETED_KEY) === 'true';
  });

  // Function to mark a profile as deleted
  const markProfileDeleted = () => {
    console.log('Marking profile as deleted');
    localStorage.setItem(PROFILE_DELETED_KEY, 'true');
    setProfileDeleted(true);
  };

  // Function to reset the profile deleted state (called when user attempts to sign in again)
  const resetProfileDeletedState = () => {
    console.log('Resetting profile deleted state');
    localStorage.removeItem(PROFILE_DELETED_KEY);
    setProfileDeleted(false);
  };

  // Update the clearAdminSession function
  const clearAdminSession = async () => {
    try {
      // Get current location
      const currentPath = window.location.pathname;
      const isLoginPage = currentPath.includes('/login');
      
      // Only proceed with admin session clearing if we're on the login page
      if (!isLoginPage) {
        return;
      }

      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        const sessionUserId = data.session.user.id;
        const role = await fetchUserRole(sessionUserId);
        
        // Only clear if admin is specifically on the login page
        if (role === 'admin' && isLoginPage) {
          console.log('Admin user detected on login page - redirecting to dashboard');
          window.location.href = '/admin/dashboard';
          return;
        }
      }
    } catch (err) {
      console.error('Error in clearAdminSession:', err);
    }
  };

  const handleUserSession = async (session: Session | null) => {
    // If profile is marked as deleted locally AND we're not on auth pages,
    // don't process session
    if (profileDeleted && !isAuthPage()) {
      console.log('Profile previously deleted locally. Skipping session processing.');
      setLoading(false);
      setSessionState('invalid');
      return;
    }
    
    setLoading(true);
    
    try {
      if (!session?.user) {
        setUser(null);
        setUserRole(null);
        setSessionState('invalid');
        setLoading(false);
        return;
      }

      console.log('Processing user session for:', session.user.id);
      
      // Use Promise.all to run checks concurrently
      const [userData, role] = await Promise.all([
        supabase.auth.getUser(),
        fetchUserRole(session.user.id)
      ]);

      // Access user through data property
      const currentUser = userData.data.user;
      const hasCompletedProfile = currentUser?.user_metadata?.has_completed_profile === true;
      
      // Check for deleted account status
      if (currentUser?.user_metadata?.account_status === 'deleted') {
        console.log('User account marked as deleted in metadata');
        await supabase.auth.signOut();
        setUser(null);
        setUserRole(null);
        setSessionState('invalid');
        markProfileDeleted();
        setLoading(false);
        return;
      }

      // For alumni accounts, check profile with a shorter timeout
      if (role === 'alumni' && !hasCompletedProfile) {
        try {
          const profilePromise = supabase
            .from('alumni_profiles')
            .select('id')
            .eq('id', session.user.id)
            .single();
          
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error('Profile check timed out'));
            }, 5000); // Reduced from 3000ms to 5000ms
          });
          
          const { data: profileData } = await Promise.race([
            profilePromise,
            timeoutPromise as Promise<any>
          ]);

          if (profileData) {
            // Update metadata in background, don't await
            supabase.auth.updateUser({
              data: { 
                has_completed_profile: true,
                profile_created_at: new Date().toISOString()
              }
            }).catch(console.error);
          }
        } catch (err) {
          console.log('Profile check error or timeout:', err);
          // Continue anyway - don't let profile check block the login
        }
      }
      
      // Update state
      setUser(session.user);
      setUserRole(role);
      setSessionState('valid');
      
    } catch (error) {
      console.error('Error handling user session:', error);
      setUser(null);
      setUserRole(null);
      setSessionState('invalid');
    } finally {
      setLoading(false);
    }
  };

  // Add visibilitychange handler with improved throttling
  useEffect(() => {
    // Debounced session refresh function
    const debouncedRefresh = debounce(async () => {
      const now = Date.now();
      // Only refresh if more than 5 minutes have passed
      if (now - lastSessionCheck > 300000) { // 5 minutes in milliseconds
        console.log('Session refresh needed');
        setLastSessionCheck(now);
        
        const { data: { session } } = await supabase.auth.getSession();
        handleUserSession(session);
      }
    }, 1000); // 1 second debounce

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        debouncedRefresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      debouncedRefresh.cancel();
    };
  }, [lastSessionCheck]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleUserSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // If not triggered by visibility change, process the session directly
        if (!visibilityChanged) {
          await handleUserSession(session);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [visibilityChanged]);

  const signIn = async (email: string, password: string): Promise<User> => {
    // Don't reset profileDeleted state immediately - we'll do this after checking
    console.log('AuthContext: Starting signIn for email:', email);
    
    try {
      // First check if this email belongs to a deleted account
      // We need to do this before authentication to prevent deleted accounts from logging in
      console.log('Checking if account has been marked as deleted');
      
      // Try to sign in to get the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('AuthContext: SignIn error from Supabase:', error);
        throw error;
      }
      
      if (!data.user) {
        console.error('AuthContext: No user returned from sign in');
        throw new Error('No user returned from sign in');
      }

      // Check if the account is marked as deleted after successful sign-in
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user?.user_metadata?.account_status === 'deleted') {
        console.log('User account marked as deleted in metadata');
        // Sign out immediately
        await supabase.auth.signOut();
        setUser(null);
        setUserRole(null);
        throw new Error('This account has been deleted. Please contact support if you need assistance.');
      }

      // Only reset profile deleted state AFTER confirming the account is valid
      resetProfileDeletedState();
      
      console.log('AuthContext: Sign in successful, fetching role...');
      
      // Fetch role immediately after successful sign in
      const role = await fetchUserRole(data.user.id);
      
      if (!role) {
        console.warn('AuthContext: No role found for user after sign in');
        console.warn('This might be due to:');
        console.warn('1. Row level security preventing access to role information');
        console.warn('2. User does not have a role assigned in any table');
        console.warn('3. Tables might not exist or have different structure');
        
        // Development fallback - you can remove this in production
        // Instead, use a default role based on email pattern or just show an error
        const defaultRole: UserRole = email.includes('admin') ? 'admin' : 'alumni';
        console.warn(`DEVELOPMENT FALLBACK: Using default role "${defaultRole}" based on email pattern`);
        
        // For production, you might want to create a new role record here
        try {
          await createUserRecord(data.user, defaultRole);
          setUserRole(defaultRole);
        } catch (createError) {
          console.error('Failed to create user role record:', createError);
          // Still use the default role for this session, even if DB update failed
          setUserRole(defaultRole);
        }
      } else {
        // Successfully got role, update state
        setUserRole(role);
      }
      
      // Always update user state
      setUser(data.user);

      console.log('AuthContext: Sign in complete:', { 
        userId: data.user.id, 
        email: data.user.email,
        role: role || 'unknown (using fallback)' 
      });

      return data.user;
    } catch (error) {
      console.error('AuthContext: Error in signIn function:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      return data;
      
    } catch (error) {
      console.error('AuthContext: Error in signUp function:', error);
      throw error;
    }
  };

  // Update the signOut function to handle profile deletion
  const signOut = async () => {
    // If we're signing out after a profile deletion, don't modify the profileDeleted state
    // Otherwise, perform a normal sign out
    if (!profileDeleted) {
      console.log('Normal sign out - clearing session data');
    } else {
      console.log('Signing out after profile deletion - maintaining deleted state');
    }
    
    const result = await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    return result;
  };

  const value = {
    user,
    userRole,
    loading,
    sessionState,
    profileDeleted,
    signIn,
    signUp,
    signOut,
    clearAdminSession,
    markProfileDeleted,
    resetProfileDeletedState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
