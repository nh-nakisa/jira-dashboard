// ── State Management ───────────────────────────────────────────────────────

import { DEFAULT_ENABLED, PROJECTS } from './config.js';

// Global application state
export const S = {
  page: 'setup',
  creds: { url: '', email: '', token: '' },
  enabled: [...DEFAULT_ENABLED],
  customIds: {},
  cache: {},
  charts: {},
  log: [],
  customProjects: [],
  projectSettings: {},
  theme: '',
  analyticsViews: { phase: 'table', dev: 'table', priority: 'doughnut', type: 'doughnut' }
};

// ── Project helpers ──────────────────────────────────────────────────────────

export function isBuiltinProjectKey(key) {
  return PROJECTS.some(p => p.key === key);
}

export function getProjectSettings(key) {
  if (!S.projectSettings) S.projectSettings = {};
  if (!S.projectSettings[key]) S.projectSettings[key] = {};
  return S.projectSettings[key];
}

export function isBuiltinRemoved(key) {
  return !!getProjectSettings(key).removed;
}

export function isProjectEnabled(key) {
  return getProjectSettings(key).enabled !== false;
}

export function getProjectJql(proj) {
  const override = getProjectSettings(proj.key).jql;
  return override || proj.jql;
}

export function isProjectVisible(proj) {
  if (isBuiltinProjectKey(proj.key) && isBuiltinRemoved(proj.key)) return false;
  return isProjectEnabled(proj.key);
}

export function getAllProjects() {
  return [...PROJECTS, ...(S.customProjects || [])].filter(isProjectVisible);
}

export function getDefaultProjectPage() {
  const p = getAllProjects()[0];
  return p ? p.id : 'setup';
}

// ── Persistence ──────────────────────────────────────────────────────────────

export function persist() {
  try {
    localStorage.setItem('jira_dash_v3', JSON.stringify({ ...S, charts: {} }));
  } catch (e) {
    console.error('Failed to persist state:', e);
  }
}

export function hydrate() {
  try {
    const r = localStorage.getItem('jira_dash_v3');
    if (r) {
      const p = JSON.parse(r);
      Object.assign(S, p);
      S.charts = {};
    }
  } catch (e) {
    console.error('Failed to hydrate state:', e);
  }
}

export function jiraId(f) {
  return S.customIds[f.id] || f.jira;
}
