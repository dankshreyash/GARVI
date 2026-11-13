import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n'; // Initialize i18next & react-i18next
import App from './App.jsx';
import { initGoogleAnalytics, initSentry } from './services/monitoring';

// Initialize Monitoring & Observability
initGoogleAnalytics();
initSentry();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
