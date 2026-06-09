// ── Theme Management ────────────────────────────────────────────────────────

import { S, persist } from './state.js';
import { getPreferredTheme } from './utils.js';

export function applyTheme(theme, shouldPersist = true) {
  const t = (theme === 'dark') ? 'dark' : 'light';
  S.theme = t;
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add('theme-' + t);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = 'Theme: ' + (t === 'dark' ? 'Dark' : 'Light');
  if (shouldPersist) persist();
}

export function toggleTheme() {
  applyTheme(S.theme === 'dark' ? 'light' : 'dark');
}

export function initTheme() {
  const savedTheme = S.theme || getPreferredTheme();
  applyTheme(savedTheme, false);
}
