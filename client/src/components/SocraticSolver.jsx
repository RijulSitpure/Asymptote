import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Search, Sparkles, Lightbulb, AlertTriangle, ShieldCheck, ArrowRight, Lock, Unlock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
        throw new Error(`Failed to load hints for ${searchQuery}`);
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
    { id: '329', title: '#329 Longest Increasing Path' },
    { id: '847', title: '#847 Visiting All Nodes' },
    { id: '312', title: '#312 Burst Balloons' },
    { id: '1368', title: '#1368 Valid Path 0/1 BFS' },
  ];

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <Card className="bg-zinc-900/80 border-zinc-800/80 p-6">
        <div className="max-w-2xl">
          <Badge variant="outline" className="text-amber-400 bg-amber-500/10 border-amber-500/20 text-xs mb-3 gap-1.5 py-1">
            <Lightbulb className="w-3.5 h-3.5" />
            Socratic Method • Zero Spoilers
          </Badge>
          <h2 className="text-xl font-bold text-zinc-100">Socratic Clues & Complexity Targeter</h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Derive target Big-O bounds and reveal algorithmic clues step-by-step. Train your brain to spot invariants and subproblems instead of jumping directly to full code solutions.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter problem number or title (e.g. 787, two sum, 329, cheapest flights)..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono shadow-inner"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold gap-2 px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Analyzing...' : 'Get Socratic Clues'}</span>
          </Button>
        </form>

        {/* Sample Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="text-zinc-500">Quick examples:</span>
          {sampleProblems.map(p => (
            <button
              key={p.id}
              onClick={() => { setQuery(p.id); fetchProblemHints(p.id); }}
              className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800/80 transition text-[11px]"
            >
              {p.title}
            </button>
          ))}
        </div>
      </Card>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Result Container */}
      {data && (
        <div className="space-y-6">
          {/* Problem Meta Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold font-mono text-indigo-400">#{data.problem.frontend_id || data.problem.id}</span>
              <h3 className="text-base font-bold text-zinc-100">{data.problem.title}</h3>
              <Badge 
                variant="outline" 
                className={
                  data.problem.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                  data.problem.difficulty === 'Medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                  'text-rose-400 border-rose-500/20 bg-rose-500/10'
                }
              >
                {data.problem.difficulty}
              </Badge>
            </div>
            <Badge variant="outline" className="text-indigo-400 bg-indigo-500/10 border-indigo-500/30 text-xs py-1">
              {data.pattern?.title || 'Algorithmic Pattern'}
            </Badge>
          </div>

          {/* 1. Target Complexity Card */}
          {data.complexity && (
            <Card className="bg-zinc-900/80 border-zinc-800/80 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <span>🎯</span> Constraint-Derived Target Complexity
                </span>
                <span className="text-xs font-mono text-zinc-400">{data.complexity.boundsSummary}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-sky-500/20">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Target Time Bound</span>
                  <span className="text-sm font-bold font-mono text-sky-400 mt-1 block">{data.complexity.targetTime}</span>
                </div>
                <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-purple-500/20">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Target Space Bound</span>
                  <span className="text-sm font-bold font-mono text-purple-400 mt-1 block">{data.complexity.targetSpace}</span>
                </div>
              </div>

              {/* Operational CPU Budget */}
              <div className="bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-800/80 space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  ⚡ Operational CPU Budget (Why Naive Fails)
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {data.complexity.opsBudgetExplanation || data.complexity.whyNaiveFails}
                </p>
              </div>

              {/* Space-Time Tradeoff */}
              <div className="bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-800/80 space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  ⚖️ Algorithmic Space-Time Trade-off
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {data.complexity.spaceTimeTradeoff}
                </p>
              </div>
            </Card>
          )}

          {/* 2. Critical Interview Twist Callout */}
          {data.problem.twist_type && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  The Twist / Interview Gotcha
                </span>
                <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                  {data.problem.twist_type}
                </p>
              </div>
            </div>
          )}

          {/* 3. Socratic Progressive Ladder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Socratic Hint Ladder
              </h4>
              <span className="text-xs text-zinc-400">
                Unlocked Level {revealedLevel} of {data.hints?.length || 4}
              </span>
            </div>

            <div className="space-y-3">
              {(data.hints || []).map((hint, idx) => {
                const isUnlocked = (idx + 1) <= revealedLevel;
                const levelColors = ['#38bdf8', '#818cf8', '#a855f7', '#ec4899'];
                const badgeColor = levelColors[idx % levelColors.length];

                return (
                  <Card 
                    key={idx} 
                    className={`border transition-all overflow-hidden ${
                      isUnlocked ? 'bg-zinc-900/90 border-zinc-700/80' : 'bg-zinc-950/40 border-zinc-800/60 opacity-60'
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                          style={{ 
                            backgroundColor: isUnlocked ? badgeColor : '#27272a',
                            color: isUnlocked ? '#000' : '#71717a'
                          }}
                        >
                          L{idx + 1}
                        </span>
                        <div>
                          <h5 className="font-semibold text-xs text-zinc-100">{hint.title}</h5>
                          <span className="text-[10px] text-zinc-400">
                            {idx === 0 ? 'Recognition & Invariant' : idx === 1 ? 'State Formulation' : idx === 2 ? 'Transition & Pitfalls' : 'Code Skeleton'}
                          </span>
                        </div>
                      </div>

                      {isUnlocked ? (
                        <Badge variant="outline" className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10 text-[10px] gap-1">
                          <Unlock className="w-3 h-3" /> Revealed
                        </Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setRevealedLevel(idx + 1)}
                          className="h-7 text-xs text-zinc-300 hover:text-white border-zinc-700 gap-1"
                        >
                          <Lock className="w-3 h-3 text-zinc-400" /> Unlock Hint
                        </Button>
                      )}
                    </div>

                    {isUnlocked && (
                      <div className="border-t border-zinc-800 p-4 bg-zinc-950/60 text-xs text-zinc-300 leading-relaxed">
                        {idx === 3 ? (
                          <div className="rounded-xl overflow-hidden border border-zinc-800 mt-1">
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
                  </Card>
                );
              })}
            </div>

            {/* Next Reveal Button */}
            {revealedLevel < (data.hints?.length || 0) && (
              <Button
                onClick={() => setRevealedLevel(revealedLevel + 1)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-3 rounded-xl gap-2 shadow-lg shadow-indigo-600/20"
              >
                <span>Reveal Next Hint (Level {revealedLevel + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
