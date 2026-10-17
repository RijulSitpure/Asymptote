/**
 * @deprecated This legacy script has been superseded by the React architecture in client/src/.
 * Maintained for reference and backwards compatibility.
 */

// LeetCode Pattern Tracker & Socratic Aid Client Application

let allPatterns = [];
let allProblems = [];
let currentProblemDetail = null;
let currentStuckProblem = null;
let currentRevealedLevel = 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadPatterns();
  await loadProblems();
  await loadStats();
  if (window.lucide) window.lucide.createIcons();
});

// Navigation Tab Switcher
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
    btn.classList.add('text-slate-300');
  });

  const activeSection = document.getElementById(`tab-${tabName}`);
  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  if (activeSection) activeSection.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');
    activeBtn.classList.remove('text-slate-300');
  }

  if (tabName === 'mastery') loadStats();
  if (tabName === 'problems') renderProblemsTable();
  if (window.lucide) window.lucide.createIcons();
}

// ==================== PATTERN ATLAS ====================

async function loadPatterns() {
  try {
    const res = await fetch('/api/patterns');
    allPatterns = await res.json();
    renderPatterns(allPatterns);
    populatePatternFilters();
  } catch (err) {
    console.error('Failed to load patterns:', err);
  }
}

function renderPatterns(patterns) {
  const container = document.getElementById('patterns-grid');
  document.getElementById('patterns-badge-count').innerText = `${patterns.length} Patterns`;

  if (!patterns.length) {
    container.innerHTML = `<div class="col-span-2 text-center py-12 text-slate-400">No patterns match your filter.</div>`;
    return;
  }

  container.innerHTML = patterns.map(p => {
    const triggersHtml = (p.mental_triggers || []).map(t => `
      <li class="flex items-start gap-1.5 text-xs text-slate-300">
        <span class="text-indigo-400 mt-0.5">•</span>
        <span>${t}</span>
      </li>
    `).join('');

    const twistsHtml = (p.twists || []).map(tw => `
      <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs">
        <p class="font-semibold text-amber-300">${tw.title}</p>
        <p class="text-slate-400 text-xs mt-0.5">${tw.explanation}</p>
        ${tw.delta ? `<p class="text-indigo-300 text-xs mt-1 font-mono bg-slate-950 p-1.5 rounded">${tw.delta}</p>` : ''}
      </div>
    `).join('');

    return `
      <div class="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition flex flex-col justify-between">
        <div class="space-y-3">
          <!-- Top Category & Difficulty -->
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              ${p.category}
            </span>
            <span class="text-xs font-mono text-slate-400">
              ${p.complexity || ''}
            </span>
          </div>

          <!-- Title & Description -->
          <div>
            <h3 class="text-base font-bold text-white group-hover:text-slate-300 transition">${p.title}</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">${p.short_description}</p>
          </div>

          <!-- Mental Triggers (How to spot it) -->
          <div class="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <p class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1.5 flex items-center gap-1">
              <i data-lucide="eye" class="w-3 h-3 text-indigo-400"></i> Recognition Signals & Triggers
            </p>
            <ul class="space-y-1">
              ${triggersHtml}
            </ul>
          </div>

          <!-- Twists & Variations Accordion -->
          ${(p.twists && p.twists.length > 0) ? `
            <div class="space-y-1.5">
              <p class="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                <i data-lucide="shuffle" class="w-3 h-3 text-amber-400"></i> Common Interview Twists (${p.twists.length})
              </p>
              <div class="space-y-1.5">
                ${twistsHtml}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Action / Code Template Toggle -->
        <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <button onclick="togglePatternCode('${p.id}')" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <i data-lucide="code-2" class="w-3.5 h-3.5"></i> View Canonical Template
          </button>
          <button onclick="jumpToPatternProblems('${p.id}')" class="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <i data-lucide="list" class="w-3.5 h-3.5"></i> Solved Problems
          </button>
        </div>

        <!-- Code Block Container (Hidden by default) -->
        <div id="code-drawer-${p.id}" class="hidden mt-2 pt-2 border-t border-slate-800">
          <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Python Canonical Template</span>
            <button onclick="copyCode(this)" class="hover:text-white flex items-center gap-1">
              <i data-lucide="copy" class="w-3 h-3"></i> Copy
            </button>
          </div>
          <pre class="rounded-xl overflow-x-auto text-xs"><code class="language-python">${escapeHtml(p.base_template_py || '# Template')}</code></pre>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
  if (window.Prism) window.Prism.highlightAll();
}

function filterPatterns() {
  const query = (document.getElementById('pattern-search').value || '').toLowerCase();
  const category = document.getElementById('pattern-category-filter').value;

  const filtered = allPatterns.filter(p => {
    const matchesCategory = category === 'all' || p.category === category;
    const matchesQuery = !query || 
      p.title.toLowerCase().includes(query) ||
      p.short_description.toLowerCase().includes(query) ||
      (p.mental_triggers || []).some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  renderPatterns(filtered);
}

function togglePatternCode(patternId) {
  const drawer = document.getElementById(`code-drawer-${patternId}`);
  if (drawer) {
    drawer.classList.toggle('hidden');
    if (!drawer.classList.contains('hidden') && window.Prism) {
      window.Prism.highlightAll();
    }
  }
}

function jumpToPatternProblems(patternId) {
  switchTab('problems');
  const select = document.getElementById('filter-problem-pattern');
  if (select) {
    select.value = patternId;
    renderProblemsTable();
  }
}

// ==================== STUCK SOLVER (PROGRESSIVE HINTS) ====================

async function lookupProblemHints() {
  const query = document.getElementById('stuck-problem-input').value.trim();
  if (!query) return;

  const container = document.getElementById('stuck-result-container');
  container.classList.remove('hidden');
  container.innerHTML = `<div class="text-center py-8 text-slate-400">Looking up clues and patterns for "${query}"...</div>`;

  try {
    const res = await fetch(`/api/hints/${encodeURIComponent(query)}`);
    if (!res.ok) {
      const err = await res.json();
      container.innerHTML = `
        <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
          <p class="text-amber-400 text-sm font-semibold">${err.error || 'Problem not found.'}</p>
          <p class="text-xs text-slate-400">You can use our Diagnostic Wizard to infer the pattern from constraints, or paste problem details to auto-classify it!</p>
          <button onclick="switchTab('wizard')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl">
            Open Diagnostic Wizard
          </button>
        </div>
      `;
      return;
    }

    const data = await res.json();
    currentStuckProblem = data;
    currentRevealedLevel = 1; // Start at Level 1
    renderProgressiveHints();
  } catch (err) {
    container.innerHTML = `<div class="text-red-400 text-xs py-4 text-center">Failed to fetch hints: ${err.message}</div>`;
  }
}

function loadQuickProblem(id) {
  document.getElementById('stuck-problem-input').value = id;
  lookupProblemHints();
}

function renderProgressiveHints() {
  if (!currentStuckProblem) return;
  const { problem, pattern, hints, complexity } = currentStuckProblem;
  const container = document.getElementById('stuck-result-container');

  const triggersHtml = (problem.trigger_clues || []).map(c => `
    <li class="flex items-start gap-1.5 text-xs text-slate-300">
      <span class="text-amber-400 font-bold">•</span>
      <span>${c}</span>
    </li>
  `).join('');

  const hintLevels = hints || [];

  container.innerHTML = `
    <div class="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6">
      <!-- Problem Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-indigo-400 font-bold">#${problem.frontend_id}</span>
            <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${
              problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
              problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
              'bg-rose-500/10 text-rose-400'
            }">${problem.difficulty}</span>
          </div>
          <h3 class="text-xl font-bold text-white mt-1">${problem.title}</h3>
          <p class="text-xs text-slate-400 mt-1">${problem.summary || ''}</p>
        </div>
        <div class="text-right sm:self-center">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            ${pattern?.title || 'Matched Pattern'}
          </span>
          ${problem.twist_type ? `<p class="text-xs text-amber-300 mt-1">Twist: ${problem.twist_type}</p>` : ''}
        </div>
      </div>

      <!-- Complexity Targeter Section -->
      ${complexity ? `
        <div class="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <i data-lucide="target" class="w-3.5 h-3.5"></i> Target Complexity & Operational Budget
            </span>
            <span class="text-xs font-mono text-slate-400">${complexity.boundsSummary}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="bg-slate-900 p-3 rounded-lg border border-sky-500/20">
              <div class="text-xs text-slate-400 uppercase font-semibold">Target Time</div>
              <div class="text-sm font-bold text-sky-400 font-mono mt-0.5">${complexity.targetTime}</div>
            </div>
            <div class="bg-slate-900 p-3 rounded-lg border border-purple-500/20">
              <div class="text-xs text-slate-400 uppercase font-semibold">Target Space</div>
              <div class="text-sm font-bold text-purple-400 font-mono mt-0.5">${complexity.targetSpace}</div>
            </div>
          </div>
          <div class="text-xs text-slate-300 leading-relaxed space-y-1">
            <p><strong class="text-rose-400">Why Brute Force Fails:</strong> ${complexity.whyNaiveFails}</p>
            <p><strong class="text-emerald-400">Space-Time Tradeoff:</strong> ${complexity.spaceTimeTradeoff}</p>
            <p class="text-xs text-slate-400 pt-1 border-t border-slate-800/80">${complexity.opsBudgetExplanation}</p>
          </div>
        </div>
      ` : ''}

      <!-- Problem Trigger Signals -->
      ${problem.trigger_clues && problem.trigger_clues.length > 0 ? `
        <div class="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl space-y-2">
          <p class="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <i data-lucide="zap" class="w-3.5 h-3.5"></i> Why Your Brain Should Recognize This
          </p>
          <ul class="space-y-1">
            ${triggersHtml}
          </ul>
        </div>
      ` : ''}

      <!-- Socratic Tiered Clues -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="git-pull-request" class="w-4 h-4 text-indigo-400"></i>
            Progressive Clue Ladder (Level ${currentRevealedLevel} of ${hintLevels.length})
          </h4>
          <span class="text-xs text-slate-400">Step through gradually to preserve learning</span>
        </div>

        <div class="space-y-3">
          ${hintLevels.map((h, idx) => {
            const isRevealed = (idx + 1) <= currentRevealedLevel;
            return `
              <div class="rounded-xl border transition-all ${
                isRevealed ? 'bg-slate-800/80 border-slate-700 p-4 space-y-2 shadow-md' : 'bg-slate-900/40 border-slate-800/60 p-3 opacity-60'
              }">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isRevealed ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                    }">${idx + 1}</span>
                    <span class="text-xs font-bold ${isRevealed ? 'text-white' : 'text-slate-400'}">${h.title}</span>
                  </div>
                  ${!isRevealed ? `
                    <button onclick="revealHintLevel(${idx + 1})" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
                      <i data-lucide="lock" class="w-3 h-3"></i> Unlock Level ${idx + 1}
                    </button>
                  ` : `
                    <span class="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">Unlocked</span>
                  `}
                </div>
                ${isRevealed ? `
                  <div class="text-xs text-slate-200 leading-relaxed pl-8">
                    ${h.content.includes('\n') || h.content.includes('def ') || h.content.includes('dist =') ? `
                      <pre class="rounded-lg overflow-x-auto text-xs mt-2"><code class="language-python">${escapeHtml(h.content)}</code></pre>
                    ` : `
                      <p>${h.content}</p>
                    `}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Action Footer -->
      <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
        ${currentRevealedLevel < hintLevels.length ? `
          <button onclick="revealHintLevel(${currentRevealedLevel + 1})" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition">
            <i data-lucide="unlock" class="w-3.5 h-3.5"></i> Next Clue (Level ${currentRevealedLevel + 1})
          </button>
        ` : `
          <div class="text-xs text-emerald-400 flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i> All progressive hints unlocked!
          </div>
        `}
        <button onclick="markProblemSolvedFromSolver(${problem.id})" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition">
          <i data-lucide="check" class="w-3.5 h-3.5"></i> Got It! Mark Solved
        </button>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
  if (window.Prism) window.Prism.highlightAll();
}

function revealHintLevel(level) {
  currentRevealedLevel = level;
  renderProgressiveHints();
}

async function markProblemSolvedFromSolver(problemId) {
  try {
    await fetch(`/api/problems/${problemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        is_solved: true,
        solved_at: new Date().toISOString(),
        user_rating: 4,
        review_needed: false
      })
    });
    console.log("[Asymptote Notification]:", 'Awesome! Problem marked as Solved and logged into your Pattern Tracker!');
    await loadProblems();
    await loadStats();
  } catch (err) {
    console.log("[Asymptote Notification]:", 'Error updating problem: ' + err.message);
  }
}

// ==================== DIAGNOSTIC WIZARD ====================

async function runDiagnosticWizard() {
  const structure = document.getElementById('wiz-structure').value;
  const constraints = document.getElementById('wiz-constraints').value;
  const goal = document.getElementById('wiz-goal').value;
  const property = document.getElementById('wiz-property').value;

  const resultsContainer = document.getElementById('wizard-results');
  resultsContainer.classList.remove('hidden');
  resultsContainer.innerHTML = `<div class="text-center py-6 text-slate-400">Analyzing geometric and algorithmic constraints...</div>`;

  try {
    const res = await fetch('/api/wizard/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structure,
        constraints,
        goal,
        properties: property !== 'none' ? [property] : []
      })
    });

    const data = await res.json();
    const candidates = data.results || [];

    if (!candidates.length) {
      resultsContainer.innerHTML = `<div class="text-slate-400 text-xs py-4 text-center">No clear match. Try relaxing parameters.</div>`;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="space-y-4">
        <h3 class="text-sm font-bold text-white flex items-center gap-2">
          <i data-lucide="target" class="w-4 h-4 text-emerald-400"></i> Top Inferred Pattern Matches
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${candidates.map((c, idx) => `
            <div class="bg-slate-800/80 rounded-2xl border ${idx === 0 ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'border-slate-700'} p-5 space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${idx === 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'}">
                  ${idx === 0 ? '🌟 Highest Match' : 'Alternative Candidate'} (${c.score}% Confidence)
                </span>
                <span class="text-xs text-slate-400 font-medium">${c.pattern?.category || ''}</span>
              </div>
              <h4 class="text-base font-bold text-white">${c.pattern?.title || c.pattern_id}</h4>
              <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">${c.reason}</p>
              ${c.pattern ? `
                <div class="pt-2 flex items-center justify-between border-t border-slate-700/60">
                  <button onclick="viewPatternFromWizard('${c.pattern.id}')" class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                    <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Inspect Blueprint & Twists
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  } catch (err) {
    resultsContainer.innerHTML = `<div class="text-red-400 text-xs py-4 text-center">Diagnostic error: ${err.message}</div>`;
  }
}

function viewPatternFromWizard(patternId) {
  switchTab('atlas');
  const input = document.getElementById('pattern-search');
  if (input) {
    const p = allPatterns.find(item => item.id === patternId);
    input.value = p ? p.title : '';
    filterPatterns();
  }
}

// ==================== SOLVED PROBLEMS TABLE ====================

async function loadProblems() {
  try {
    const res = await fetch('/api/problems');
    allProblems = await res.json();
    renderProblemsTable();
  } catch (err) {
    console.error('Failed to load problems:', err);
  }
}

function populatePatternFilters() {
  const select = document.getElementById('filter-problem-pattern');
  if (!select) return;
  select.innerHTML = '<option value="all">All Patterns</option>' + allPatterns.map(p => `
    <option value="${p.id}">${p.title}</option>
  `).join('');
}

function renderProblemsTable() {
  const patternFilter = document.getElementById('filter-problem-pattern')?.value || 'all';
  const statusFilter = document.getElementById('filter-problem-status')?.value || 'all';
  const diffFilter = document.getElementById('filter-problem-diff')?.value || 'all';

  const tbody = document.getElementById('problems-table-body');
  if (!tbody) return;

  const filtered = allProblems.filter(p => {
    if (patternFilter !== 'all' && p.pattern_id !== patternFilter) return false;
    if (statusFilter === 'solved' && !p.is_solved) return false;
    if (statusFilter === 'unsolved' && p.is_solved) return false;
    if (diffFilter !== 'all' && p.difficulty !== diffFilter) return false;
    return true;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-400">No problems match current filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(pr => {
    const pattern = allPatterns.find(p => p.id === pr.pattern_id);
    const patternTitle = pattern ? pattern.title : (pr.pattern_id || 'Unassigned');

    const starsHtml = [1, 2, 3, 4, 5].map(star => `
      <span class="${star <= (pr.user_rating || 0) ? 'text-amber-400' : 'text-slate-700'}">★</span>
    `).join('');

    return `
      <tr class="hover:bg-slate-800/40 transition">
        <td class="py-3 px-4 font-mono text-slate-400 font-semibold">${pr.frontend_id}</td>
        <td class="py-3 px-4 font-semibold text-white">
          <div class="hover:text-indigo-400 cursor-pointer" onclick="openProblemDetail(${pr.id})">
            ${pr.title}
          </div>
          ${pr.summary ? `<div class="text-xs text-slate-400 font-normal truncate max-w-xs mt-0.5">${pr.summary}</div>` : ''}
        </td>
        <td class="py-3 px-4">
          <span class="text-indigo-300 font-medium block">${patternTitle}</span>
          ${pr.twist_type ? `<span class="text-xs text-amber-400/90 font-mono block mt-0.5">${pr.twist_type}</span>` : ''}
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${
            pr.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
            pr.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
            'bg-rose-500/10 text-rose-400'
          }">${pr.difficulty}</span>
        </td>
        <td class="py-3 px-4">
          ${pr.is_solved ? `
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <i data-lucide="check" class="w-3 h-3"></i> Solved
            </span>
          ` : `
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <i data-lucide="clock" class="w-3 h-3"></i> In Review
            </span>
          `}
        </td>
        <td class="py-3 px-4 text-xs font-mono tracking-tighter">${starsHtml}</td>
        <td class="py-3 px-4 text-right space-x-2">
          <button onclick="openProblemDetail(${pr.id})" class="text-slate-400 hover:text-white" title="View details & notes">
            <i data-lucide="edit-3" class="w-4 h-4 inline"></i>
          </button>
          <button onclick="loadHintsForProblem('${pr.frontend_id}')" class="text-indigo-400 hover:text-indigo-300" title="Progressive Clues">
            <i data-lucide="sparkles" class="w-4 h-4 inline"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function loadHintsForProblem(frontendId) {
  switchTab('stuck');
  document.getElementById('stuck-problem-input').value = frontendId;
  lookupProblemHints();
}

// ==================== PROBLEM DETAIL MODAL ====================

function openProblemDetail(id) {
  const prob = allProblems.find(p => p.id === id);
  if (!prob) return;
  currentProblemDetail = prob;

  document.getElementById('detail-prob-id').innerText = `#${prob.frontend_id}`;
  document.getElementById('detail-prob-title').innerText = prob.title;
  document.getElementById('detail-prob-twist').innerText = prob.twist_type || 'Standard Pattern Blueprint';
  document.getElementById('detail-prob-notes').value = prob.user_notes || '';
  document.getElementById('detail-prob-code').innerText = prob.user_code || prob.solution_python || '# No code stored yet';

  const btnSolved = document.getElementById('detail-prob-btn-solved');
  if (prob.is_solved) {
    btnSolved.innerText = 'Mark Unsolved';
    btnSolved.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 border border-slate-700';
  } else {
    btnSolved.innerText = 'Mark Solved';
    btnSolved.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30';
  }

  // Star Rating Picker
  renderRatingPicker(prob.user_rating || 0);

  document.getElementById('modal-problem-detail').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
  if (window.Prism) window.Prism.highlightAll();
}

function renderRatingPicker(currentRating) {
  const container = document.getElementById('detail-prob-rating-picker');
  container.innerHTML = [1, 2, 3, 4, 5].map(val => `
    <button type="button" onclick="setDetailRating(${val})" class="text-xl hover:scale-120 transition ${val <= currentRating ? 'text-amber-400' : 'text-slate-600'}">
      ★
    </button>
  `).join('');
}

function setDetailRating(val) {
  if (currentProblemDetail) {
    currentProblemDetail.user_rating = val;
    renderRatingPicker(val);
  }
}

function toggleProblemSolvedFromDetail() {
  if (!currentProblemDetail) return;
  currentProblemDetail.is_solved = !currentProblemDetail.is_solved;
  const btnSolved = document.getElementById('detail-prob-btn-solved');
  if (currentProblemDetail.is_solved) {
    btnSolved.innerText = 'Mark Unsolved';
    btnSolved.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 border border-slate-700';
  } else {
    btnSolved.innerText = 'Mark Solved';
    btnSolved.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30';
  }
}

async function saveProblemDetailEdits() {
  if (!currentProblemDetail) return;
  const notes = document.getElementById('detail-prob-notes').value;

  try {
    await fetch(`/api/problems/${currentProblemDetail.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        is_solved: currentProblemDetail.is_solved,
        user_notes: notes,
        user_rating: currentProblemDetail.user_rating || 0
      })
    });
    closeProblemDetailModal();
    await loadProblems();
    await loadStats();
  } catch (err) {
    console.log("[Asymptote Notification]:", 'Failed to save changes: ' + err.message);
  }
}

function closeProblemDetailModal() {
  document.getElementById('modal-problem-detail').classList.add('hidden');
}

// ==================== MASTERY RADAR & STATS ====================

async function loadStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();

    document.getElementById('stat-solved-count').innerText = data.solvedCount || 0;
    document.getElementById('stat-solved-sub').innerText = `Out of ${data.totalProblems} tracked questions`;

    const activePatternsWithSolved = (data.patternDistribution || []).filter(p => p.solved_problems > 0).length;
    const totalPatterns = (data.patternDistribution || []).length;
    const ratio = totalPatterns ? Math.round((activePatternsWithSolved / totalPatterns) * 100) : 0;

    document.getElementById('stat-coverage-ratio').innerText = `${ratio}%`;
    document.getElementById('stat-weak-count').innerText = (data.weakSpots || []).length;

    // Render Weak Spots
    const weakList = document.getElementById('weak-spots-list');
    if (weakList) {
      if (!data.weakSpots || !data.weakSpots.length) {
        weakList.innerHTML = `<div class="col-span-2 text-xs text-slate-400">Great job! All patterns have active solved coverage.</div>`;
      } else {
        weakList.innerHTML = data.weakSpots.map(w => `
          <div class="bg-slate-800/80 p-4 rounded-xl border border-amber-500/20 space-y-2 flex items-center justify-between">
            <div>
              <span class="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">${w.category}</span>
              <h4 class="text-sm font-bold text-white mt-0.5">${w.pattern_title}</h4>
              <p class="text-xs text-slate-400 mt-0.5">
                ${w.solved_problems} solved / ${w.total_problems} problems logged
              </p>
            </div>
            <button onclick="jumpToPatternProblems('${w.pattern_id}')" class="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-lg transition">
              Practice
            </button>
          </div>
        `).join('');
      }
    }

    // Render Progress Bars
    const barsContainer = document.getElementById('mastery-bars-container');
    if (barsContainer) {
      barsContainer.innerHTML = (data.patternDistribution || []).map(p => {
        const solved = p.solved_problems || 0;
        const total = Math.max(1, p.total_problems);
        const pct = Math.min(100, Math.round((solved / total) * 100));

        return `
          <div class="space-y-1 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-medium text-slate-200">${p.pattern_title} <span class="text-slate-500 text-xs">(${p.category})</span></span>
              <span class="font-mono text-slate-400">${solved} / ${p.total_problems} solved</span>
            </div>
            <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500 ${
                pct >= 80 ? 'bg-emerald-500' :
                pct >= 40 ? 'bg-indigo-500' :
                pct > 0 ? 'bg-amber-500' : 'bg-slate-700'
              }" style="width: ${Math.max(5, pct)}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

// ==================== SYNC MODAL ====================

function openSyncModal() {
  document.getElementById('modal-sync').classList.remove('hidden');
}
function closeSyncModal() {
  document.getElementById('modal-sync').classList.add('hidden');
}

function openExtensionGuideModal() {
  document.getElementById('modal-extension-guide').classList.remove('hidden');
}
function closeExtensionGuideModal() {
  document.getElementById('modal-extension-guide').classList.add('hidden');
}

async function triggerLeetCodeSync() {
  const username = document.getElementById('sync-username-input').value.trim();
  const statusEl = document.getElementById('sync-status-msg');
  const btn = document.getElementById('btn-do-sync');

  if (!username) {
    console.log("[Asymptote Notification]:", 'Please enter your LeetCode username');
    return;
  }

  statusEl.className = 'text-xs p-3 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 block';
  statusEl.innerText = `Connecting to LeetCode GraphQL and syncing solved submissions for ${username}...`;
  btn.disabled = true;

  try {
    const res = await fetch('/api/sync/leetcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, limit: 20 })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Sync failed');

    statusEl.className = 'text-xs p-3 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 block';
    statusEl.innerText = `Success! Synced ${data.newlySynced} new problems, updated ${data.updatedCount}.`;
    await loadProblems();
    await loadStats();
    setTimeout(closeSyncModal, 1800);
  } catch (err) {
    statusEl.className = 'text-xs p-3 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 block';
    statusEl.innerText = err.message;
  } finally {
    btn.disabled = false;
  }
}

function fillBlind75Sample() {
  const el = document.getElementById('quick-import-input');
  if (el) {
    el.value = '1, 15, 20, 21, 53, 70, 121, 141, 198, 206, 217, 238, 242, 300, 322, 329, 347, 416, 560, 739, 787, 834, 847, 1011, 1368';
  }
}

async function importQuickProblemsList() {
  const input = document.getElementById('quick-import-input').value.trim();
  const statusEl = document.getElementById('sync-status-msg');

  if (!input) {
    console.log("[Asymptote Notification]:", 'Please enter at least one problem number or slug');
    return;
  }

  // Parse comma, space, or newline separated values
  const tokens = input.split(/[\s,]+/).map(t => t.trim()).filter(Boolean);
  if (!tokens.length) return;

  statusEl.className = 'text-xs p-3 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 block';
  statusEl.innerText = `Importing and classifying ${tokens.length} problems into pattern archetypes...`;

  const problemList = tokens.map(token => {
    const isNum = /^\d+$/.test(token);
    return {
      frontend_id: isNum ? token : '',
      title_slug: isNum ? `problem-${token}` : token,
      title: isNum ? `LeetCode #${token}` : token.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      difficulty: 'Medium'
    };
  });

  try {
    const res = await fetch('/api/sync/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'QuickImport',
        problems: problemList
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Import failed');

    statusEl.className = 'text-xs p-3 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 block';
    statusEl.innerText = `Success! Imported ${data.newlySynced} new problems, updated ${data.updatedCount}.`;
    await loadProblems();
    await loadStats();
    setTimeout(closeSyncModal, 1800);
  } catch (err) {
    statusEl.className = 'text-xs p-3 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 block';
    statusEl.innerText = err.message;
  }
}

// ==================== HELPERS ====================

function copyCode(btn) {
  const pre = btn.closest('div').nextElementSibling;
  const code = pre.querySelector('code')?.innerText || '';
  navigator.clipboard.writeText(code).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Copied!</span>';
    setTimeout(() => { btn.innerHTML = orig; }, 1500);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
