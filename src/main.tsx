import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import { initializeSupabase } from './lib/supabase';
import { initPostHog } from './lib/analytics';

// Initialize PostHog
initPostHog();

// Initialize Supabase
initializeSupabase().then(isConnected => {
  console.log('Supabase initialization completed, connection status:', isConnected ? 'Connected' : 'Failed')
  
  // Check for login in progress
  const loginInProgress = sessionStorage.getItem('login_in_progress');
  
  // Clear Supabase sessions if on login page and no active login
  if (window.location.pathname.includes('/login') && !loginInProgress) {
    console.log('Login page detected, checking for stored admin sessions...');
    
    // Find any Supabase-related storage items but don't remove them here
    // We'll just log them and let the user explicitly clear them with the button
    const supabaseKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
        console.log(`Found Supabase session key: ${key}`);
        supabaseKeys.push(key);
      }
    }
    
    if (supabaseKeys.length > 0) {
      console.log(`Found ${supabaseKeys.length} Supabase storage items on login page`);
    } else {
      console.log('No Supabase storage items found on login page load');
    }
  }
  
  // Continue with React rendering
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}).catch(error => {
  console.error('Error initializing Supabase:', error)
  
  // Render the app anyway, it will handle connection errors
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})