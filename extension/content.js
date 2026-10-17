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
  } catch (err) {}
  return '';
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('lc-pattern-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lc-pattern-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
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
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(10px);
    `;
    document.body.appendChild(toast);
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
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
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
      } catch (parseErr) {
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
    } catch (e) {
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
          const errMsg = response?.error || 'Make sure Pattern Tracker is running (npm start at http://localhost:3001)';
          showToast(`Server sync error: ${errMsg}`, 'error');
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
let urlCheckIntervalId = null;

// View parameter and language selection state
const LanguagesModule = globalThis.LanguagesModule || window.LanguagesModule || null;

let activeSolutionLang = 'python3';
let activeSolutionView = 'scaffold'; // 'scaffold' | 'twists' | 'notes'
let activeComplexityFocus = 'all'; // 'all' | 'budget' | 'tradeoff' | 'expectations'

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

const SOLUTION_VIEW_OPTIONS = [
  { id: 'scaffold', label: 'Blueprint' },
  { id: 'twists', label: 'Pattern variation' },
  { id: 'notes', label: 'Notes' }
];

const COMPLEXITY_FOCUS_OPTIONS = [
  { id: 'all', label: 'Complete Metrics' },
  { id: 'budget', label: 'Time limit' },
  { id: 'tradeoff', label: 'Space and time trade-off' },
  { id: 'expectations', label: 'What interviewers look for' }
];

function getClueOptions(hintsCount = 4) {
  const titles = [
    'Level 1: Problem Identity',
    'Level 2: Data Structure Strategy',
    'Level 3: Algorithmic Invariant',
    'Level 4: Code Skeleton'
  ];
  const list = [];
  const max = Math.max(hintsCount, 4);
  for (let i = 1; i <= max; i++) {
    list.push({
      id: String(i),
      label: titles[i - 1] || `Level ${i}: Clue`
    });
  }
  return list;
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
  if (langSlug === 'python3' || langSlug === 'python') {
    return problem.solution_python || (hints && hints[3]?.content) || '';
  }
  return `No verified solution in ${langSlug} yet`;
}

/**
 * Renders an accessible flat dropdown menu component markup.
 * Absolutely positioned overlay ensures zero in-flow layout shift of adjacent text.
 */
function renderFlatDropdownHtml({ id, label, selectedId, options, align = 'right' }) {
  const currentOpt = options.find(o => o.id === selectedId) || options[0] || { id: '', label: '' };
  const alignStyle = align === 'left' ? 'left:0; right:auto;' : 'right:0; left:auto;';

  return `
    <div class="flat-dropdown-wrapper" id="dropdown-${id}-wrapper">
      <button 
        type="button" 
        id="dropdown-${id}-trigger" 
        class="flat-dropdown-trigger" 
        role="combobox" 
        aria-haspopup="listbox" 
        aria-expanded="false" 
        aria-controls="dropdown-${id}-menu"
        aria-label="${label}: ${currentOpt.label}"
        tabindex="0">
        <span class="dropdown-trigger-label" id="dropdown-${id}-label">${currentOpt.label}</span>
        <svg class="dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <ul 
        id="dropdown-${id}-menu" 
        class="flat-dropdown-menu" 
        role="listbox" 
        tabindex="-1"
        aria-label="${label}"
        style="${alignStyle}">
        ${options.map(opt => `
          <li 
            class="flat-dropdown-item ${opt.id === selectedId ? 'active' : ''}" 
            role="option" 
            data-value="${opt.id}" 
            tabindex="0" 
            aria-selected="${opt.id === selectedId ? 'true' : 'false'}">
            <span>${opt.label}</span>
            ${opt.id === selectedId ? `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ` : ''}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

/**
 * Attaches fully accessible keyboard listeners and click handlers to a flat dropdown instance.
 */
function attachFlatDropdown(root, id, onSelect) {
  const wrapper = root.getElementById(`dropdown-${id}-wrapper`);
  const trigger = root.getElementById(`dropdown-${id}-trigger`);
  const menu = root.getElementById(`dropdown-${id}-menu`);
  if (!wrapper || !trigger || !menu) return;

  const items = Array.from(menu.querySelectorAll('.flat-dropdown-item'));

  function openMenu() {
    const openMenus = root.querySelectorAll('.flat-dropdown-menu.open');
    openMenus.forEach(m => {
      m.classList.remove('open');
      const prevTrigger = m.parentElement?.querySelector('.flat-dropdown-trigger');
      if (prevTrigger) prevTrigger.setAttribute('aria-expanded', 'false');
    });

    trigger.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');

    const activeItem = items.find(it => it.classList.contains('active')) || items[0];
    if (activeItem) {
      setTimeout(() => activeItem.focus(), 40);
    }
  }

  function closeMenu(restoreFocus = true) {
    trigger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    if (restoreFocus) {
      trigger.focus();
    }
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains('open');
    if (isOpen) closeMenu(false);
    else openMenu();
  }

  trigger.onclick = (e) => {
    e.stopPropagation();
    toggleMenu();
  };

  trigger.onkeydown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    }
  };

  items.forEach((item, index) => {
    item.onclick = (e) => {
      e.stopPropagation();
      const val = item.getAttribute('data-value');
      closeMenu(true);
      if (onSelect) onSelect(val);
    };

    item.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        const val = item.getAttribute('data-value');
        closeMenu(true);
        if (onSelect) onSelect(val);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % items.length;
        items[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + items.length) % items.length;
        items[prevIndex].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeMenu(true);
      } else if (e.key === 'Tab') {
        closeMenu(false);
      }
    };
  });

  const outsideClickHandler = (e) => {
    if (!wrapper.contains(e.target) && !menu.contains(e.target)) {
      if (menu.classList.contains('open')) {
        closeMenu(false);
      }
    }
  };

  root.addEventListener('click', outsideClickHandler);
  document.addEventListener('click', outsideClickHandler);
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
    }
    .btn-amber-reveal:hover {
      background-color: #d97706;
    }
    .select-clean {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 6px 12px;
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
              <p style="font-size:12px; color:#646e82; margin:0 0 12px 0; line-height:1.5;">${response?.error || 'Make sure your Asymptote server is running on port 3001 (npm start).'}</p>
              <div style="display:flex; align-items:center; gap:8px;">
                <button id="lc-retry-hints-btn" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; background:#1e2033; color:#fff; padding:8px 16px; border-radius:9999px; font-weight:600; border:none; cursor:pointer;">
                  ↻ Retry
                </button>
                <a href="http://localhost:3001" target="_blank" style="display:inline-flex; align-items:center; gap:6px; font-size:12px; background:#f4f5f9; color:#1e2033; padding:8px 16px; border-radius:9999px; text-decoration:none; font-weight:600; border:1px solid #eef0f4;">
                  Open Pattern Dashboard ↗
                </a>
              </div>
            </div>
          `;
          const retryBtn = shadow.getElementById('lc-retry-hints-btn');
          if (retryBtn) {
            retryBtn.onclick = () => loadFreshProblemData(slug);
          }
        }
      }
    }
  });
}

/**
 * Main dispatcher when a problem shift or route transition is detected.
 */
function handleProblemShift(newSlug, prevSlug) {
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
      <button id="lc-close-drawer" style="background:none; border:none; color:#64748b; cursor:pointer; padding:6px; line-height:1; border-radius:6px; display:flex; align-items:center; justify-content:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <!-- TABS NAV: [ Hints ] | [ Solution ] | [ Complexity ] with 3px emerald underline on active tab -->
    <div class="tabs-nav">
      <button id="tab-btn-hints" class="tab-btn ${activeDrawerTab === 'hints' ? 'active' : ''}">Hints</button>
      <button id="tab-btn-solution" class="tab-btn ${activeDrawerTab === 'solution' ? 'active' : ''}">Solution</button>
      <button id="tab-btn-complexity" class="tab-btn ${activeDrawerTab === 'complexity' ? 'active' : ''}">Complexity</button>
    </div>

    <div id="lc-drawer-content" class="drawer-body"></div>
  `;

  shadow.appendChild(drawer);

  shadow.getElementById('lc-close-drawer').onclick = () => drawer.remove();
  shadow.getElementById('tab-btn-hints').onclick = () => switchDrawerTab('hints');
  shadow.getElementById('tab-btn-solution').onclick = () => switchDrawerTab('solution');
  shadow.getElementById('tab-btn-complexity').onclick = () => switchDrawerTab('complexity');

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
  const tabs = ['hints', 'solution', 'complexity'];

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
  const showHeuristic = (typeof LanguagesModule !== 'undefined' && LanguagesModule.SHOW_HEURISTIC_PATTERNS) || false;
  const patternChipHtml = isVerified
    ? `<span class="chip-pattern">${pattern?.title || 'Algorithmic Pattern'}</span>`
    : (showHeuristic && problem.suggested_pattern ? `<span class="chip-pattern" style="background:#f1f5f9; color:#475569; border:1px solid #e2e8f0;">Suggested: ${problem.suggested_pattern.title} (unverified)</span>` : '');

  const headerHtml = `
    <div style="margin-bottom:18px; text-align:left;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
        <span style="font-family:'DM Sans', sans-serif; font-size:13px; font-weight:700; color:#64748b;">#${problem.frontend_id || ''}</span>
        <span class="chip-diff ${diffClass}">${problem.difficulty}</span>
        <span class="chip-pattern" style="background:#f8fafc; color:#475569; border:1px solid #e2e8f0;">${problem.category || 'Algorithms'}</span>
        ${patternChipHtml}
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
    const hintTitles = [
      'Recognize the pattern',
      'Define the state',
      'Write the transition',
      'See the blueprint'
    ];

    const hintRowsHtml = (hints || []).map((h, i) => {
      const isUnlocked = (i + 1) <= currentLevel;
      const title = hintTitles[i] || h.title;

      if (isUnlocked) {
        return `
          <div style="background:#f0fdf4; border:1px solid #a7f3d0; border-radius:10px; padding:14px; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span style="background:#1e2033; color:#ffffff; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; line-height:1;">
                L${i + 1}
              </span>
              <span style="font-weight:700; font-size:14px; color:#1e2033;">
                ${title}
              </span>
            </div>
            <div style="font-size:13px; color:#334155; line-height:1.55; white-space:pre-wrap;">
              ${h.content.trim()}
            </div>
          </div>
        `;
      } else {
        return `
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; margin-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
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
    const nextHintTitle = hintTitles[nextHintIdx] || (hints && hints[currentLevel] ? hints[currentLevel].title : 'Next step');
    const hasMoreHints = currentLevel < (hints?.length || 4);

    content.innerHTML = `
      <div class="tab-content-pane">
        ${headerHtml}
        <div style="margin-bottom:16px;">
          ${hintRowsHtml}
        </div>
        ${hasMoreHints ? `
          <button id="btn-reveal-next" class="btn-amber-reveal">
            Reveal hint ${currentLevel + 1}: ${nextHintTitle}
          </button>
        ` : `
          <div style="text-align:center; padding:12px; color:#047857; font-size:13px; font-weight:500; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:10px;">
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
      };
    }
  }

  // TAB 2: [ Solution ] (5.9 Solution tab: Blueprint view select + lang select + white code card + dashboard link)
  else if (activeDrawerTab === 'solution') {
    const supportedLangs = getSupportedLanguages(problem);
    if (!supportedLangs.some(l => l.id === activeSolutionLang) && supportedLangs.length > 0) {
      activeSolutionLang = supportedLangs[0].id;
    }
    const activeCode = getCodeForLang(activeSolutionLang, hints, pattern, problem);

    const isScaffold = activeSolutionView === 'scaffold';
    const isTwist = activeSolutionView === 'twists';
    const isNotes = activeSolutionView === 'notes';

    const codeCardHtml = `
      <div class="card-white" style="margin-top:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-family:'Space Grotesk', sans-serif; font-size:14px; font-weight:700; color:#1e2033;">
            Blueprint
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
          <a href="http://localhost:5173/?tab=solver" target="_blank" style="font-size:13px; color:#1e2033; font-weight:600; text-decoration:none;">
            Open in dashboard editor ↗
          </a>
        </div>
      </div>
    `;

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

    content.innerHTML = `
      <div class="tab-content-pane">
        ${headerHtml}
        
        <!-- Two side-by-side cards: Target time, Target space in Space Grotesk 18px bold -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Target time</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              ${complexity?.targetTime || 'O(N)'}
            </div>
          </div>
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px;">
            <div style="font-size:13px; color:#64748b; font-weight:500;">Target space</div>
            <div style="font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:700; color:#1e2033; margin-top:4px;">
              ${complexity?.targetSpace || 'O(1)'}
            </div>
          </div>
        </div>

        <!-- Panel 1: Time limit (rose style) -->
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#9f1239; margin-bottom:4px;">
            Time limit
          </div>
          <div style="font-size:13px; color:#9f1239; line-height:1.55;">
            ${complexity?.opsBudgetExplanation || complexity?.whyNaiveFails || 'N <= 10^5 operations requires O(N) or O(N log N) time to prevent Time Limit Exceeded.'}
          </div>
        </div>

        <!-- Panel 2: Space and time trade-off (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            Space and time trade-off
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.spaceTimeTradeoff || 'Using auxiliary memory allows single-pass linear time by storing visited states.'}
          </div>
        </div>

        <!-- Panel 3: What interviewers look for (white style) -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px;">
          <div style="font-size:14px; font-weight:700; color:#1e2033; margin-bottom:4px;">
            What interviewers look for
          </div>
          <div style="font-size:13px; color:#334155; line-height:1.55;">
            ${complexity?.interviewerExpectation || 'Articulate the recurrence relation and invariant bounds before writing code.'}
          </div>
        </div>
      </div>
    `;
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
  } catch (err) {
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
  urlCheckIntervalId = setInterval(checkUrlOrSlugChange, 400);
}

// Initial widget injection & shift watcher setup
injectFloatingButtons();
initProblemShiftWatcher();

// Continuous check for submissions and floating button integrity
setInterval(() => {
  updateFloatingWidgetState();
  detectAcceptedSubmission();
}, 1500);

