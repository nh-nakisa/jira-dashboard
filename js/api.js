// ── API Communication ───────────────────────────────────────────────────────

import { PROXY } from './config.js';
import { S } from './state.js';

export async function checkProxy() {
  try {
    const r = await fetch('http://localhost:3131/health', {
      signal: AbortSignal.timeout(2000),
      method: 'GET'
    });
    return r && r.ok;
  } catch (e) {
    return false;
  }
}

export async function testConnection() {
  if (!S.creds.url || !S.creds.email || !S.creds.token) {
    throw new Error('Missing credentials');
  }

  const response = await fetch(PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      baseURL: S.creds.url,
      email: S.creds.email,
      token: S.creds.token,
      endpoint: '/rest/api/3/myself'
    })
  });

  if (!response.ok) {
    throw new Error('Connection test failed');
  }

  return await response.json();
}

export async function fetchJiraData(endpoint) {
  if (!S.creds.url || !S.creds.email || !S.creds.token) {
    throw new Error('Missing credentials');
  }

  const response = await fetch(PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      baseURL: S.creds.url,
      email: S.creds.email,
      token: S.creds.token,
      endpoint
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return await response.json();
}

export async function searchJira(jql, fields = [], maxResults = 1000) {
  const params = new URLSearchParams({
    jql,
    maxResults: maxResults.toString(),
    fields: fields.join(',')
  });

  return await fetchJiraData(`/rest/api/3/search?${params}`);
}

export async function fetchIssue(issueKey, fields = []) {
  const params = fields.length ? `?fields=${fields.join(',')}` : '';
  return await fetchJiraData(`/rest/api/3/issue/${issueKey}${params}`);
}

export async function fetchFields() {
  return await fetchJiraData('/rest/api/3/field');
}
