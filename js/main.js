// ── Main Application Entry Point ────────────────────────────────────────────

import { hydrate, S, getDefaultProjectPage } from './state.js';
import { initTheme, toggleTheme } from './theme.js';
import { nav, initNavigation } from './navigation.js';
import { checkProxy } from './api.js';

// Global exports for inline event handlers
window.app = {
  nav,
  toggleTheme
};

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
  // Load saved state
  hydrate();
  
  // Apply theme
  initTheme();
  
  // Setup navigation
  initNavigation();
  
  // Check proxy status
  const isOnline = await checkProxy();
  updateProxyStatus(isOnline);
  
  // Navigate to initial page
  const initialPage = S.page || (S.creds.url ? getDefaultProjectPage() : 'setup');
  nav(initialPage);
  
  // Setup periodic proxy checks
  setInterval(async () => {
    const online = await checkProxy();
    updateProxyStatus(online);
  }, 30000); // Check every 30 seconds
});

function updateProxyStatus(isOnline) {
  const ind = document.getElementById('proxy-indicator');
  if (!ind) return;
  
  if (isOnline) {
    ind.innerHTML = '<span style="font-size:12px;color:var(--green);display:flex;align-items:center;gap:5px"><span style="width:7px;height:7px;border-radius:50%;background:var(--green);display:inline-block"></span>Proxy online</span>';
  } else {
    ind.innerHTML = '<span style="font-size:12px;color:var(--red);display:flex;align-items:center;gap:5px"><span style="width:7px;height:7px;border-radius:50%;background:var(--red);display:inline-block"></span>Proxy offline</span>';
  }
}
