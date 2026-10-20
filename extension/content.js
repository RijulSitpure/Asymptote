/**
 * LeetCode Pattern Companion - Content Script
 * 1. Pulls solved problems using active LeetCode session
 * 2. Bridges data to local server via background service worker (avoiding Mixed Content / PNA blocks)
 */

function getProblemSlug() {
  const match = window.location.pathname.match(/\/problems\/([^/]+)/);
  return match ? match[1] : null;
}

function safeSendMessage(message, callback) {
  try {
    if (typeof chrome === 'undefined' || !chrome?.runtime?.id) {
      if (callback) callback({ success: false, error: 'Extension context invalidated. Please refresh the page.' });
      return;
    }
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        console.warn('[Asymptote Extension]', chrome.runtime.lastError.message);
        if (callback) callback({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      if (callback) callback(response);
    });
  } catch (err) {
    console.warn('[Asymptote Extension Context Error]:', err.message);
    if (callback) callback({ success: false, error: 'Extension context invalidated. Please refresh the page.' });
  }
}

function safeGetURL(path) {
  try {
    if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
      return chrome.runtime.getURL(path);
    }
  } catch (_err) {}
  return '';
}

let toastHideTimeout = null;

function showToast(message, type = 'success') {
  let toast = document.getElementById('lc-pattern-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lc-pattern-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 24px;
      padding: 12px 18px;
      background: #ffffff;
      color: #1e2033;
      border: 1px solid #eef0f4;
      border-radius: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 30px -5px rgba(30, 32, 51, 0.15), 0 2px 6px rgba(0, 0, 0, 0.04);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      gap: 10px;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(10px);
    `;
    document.body.appendChild(toast);
  }

  if (toastHideTimeout) {
    clearTimeout(toastHideTimeout);
    toastHideTimeout = null;
  }

  const iconSvg = type === 'success'
    ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'
    : type === 'error'
    ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  const iconBg = type === 'success' ? '#ecfdf5' : type === 'error' ? '#fef2f2' : '#f8f9fc';
  const iconColor = type === 'success' ? '#047857' : type === 'error' ? '#b91c1c' : '#1e2033';
  toast.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${iconBg};color:${iconColor};flex-shrink:0;">${iconSvg}</span> <span>${message}</span>`;
  toast.style.borderLeft = `4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#1e2033'}`;
  toast.style.display = 'flex';
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  toastHideTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (toast.style.opacity === '0') {
        toast.style.display = 'none';
      }
    }, 250);
  }, 5000);
}

function getCsrfToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  if (match) return match[1];
  const meta = document.querySelector('meta[name="csrf-token"]');
  if (meta) return meta.getAttribute('content');
  return '';
}

/**
 * Safe GraphQL runner that tries /graphql/ first, then /graphql,
 * attaches credentials and CSRF tokens, and NEVER throws raw "Unexpected token".
 */
async function safeGraphqlQuery(query, variables = {}) {
  const csrfToken = getCsrfToken();
  const headers = {
    'Content-Type': 'application/json'
  };
  if (csrfToken) {
    headers['x-csrftoken'] = csrfToken;
  }

  // Always try /graphql/ first (canonical Django path with trailing slash!), then /graphql
  const endpoints = ['/graphql/', '/graphql'];
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ query, variables })
      });

      const text = await res.text();
      if (!text || text.trim().startsWith('<')) {
        lastError = new Error(`LeetCode returned non-JSON (HTTP ${res.status}). Make sure you are signed into leetcode.com.`);
        continue;
      }

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (_parseErr) {
        lastError = new Error(`LeetCode response could not be parsed: ${text.slice(0, 60)}`);
        continue;
      }

      if (parsed.errors && !parsed.data) {
        lastError = new Error(parsed.errors[0]?.message || 'GraphQL query error');
        continue;
      }

      return parsed.data;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to query LeetCode GraphQL');
}

/**
 * 1-Click Full Account Sync via GraphQL + Multi-Stage Fallback
 */
async function syncAllSolvedFromLeetCode() {
  showToast('Connecting to your LeetCode session...', 'info');

  try {
    // 1. Get current logged-in username
    let username = 'User';
    try {
      const userData = await safeGraphqlQuery(`query userStatus { userStatus { isSignedIn username } }`);
      if (userData?.userStatus?.username) {
        username = userData.userStatus.username;
      }
    } catch (_e) {
      const profileLink = document.querySelector('a[href^="/u/"]');
      if (profileLink) {
        const href = profileLink.getAttribute('href');
        const match = href.match(/\/u\/([^/]+)/);
        if (match) username = match[1];
      }
    }

    showToast(`Fetching solved problems for ${username}...`, 'info');
    let allSolved = [];

    // Method 1: problemsetQuestionList with status: "AC"
    try {
      let skip = 0;
      const limit = 100;
      let hasMore = true;

      while (hasMore && skip < 2500) {
        const qData = await safeGraphqlQuery(`
          query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
            problemsetQuestionList: questionList(
              categorySlug: $categorySlug
              limit: $limit
              skip: $skip
              filters: $filters
            ) {
              total: totalNum
              questions: data {
                frontendQuestionId: questionFrontendId
                status
                title
                titleSlug
                difficulty
                categoryTitle
                codeSnippets {
                  langSlug
                }
                topicTags {
                  name
                  slug
                }
              }
            }
          }
        `, {
          categorySlug: '',
          limit,
          skip,
          filters: { status: 'AC' }
        });

        const listObj = qData?.problemsetQuestionList;
        const questions = listObj?.questions || [];
        const total = listObj?.total || 0;

        for (const q of questions) {
          allSolved.push({
            frontend_id: String(q.frontendQuestionId),
            title: q.title,
            title_slug: q.titleSlug,
            difficulty: q.difficulty || 'Medium',
            category: q.categoryTitle || null,
            languages: q.codeSnippets && Array.isArray(q.codeSnippets) ? q.codeSnippets.map(s => s.langSlug) : null,
            topicTags: (q.topicTags || []).map(t => t.name)
          });
        }

        if (allSolved.length >= total || questions.length === 0) {
          hasMore = false;
        } else {
          skip += limit;
        }
      }
    } catch (listErr) {
      console.warn('problemsetQuestionList query failed, trying recentAcSubmissions fallback:', listErr);
    }

    // Method 2: Fallback to recentAcSubmissions if Method 1 found nothing
    if (allSolved.length === 0 && username && username !== 'User') {
      try {
        const recentData = await safeGraphqlQuery(`
          query recentAcSubmissions($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
              id
              title
              titleSlug
            }
          }
        `, { username, limit: 50 });

        const list = recentData?.recentAcSubmissionList || [];
        for (const item of list) {
          allSolved.push({
            frontend_id: '',
            title: item.title,
            title_slug: item.titleSlug,
            difficulty: 'Medium'
          });
        }
      } catch (recentErr) {
        console.warn('recentAcSubmissionList fallback failed:', recentErr);
      }
    }

    // Method 3: Fallback - Extract solved problems from current page DOM
    if (allSolved.length === 0) {
      const problemLinks = document.querySelectorAll('a[href*="/problems/"]');
      const seenSlugs = new Set();
      for (const link of problemLinks) {
        const href = link.getAttribute('href');
        const match = href.match(/\/problems\/([^/]+)/);
        if (!match) continue;
        const slug = match[1];
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        const row = link.closest('tr') || link.closest('[role="row"]') || link.parentElement;
        const text = row ? row.innerText : '';
        const html = row ? row.innerHTML : '';
        if (text.includes('Solved') || html.includes('text-green') || html.includes('status-ac') || html.includes('CheckCircle') || html.includes('accepted')) {
          allSolved.push({
            frontend_id: '',
            title: link.innerText.trim() || slug.replace(/-/g, ' '),
            title_slug: slug,
            difficulty: 'Medium'
          });
        }
      }
    }

    // Deduplicate solved problems
    const uniqueMap = new Map();
    for (const item of allSolved) {
      if (item.title_slug && !uniqueMap.has(item.title_slug)) {
        uniqueMap.set(item.title_slug, item);
      }
    }
    const finalSolved = Array.from(uniqueMap.values());

    if (finalSolved.length === 0) {
      showToast('No solved problems found. Please make sure you are signed into LeetCode (visit leetcode.com/problemset/)!', 'error');
      return { success: false, error: 'No solved problems found. Please sign into LeetCode and refresh.' };
    }

    showToast(`Found ${finalSolved.length} solved problems! Uploading to Pattern Tracker...`, 'info');

    // Send to background service worker (bypasses Mixed Content / PNA blocks)
    return new Promise((resolve) => {
      safeSendMessage({
        action: 'send_to_server',
        username: username,
        problems: finalSolved
      }, (response) => {
        if (response && response.success) {
          const result = response.data;
          showToast(`Successfully synced all ${finalSolved.length} solved questions (${result.newlySynced} new, ${result.updatedCount} updated)!`, 'success');
          resolve({ success: true, count: finalSolved.length, username });
        } else {
          const errMsg = response?.error || 'Could not sync solved questions with local pattern tracker.';
          showToast(`Sync error: ${errMsg}`, 'error');
          resolve({ success: false, error: errMsg });
        }
      });
    });

  } catch (err) {
    showToast(`Sync failed: ${err.message}`, 'error');
    return { success: false, error: err.message };
  }
}

window.syncAllSolvedFromLeetCode = syncAllSolvedFromLeetCode;

// Floating Widget & Shadow DOM Injected Panel State
let activeDrawerTab = 'hints'; // 'hints' | 'solution' | 'complexity'
let currentLevel = 1;
let cachedHintData = null;
let currentProblemSlug = null;
let loadedProblemSlug = null;
let currentFetchId = 0;
let lastObservedUrl = typeof window !== 'undefined' ? window.location.href : '';
let shadowRoot = null;
let pageMutationObserver = null;
let _urlCheckIntervalId = null;

// View parameter and language selection state
const LanguagesModule = globalThis.LanguagesModule || window.LanguagesModule || null;

let activeSolutionLang = 'python3';
let activeSolutionView = 'scaffold'; // 'scaffold' | 'twists' | 'notes'

function getSupportedLanguages(problem) {
  if (LanguagesModule && LanguagesModule.getSupportedLanguagesForProblem) {
    return LanguagesModule.getSupportedLanguagesForProblem(problem);
  }
  if (problem && problem.supported_languages && problem.supported_languages.length > 0) {
    return problem.supported_languages;
  }
  const raw = Array.isArray(problem?.languages) ? problem.languages : [];
  if (raw.length > 0) {
    return raw.map(id => ({ id, name: id.charAt(0).toUpperCase() + id.slice(1) }));
  }
  return [
    { id: 'python3', name: 'Python 3', ext: '.py' },
    { id: 'cpp', name: 'C++', ext: '.cpp' },
    { id: 'java', name: 'Java', ext: '.java' },
    { id: 'typescript', name: 'TypeScript', ext: '.ts' }
  ];
}

function getCodeForLang(langSlug, hints, pattern, problem) {
  if (!problem || !problem.verified) {
    const meta = (typeof LanguagesModule !== 'undefined' && LanguagesModule?.getLanguageMeta) 
      ? LanguagesModule.getLanguageMeta(langSlug) 
      : null;
    const name = meta?.displayName || meta?.name || langSlug;
    return `No verified solution in ${name} yet`;
  }
  if (typeof LanguagesModule !== 'undefined' && LanguagesModule?.getProblemSolutionCode) {
    const code = LanguagesModule.getProblemSolutionCode(problem, langSlug);
    if (code) return code;
  }
  if (Array.isArray(problem.solutions)) {
    const sol = problem.solutions.find(s => 
      s.lang === langSlug || 
      s.language === langSlug || 
      (langSlug === 'python' && (s.lang === 'python3' || s.language === 'python3')) || 
      (langSlug === 'python3' && (s.lang === 'python' || s.language === 'python'))
    );
    if (sol && sol.code) return sol.code;
  }
  if (langSlug === 'python3' || langSlug === 'python') {
    return problem.solution_python || (hints && hints[3]?.content) || '';
  }
  return `No verified solution in ${langSlug} yet`;
}

function getShadowRoot() {
  let host = document.getElementById('asymptote-extension-root');
  if (!host) {
    host = document.createElement('div');
    host.id = 'asymptote-extension-root';
    document.body.appendChild(host);
  }
  if (!shadowRoot) {
    shadowRoot = host.shadowRoot || host.attachShadow({ mode: 'open' });
  }
  return shadowRoot;
}

function injectFloatingButtons() {
  const shadow = getShadowRoot();
  if (shadow.getElementById('lc-pattern-tracker-widget')) return;

  const isProblemPage = window.location.pathname.includes('/problems/');

  // Inject scoped styles into Shadow DOM
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@500;700&display=swap');

    * { 
      box-sizing: border-box; 
      margin: 0;
      padding: 0;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
      letter-spacing: -0.012em;
    }
    h1, h2, h3, h4, .drawer-header, .font-heading, .brand-title {
      font-family: 'Space Grotesk', sans-serif !important;
      font-weight: 700 !important;
      letter-spacing: -0.02em !important;
      color: #1e2033;
    }
    code, pre, .font-mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
      line-height: 1.6;
    }
    .widget-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 2147483647;
    }
    .btn-pill {
      background: #ffffff;
      color: #1e2033;
      border: 1px solid #e2e8f0;
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
    }
    .btn-pill:hover {
      background: #f6f8fa;
      border-color: #cbd5e1;
    }
    .drawer-panel {
      position: fixed;
      top: 52px;
      right: 20px;
      width: 400px;
      max-height: 90vh;
      background-color: #f6f8fa;
      background-image: 
        linear-gradient(#e6ebf1 1px, transparent 1px),
        linear-gradient(90deg, #e6ebf1 1px, transparent 1px);
      background-size: 32px 32px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      color: #334155;
      overflow: hidden;
    }
    .drawer-header {
      padding: 14px 16px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .tabs-nav {
      display: flex;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 8px;
      position: sticky;
      top: 57px;
      z-index: 9;
    }
    .tab-btn {
      flex: 1;
      text-align: center;
      padding: 10px 12px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #64748b;
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      transition: color 0.15s ease, border-color 0.15s ease;
    }
    .tab-btn:hover {
      color: #1e2033;
    }
    .tab-btn.active {
      color: #1e2033;
      font-weight: 700;
      border-bottom: 3px solid #10b981;
    }
    .tab-content-pane {
      animation: tabPaneFade 0.18s ease forwards;
    }
    @keyframes tabPaneFade {
      0% { opacity: 0; transform: translateY(4px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .drawer-body {
      padding: 20px 18px;
      overflow-y: auto;
      flex: 1;
      font-size: 13px;
      scroll-behavior: smooth;
    }
    .drawer-body::-webkit-scrollbar {
      width: 5px;
    }
    .drawer-body::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    .chip-diff {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 9999px;
    }
    .chip-diff-easy {
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #6ee7b7;
    }
    .chip-diff-medium {
      background: #fffbeb;
      color: #b45309;
      border: 1px solid #fcd34d;
    }
    .chip-diff-hard {
      background: #fff1f2;
      color: #be123c;
      border: 1px solid #fda4af;
    }
    .chip-pattern {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 9999px;
      background: #ffffff;
      color: #475569;
      border: 1px solid #e2e8f0;
    }
    .card-white {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .code-preview-light {
      background: #f6f8fa;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      line-height: 1.6;
      color: #1e2033;
      overflow-x: auto;
      white-space: pre;
    }
    .btn-secondary {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      color: #1e2033;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-secondary:hover {
      background: #f6f8fa;
      border-color: #cbd5e1;
    }
    .btn-amber-reveal {
      width: 100%;
      background-color: #f59e0b;
      color: #1e2033;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 12px 16px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      text-align: center;
      transition: background 0.15s ease;
      scroll-margin-bottom: 24px;
    }
    .btn-amber-reveal:hover {
      background-color: #d97706;
    }
    .select-clean {
      background-color: #ffffff;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 14px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 6px 32px 6px 12px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #1e2033;
      cursor: pointer;
      outline: none;
    }
    .select-clean:focus {
      border-color: #1e2033;
    }
  `;
  shadow.appendChild(styleEl);

  const container = document.createElement('div');
  container.id = 'lc-pattern-tracker-widget';
  container.className = 'widget-container';

  if (isProblemPage) {
    container.appendChild(createCoachButton());
  } else {
    container.appendChild(createSyncButton());
  }

  shadow.appendChild(container);
}

function createCoachButton() {
  const clueBtn = document.createElement('button');
  clueBtn.id = 'lc-coach-btn';
  clueBtn.className = 'btn-pill';
  clueBtn.innerHTML = `
    <img src="${safeGetURL('icons/asymptote-icon-small.svg')}" width="16" height="16" alt="Asymptote" style="border-radius:4px; display:block; flex-shrink:0;" />
    <span>Asymptote</span>
    <span style="font-size:11px; color:#047857; background:#ecfdf5; border:1px solid #a7f3d0; padding:2px 8px; border-radius:9999px; font-weight:600;">Coach</span>
  `;
  clueBtn.title = 'Open Socratic hints, complexity targeter, and algorithmic intuition';
  clueBtn.onclick = toggleHintsDrawer;
  return clueBtn;
}

function createSyncButton() {
  const syncBtn = document.createElement('button');
  syncBtn.id = 'lc-sync-btn';
  syncBtn.className = 'btn-pill';
  syncBtn.innerHTML = `
    <img src="${safeGetURL('icons/asymptote-icon-small.svg')}" width="16" height="16" alt="Asymptote" style="border-radius:4px; display:block; flex-shrink:0;" />
    <span>Sync solved to Asymptote</span>
  `;
  syncBtn.title = 'Sync all solved problems to local Asymptote Pattern Tracker';
  syncBtn.onclick = syncAllSolvedFromLeetCode;

  // Asynchronously verify login status and disable button if not logged in
  safeGraphqlQuery(`query userStatus { userStatus { isSignedIn username } }`).then(data => {
    if (!data?.userStatus?.isSignedIn) {
      syncBtn.disabled = true;
      syncBtn.style.opacity = '0.5';
      syncBtn.style.cursor = 'not-allowed';
      syncBtn.title = 'Please sign in to LeetCode to sync your solved problems';
    }
  }).catch(() => {});

  return syncBtn;
}

function updateFloatingWidgetState() {
  const shadow = getShadowRoot();
  let container = shadow.getElementById('lc-pattern-tracker-widget');
  const isProblemPage = !!getProblemSlug();

  if (!container) {
    injectFloatingButtons();
    return;
  }

  const hasCoachBtn = !!shadow.getElementById('lc-coach-btn');
  const hasSyncBtn = !!shadow.getElementById('lc-sync-btn');

  if (isProblemPage && !hasCoachBtn) {
    container.innerHTML = '';
    container.appendChild(createCoachButton());
  } else if (!isProblemPage && !hasSyncBtn) {
    container.innerHTML = '';
    container.appendChild(createSyncButton());
  }
}

/**
 * Cleanup hook: cancels pending fetches, clears stale problem caches,
 * and resets UI to prevent showing outdated Big-O complexity or solution code.
 */
function cleanupProblemState(newSlug = null) {
  // 1. Invalidate any in-flight asynchronous hint requests
  currentFetchId++;

  // 2. Clear cached problem data
  cachedHintData = null;
  loadedProblemSlug = null;
  currentLevel = 1;
  lastSyncedSubmission = null;
  currentProblemSlug = newSlug;

  // 3. Update drawer UI if currently visible
  const shadow = getShadowRoot();
  const drawer = shadow.getElementById('lc-pattern-drawer');

  if (drawer) {
    if (!newSlug) {
      // User navigated away from problem pages (e.g. to /problemset/)
      drawer.remove();
    } else {
      // User moved to a new problem with drawer open: immediately clear old data and show loader
      renderDrawerLoadingState(newSlug);
    }
  }

  // 4. Synchronize widget buttons (Coach vs Sync Solved)
  updateFloatingWidgetState();
}

function renderDrawerLoadingState(slug = null) {
  const shadow = getShadowRoot();
  const content = shadow.getElementById('lc-drawer-content');
  if (!content) return;

  const problemLabel = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Problem';

  content.innerHTML = `
    <div style="text-align:center; padding:36px 0; color:#646e82;">
      <div style="width:28px; height:28px; margin:0 auto 12px; display:flex; align-items:center; justify-content:center;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e2033" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1.2s linear infinite;">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      </div>
      <div style="font-weight:700; font-size:12px; color:#1e2033; font-family:'Geist', sans-serif;">Analyzing Algorithmic Archetype...</div>
      <div style="font-size:11px; margin-top:4px; font-family:'JetBrains Mono', monospace; color:#646e82;">Targeting Big-O & Socratic clues for ${problemLabel}</div>
    </div>
  `;
}

/**
 * Loads fresh hints, complexity targets, and blueprint solutions for a given problem slug.
 * Discards any out-of-order responses using monotonic fetch identifiers.
 */
function loadFreshProblemData(slug) {
  if (!slug) return;

  const fetchId = ++currentFetchId;
  renderDrawerLoadingState(slug);

  safeSendMessage({ action: 'fetch_hints', slug }, (response) => {
    // Discard response if a newer fetch was initiated or user moved to another slug
    if (fetchId !== currentFetchId || getProblemSlug() !== slug) {
      return;
    }

    const shadow = getShadowRoot();
    const drawer = shadow.getElementById('lc-pattern-drawer');
    if (!drawer) return; // Drawer closed while fetching

    if (response && response.success && response.data) {
      cachedHintData = response.data;
      loadedProblemSlug = slug;
      currentLevel = 1;
      renderDrawerTabContent();
    } else {
      const isContextInvalidated = response?.error && response.error.includes('context invalidated');
      const content = shadow.getElementById('lc-drawer-content');
      if (content) {
        if (isContextInvalidated) {
          content.innerHTML = `
            <div class="card-surface" style="text-align:left; border-color:#eef0f4; padding:16px;">
              <p style="color:#1e2033; font-weight:700; margin:0 0 6px 0; font-size:13px;">Extension Updated</p>
              <p style="font-size:12px; color:#646e82; margin:0 0 12px 0; line-height:1.5;">The extension was reloaded in Chrome. Please refresh this LeetCode tab to reconnect.</p>
              <button onclick="window.location.reload()" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; background:#1e2033; color:#fff; padding:8px 16px; border-radius:9999px; font-weight:600; border:none; cursor:pointer;">
                ↻ Refresh Page
              </button>
            </div>
          `;
        } else {
          content.innerHTML = `
            <div class="card-surface" style="text-align:left; border-color:#eef0f4; padding:16px;">
              <p style="color:#b45309; font-weight:700; margin:0 0 6px 0; font-size:13px;">Could not load pattern analysis</p>
              <p style="font-size:12px; color:#646e82; margin:0 0 12px 0; line-height:1.5;">${response?.error || 'Could not load pattern analysis for this problem.'}</p>
              <div style="display:flex; align-items:center; gap:8px;">
                <button id="lc-retry-hints-btn" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; background:#1e2033; color:#fff; padding:8px 16px; border-radius:9999px; font-weight:600; border:none; cursor:pointer;">
                  ↻ Retry
                </button>
                <button id="lc-open-dashboard-btn" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; background:#f4f5f9; color:#1e2033; padding:8px 16px; border-radius:9999px; font-weight:600; border:1px solid #eef0f4; cursor:pointer;">
                  Open Pattern Dashboard ↗
                </button>
              </div>
            </div>
          `;
          const retryBtn = shadow.getElementById('lc-retry-hints-btn');
          if (retryBtn) {
            retryBtn.onclick = () => loadFreshProblemData(slug);
          }
          const dashBtn = shadow.getElementById('lc-open-dashboard-btn');
          if (dashBtn) {
            dashBtn.onclick = () => safeSendMessage({ action: 'open_dashboard' });
          }
        }
      }
    }
  });
}

/**
 * Main dispatcher when a problem shift or route transition is detected.
 */
function handleProblemShift(newSlug, _prevSlug) {
  cleanupProblemState(newSlug);

  // If newly arrived on a problem page and drawer is currently open, fetch fresh data immediately
  const shadow = getShadowRoot();
  const drawer = shadow.getElementById('lc-pattern-drawer');
  if (newSlug && drawer) {
    loadFreshProblemData(newSlug);
  }
}

/**
 * Inspects current location and slug, dispatching cleanup and fetch on changes.
 */
function checkUrlOrSlugChange() {
  const currentUrl = window.location.href;
  const currentSlug = getProblemSlug();

  const urlChanged = currentUrl !== lastObservedUrl;
  const slugChanged = currentSlug !== currentProblemSlug;

  if (urlChanged || slugChanged) {
    const prevSlug = currentProblemSlug;
    lastObservedUrl = currentUrl;
    currentProblemSlug = currentSlug;

    if (slugChanged) {
      handleProblemShift(currentSlug, prevSlug);
    } else {
      updateFloatingWidgetState();
    }
  }
}

// In-Page Socratic Hints & Complexity Drawer inside Shadow DOM
async function toggleHintsDrawer() {
  if (typeof chrome !== 'undefined' && !chrome?.runtime?.id) {
    showToast('Extension was reloaded. Please refresh (Cmd+R) this LeetCode tab.', 'error');
    return;
  }
  const shadow = getShadowRoot();
  let drawer = shadow.getElementById('lc-pattern-drawer');
  if (drawer) {
    drawer.remove();
    return;
  }

  const slug = getProblemSlug();
  if (!slug) {
    showToast('Not on a LeetCode problem page', 'info');
    return;
  }

  drawer = document.createElement('div');
  drawer.id = 'lc-pattern-drawer';
  drawer.className = 'drawer-panel';

  drawer.innerHTML = `
    <div class="drawer-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="${safeGetURL('icons/asymptote-icon-small.svg')}" width="28" height="28" alt="Asymptote" style="border-radius:6px; display:block; flex-shrink:0;" />
        <span style="font-size:18px; font-weight:700; font-family:'Space Grotesk',sans-serif; color:#1e2033; letter-spacing:-0.02em;">Asymptote</span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <button id="lc-open-dashboard-header-btn" style="display:inline-flex; align-items:center; gap:4px; background:#1e2033; color:#ffffff; border:1px solid #1e2033; border-radius:6px; padding:4px 8px; font-size:11px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif;" title="Open full Asymptote Dashboard">
          <span>Dashboard</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </button>
        <button id="lc-close-drawer" style="background:none; border:none; color:#64748b; cursor:pointer; padding:6px; line-height:1; border-radius:6px; display:flex; align-items:center; justify-content:center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <!-- TABS NAV: [ Hints ] | [ Solution ] | [ Complexity ] | [ Notes ] with 3px emerald underline on active tab -->
    <div class="tabs-nav">
      <button id="tab-btn-hints" class="tab-btn ${activeDrawerTab === 'hints' ? 'active' : ''}">Hints</button>
      <button id="tab-btn-solution" class="tab-btn ${activeDrawerTab === 'solution' ? 'active' : ''}">Solution</button>
      <button id="tab-btn-complexity" class="tab-btn ${activeDrawerTab === 'complexity' ? 'active' : ''}">Complexity</button>
      <button id="tab-btn-notes" class="tab-btn ${activeDrawerTab === 'notes' ? 'active' : ''}">Notes</button>
    </div>

    <div id="lc-drawer-content" class="drawer-body"></div>
  `;

  shadow.appendChild(drawer);

  const headerDashBtn = shadow.getElementById('lc-open-dashboard-header-btn');
  if (headerDashBtn) {
    headerDashBtn.onclick = () => {
      safeSendMessage({
        action: 'open_dashboard',
        query: '?tab=solver&q=' + encodeURIComponent(slug)
      });
    };
  }

  shadow.getElementById('lc-close-drawer').onclick = () => drawer.remove();
  shadow.getElementById('tab-btn-hints').onclick = () => switchDrawerTab('hints');
  shadow.getElementById('tab-btn-solution').onclick = () => switchDrawerTab('solution');
  shadow.getElementById('tab-btn-complexity').onclick = () => switchDrawerTab('complexity');
  shadow.getElementById('tab-btn-notes').onclick = () => switchDrawerTab('notes');

  if (cachedHintData && loadedProblemSlug === slug) {
    renderDrawerTabContent();
  } else {
    loadFreshProblemData(slug);
  }
}

function switchDrawerTab(tab) {
  if (activeDrawerTab === tab) return;
  activeDrawerTab = tab;
  const shadow = getShadowRoot();
  const tabs = ['hints', 'solution', 'complexity', 'notes'];

  tabs.forEach(t => {
    const btn = shadow.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  const slug = getProblemSlug();
  if (cachedHintData && loadedProblemSlug === slug) {
    renderDrawerTabContent();
  } else if (slug) {
    loadFreshProblemData(slug);
  }
}

function renderDrawerTabContent() {
  const shadow = getShadowRoot();
  const content = shadow.getElementById('lc-drawer-content');
  if (!content) return;

  const currentSlug = getProblemSlug();
  if (!cachedHintData || loadedProblemSlug !== currentSlug) {
    renderDrawerLoadingState(currentSlug);
    return;
  }

  const { problem, pattern, hints, complexity } = cachedHintData;
  const isVerified = Boolean(problem?.verified === 1 || problem?.verified === true);
  const diffClass = problem.difficulty === 'Easy' 
    ? 'chip-diff-easy' 
    : problem.difficulty === 'Medium' 
    ? 'chip-diff-medium' 
    : 'chip-diff-hard';

  // Problem Header info (shown under tabs on every tab)
  const patternChipHtml = isVerified
    ? `<span class="chip-pattern">${pattern?.title || 'Algorithmic Pattern'}</span>`
    : '';

  const tier = problem.verification_tier || problem.review?.status || (isVerified ? 'tested' : 'unverified');
  const tierBadge = isVerified
    ? `<span class="chip-pattern" style="background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; font-weight:600;">${tier === 'reviewed' ? 'Reviewed' : 'Tested'}</span>`
    : '';

  const solvedBadge = (problem.is_solved === 1 || problem.is_solved === true)
    ? `<span class="chip-pattern" style="background:#ecfdf5; color:#047857; border:1px solid #a7f3d0; font-weight:600;">Solved</span>`
    : '';

  const headerHtml = `
    <div style="margin-bottom:18px; text-align:left;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
        <span style="font-family:'DM Sans', sans-serif; font-size:13px; font-weight:700; color:#64748b;">#${problem.frontend_id || ''}</span>
        <span class="chip-diff ${diffClass}">${problem.difficulty}</span>
        <span class="chip-pattern" style="background:#f8fafc; color:#475569; border:1px solid #e2e8f0;">${problem.category || 'Algorithms'}</span>
        ${patternChipHtml}
        ${tierBadge}
        ${solvedBadge}
      </div>
      <h2 style="font-family:'Space Grotesk', sans-serif; font-size:22px; font-weight:700; color:#1e2033; line-height:1.25; margin:0;">
        ${problem.title}
      </h2>
    </div>
  `;

  // TAB 1: [ Hints ] (5.8 Hints tab: 4 hint rows + full-width amber button)
  if (activeDrawerTab === 'hints') {
    if (!isVerified) {
      content.innerHTML = `
        <div class="tab-content-pane">
          ${headerHtml}
          <div style="text-align:center; padding:32px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="width:56px; height:56px; margin:0 auto 16px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#64748b;">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h3 style="font-family:'Space Grotesk', sans-serif; font-size:22px; font-weight:700; color:#1e2033; margin-bottom:8px;">
              No verified hints yet
            </h3>
            <p style="font-size:15px; color:#475569; line-height:1.55; margin-bottom:20px; max-width:320px; margin-left:auto; margin-right:auto;">
              We have not written verified hints for this problem yet.
            </p>
            <div>
              <span style="font-size:12px; font-weight:500; color:#475569; padding:3px 10px; border-radius:9999px; background:#ffffff; border:1px solid #cbd5e1; display:inline-block;">
                ${problem.category || 'Algorithms'}
              </span>
            </div>
          </div>
        </div>
      `;
      return;
    }
    const genericHintTitles = [
      'Recognize the obstacle',
      'Identify the core insight',
      'Outline the procedure',
      'See the blueprint'
    ];

    const hintRowsHtml = (hints || []).map((h, i) => {
      const isUnlocked = (i + 1) <= currentLevel;
      const genericTitle = h.genericTitle || genericHintTitles[i] || `Hint ${i + 1}`;
      const title = isUnlocked ? (h.realTitle || h.title) : genericTitle;

      if (isUnlocked) {
        return `
          <div id="hint-row-${i + 1}" style="background:#f0fdf4; border:1px solid #a7f3d0; border-radius:10px; padding:14px; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span style="background:#1e2033; color:#ffffff; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; line-height:1;">
                L${i + 1}
              </span>
              <span style="font-weight:700; font-size:14px; color:#1e2033;">
                ${title}
              </span>
            </div>
            <div style="font-size:13px; color:#334155; line-height:1.55; white-space:pre-wrap;">
              ${(h.content || h.text || '').trim()}
            </div>
          </div>
        `;
      } else {
        return `
          <div id="hint-row-${i + 1}" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; margin-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#e2e8f0; color:#475569; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; line-height:1;">
                L${i + 1}
              </span>
              <span style="font-weight:500; font-size:14px; color:#64748b;">
                ${title}
              </span>
            </div>
            <span style="font-size:12px; color:#64748b; font-weight:500;">
              Locked
            </span>
          </div>
        `;
      }
    }).join('');

    const nextHintIdx = currentLevel;
    const nextLockedHint = hints && hints[nextHintIdx];
    const nextGenericTitle = nextLockedHint?.genericTitle || genericHintTitles[nextHintIdx] || 'Next step';
    const hasMoreHints = currentLevel < (hints?.length || 4);

    content.innerHTML = `
      <div class="tab-content-pane">
        ${headerHtml}
        <div style="margin-bottom:16px;">
          ${hintRowsHtml}
        </div>
        ${hasMoreHints ? `
          <button id="btn-reveal-next" class="btn-amber-reveal">
            Reveal hint ${currentLevel + 1}: ${nextGenericTitle}
          </button>
        ` : `
          <div id="all-hints-unlocked-banner" style="text-align:center; padding:12px; color:#047857; font-size:13px; font-weight:500; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:10px; scroll-margin-bottom:24px;">
            All hints unlocked
          </div>
        `}
      </div>
    `;

    const nextBtn = shadow.getElementById('btn-reveal-next');
    if (nextBtn) {
      nextBtn.onclick = () => {
        currentLevel++;
        renderDrawerTabContent();
        setTimeout(() => {
          const nextActionBtn = shadow.getElementById('btn-reveal-next');
          const allUnlockedEl = shadow.getElementById('all-hints-unlocked-banner');
          const newlyUnlocked = shadow.getElementById(`hint-row-${currentLevel}`);
          const targetEl = nextActionBtn || allUnlockedEl || newlyUnlocked;
          if (targetEl && typeof targetEl.scrollIntoView === 'function') {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 80);
      };
    }
  }

  // TAB 2: [ Solution ] (5.9 Solution tab: Blueprint view select + lang select + white code card + dashboard link)
  else if (activeDrawerTab === 'solution') {
    if (!isVerified) {
      content.innerHTML = `
        <div class="tab-content-pane">
          ${headerHtml}
          <div style="text-align:center; padding:32px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="width:52px; height:52px; margin:0 auto 14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#64748b;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h3 style="font-family:'Space Grotesk', sans-serif; font-size:22px; font-weight:700; color:#1e2033; margin-bottom:8px;">
              No verified solution yet
            </h3>
            <p style="font-size:15px; color:#475569; line-height:1.55; margin-bottom:20px; max-width:320px; margin-left:auto; margin-right:auto;">
              Multi-language verified solutions are only published for curated problem archetypes.
            </p>
            <div>
              <span style="font-size:12px; font-weight:500; color:#475569; padding:3px 10px; border-radius:9999px; background:#ffffff; border:1px solid #cbd5e1; display:inline-block;">
                ${problem.category || 'Algorithms'}
              </span>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const supportedLangs = getSupportedLanguages(problem);
    const primarySolLang = problem?.solutions?.[0]?.lang || 
      (problem?.category === 'Database' ? 'mysql' : 
       problem?.category === 'pandas' ? 'pythondata' : 
       problem?.category === 'Shell' ? 'bash' : 
       problem?.category === 'JavaScript' ? 'javascript' : 'python3');

    if (!supportedLangs.some(l => l.id === activeSolutionLang)) {
      activeSolutionLang = supportedLangs.some(l => l.id === primarySolLang) ? primarySolLang : (supportedLangs[0]?.id || 'python3');
    }
    const activeCode = getCodeForLang(activeSolutionLang, hints, pattern, problem);

    const isScaffold = activeSolutionView === 'scaffold';
    const isTwist = activeSolutionView === 'twists';
    const isNotes = activeSolutionView === 'notes';
    const blueprintTitle = 'Blueprint';

    const codeCardHtml = `
      <div class="card-white" style="margin-top:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-family:'Space Grotesk', sans-serif; font-size:14px; font-weight:700; color:#1e2033;">
            ${blueprintTitle}
          </span>
          <button id="btn-copy-code" class="btn-secondary">
            Copy
          </button>
        </div>
        <pre class="code-preview-light"><code>${activeCode}</code></pre>
      </div>
    `;

    const twistHtml = `
      <div class="card-white" style="margin-top:12px;">
        <div style="font-family:'Space Grotesk', sans-serif; font-size:14px; font-weight:700; color:#1e2033; margin-bottom:6px;">
          Pattern variation
        </div>
        <div style="font-size:13px; color:#334155; line-height:1.55;">
          ${problem.twist_type || 'Standard algorithmic archetype for this problem category.'}
        </div>
      </div>
    `;

    const notesHtml = `
      <div class="card-white" style="margin-top:12px;">
        <div style="font-family:'Space Grotesk', sans-serif; font-size:14px; font-weight:700; color:#1e2033; margin-bottom:6px;">
          Notes
        </div>
        <div style="font-size:13px; color:#334155; line-height:1.55;">
          ${problem.user_notes || 'No notes saved yet. You can add notes from the Solved log.'}
        </div>
      </div>
    `;

    content.innerHTML = `
      <div class="tab-content-pane">
        ${headerHtml}
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <select id="solution-view-select" class="select-clean" style="flex:1;">
            <option value="scaffold" ${isScaffold ? 'selected' : ''}>Blueprint</option>
            <option value="twists" ${isTwist ? 'selected' : ''}>Pattern variation</option>
            <option value="notes" ${isNotes ? 'selected' : ''}>Notes</option>
          </select>
          ${isScaffold ? (
            supportedLangs.length === 0 ? `
              <span style="font-size:12px; color:#64748b; font-style:italic;">Loading languages...</span>
            ` : `
              <select id="solution-lang-select" class="select-clean" style="flex:1;">
                ${supportedLangs.map(l => `<option value="${l.id}" ${activeSolutionLang === l.id ? 'selected' : ''}>${l.name || l.label}</option>`).join('')}
              </select>
            `
          ) : ''}
        </div>

        ${isScaffold ? codeCardHtml : isTwist ? twistHtml : notesHtml}

        <div style="text-align:center; margin-top:16px;">
          <button id="lc-open-solver-btn" type="button" style="background:none; border:none; padding:0; font-size:13px; color:#1e2033; font-weight:600; cursor:pointer; text-decoration:none; font-family:inherit;">
            Open in dashboard editor ↗
          </button>
        </div>
      </div>
    `;

    const solverBtn = shadow.getElementById('lc-open-solver-btn');
    if (solverBtn) {
      solverBtn.onclick = () => {
        safeSendMessage({
          action: 'open_dashboard',
          query: '?tab=solver&q=' + encodeURIComponent(problem?.slug || getProblemSlug() || '')
        });
      };
    }

    const viewSelect = shadow.getElementById('solution-view-select');
    if (viewSelect) {
      viewSelect.onchange = (e) => {
        activeSolutionView = e.target.value;
        renderDrawerTabContent();
      };
    }

    if (isScaffold) {
      const langSelect = shadow.getElementById('solution-lang-select');
      if (langSelect) {
        langSelect.onchange = (e) => {
          activeSolutionLang = e.target.value;
          renderDrawerTabContent();
        };
      }

      const copyBtn = shadow.getElementById('btn-copy-code');
      if (copyBtn) {
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(activeCode);
          copyBtn.innerText = 'Copied';
          setTimeout(() => {
            if (copyBtn) copyBtn.innerText = 'Copy';
          }, 2000);
        };
      }
    }
  }

  // TAB 3: [ Complexity ] (5.10 Complexity tab: Target time/space + Time limit, Space/time trade-off, What interviewers look for)
  else if (activeDrawerTab === 'complexity') {
    if (!isVerified) {
      content.innerHTML = `
        <div class="tab-content-pane">
          ${headerHtml}
          <div style="text-align:center; padding:28px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="width:52px; height:52px; margin:0 auto 14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#64748b;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 style="font-family:'Space Grotesk', sans-serif; font-size:20px; font-weight:700; color:#1e2033; margin-bottom:6px;">
              No verified complexity yet
            </h3>
            <p style="font-size:14px; color:#475569; line-height:1.5; margin-bottom:14px;">
              Target complexity and operational budgets are only provided for verified problem archetypes.
            </p>
            <div>
              <span style="font-size:11px; font-weight:600; color:#1e2033; padding:2px 8px; border-radius:9999px; background:#e2e8f0;">
                ${problem?.category || 'Algorithms'}
              </span>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const compKind = complexity?.kind || (problem?.category === 'Database' ? 'query-notes' : (problem?.category === 'Concurrency' ? 'none' : 'big-o'));

    let complexityBodyHtml = '';

    if (compKind === 'query-notes') {
      const varsHtml = Array.isArray(complexity?.variables) && complexity.variables.length > 0
        ? `<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:12px; font-size:12px; color:#475569;">
             <strong style="color:#1e2033;">Variables:</strong> ${complexity.variables.join('; ')}
           </div>`
        : '';

      complexityBodyHtml = `
        <!-- Two side-by-side cards: Execution / Cost, Auxiliary memory -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Execution / Cost</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              ${complexity?.time || complexity?.targetTime || 'O(N)'}
            </div>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Auxiliary memory</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              ${complexity?.space || complexity?.targetSpace || 'O(1)'}
            </div>
          </div>
        </div>

        ${varsHtml}

        ${complexity?.notes ? `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:12px; font-size:13px; color:#475569; line-height:1.5;">
          <strong style="color:#1e2033;">Overview:</strong> ${complexity.notes}
        </div>` : ''}

        <!-- Panel 1: Why Naive Fails (rose style) -->
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#9f1239; margin-bottom:4px;">
            Why Naive Fails / Query Bottlenecks
          </div>
          <div style="font-size:13px; color:#9f1239; line-height:1.55;">
            ${complexity?.whyNaiveFails || complexity?.notes || ''}
          </div>
        </div>

        <!-- Panel 2: Space-Time Tradeoff (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            Space-Time Tradeoff
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.spaceTimeTradeoff || 'Minimal auxiliary space used.'}
          </div>
        </div>

        <!-- Panel 3: What Interviewers Look For (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            What Interviewers Look For
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.interviewerExpectation || ''}
          </div>
        </div>
      `;
    } else if (compKind === 'none') {
      complexityBodyHtml = `
        <!-- Two side-by-side cards: Coordination, Space overhead -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Coordination</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              Synchronized
            </div>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Space overhead</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              ${complexity?.space || complexity?.targetSpace || 'O(1)'}
            </div>
          </div>
        </div>

        ${complexity?.notes ? `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:12px; font-size:13px; color:#475569; line-height:1.5;">
          <strong style="color:#1e2033;">Overview:</strong> ${complexity.notes}
        </div>` : ''}

        <!-- Panel 1: Why Naive Fails (rose style) -->
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#9f1239; margin-bottom:4px;">
            Why Naive Fails / Concurrency Hazards
          </div>
          <div style="font-size:13px; color:#9f1239; line-height:1.55;">
            ${complexity?.whyNaiveFails || complexity?.notes || ''}
          </div>
        </div>

        <!-- Panel 2: Coordination & Memory Tradeoff (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            Coordination & Memory Tradeoff
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.spaceTimeTradeoff || 'Minimal auxiliary space used.'}
          </div>
        </div>

        <!-- Panel 3: What Interviewers Look For (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            What Interviewers Look For
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.interviewerExpectation || ''}
          </div>
        </div>
      `;
    } else {
      complexityBodyHtml = `
        <!-- Two side-by-side cards: Target time, Target space in Space Grotesk 18px bold -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Target time</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              ${complexity?.targetTime || complexity?.time || 'O(N)'}
            </div>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Target space</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              ${complexity?.targetSpace || complexity?.space || 'O(1)'}
            </div>
          </div>
        </div>

        ${complexity?.notes ? `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:12px; font-size:13px; color:#475569; line-height:1.5;">
          <strong style="color:#1e2033;">Overview:</strong> ${complexity.notes}
        </div>` : ''}

        <!-- Panel 1: Why Naive Fails (rose style) -->
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#9f1239; margin-bottom:4px;">
            Why Naive Fails / Operations Budget
          </div>
          <div style="font-size:13px; color:#9f1239; line-height:1.55;">
            ${complexity?.whyNaiveFails || complexity?.opsBudgetExplanation || complexity?.notes || ''}
          </div>
        </div>

        <!-- Panel 2: Space-Time Tradeoff (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            Space-Time Tradeoff
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.spaceTimeTradeoff || 'Minimal auxiliary space used.'}
          </div>
        </div>

        <!-- Panel 3: What Interviewers Look For (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            What Interviewers Look For
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.interviewerExpectation || ''}
          </div>
        </div>
      `;
    }

    content.innerHTML = `
      <div class="tab-content-pane">
        ${headerHtml}
        ${complexityBodyHtml}
      </div>
    `;
  }

  // TAB 4: [ Notes ]
  if (activeDrawerTab === 'notes') {
    renderDrawerNotesTab(problem, headerHtml);
  }
}

function renderDrawerNotesTab(problem, headerHtml) {
  const shadow = getShadowRoot();
  const content = shadow.getElementById('lc-drawer-content');
  if (!content) return;

  let currentRating = Number(problem.user_rating || 3);
  let isReview = Boolean(problem.review_needed);
  let currentNotes = problem.user_notes || '';

  const renderStars = (rating) => {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      const active = i <= rating;
      starsHtml += `
        <span class="drawer-star-btn" data-star="${i}" style="font-size:22px; color:${active ? '#f59e0b' : '#cbd5e1'}; cursor:pointer; padding:0 3px; user-select:none; transition:color 0.15s ease;">
          ★
        </span>
      `;
    }
    return starsHtml;
  };

  const escapeStr = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  content.innerHTML = `
    <div class="tab-content-pane" style="text-align:left; font-family:'DM Sans', sans-serif;">
      ${headerHtml}

      <!-- Confidence Card -->
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 16px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between;">
        <div>
          <div style="font-size:12px; font-weight:700; color:#1e2033; text-transform:uppercase; letter-spacing:0.04em;">CONFIDENCE RATING</div>
          <div style="font-size:12px; color:#64748b; margin-top:2px;">Rate your comfort with this solution</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <div id="drawer-notes-stars" style="display:flex; align-items:center;">
            ${renderStars(currentRating)}
          </div>
          <span id="drawer-notes-rating-text" style="font-size:13px; font-weight:700; color:#1e2033; min-width:32px; text-align:right;">
            ${currentRating}/5
          </span>
        </div>
      </div>

      <!-- Spaced Repetition Review Queue Toggle -->
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:12px 16px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between;">
        <label for="drawer-notes-review-toggle" style="font-size:13px; font-weight:600; color:#1e2033; cursor:pointer; display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="drawer-notes-review-toggle" ${isReview ? 'checked' : ''} style="accent-color:#d97706; width:16px; height:16px; cursor:pointer;" />
          <span>Flag for review queue</span>
        </label>
        <span id="drawer-notes-review-badge" style="font-size:11px; font-weight:600; padding:3px 10px; border-radius:9999px; ${isReview ? 'background:#fef3c7; color:#92400e; border:1px solid #fde68a;' : 'background:#f1f5f9; color:#64748b; border:1px solid #e2e8f0;'}">
          ${isReview ? 'Review Due' : 'Mastered'}
        </span>
      </div>

      <!-- Notes Textarea -->
      <div style="margin-bottom:14px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <label for="drawer-notes-input" style="font-size:12px; font-weight:700; color:#1e2033; text-transform:uppercase; letter-spacing:0.04em;">
            Personal Notes & Takeaways
          </label>
          <span id="drawer-notes-status" style="font-size:12px; font-weight:600; color:#059669; opacity:0; transition:opacity 0.2s ease;">
            Notes saved ✓
          </span>
        </div>
        <textarea 
          id="drawer-notes-input" 
          rows="7" 
          placeholder="Capture the core insight, subtle invariants, edge cases (e.g. empty inputs, duplicates), or space-time trade-offs..."
          style="width:100%; border:1px solid #cbd5e1; border-radius:10px; padding:12px; font-family:'DM Sans', sans-serif; font-size:13px; color:#1e2033; line-height:1.55; resize:vertical; outline:none; box-sizing:border-box; background:#ffffff; box-shadow:0 1px 2px rgba(0,0,0,0.03);"
        >${escapeStr(currentNotes)}</textarea>
      </div>

      <!-- Save Button -->
      <div style="display:flex; gap:10px;">
        <button id="drawer-notes-save-btn" style="flex:1; background:#059669; color:#ffffff; font-family:'DM Sans', sans-serif; font-size:13px; font-weight:700; padding:11px 16px; border:none; border-radius:10px; cursor:pointer; transition:background 0.15s ease; box-shadow:0 1px 2px rgba(0,0,0,0.05);">
          Save Notes
        </button>
      </div>
    </div>
  `;

  const starsContainer = shadow.getElementById('drawer-notes-stars');
  const ratingText = shadow.getElementById('drawer-notes-rating-text');
  const reviewToggle = shadow.getElementById('drawer-notes-review-toggle');
  const reviewBadge = shadow.getElementById('drawer-notes-review-badge');
  const notesInput = shadow.getElementById('drawer-notes-input');
  const saveBtn = shadow.getElementById('drawer-notes-save-btn');
  const statusEl = shadow.getElementById('drawer-notes-status');

  let debounceTimer = null;

  const saveUpdates = (notify = true) => {
    const nextNotes = notesInput ? notesInput.value : currentNotes;
    const nextRating = currentRating;
    const nextReview = reviewToggle ? (reviewToggle.checked ? 1 : 0) : (isReview ? 1 : 0);

    // Update in local cached object
    if (cachedHintData?.problem) {
      cachedHintData.problem.user_notes = nextNotes;
      cachedHintData.problem.user_rating = nextRating;
      cachedHintData.problem.review_needed = nextReview;
    }

    safeSendMessage({
      action: 'update_problem',
      id: problem.slug || problem.id,
      updates: {
        user_notes: nextNotes,
        user_rating: nextRating,
        review_needed: nextReview
      }
    }, (res) => {
      if (res && res.success && notify) {
        if (statusEl) {
          statusEl.style.opacity = '1';
          setTimeout(() => { if (statusEl) statusEl.style.opacity = '0'; }, 1800);
        }
        showToast('Notes saved ✓', 'success');
      }
    });
  };

  if (starsContainer) {
    starsContainer.addEventListener('click', (e) => {
      const starEl = e.target.closest('.drawer-star-btn');
      if (!starEl) return;
      currentRating = parseInt(starEl.getAttribute('data-star'), 10) || 3;
      starsContainer.innerHTML = renderStars(currentRating);
      if (ratingText) ratingText.innerText = `${currentRating}/5`;
      saveUpdates(true);
    });
  }

  if (reviewToggle) {
    reviewToggle.addEventListener('change', () => {
      isReview = reviewToggle.checked;
      if (reviewBadge) {
        reviewBadge.innerText = isReview ? 'Review Due' : 'Mastered';
        reviewBadge.style.background = isReview ? '#fef3c7' : '#f1f5f9';
        reviewBadge.style.color = isReview ? '#92400e' : '#64748b';
        reviewBadge.style.border = isReview ? '1px solid #fde68a' : '1px solid #e2e8f0';
      }
      saveUpdates(true);
    });
  }

  if (notesInput) {
    notesInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        saveUpdates(true);
      }, 1000);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      clearTimeout(debounceTimer);
      saveUpdates(true);
    });
  }
}

// Monitor for Submissions and "Accepted" Status
let lastSyncedSubmission = null;

function detectAcceptedSubmission() {
  const resultElements = document.querySelectorAll('[data-e2e-locator="submission-result"]');
  for (const el of resultElements) {
    if (el.innerText.includes('Accepted')) {
      handleAccepted();
      return;
    }
  }

  const banners = document.querySelectorAll('span, div');
  for (const b of banners) {
    if (b.innerText === 'Accepted' && (b.className.includes('text-green') || b.className.includes('success'))) {
      handleAccepted();
      return;
    }
  }
}

async function handleAccepted() {
  const slug = getProblemSlug();
  if (!slug || slug === lastSyncedSubmission) return;
  lastSyncedSubmission = slug;

  let code = '';
  const lines = document.querySelectorAll('.view-lines .view-line');
  if (lines && lines.length > 0) {
    code = Array.from(lines).map(l => l.innerText).join('\n');
  }

  safeSendMessage({
    action: 'save_submission',
    titleSlug: slug,
    code
  }, (res) => {
    if (res && res.success) {
      showToast(`Synced ${slug} to Pattern Tracker!`, 'success');
    }
  });
}

// Extension message listener from popup and background service worker
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === 'url_changed') {
      checkUrlOrSlugChange();
      sendResponse({ received: true });
      return true;
    }
    if (req.action === 'sync_all_from_leetcode') {
      syncAllSolvedFromLeetCode().then(res => sendResponse(res));
      return true;
    }
    if (req.action === 'check_user_status') {
      safeGraphqlQuery(`query userStatus { userStatus { isSignedIn username } }`)
        .then(data => sendResponse({
          isSignedIn: !!data?.userStatus?.isSignedIn,
          username: data?.userStatus?.username || null
        }))
        .catch(() => sendResponse({ isSignedIn: false }));
      return true;
    }
  });
}

/**
 * Initializes listeners and MutationObserver for instant detection of Next.js SPA shifts.
 */
function initProblemShiftWatcher() {
  currentProblemSlug = getProblemSlug();
  lastObservedUrl = window.location.href;

  // 1. Popstate & Hashchange listeners (Browser back/forward)
  window.addEventListener('popstate', checkUrlOrSlugChange);
  window.addEventListener('hashchange', checkUrlOrSlugChange);

  // 2. Monkey-patch History API in page context (dispatches custom asymptote:urlchange)
  try {
    const originalPushState = history.pushState;
    if (originalPushState) {
      history.pushState = function (...args) {
        const res = originalPushState.apply(this, args);
        window.dispatchEvent(new Event('asymptote:urlchange'));
        return res;
      };
    }
    const originalReplaceState = history.replaceState;
    if (originalReplaceState) {
      history.replaceState = function (...args) {
        const res = originalReplaceState.apply(this, args);
        window.dispatchEvent(new Event('asymptote:urlchange'));
        return res;
      };
    }
    window.addEventListener('asymptote:urlchange', checkUrlOrSlugChange);
  } catch (_err) {
    // Isolated world restriction fallback handled by MutationObserver & polling
  }

  // 3. MutationObserver on document for Next.js SPA DOM / title shifts
  if (typeof MutationObserver !== 'undefined') {
    let debounceTimer = null;
    pageMutationObserver = new MutationObserver(() => {
      if (debounceTimer) return;
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        checkUrlOrSlugChange();
      }, 150);
    });

    pageMutationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  // 4. Fast polling heartbeat fallback (every 400ms)
  _urlCheckIntervalId = setInterval(checkUrlOrSlugChange, 400);
}

// Initial widget injection & shift watcher setup
injectFloatingButtons();
initProblemShiftWatcher();

// Continuous check for submissions and floating button integrity
setInterval(() => {
  updateFloatingWidgetState();
  detectAcceptedSubmission();
}, 1500);

