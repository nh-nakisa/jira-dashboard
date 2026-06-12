// ── Dev Planning ────────────────────────────────────────────────────────────

import { S, persist, getAllProjects } from '../state.js';
import { escapeHtml } from '../utils.js';

export function renderDevPlanning() {
  console.log('=== DEV PLANNING: Function called ===');
  
  const container = document.getElementById('dev-planning-content');
  
  if (!container) {
    console.error('=== DEV PLANNING: Container element not found ===');
    return;
  }
  
  console.log('=== DEV PLANNING: Container found, rendering test content ===');
  
  try {
    container.innerHTML = `
      <div style="padding: 40px; background: var(--bg); border: 1px solid var(--border); border-radius: 12px; max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; color: var(--text);">Developer Planning</h2>
        <p style="font-size: 14px; color: var(--text2); margin-bottom: 24px;">
          This is a test render to verify the page loads correctly.
        </p>
        <button class="btn primary" onclick="alert('Test button clicked!')">
          Test Button
        </button>
        <div style="margin-top: 20px; padding: 16px; background: var(--bg2); border-radius: 8px;">
          <p style="font-size: 13px; color: var(--text2);">
            If you see this message, the Dev Planning module is loading successfully!
          </p>
        </div>
      </div>
    `;
    console.log('=== DEV PLANNING: Render complete ===');
  } catch (error) {
    console.error('=== DEV PLANNING: Error during render ===', error);
    container.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error.message}</div>`;
  }
}
