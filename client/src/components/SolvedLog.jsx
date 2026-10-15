import React, { useState, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Search, ExternalLink, Star, CheckCircle, Clock, Plus, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function SolvedLog({ problems, patterns, onRefresh }) {
  const [search, setSearch] = useState('');
  const [patternFilter, setPatternFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchPattern = patternFilter === 'all' || p.pattern_id === patternFilter;
      const matchDiff = diffFilter === 'all' || p.difficulty === diffFilter;
      const matchStatus = statusFilter === 'all' || 
        (statusFilter === 'solved' && p.is_solved) || 
        (statusFilter === 'unsolved' && !p.is_solved);
      const q = search.toLowerCase();
      const matchSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        (p.frontend_id && p.frontend_id.toString().includes(q)) ||
        (p.pattern_title && p.pattern_title.toLowerCase().includes(q));
      return matchPattern && matchDiff && matchStatus && matchSearch;
    });
  }, [problems, patternFilter, diffFilter, statusFilter, search]);

  const openDetail = (p) => {
    setSelectedProblem({ ...p });
    setIsModalOpen(true);
  };

  const handleSaveProblem = async () => {
    if (!selectedProblem) return;
    try {
      await fetch(`/api/problems/${selectedProblem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_notes: selectedProblem.user_notes,
          user_rating: selectedProblem.user_rating,
          is_solved: selectedProblem.is_solved ? 1 : 0
        })
      });
      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      console.error('Failed to update problem:', err);
    }
  };

  return (
    <div className="space-y-5">
      {/* Search and Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems by # or name..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pattern Filter */}
          <select
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Patterns</option>
            {patterns.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="solved">Solved Only</option>
            <option value="unsolved">In Review</option>
          </select>

          <Badge variant="outline" className="text-zinc-400 border-zinc-800 text-xs px-2.5 py-1">
            {filteredProblems.length} Problems
          </Badge>
        </div>
      </div>

      {/* Problems Table */}
      <Card className="bg-zinc-900/80 border-zinc-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 w-16">#</th>
                <th className="py-3 px-4">Problem</th>
                <th className="py-3 px-4">Pattern & Twist</th>
                <th className="py-3 px-4 w-24">Difficulty</th>
                <th className="py-3 px-4 w-28">Status</th>
                <th className="py-3 px-4 w-28">Rating</th>
                <th className="py-3 px-4 text-right w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredProblems.map(p => {
                const diffColor = p.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                                  p.difficulty === 'Medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                                  'text-rose-400 border-rose-500/20 bg-rose-500/10';

                return (
                  <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-zinc-400">
                      #{p.frontend_id || p.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-100">
                      <div className="flex items-center gap-2">
                        <span>{p.title}</span>
                        {p.title_slug && (
                          <a 
                            href={`https://leetcode.com/problems/${p.title_slug}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-500 hover:text-indigo-400"
                            title="Open on LeetCode"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-zinc-200 font-medium">{p.pattern_title || p.pattern_id || 'Algorithmic Pattern'}</span>
                        {p.twist_type && (
                          <span className="text-[10px] text-zinc-500 truncate max-w-xs">{p.twist_type}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-[10px] ${diffColor}`}>
                        {p.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {p.is_solved ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Solved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                          <Clock className="w-3.5 h-3.5" /> In Review
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${star <= (p.user_rating || 3) ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetail(p)}
                        className="h-7 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Problem Detail Dialog */}
      {selectedProblem && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400">#{selectedProblem.frontend_id}</span>
                <DialogTitle className="text-lg font-bold">{selectedProblem.title}</DialogTitle>
                <Badge variant="outline" className="text-xs ml-2">
                  {selectedProblem.difficulty}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Twist */}
              {selectedProblem.twist_type && (
                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-bold text-zinc-400">The Twist</span>
                  <div className="text-xs text-zinc-200 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                    {selectedProblem.twist_type}
                  </div>
                </div>
              )}

              {/* User Notes */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-zinc-400">Your Takeaways & Notes</span>
                <textarea
                  value={selectedProblem.user_notes || ''}
                  onChange={(e) => setSelectedProblem({ ...selectedProblem, user_notes: e.target.value })}
                  rows={2}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                  placeholder="Add notes about state formulations or edge case traps..."
                />
              </div>

              {/* Confidence Rating */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-zinc-400">Mastery Confidence</span>
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedProblem({ ...selectedProblem, user_rating: star })}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star 
                        className={`w-4 h-4 ${star <= (selectedProblem.user_rating || 3) ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs text-zinc-500 ml-2">({selectedProblem.user_rating || 3}/5)</span>
                </div>
              </div>

              {/* Monaco Code Preview */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-zinc-400">Solution Code Preview</span>
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#1e1e1e]">
                  <Editor
                    height="200px"
                    language="python"
                    theme="vs-dark"
                    value={selectedProblem.user_code || selectedProblem.solution_python || '# No solution code recorded'}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 12,
                      scrollBeyondLastLine: false,
                      fontFamily: 'JetBrains Mono, Menlo, monospace',
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProblem({ ...selectedProblem, is_solved: selectedProblem.is_solved ? 0 : 1 })}
                  className={selectedProblem.is_solved ? 'text-emerald-400 border-emerald-500/30' : 'text-amber-400 border-amber-500/30'}
                >
                  {selectedProblem.is_solved ? 'Mark as Unsolved' : 'Mark as Solved'}
                </Button>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveProblem} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
