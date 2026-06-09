# Dashboard Refactoring Guide

## Overview

This document outlines the refactoring of `dashboard.html` from a single 3556-line file into a modular, maintainable structure.

## New File Structure

```
jira-dashboard/
├── dashboard.html          # Simplified HTML (minimal, loads modules)
├── dashboard-legacy.html   # Original file (backup)
├── css/
│   └── styles.css         # All CSS extracted from original
├── js/
│   ├── config.js          # Configuration constants (PROXY, PHASES, PROJECTS, FIELDS)
│   ├── state.js           # State management and persistence
│   ├── utils.js           # Utility functions (date formatting, escaping, etc.)
│   ├── api.js             # Jira API communication via proxy
│   ├── theme.js           # Theme management (light/dark mode)
│   ├── navigation.js      # Navigation and sidebar rendering
│   ├── main.js            # Application bootstrap
│   └── pages/             # Page-specific modules
│       ├── setup.js       # Jira setup page
│       ├── projects-config.js  # Project configuration page
│       ├── fields.js      # Field configuration page
│       ├── analytics.js   # Analytics page
│       ├── team.js        # Team view page
│       ├── phase-timeline.js  # Phase timeline page
│       ├── daily-progress.js  # Daily progress log page
│       └── project-view.js    # Individual project view
└── README.md              # Updated with new structure info
```

## Benefits

### 1. **Modularity**
- Each concern is separated into its own module
- Page-specific logic is isolated in the `pages/` folder
- Easier to understand and modify individual features

### 2. **Maintainability**
- Smaller files are easier to navigate and edit
- Changes to one module don't affect others
- Clear separation of concerns

### 3. **Performance**
- Dynamic imports for page modules (loaded only when needed)
- Reduced initial bundle size
- Better browser caching

### 4. **Developer Experience**
- Lower cognitive load per file
- Easier to find specific functionality
- Better IDE support and code navigation
- Easier to test individual modules

### 5. **Scalability**
- Easy to add new pages without bloating main file
- New developers can onboard faster
- Can add build tools (bundler, minifier) later if needed

## Migration Status

### ✅ Completed
- `js/config.js` - All configuration constants
- `js/state.js` - State management with project helpers
- `js/utils.js` - Common utility functions
- `js/api.js` - API communication layer
- `js/theme.js` - Theme switching logic
- `js/navigation.js` - Navigation framework
- `js/main.js` - Application bootstrap

### 🔄 In Progress
The following modules still need to be extracted from `dashboard.html`:

1. **js/pages/setup.js**
   - `saveCredentials()`
   - `testConnection()`
   - Proxy status checking

2. **js/pages/projects-config.js**
   - `renderProjectsConfig()`
   - `openProjectModal()`, `closeProjectModal()`, `saveProjectModal()`
   - Project enable/disable logic

3. **js/pages/fields.js**
   - `renderFields()`
   - `saveFields()`, `resetFields()`
   - `discoverFields()`, `inspectIssue()`
   - Field inspector logic

4. **js/pages/project-view.js**
   - `renderProject()`
   - `fetchIssues()`, `fetchJiraBatch()`
   - `renderIssueTable()`
   - `filterByCard()`, `loadAllIssues()`
   - Issue rendering and cell formatting

5. **js/pages/analytics.js**
   - `renderAnalytics()`
   - Chart rendering logic
   - Phase/developer/priority/type breakdowns

6. **js/pages/team.js**
   - `renderTeam()`
   - Multi-select filter logic
   - Developer grouping and sorting

7. **js/pages/phase-timeline.js**
   - `renderPhaseTimeline()`
   - Timeline aggregation
   - Phase progression tracking

8. **js/pages/daily-progress.js**
   - `renderDailyProgress()` (formerly `renderLog()`)
   - Log entry diffing
   - Status change tracking

9. **Common UI components** (could create `js/ui-components.js`):
   - `refreshAll()`, `cancelRefresh()`
   - `exportCSV()`
   - Multi-select dropdown logic
   - Modal dialogs
   - Table rendering helpers

## Next Steps

### Phase 1: Extract Remaining Logic
1. Extract each page module listed above
2. Test each page after extraction
3. Ensure all inline event handlers use the global `window.app` object

### Phase 2: Create New HTML
1. Create minimal `index.html` with:
   - Link to `css/styles.css`
   - Load Chart.js CDN
   - Load `js/main.js` as ES6 module
   - Keep all HTML structure (sidebar, pages, overlays)
2. Rename current `dashboard.html` to `dashboard-legacy.html`

### Phase 3: Testing
1. Test all pages load correctly
2. Test all interactive features
3. Test state persistence
4. Test theme switching
5. Test refresh functionality

### Phase 4: Optimization (Optional)
1. Add a bundler (esbuild, rollup, vite)
2. Add TypeScript for better type safety
3. Add CSS preprocessing if needed
4. Setup linting and formatting

## Implementation Notes

### ES6 Modules
All JavaScript files use ES6 module syntax:
```javascript
// Exporting
export const PROXY = 'http://localhost:3131/jira-api';
export function fetchData() { ... }

// Importing
import { PROXY, fetchData } from './api.js';
```

### Global Window Object
For inline event handlers in HTML, we expose functions via `window.app`:
```javascript
// In main.js
window.app = {
  nav,
  toggleTheme,
  refreshAll,
  // ... other functions called from HTML
};
```

```html
<!-- In HTML -->
<button onclick="window.app.nav('setup')">Setup</button>
```

### Dynamic Imports
Pages are loaded dynamically to reduce initial bundle:
```javascript
// In navigation.js
case 'analytics':
  import('./pages/analytics.js').then(module => module.renderAnalytics());
  break;
```

## File Size Comparison

| File | Lines | Description |
|------|-------|-------------|
| **Before** |
| dashboard.html | 3,556 | Everything in one file |
| **After** |
| dashboard.html | ~500 | HTML structure only |
| css/styles.css | ~370 | All styles |
| js/config.js | ~50 | Configuration |
| js/state.js | ~80 | State management |
| js/utils.js | ~35 | Utilities |
| js/api.js | ~70 | API layer |
| js/theme.js | ~25 | Theme logic |
| js/navigation.js | ~80 | Navigation |
| js/main.js | ~50 | Bootstrap |
| js/pages/*.js | ~2,500 | Page logic (distributed across 8 files, avg ~310 lines each) |

**Result**: Instead of one 3,556-line file, you have ~15 files averaging ~250 lines each.

## Context Benefits for AI

When working with AI assistants on this codebase:

### Before Refactoring
- "Here's my 3,556-line dashboard.html file..." (consumes huge context window)
- AI has to parse everything to find relevant code
- Hard to focus on specific features

### After Refactoring
- "I need help with the analytics page, here's `js/pages/analytics.js` (300 lines)"
- "The API calls aren't working, here's `js/api.js` (70 lines)"  
- Much more efficient use of AI context
- AI responses are more focused and accurate

## Backward Compatibility

The original `dashboard.html` will be kept as `dashboard-legacy.html` for reference and rollback if needed.

## Questions?

If you need help completing the refactoring or have questions about the structure, ask!
