import { useState, useEffect, useMemo } from 'react';
import { Copy, Check, HelpCircle, Sparkles } from 'lucide-react';
import { Card } from './Card';
import { Chip } from './Chip';
import { useToast } from './Toast';
import {
  getSupportedLanguagesForProblem,
  getProblemSolutionCode
} from '../lib/codeTemplates';
import { fetchProblemHints } from '../lib/engineClient';
import { explainSolutionWithNano } from '../lib/nano-ai';

const GENERIC_HINT_TITLES = {
  1: 'Recognize the obstacle',
  2: 'Identify the core insight',
  3: 'Outline the procedure',
  4: 'See the blueprint'
};

const DEFAULT_RECENT_PROBLEMS = [
  { id: '1', title: '#1 Two Sum', slug: 'two-sum' },
  { id: '175', title: '#175 Combine Two Tables', slug: 'combine-two-tables' },
  { id: '787', title: '#787 Cheapest Flights', slug: 'cheapest-flights-within-k-stops' },
  { id: '329', title: '#329 Longest Path', slug: 'longest-increasing-path-in-a-matrix' },
  { id: '312', title: '#312 Burst Balloons', slug: 'burst-balloons' },
];

const STORAGE_KEY_RECENT_PROBLEMS = 'asymptote:recent_solver_queries';

export function SocraticSolver({ initialProblemQuery, problems = [] }) {
  const { addToast: _addToast } = useToast();
  const [recentProblems, setRecentProblems] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_KEY_RECENT_PROBLEMS);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_RECENT_PROBLEMS;
  });
  const [query, setQuery] = useState(() => {
    if (initialProblemQuery) return initialProblemQuery;
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('q');
      if (q) return q;
    }
    return '787';
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [revealedLevel, setRevealedLevel] = useState(1);
  const [error, setError] = useState(null);
  const [solverLang, setSolverLang] = useState('python3');
  const [codeCopied, setCodeCopied] = useState(false);
  const [nanoMode, setNanoMode] = useState('intuition');
  const [nanoOutput, setNanoOutput] = useState(null);
  const [nanoLoading, setNanoLoading] = useState(false);
  const [nanoProvider, setNanoProvider] = useState(null);

  const isVerified = Boolean(data?.problem?.verified === 1 || data?.problem?.verified === true);
  const isProblemSolved = useMemo(() => {
    if (data?.problem?.is_solved) return true;
    if (!data?.problem || !Array.isArray(problems) || problems.length === 0) return false;
    const match = problems.find(p => 
      (p.slug && p.slug === data.problem.slug) ||
      (data.problem.number && p.number === data.problem.number) ||
      (data.problem.frontend_id && String(p.frontend_id) === String(data.problem.frontend_id))
    );
    return Boolean(match?.is_solved);
  }, [data, problems]);

  const supportedLangs = useMemo(() => {
    if (Array.isArray(data?.supported_languages) && data.supported_languages.length > 0) {
      return data.supported_languages;
    }
    return getSupportedLanguagesForProblem(data?.problem);
  }, [data]);

  useEffect(() => {
    if (supportedLangs && supportedLangs.length > 0) {
      const primaryLang = data?.problem?.solutions?.[0]?.lang || 
        (data?.problem?.category === 'Database' ? 'mysql' : 
         data?.problem?.category === 'pandas' ? 'pythondata' : 
         data?.problem?.category === 'Shell' ? 'bash' : 
         data?.problem?.category === 'JavaScript' ? 'javascript' : 'python3');

      if (!supportedLangs.some(l => l.id === solverLang)) {
        const fallback = supportedLangs.some(l => l.id === primaryLang) ? primaryLang : supportedLangs[0].id;
        setSolverLang(fallback);
      }
    }
  }, [supportedLangs, data, solverLang]);

  const loadProblemHints = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    setNanoOutput(null);
    setNanoLoading(false);
    try {
      const json = await fetchProblemHints(searchQuery);
      if (!json || !json.problem) {
        throw new Error(`Problem "${searchQuery}" not found. Try searching by number (e.g. 787) or title slug.`);
      }
      setData(json);
      setRevealedLevel(1);
      const primaryLang = json?.problem?.solutions?.[0]?.lang || 
        (json?.problem?.category === 'Database' ? 'mysql' : 
         json?.problem?.category === 'pandas' ? 'pythondata' : 
         json?.problem?.category === 'Shell' ? 'bash' : 
         json?.problem?.category === 'JavaScript' ? 'javascript' : 'python3');
      setSolverLang(primaryLang);

      // Update recents list with this resolved problem
      const probNum = String(json.problem.frontend_id || json.problem.id || searchQuery);
      const rawTitle = json.problem.title || `Problem #${probNum}`;
      const shortTitle = `#${probNum} ${rawTitle.length > 20 ? rawTitle.slice(0, 19) + '…' : rawTitle}`;
      const probSlug = json.problem.slug || searchQuery;
      const newEntry = { id: probNum, title: shortTitle, slug: probSlug };

      setRecentProblems(prev => {
        const filtered = prev.filter(p => p.id !== probNum && p.slug !== probSlug);
        const updated = [newEntry, ...filtered].slice(0, 6);
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(STORAGE_KEY_RECENT_PROBLEMS, JSON.stringify(updated));
          }
        } catch {
          // ignore
        }
        return updated;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const targetQ = initialProblemQuery || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('q') : null);
    if (targetQ) {
      setQuery(targetQ);
      loadProblemHints(targetQ);
    } else {
      loadProblemHints('787');
    }
  }, [initialProblemQuery]);

  const totalHints = data?.hints?.length || 4;

  const scrollToHintOrNextAction = (level) => {
    // If there is a next locked hint, scroll so its unlock button is brought into viewport;
    // otherwise scroll to reveal the current hint or solution blueprint.
    const nextLevel = level < totalHints ? level + 1 : level;
    const targetEl = document.getElementById(`hint-row-${nextLevel}`) || document.getElementById(`hint-row-${level}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const unlockLevel = (level) => {
    const nextRevealed = Math.max(revealedLevel, level);
    setRevealedLevel(nextRevealed);
    setTimeout(() => {
      scrollToHintOrNextAction(nextRevealed);
    }, 120);
  };

  // Keyboard shortcut: Keys 1-4 reveal clue levels
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key) && data && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const level = parseInt(e.key, 10);
        if (level <= totalHints) {
          unlockLevel(level);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, totalHints, revealedLevel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadProblemHints(query);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-heading text-[32px] font-bold text-[#1e2033] leading-tight">
          Solver
        </h1>
        <p className="text-[16px] text-[#475569] mt-1">
          Enter a problem and unlock hints one at a time, without seeing the answer.
        </p>
      </div>

      {/* Card 1: Problem number or name field + primary Get hints button, then recent problems as neutral chips */}
      <Card className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Problem number or slug (e.g. 787 or cheapest-flights-within-k-stops)"
            aria-label="Problem number or name"
            className="asymptote-input flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary !py-2.5 !px-5"
          >
            {loading ? 'Loading...' : 'Get hints'}
          </button>
        </form>

        {/* Recent problems as neutral chips */}
        {recentProblems && recentProblems.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[13px] text-[#64748b]">Recent:</span>
            {recentProblems.map((prob) => {
              const targetKey = prob.slug || prob.id;
              return (
                <button
                  key={prob.id || prob.slug}
                  type="button"
                  onClick={() => {
                    setQuery(targetKey);
                    loadProblemHints(targetKey);
                  }}
                  className="chip hover:border-[#cbd5e1] hover:text-[#1e2033] cursor-pointer transition-colors"
                >
                  {prob.title}
                </button>
              );
            })}
          </div>
        )}
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-[#fda4af] bg-[#fff1f2] text-[#9f1239] text-[14px]">
          {error}
        </Card>
      )}

      {/* When data loaded */}
      {data && data.problem && (
        <>
          {/* Card 2: Problem Header: "#787 Cheapest Flights Within K Stops" (22px Space Grotesk), difficulty chip, pattern chip, status chip */}
          <Card className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading text-[22px] font-bold text-[#1e2033] tracking-tight">
                #{data.problem.frontend_id || data.problem.id} {data.problem.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Chip variant={(data.problem.difficulty || 'medium').toLowerCase()}>
                {data.problem.difficulty}
              </Chip>
              <Chip variant="neutral">
                {data.problem.category || 'Algorithms'}
              </Chip>
              {isVerified && (
                <Chip variant="neutral">
                  {data.pattern?.title || 'Algorithmic Pattern'}
                </Chip>
              )}
              {isVerified && (
                <span className="chip text-[12px] font-semibold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                  {(data.problem.verification_tier || data.problem.review?.status) === 'reviewed' ? 'Reviewed' : 'Tested'}
                </span>
              )}
              <Chip variant={isProblemSolved ? 'solved' : 'unsolved'}>
                {isProblemSolved ? 'Solved' : 'Unsolved'}
              </Chip>
            </div>
          </Card>

          {/* Complexity budget card if verified and present */}
          {isVerified && data.complexity && (
            <Card className="space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#e2e8f0]">
                <h3 className="font-heading text-[18px] font-bold text-[#1e2033]">
                  Complexity budget
                </h3>
                <span className="text-[12px] font-medium text-[#64748b] bg-[#f1f5f9] px-2.5 py-0.5 rounded-full border border-[#e2e8f0]">
                  {data.complexity.kind === 'query-notes' ? 'SQL Query Notes' : data.complexity.kind === 'none' ? 'Concurrency Coordination' : 'Big-O Analysis'}
                </span>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3">
                  <div className="text-[12px] font-medium text-[#64748b]">
                    {data.complexity.kind === 'query-notes' ? 'Execution / Cost' : data.complexity.kind === 'none' ? 'Coordination' : 'Target time'}
                  </div>
                  <div className="font-mono text-[16px] font-bold text-[#1e2033] mt-1">
                    {data.complexity.kind === 'none' ? 'Synchronized' : (data.complexity.targetTime || data.complexity.time || 'O(N)')}
                  </div>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3">
                  <div className="text-[12px] font-medium text-[#64748b]">
                    {data.complexity.kind === 'none' ? 'Space overhead' : 'Auxiliary memory'}
                  </div>
                  <div className="font-mono text-[16px] font-bold text-[#1e2033] mt-1">
                    {data.complexity.targetSpace || data.complexity.space || 'O(1)'}
                  </div>
                </div>
              </div>

              {Array.isArray(data.complexity.variables) && data.complexity.variables.length > 0 && (
                <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] text-[13px] text-[#475569]">
                  <strong className="text-[#1e2033]">Variables:</strong> {data.complexity.variables.join('; ')}
                </div>
              )}

              {data.complexity.notes && (
                <div className="text-[13px] text-[#475569] leading-relaxed">
                  <strong className="text-[#1e2033] font-semibold">Overview: </strong>{data.complexity.notes}
                </div>
              )}

              {/* 3-Part Structured Complexity Panels */}
              <div className="space-y-3 pt-1">
                {/* Panel 1: Why Naive Fails (rose alert style) */}
                <div className="p-3.5 bg-[#fff1f2] border border-[#fecdd3] rounded-lg text-[13px] text-[#9f1239] leading-relaxed">
                  <strong className="block mb-1 font-bold text-[13px]">
                    {data.complexity.kind === 'query-notes'
                      ? 'Why Naive Fails / Query Bottlenecks'
                      : data.complexity.kind === 'none'
                      ? 'Why Naive Fails / Concurrency Hazards'
                      : 'Why Naive Fails / Operations Budget'}
                  </strong>
                  {data.complexity.whyNaiveFails || data.complexity.opsBudgetExplanation || data.complexity.notes}
                </div>

                {/* Panel 2: Space-Time Tradeoff */}
                <div className="p-3.5 bg-white border border-[#e2e8f0] rounded-lg text-[13px] text-[#334155] leading-relaxed shadow-sm">
                  <strong className="block mb-1 font-bold text-[13px] text-[#1e2033]">
                    {data.complexity.kind === 'none' ? 'Coordination & Memory Tradeoff' : 'Space-Time Tradeoff'}
                  </strong>
                  {data.complexity.spaceTimeTradeoff || 'Minimal auxiliary space used.'}
                </div>

                {/* Panel 3: What Interviewers Look For */}
                <div className="p-3.5 bg-white border border-[#e2e8f0] rounded-lg text-[13px] text-[#334155] leading-relaxed shadow-sm">
                  <strong className="block mb-1 font-bold text-[13px] text-[#1e2033]">
                    What Interviewers Look For
                  </strong>
                  {data.complexity.interviewerExpectation || 'Articulate edge cases and invariant bounds clearly.'}
                </div>
              </div>
            </Card>
          )}

          {/* If NOT verified: Show clean unverified state */}
          {!isVerified ? (
            <Card className="text-center py-12 px-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-xl bg-[#f1f5f9] flex items-center justify-center text-[#64748b]">
                <HelpCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="font-heading text-[22px] font-bold text-[#1e2033]">
                  No verified hints yet
                </h3>
                <p className="text-[15px] text-[#475569] leading-relaxed">
                  We have not written verified hints or solutions for this problem yet. Run the Diagnostic Wizard to deduce its algorithmic invariants.
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <span className="chip text-[12px] font-medium text-[#475569] bg-white border border-[#cbd5e1]">
                  {data.problem?.category || 'Algorithms'}
                </span>
              </div>
            </Card>
          ) : (
            /* Card 3: Hints with "1 of 4 unlocked" at right */
            <Card className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="font-heading text-[18px] font-bold text-[#1e2033]">
                  Hints
                </h3>
                <span className="text-[14px] text-[#64748b]">
                  {revealedLevel} of {totalHints} unlocked
                </span>
              </div>

              {/* Four rows: L1-L4 with generic titles when locked, real titles when unlocked */}
              <div className="space-y-3">
                {[1, 2, 3, 4].map((level) => {
                  const isUnlocked = level <= revealedLevel;
                  const rawHint = data.hints && data.hints[level - 1];
                  const genericTitle = rawHint?.genericTitle || GENERIC_HINT_TITLES[level] || `Hint ${level}`;
                  const realTitle = rawHint?.realTitle || rawHint?.title || genericTitle;
                  const title = isUnlocked ? realTitle : genericTitle;

                  if (!isUnlocked) {
                    return (
                      <div 
                        key={level} 
                        id={`hint-row-${level}`}
                        className="bg-white border border-[#e2e8f0] rounded-[10px] px-5 py-3.5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="bg-[#e2e8f0] text-[#475569] text-[12px] font-bold px-2.5 py-0.5 rounded-md leading-none">
                            L{level}
                          </span>
                          <span className="text-[15px] font-medium text-[#475569]">
                            {title}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => unlockLevel(level)}
                          className="btn-hint"
                        >
                          Unlock
                        </button>
                      </div>
                    );
                  }

                  // Unlocked row style: #f0fdf4 background, #a7f3d0 border, level badge in slate with white text, title, clue text 15px
                  if (level === 4) {
                    const code = getProblemSolutionCode(data.problem, solverLang);

                    return (
                      <div 
                        key={level} 
                        id={`hint-row-${level}`}
                        className="bg-[#f0fdf4] border border-[#a7f3d0] rounded-[10px] p-[18px] space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="bg-[#1e2033] text-white text-[12px] font-bold px-2.5 py-0.5 rounded-md leading-none">
                            L{level}
                          </span>
                          <h4 className="font-heading text-[16px] font-bold text-[#1e2033]">
                            {title}
                          </h4>
                        </div>

                        {/* Code container with multi-language tabs */}
                        <div className="bg-white p-4 rounded-lg border border-[#a7f3d0] space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {supportedLangs.length === 0 ? (
                                <span className="text-[12px] text-[#64748b] italic">Loading languages...</span>
                              ) : (
                                supportedLangs.map((lang) => (
                                  <button
                                    key={lang.id}
                                    type="button"
                                    onClick={() => setSolverLang(lang.id)}
                                    className={`px-2.5 py-1 rounded-md text-[13px] font-medium transition-colors ${
                                      solverLang === lang.id
                                        ? 'bg-[#1e2033] text-white font-bold'
                                        : 'text-[#475569] hover:text-[#1e2033] bg-[#f8fafc] border border-[#e2e8f0]'
                                    }`}
                                  >
                                    {lang.name}
                                  </button>
                                ))
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyCode(code)}
                              className="btn-secondary !py-1 !px-2.5 !text-[13px]"
                            >
                              {codeCopied ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{codeCopied ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <pre className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-lg p-4 font-mono text-[13px] text-[#1e2033] leading-relaxed overflow-x-auto whitespace-pre">
                            <code>{code}</code>
                          </pre>

                          {/* AI Solution Mentor (Gemini Nano) Card */}
                          <div className="bg-white border border-[#cbd5e1] rounded-lg p-4 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#10b981]" />
                                <span className="font-heading text-[14px] font-bold text-[#1e2033]">
                                  AI Solution Mentor
                                </span>
                              </div>
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                                {nanoProvider === 'gemini-nano' ? 'Gemini Nano (On-device)' : 'On-Device AI'}
                              </span>
                            </div>

                            {/* Mode Selector */}
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => { setNanoMode('intuition'); setNanoOutput(null); }}
                                className={`px-3 py-1 rounded-md text-[13px] font-medium transition-colors ${
                                  nanoMode === 'intuition'
                                    ? 'bg-[#1e2033] text-white font-bold'
                                    : 'bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:text-[#1e2033]'
                                }`}
                              >
                                Intuition
                              </button>
                              <button
                                type="button"
                                onClick={() => { setNanoMode('walkthrough'); setNanoOutput(null); }}
                                className={`px-3 py-1 rounded-md text-[13px] font-medium transition-colors ${
                                  nanoMode === 'walkthrough'
                                    ? 'bg-[#1e2033] text-white font-bold'
                                    : 'bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:text-[#1e2033]'
                                }`}
                              >
                                Code Walkthrough
                              </button>
                              <button
                                type="button"
                                onClick={() => { setNanoMode('edge_cases'); setNanoOutput(null); }}
                                className={`px-3 py-1 rounded-md text-[13px] font-medium transition-colors ${
                                  nanoMode === 'edge_cases'
                                    ? 'bg-[#1e2033] text-white font-bold'
                                    : 'bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:text-[#1e2033]'
                                }`}
                              >
                                Edge Cases
                              </button>
                            </div>

                            {/* Output or Generate Action */}
                            {nanoLoading ? (
                              <div className="text-center py-4 text-[13px] text-[#64748b]">
                                ⏳ Generating on-device explanation with Gemini Nano...
                              </div>
                            ) : nanoOutput ? (
                              <div className="space-y-3">
                                <div className="text-[13px] text-[#334155] leading-relaxed whitespace-pre-wrap bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3.5">
                                  {nanoOutput}
                                </div>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    setNanoLoading(true);
                                    try {
                                      const res = await explainSolutionWithNano({
                                        problem: data.problem,
                                        pattern: data.pattern,
                                        code,
                                        lang: solverLang,
                                        mode: nanoMode
                                      });
                                      setNanoOutput(res.text);
                                      setNanoProvider(res.provider);
                                    } catch (err) {
                                      setNanoOutput('Error: ' + err.message);
                                    } finally {
                                      setNanoLoading(false);
                                    }
                                  }}
                                  className="btn-secondary !py-1 !px-3 !text-[12px]"
                                >
                                  Regenerate explanation
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={async () => {
                                  setNanoLoading(true);
                                  try {
                                    const res = await explainSolutionWithNano({
                                      problem: data.problem,
                                      pattern: data.pattern,
                                      code,
                                      lang: solverLang,
                                      mode: nanoMode
                                    });
                                    setNanoOutput(res.text);
                                    setNanoProvider(res.provider);
                                  } catch (err) {
                                    setNanoOutput('Error: ' + err.message);
                                  } finally {
                                    setNanoLoading(false);
                                  }
                                }}
                                className="btn-amber-reveal !py-2 !px-4 !text-[13px] !w-auto"
                              >
                                Explain with Local AI (Gemini Nano)
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Levels 1, 2, 3
                  return (
                    <div 
                      key={level} 
                      id={`hint-row-${level}`}
                      className="bg-[#f0fdf4] border border-[#a7f3d0] rounded-[10px] p-[18px] space-y-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="bg-[#1e2033] text-white text-[12px] font-bold px-2.5 py-0.5 rounded-md leading-none">
                          L{level}
                        </span>
                        <h4 className="font-heading text-[16px] font-bold text-[#1e2033]">
                          {title}
                        </h4>
                      </div>

                      <p className="text-[15px] text-[#334155] leading-relaxed whitespace-pre-wrap">
                        {rawHint?.content || 'Analyze constraints and invariant relationships.'}
                      </p>

                      {/* Level 3: Show Pattern variation / twist if present */}
                      {level === 3 && data.problem.twist_type && (
                        <div className="p-3 bg-white rounded-lg border border-[#a7f3d0] text-[14px] mt-2">
                          <span className="font-bold text-[#b45309] block mb-0.5">
                            Pattern variation
                          </span>
                          <span className="text-[#334155]">{data.problem.twist_type}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
