import React, { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Card } from './Card';
import { Chip } from './Chip';
import { ConfidenceRating } from './ConfidenceRating';
import { useToast } from './Toast';
import { sortPatternsByPedagogy } from '../lib/curriculum';
import { SHOW_HEURISTIC_PATTERNS } from '../lib/codeTemplates';

export function SolvedLog({ problems = [], patterns = [], onRefresh }) {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [patternFilter, setPatternFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort pattern filter options in pedagogical sequence
  const sortedPatterns = useMemo(() => sortPatternsByPedagogy(patterns), [patterns]);

  // Support ?edit=1 for direct modal preview
  useEffect(() => {
    if (typeof window !== 'undefined' && problems.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const editId = params.get('edit');
      if (editId) {
        const found = problems.find(p => String(p.frontend_id) === editId || String(p.id) === editId) || problems[0];
        if (found) {
          setSelectedProblem({ ...found });
          setIsModalOpen(true);
        }
      }
    }
  }, [problems]);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchPattern = patternFilter === 'all' || p.pattern_id === patternFilter;
      const matchDiff = diffFilter === 'all' || p.difficulty === diffFilter;
      const matchStatus = statusFilter === 'all' || 
        (statusFilter === 'solved' && p.is_solved && !p.review_needed) || 
        (statusFilter === 'review' && p.review_needed);
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
          is_solved: selectedProblem.is_solved ? 1 : 0,
          review_needed: selectedProblem.review_needed ? 1 : 0
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
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-heading text-[32px] font-bold text-[#1e2033] leading-tight">
          Solved
        </h1>
        <p className="text-[16px] text-[#475569] mt-1">
          Everything you have solved, with your notes and a confidence rating.
        </p>
      </div>

      {/* Filter Row: Search, All patterns, All difficulties, All statuses, Count chip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search solved problems"
            aria-label="Search solved problems"
            className="asymptote-input w-full !pl-10"
          />
        </div>

        {/* All patterns */}
        <div className="sm:w-48">
          <select
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            aria-label="Filter by pattern"
            className="asymptote-input w-full cursor-pointer"
          >
            <option value="all">All patterns</option>
            {sortedPatterns.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        {/* All difficulties */}
        <div className="sm:w-36">
          <select
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            aria-label="Filter by difficulty"
            className="asymptote-input w-full cursor-pointer"
          >
            <option value="all">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* All statuses */}
        <div className="sm:w-36">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="asymptote-input w-full cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="solved">Solved</option>
            <option value="review">Review</option>
          </select>
        </div>

        {/* Count Chip */}
        <Chip variant="neutral" className="shrink-0 self-start sm:self-center">
          {filteredProblems.length} problems
        </Chip>
      </div>

      {/* Table inside one card, no zebra striping */}
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-[#e2e8f0] bg-white text-[13px] font-bold text-[#64748b]">
                <th className="py-3.5 px-5 w-16">#</th>
                <th className="py-3.5 px-5">Problem</th>
                <th className="py-3.5 px-5">Pattern</th>
                <th className="py-3.5 px-5 w-28">Difficulty</th>
                <th className="py-3.5 px-5 w-28">Status</th>
                <th className="py-3.5 px-5 w-32">Confidence</th>
                <th className="py-3.5 px-5 text-right w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] bg-white">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#64748b] text-[15px]">
                    No solved problems recorded yet.
                  </td>
                </tr>
              ) : (
                filteredProblems.map(p => {
                return (
                  <tr key={p.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#64748b] text-[13px]">
                      #{p.frontend_id || p.id}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-[#1e2033]">
                      {p.title}
                    </td>
                    <td className="py-3.5 px-5 text-[#475569]">
                      {p.verified 
                        ? (p.pattern_title || p.pattern_id || 'Pattern') 
                        : (SHOW_HEURISTIC_PATTERNS && p.pattern_title ? `Suggested: ${p.pattern_title} (unverified)` : '—')}
                    </td>
                    <td className="py-3.5 px-5">
                      <Chip variant={(p.difficulty || 'medium').toLowerCase()}>
                        {p.difficulty}
                      </Chip>
                    </td>
                    <td className="py-3.5 px-5 font-medium">
                      {p.review_needed ? (
                        <span className="text-[#b45309]">Review</span>
                      ) : (
                        <span className="text-[#047857]">Solved</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5">
                      <ConfidenceRating value={p.user_rating || 3} readonly />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => openDetail(p)}
                        className="btn-secondary !py-1 !px-3 !text-[13px]"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5.7 Edit Solved Problem Modal */}
      {isModalOpen && selectedProblem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2033]/65 backdrop-blur-xs"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[14px] p-7 max-w-[520px] w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: '#1 Two Sum' (22px), difficulty chip, close button */}
            <div className="flex items-center justify-between pb-1 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2.5">
                <h2 className="font-heading text-[22px] font-bold text-[#1e2033]">
                  #{selectedProblem.frontend_id || selectedProblem.id} {selectedProblem.title}
                </h2>
                <Chip variant={(selectedProblem.difficulty || 'medium').toLowerCase()}>
                  {selectedProblem.difficulty}
                </Chip>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-[#64748b] hover:text-[#1e2033] hover:bg-[#f8fafc] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Field 1: Pattern variation (was 'The twist') */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1e2033] block">
                Pattern variation
              </label>
              <div className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-lg p-3 text-[14px] text-[#334155] leading-relaxed">
                {selectedProblem.twist_type || 'Standard algorithmic archetype'}
              </div>
            </div>

            {/* Field 2: Notes */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1e2033] block">
                Notes
              </label>
              <textarea
                value={selectedProblem.user_notes || ''}
                onChange={(e) => setSelectedProblem({ ...selectedProblem, user_notes: e.target.value })}
                rows={3}
                placeholder="Personal notes and takeaways..."
                className="asymptote-input w-full"
              />
            </div>

            {/* Field 3: Confidence (five dots plus '3 of 5') */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1e2033] block">
                Confidence
              </label>
              <div className="flex items-center gap-3">
                <ConfidenceRating
                  value={selectedProblem.user_rating || 3}
                  onChange={(val) => setSelectedProblem({ ...selectedProblem, user_rating: val })}
                />
                <span className="text-[14px] text-[#475569] font-medium">
                  {selectedProblem.user_rating || 3} of 5
                </span>
              </div>
            </div>

            {/* Field 4: Saved solution (light code box: #f6f8fa background, 1px border, monospace 13px, muted placeholder '# No solution saved yet') */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1e2033] block">
                Saved solution
              </label>
              <pre className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-lg p-3.5 font-mono text-[13px] text-[#1e2033] leading-relaxed max-h-48 overflow-y-auto whitespace-pre">
                <code>{selectedProblem.user_code || selectedProblem.solution_python || '# No solution saved yet'}</code>
              </pre>
            </div>

            {/* Footer: secondary 'Mark for review' on left, then secondary 'Cancel' and primary 'Save changes' on right */}
            <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedProblem({ 
                  ...selectedProblem, 
                  review_needed: selectedProblem.review_needed ? 0 : 1 
                })}
                className="btn-secondary !text-[13px]"
              >
                {selectedProblem.review_needed ? 'Mark as solved' : 'Mark for review'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary !text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProblem}
                  className="btn-primary !text-[13px]"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
