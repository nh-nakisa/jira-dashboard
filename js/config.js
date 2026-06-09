// ── Configuration ───────────────────────────────────────────────────────────

export const PROXY = 'http://localhost:3131/jira-api';

export const PHASES = [
  { label: 'Product',           re: /^prod/i,                                                        color: '#533AB7' },
  { label: 'Developer Pending', re: /^dev[\s-]*pending/i,                                            color: '#854F0B' },
  { label: 'Developing',        re: /^dev[\s-]*(developing|designing|grooming|cr|merge|reopened)/i,  color: '#185FA5' },
  { label: 'QA',                re: /^(qa|pqa|pending[\s-]*dep|eoa[\s-]*pending)/i,                  color: '#0F6E56' },
  { label: 'Closed',            re: /^(closed|done|resolved|cancelled|won't\s*fix)/i,                 color: '#555555' },
];

export const PROJECTS = [
  { id:'p0', name:'Lease Accounting 6.x',    key:'NFS', color:'#185FA5', category: 'Core Modules',
    jql:'project in (NFS) AND issuetype in (Enhancement, Epic) AND fixVersion = N2026.R2 ORDER BY "Scope Commitment At SC", status DESC, Priority DESC' },
  { id:'p1', name:'FOS, Sync Bot & User Aux', key:'FCO', color:'#3B6D11', category: 'Infrastructure',
    jql:'project in (FCO) AND issuetype in (Enhancement, Epic) AND fixVersion = N2026.R2 ORDER BY "Scope Commitment At SC", status DESC, Priority DESC' },
  { id:'p2', name:'SAP Posting Bot',          key:'INC', color:'#c47a0f', category: 'Infrastructure',
    jql:'project in (INC) AND issuetype in (Enhancement, Epic) AND fixVersion = N2026.R2 ORDER BY "Scope Commitment At SC", status DESC, Priority DESC' },
  { id:'p3', name:'General Ledger',           key:'GL',  color:'#533AB7', category: 'Core Modules',
    jql:'project in (GL) AND issuetype in (Enhancement, Epic) AND fixVersion = N2026.R2 ORDER BY "Scope Commitment At SC", status desc, Priority DESC' },
  { id:'p4', name:'Fixed Asset Accounting',   key:'FAA', color:'#993556', category: 'Core Modules',
    jql:'project in (FAA) AND issuetype in (Enhancement, Epic) AND fixVersion = N2026.R2 ORDER BY "Scope Commitment At SC" asc, status desc, Priority DESC' },
  { id:'p5', name:'Procure To Pay',           key:'P2P', color:'#0F6E56', category: 'Core Modules',
    jql:'project in (P2P) AND issuetype in (Enhancement) AND fixVersion = N2026.R2 ORDER BY "Scope Commitment At SC", status desc, Priority DESC' },
  { id:'p6', name:'Open Bugs (All Projects)', key:'BUGS', color:'#D32F2F', category: 'Quality',
    jql:'project in (NFS, GL, FCO, FAA, INC, P2P) AND issuetype = Bug AND status not in (QA, PQA, "Pending DEP", "EOA Pending", Closed, Done, Resolved, Cancelled, "Won\'t Fix") ORDER BY priority DESC, created DESC' },
];

export const ALL_FIELDS = [
  { id:'issuetype',   label:'Issue Type',               jira:'issuetype',         custom:false },
  { id:'key',         label:'Key',                      jira:'key',               custom:false },
  { id:'summary',     label:'Summary',                  jira:'summary',           custom:false },
  { id:'parent',      label:'Parent',                   jira:'parent',            custom:false },
  { id:'priority',    label:'Priority',                 jira:'priority',          custom:false },
  { id:'fixVersions', label:'Fix Versions',             jira:'fixVersions',       custom:false },
  { id:'cf_scope',    label:'Scope Commitment',         jira:'customfield_10200', custom:true  },
  { id:'cf_scopesc',  label:'Scope Commitment At SC',   jira:'customfield_10201', custom:true  },
  { id:'status',      label:'Status',                   jira:'status',            custom:false },
  { id:'cf_clarity',  label:'A + Clarity',              jira:'customfield_10202', custom:true  },
  { id:'cf_devact',   label:'Dev Actual (Days)',         jira:'customfield_10203', custom:true  },
  { id:'cf_devest',   label:'Dev Estimate (Days)',       jira:'customfield_10204', custom:true  },
  { id:'assignee',    label:'Assignee',                 jira:'assignee',          custom:false },
  { id:'cf_devpart',  label:'Assignee: Development Partner', jira:'customfield_10205', custom:true  },
  { id:'cf_dev',      label:'Assignee: Development',    jira:'customfield_10206', custom:true  },
  { id:'cf_product',  label:'Assignee: Product',        jira:'customfield_10207', custom:true  },
  { id:'cf_custcom',  label:'Customer Commitment',      jira:'customfield_10208', custom:true  },
];

export const DEFAULT_ENABLED = ALL_FIELDS.map(f => f.id);
