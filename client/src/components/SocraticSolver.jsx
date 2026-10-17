import React, { useState, useEffect, useMemo } from 'react';
import { Copy, Check, HelpCircle } from 'lucide-react';
import { Card } from './Card';
import { Chip } from './Chip';
import { HintRow } from './HintRow';
import { useToast } from './Toast';
import { SHOW_HEURISTIC_PATTERNS, getSupportedLanguagesForProblem, getProblemSolutionCode } from '../lib/codeTemplates';

const HINT_TITLES = {
  1: 'Recognize the pattern',
  2: 'Define the state',
  3: 'Write the transition',
  4: 'See the blueprint'
};

const RECENT_PROBLEMS = [
  { id: '1', title: '#1 Two Sum' },
  { id: '175', title: '#175 Combine Two Tables' },
  { id: '787', title: '#787 Cheapest Flights' },
  { id: '329', title: '#329 Longest Path' },
  { id: '312', title: '#312 Burst Balloons' },
];

export function SocraticSolver({ initialProblemQuery }) {
  const { addToast } = useToast();
  const [query, setQuery] = useState(initialProblemQuery || '787');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [revealedLevel, setRevealedLevel] = useState(1);
  const [error, setError] = useState(null);
  const [solverLang, setSolverLang] = useState('python3');
  const [codeCopied, setCodeCopied] = useState(false);

  const isVerified = Boolean(data?.problem?.verified === 1 || data?.problem?.verified === true);
  const supportedLangs = useMemo(() => {
    return getSupportedLanguagesForProblem(data?.problem);
  }, [data?.problem]);

  useEffect(() => {
    if (supportedLangs && supportedLangs.length > 0) {
      if (!supportedLangs.some(l => l.id === solverLang)) {
        setSolverLang(supportedLangs[0].id);
      }
    }
  }, [supportedLangs, solverLang]);

  const fetchProblemHints = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/hints/${encodeURIComponent(searchQuery)}`);
      if (!res.ok) {
        throw new Error(`Problem "${searchQuery}" not found. Try searching by number (e.g. 787) or title slug.`);
      }
      const json = await res.json();
      setData(json);
      setRevealedLevel(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialProblemQuery) {
      setQuery(initialProblemQuery);
      fetchProblemHints(initialProblemQuery);
    } else {
      fetchProblemHints('787');
    }
  }, [initialProblemQuery]);

  // Keyboard shortcut: Keys 1-4 reveal clue levels
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key) && data && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const level = parseInt(e.key, 10);
        if (level <= (data.hints?.length || 4)) {
          setRevealedLevel(level);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProblemHints(query);
  };

  const unlockLevel = (level) => {
    setRevealedLevel(Math.max(revealedLevel, level));
    setTimeout(() => {
      const el = document.getElementById(`hint-row-${level}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const totalHints = data?.hints?.length || 4;

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
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[13px] text-[#64748b]">Recent:</span>
          {RECENT_PROBLEMS.map((prob) => (
            <button
              key={prob.id}
              type="button"
              onClick={() => {
                setQuery(prob.id);
                fetchProblemHints(prob.id);
              }}
              className="chip hover:border-[#cbd5e1] hover:text-[#1e2033] cursor-pointer transition-colors"
            >
              {prob.title}
            </button>
          ))}
        </div>
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
              {isVerified ? (
                <Chip variant="neutral">
                  {data.pattern?.title || 'Algorithmic Pattern'}
                </Chip>
              ) : (SHOW_HEURISTIC_PATTERNS && data.suggested_pattern) ? (
                <Chip variant="neutral">
                  Suggested pattern: {data.suggested_pattern.title} (unverified)
                </Chip>
              ) : null}
              <Chip variant={data.problem.is_solved ? 'solved' : 'unsolved'}>
                {data.problem.is_solved ? 'Solved' : 'Unsolved'}
              </Chip>
            </div>
          </Card>

          {/* If NOT verified: Show empty-state pattern tile from spec 8.3 */}
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
                  We have not written verified hints for this problem yet.
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <span className="chip text-[12px] font-medium text-[#475569] bg-white border border-[#cbd5e1]">
                  {data.problem.category || 'Algorithms'}
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

              {/* Four rows: L1 Recognize the pattern, L2 Define the state, L3 Write the transition, L4 See the blueprint */}
              <div className="space-y-3">
                {[1, 2, 3, 4].map((level) => {
                  const isUnlocked = level <= revealedLevel;
                  const title = HINT_TITLES[level] || `Hint ${level}`;
                  const rawHint = data.hints && data.hints[level - 1];

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
