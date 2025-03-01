import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initPostHog } from './lib/analytics';
import { initVercelAnalytics } from './lib/analytics/vercel';

// Initialize analytics
initPostHog();
initVercelAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
