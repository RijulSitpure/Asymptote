import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Search, Sparkles, Lightbulb, AlertTriangle, ArrowRight, Lock, Unlock } from 'lucide-react';
import { cn } from '../lib/utils';

export function SocraticSolver({ initialProblemQuery }) {
  const [query, setQuery] = useState(initialProblemQuery || '787');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [revealedLevel, setRevealedLevel] = useState(1);
  const [error, setError] = useState(null);

  const fetchProblemHints = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/hints/${encodeURIComponent(searchQuery)}`);
      if (!res.ok) {
        throw new Error(`Problem "${searchQuery}" not found`);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProblemHints(query);
  };

  const sampleProblems = [
    { id: '1', title: '#1 Two Sum' },
    { id: '787', title: '#787 Cheapest Flights' },
    { id: '329', title: '#329 Longest Path' },
    { id: '847', title: '#847 Visiting All Nodes' },
    { id: '312', title: '#312 Burst Balloons' },
  ];

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="sarvam-card p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#646e82] uppercase tracking-wider">
            Zero-Spoiler Socratic Method
          </span>
          <h2 className="text-2xl font-extrabold text-[#1e2033] tracking-tight">Solver</h2>
          <p className="text-xs text-[#646e82] max-w-xl">
            Derive target Big-O bounds and reveal algorithmic clues step-by-step without spoiling the answer.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#a0a8b7] absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter problem number or title (e.g. 787, 329, two sum)..."
              className="w-full bg-[#f8f9fc] border border-[#eef0f4] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#1e2033] placeholder-[#a0a8b7] focus:outline-none focus:border-[#1e2033] focus:bg-white font-mono transition-all"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="sarvam-btn-primary w-full sm:w-auto px-6 py-2.5 text-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loading ? 'Analyzing...' : 'Get Clues'}</span>
          </button>
        </form>

        {/* Quick Sample Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-[#a0a8b7]">Try:</span>
          {sampleProblems.map(p => (
            <button
              key={p.id}
              onClick={() => { setQuery(p.id); fetchProblemHints(p.id); }}
              className="px-3 py-1 rounded-full bg-[#f8f9fc] hover:bg-[#f1f3f7] text-[#1e2033] border border-[#eef0f4] text-[11px] font-medium transition-all"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Results Container */}
      {data && (
        <div className="space-y-6">
          {/* Problem Header Info */}
          <div className="sarvam-card p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold font-mono text-[#1e2033]">#{data.problem.frontend_id || data.problem.id}</span>
              <h3 className="text-base font-bold text-[#1e2033]">{data.problem.title}</h3>
              <span className={cn(
                "text-[10px] font-semibold px-2.5 py-0.5 rounded-full",
                data.problem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                data.problem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                'bg-rose-50 text-rose-700'
              )}>
                {data.problem.difficulty}
              </span>
            </div>
            <span className="text-xs font-medium text-[#1e2033] bg-[#f8f9fc] border border-[#eef0f4] px-3 py-1 rounded-full">
              {data.pattern?.title || 'Algorithmic Pattern'}
            </span>
          </div>

          {/* 1. Target Complexity Card */}
          {data.complexity && (
            <div className="sarvam-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#f4f5f8] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e2033] flex items-center gap-1.5">
                  <span>🎯</span> Target Complexity
                </span>
                <span className="text-xs font-mono text-[#646e82]">{data.complexity.boundsSummary}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#f8f9fc] p-4 rounded-xl border border-[#eef0f4]">
                  <span className="text-[11px] text-[#646e82] uppercase tracking-wider block font-medium">Target Time Bound</span>
                  <span className="text-sm font-bold font-mono text-[#1e2033] mt-1 block">{data.complexity.targetTime}</span>
                </div>
                <div className="bg-[#f8f9fc] p-4 rounded-xl border border-[#eef0f4]">
                  <span className="text-[11px] text-[#646e82] uppercase tracking-wider block font-medium">Target Space Bound</span>
                  <span className="text-sm font-bold font-mono text-[#1e2033] mt-1 block">{data.complexity.targetSpace}</span>
                </div>
              </div>

              <div className="bg-[#fafafc] p-3.5 rounded-xl border border-[#eef0f4] text-xs text-[#646e82] space-y-1">
                <span className="font-semibold text-[#1e2033] block">Operational Budget:</span>
                <p className="leading-relaxed">{data.complexity.opsBudgetExplanation || data.complexity.whyNaiveFails}</p>
              </div>
            </div>
          )}

          {/* 2. Critical Twist Alert */}
          {data.problem.twist_type && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  The Twist / Critical Trap
                </span>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  {data.problem.twist_type}
                </p>
              </div>
            </div>
          )}

          {/* 3. Socratic Progressive Ladder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-[#1e2033] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#1e2033]" />
                Socratic Clue Ladder
              </h4>
              <span className="text-xs text-[#646e82]">
                Level {revealedLevel} of {data.hints?.length || 4}
              </span>
            </div>

            <div className="space-y-3">
              {(data.hints || []).map((hint, idx) => {
                const isUnlocked = (idx + 1) <= revealedLevel;

                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "sarvam-card overflow-hidden transition-all",
                      !isUnlocked && "opacity-75 bg-[#fcfcfd]"
                    )}
                  >
                    <div className="p-4 sm:p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs",
                          isUnlocked ? "bg-[#1e2033] text-white" : "bg-[#f4f5f8] text-[#a0a8b7]"
                        )}>
                          L{idx + 1}
                        </span>
                        <div>
                          <h5 className="font-bold text-xs text-[#1e2033]">{hint.title}</h5>
                          <span className="text-[11px] text-[#646e82]">
                            {idx === 0 ? 'Recognition & Intuition' : idx === 1 ? 'State Formulation' : idx === 2 ? 'Transitions & Gotchas' : 'Code Skeleton'}
                          </span>
                        </div>
                      </div>

                      {isUnlocked ? (
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          Revealed
                        </span>
                      ) : (
                        <button
                          onClick={() => setRevealedLevel(idx + 1)}
                          className="sarvam-btn-secondary px-3 py-1 text-xs flex items-center gap-1.5"
                        >
                          <Lock className="w-3 h-3 text-[#646e82]" />
                          <span>Unlock</span>
                        </button>
                      )}
                    </div>

                    {isUnlocked && (
                      <div className="border-t border-[#f4f5f8] p-5 bg-[#fafafc] text-xs text-[#1e2033] leading-relaxed">
                        {idx === 3 ? (
                          <div className="rounded-xl overflow-hidden border border-[#eef0f4]">
                            <Editor
                              height="180px"
                              language="python"
                              theme="vs-dark"
                              value={hint.content}
                              options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 12,
                                lineNumbers: 'off',
                                scrollBeyondLastLine: false,
                                fontFamily: 'JetBrains Mono, Menlo, monospace',
                              }}
                            />
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{hint.content}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Reveal Button */}
            {revealedLevel < (data.hints?.length || 0) && (
              <button
                onClick={() => setRevealedLevel(revealedLevel + 1)}
                className="sarvam-btn-primary w-full py-3 text-xs flex items-center justify-center gap-2"
              >
                <span>Reveal Next Clue (Level {revealedLevel + 1})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
