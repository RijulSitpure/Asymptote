import React, { useState, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Search, ExternalLink, Star, CheckCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useToast } from './Toast';
import { cn } from '../lib/utils';

export function SolvedLog({ problems, patterns, onRefresh }) {
  const { addToast } = useToast();
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
      addToast({
        message: `Updated #${selectedProblem.frontend_id || selectedProblem.id} ${selectedProblem.title}`,
        type: 'success'
      });
      onRefresh();
    } catch (err) {
      console.error('Failed to update problem:', err);
      addToast({
        message: `Failed to save changes: ${err.message}`,
        type: 'error'
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Search and Filters Bar */}
      <div className="sarvam-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#a0a8b7] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search solved problems..."
            className="w-full bg-[#f8f9fc] border border-[#eef0f4] rounded-full pl-9 pr-4 py-2 text-xs text-[#1e2033] placeholder-[#a0a8b7] focus:outline-none focus:border-[#1e2033] focus:bg-white font-mono transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pattern Filter */}
          <select
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            className="bg-[#f8f9fc] border border-[#eef0f4] rounded-full px-3 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
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
            className="bg-[#f8f9fc] border border-[#eef0f4] rounded-full px-3 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
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
            className="bg-[#f8f9fc] border border-[#eef0f4] rounded-full px-3 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
          >
            <option value="all">All Statuses</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Review</option>
          </select>

          <span className="text-xs font-mono text-[#646e82] bg-[#f8f9fc] border border-[#eef0f4] px-3 py-2 rounded-full">
            {filteredProblems.length}
          </span>
        </div>
      </div>

      {/* Problems Table */}
      <div className="sarvam-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#eef0f4] bg-[#fbfbfc] text-[#646e82] font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-16">#</th>
                <th className="py-3.5 px-4">Problem</th>
                <th className="py-3.5 px-4">Pattern</th>
                <th className="py-3.5 px-4 w-24">Difficulty</th>
                <th className="py-3.5 px-4 w-28">Status</th>
                <th className="py-3.5 px-4 w-28">Rating</th>
                <th className="py-3.5 px-4 text-right w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f5f8]">
              {filteredProblems.map(p => {
                const diffBadge = p.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                                  p.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                                  'bg-rose-50 text-rose-700';

                return (
                  <tr key={p.id} className="hover:bg-[#fbfbfc] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#646e82]">
                      #{p.frontend_id || p.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#1e2033]">
                      <div className="flex items-center gap-2">
                        <span>{p.title}</span>
                        {p.title_slug && (
                          <a 
                            href={`https://leetcode.com/problems/${p.title_slug}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#a0a8b7] hover:text-[#1e2033]"
                            title="Open on LeetCode"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#646e82]">
                      {p.pattern_title || p.pattern_id || 'Algorithmic Pattern'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${diffBadge}`}>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.is_solved ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                          <CheckCircle className="w-3 h-3" /> Solved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-600 font-medium">
                          <Clock className="w-3 h-3" /> Review
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${star <= (p.user_rating || 3) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openDetail(p)}
                        className="text-xs text-[#1e2033] hover:underline font-medium"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Problem Detail Dialog */}
      {selectedProblem && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-[#ffffff] border-[#eef0f4] text-[#1e2033] max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#646e82]">#{selectedProblem.frontend_id}</span>
                <DialogTitle className="text-lg font-bold text-[#1e2033]">{selectedProblem.title}</DialogTitle>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f8f9fc] border border-[#eef0f4] text-[#646e82] ml-2">
                  {selectedProblem.difficulty}
                </span>
              </div>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Twist */}
              {selectedProblem.twist_type && (
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[#646e82]">The Twist</span>
                  <div className="text-xs text-[#1e2033] bg-[#f8f9fc] p-3 rounded-xl border border-[#eef0f4] leading-relaxed">
                    {selectedProblem.twist_type}
                  </div>
                </div>
              )}

              {/* User Notes */}
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#646e82]">Notes & Takeaway</span>
                <textarea
                  value={selectedProblem.user_notes || ''}
                  onChange={(e) => setSelectedProblem({ ...selectedProblem, user_notes: e.target.value })}
                  rows={2}
                  className="w-full bg-[#f8f9fc] border border-[#eef0f4] rounded-xl p-3 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033] focus:bg-white"
                  placeholder="Personal takeaways..."
                />
              </div>

              {/* Confidence Rating */}
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#646e82]">Confidence Rating</span>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedProblem({ ...selectedProblem, user_rating: star })}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star 
                        className={`w-4 h-4 ${star <= (selectedProblem.user_rating || 3) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#646e82] ml-2 font-mono">({selectedProblem.user_rating || 3}/5)</span>
                </div>
              </div>

              {/* Code Preview */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-[#646e82]">Saved Solution</span>
                <div className="rounded-xl overflow-hidden border border-[#eef0f4]">
                  <Editor
                    height="180px"
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
              <div className="flex items-center justify-between pt-4 border-t border-[#f4f5f8]">
                <button
                  type="button"
                  onClick={() => setSelectedProblem({ ...selectedProblem, is_solved: selectedProblem.is_solved ? 0 : 1 })}
                  className={cn(
                    "sarvam-btn-secondary px-3.5 py-1.5 text-xs",
                    selectedProblem.is_solved ? "text-emerald-700" : "text-amber-700"
                  )}
                >
                  {selectedProblem.is_solved ? 'Mark as In Review' : 'Mark as Solved'}
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-1.5 text-xs text-[#646e82] hover:text-[#1e2033]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProblem}
                    className="sarvam-btn-primary px-4 py-1.5 text-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
