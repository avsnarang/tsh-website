import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import { initializeSupabase } from './lib/supabase';
import { initPostHog } from './lib/analytics';

// Initialize PostHog
initPostHog();

// Initialize Supabase
initializeSupabase().then(_ => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}).catch(error => {
  console.error('Error initializing Supabase:', error)
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
