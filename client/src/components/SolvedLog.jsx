import { useState, useMemo, useEffect } from 'react';
import { Search, X, ArrowUpDown, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { Card } from './Card';
import { Chip } from './Chip';
import { ConfidenceRating } from './ConfidenceRating';
import { useToast } from './Toast';
import { sortPatternsByPedagogy } from '../lib/curriculum';
import { updateProblem } from '../lib/engineClient';

export function SolvedLog({ problems = [], patterns = [], onRefresh }) {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [patternFilter, setPatternFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('number'); // 'number' | 'title' | 'pattern' | 'difficulty' | 'status' | 'confidence'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if any non-default filters or search queries are applied
  const hasActiveFilters = Boolean(
    search.trim() ||
    domainFilter !== 'all' ||
    patternFilter !== 'all' ||
    diffFilter !== 'all' ||
    statusFilter !== 'all'
  );

  const handleResetFilters = () => {
    setSearch('');
    setDomainFilter('all');
    setPatternFilter('all');
    setDiffFilter('all');
    setStatusFilter('all');
    setSortField('number');
    setSortOrder('asc');
  };

  // 1. Base solved problems: Only include problems that the user has actually solved
  const solvedProblems = useMemo(() => {
    return problems.filter(p => Boolean(p.is_solved));
  }, [problems]);

  // 2. Pre-compute live solved counts for every filter category
  const filterCounts = useMemo(() => {
    const total = solvedProblems.length;

    // Domain counts
    const domainCounts = {
      all: total,
      Algorithms: 0,
      Database: 0,
      pandas: 0,
      JavaScript: 0,
      Concurrency: 0,
      Shell: 0
    };

    // Difficulty counts
    const diffCounts = {
      all: total,
      Easy: 0,
      Medium: 0,
      Hard: 0
    };

    // Status counts
    const statusCounts = {
      all: total,
      solved: 0,
      review: 0
    };

    // Pattern counts (map of pattern_id -> count, plus uncurated count)
    const patternCounts = {
      uncurated: 0
    };

    for (const p of solvedProblems) {
      // Domain
      const cat = p.category || 'Algorithms';
      if (cat.toLowerCase() === 'algorithms') domainCounts.Algorithms++;
      else if (cat.toLowerCase() === 'database') domainCounts.Database++;
      else if (cat.toLowerCase() === 'pandas') domainCounts.pandas++;
      else if (cat.toLowerCase() === 'javascript') domainCounts.JavaScript++;
      else if (cat.toLowerCase() === 'concurrency') domainCounts.Concurrency++;
      else if (cat.toLowerCase() === 'shell') domainCounts.Shell++;

      // Difficulty
      const diff = p.difficulty || 'Medium';
      if (diffCounts[diff] !== undefined) {
        diffCounts[diff]++;
      }

      // Status
      if (p.review_needed) {
        statusCounts.review++;
      } else {
        statusCounts.solved++;
      }

      // Pattern
      const patId = p.pattern_id || (Array.isArray(p.patterns) && p.patterns[0]) || null;
      if (!patId) {
        patternCounts.uncurated++;
      } else {
        patternCounts[patId] = (patternCounts[patId] || 0) + 1;
      }
    }

    return { total, domainCounts, diffCounts, statusCounts, patternCounts };
  }, [solvedProblems]);

  // Sort pattern filter options in pedagogical sequence
  const sortedPatterns = useMemo(() => sortPatternsByPedagogy(patterns), [patterns]);

  // Support ?edit=1 for direct modal preview
  useEffect(() => {
    if (typeof window !== 'undefined' && solvedProblems.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const editId = params.get('edit');
      if (editId) {
        const found = solvedProblems.find(p => String(p.frontend_id) === editId || String(p.id) === editId || String(p.number) === editId) || solvedProblems[0];
        if (found) {
          setSelectedProblem({ ...found });
          setIsModalOpen(true);
        }
      }
    }
  }, [solvedProblems]);

  // 3. Filter problems
  const filteredProblems = useMemo(() => {
    return solvedProblems.filter(p => {
      // Domain filter
      const pCat = (p.category || 'Algorithms').toLowerCase();
      const matchDomain = domainFilter === 'all' || pCat === domainFilter.toLowerCase();

      // Pattern filter
      const pPatId = p.pattern_id || (Array.isArray(p.patterns) && p.patterns[0]) || null;
      const matchPattern = patternFilter === 'all' || 
        (patternFilter === 'uncurated' 
          ? (!pPatId) 
          : (pPatId === patternFilter || (Array.isArray(p.patterns) && p.patterns.includes(patternFilter))));

      // Difficulty filter
      const matchDiff = diffFilter === 'all' || p.difficulty?.toLowerCase() === diffFilter.toLowerCase();

      // Status filter
      const matchStatus = statusFilter === 'all' || 
        (statusFilter === 'solved' && !p.review_needed) || 
        (statusFilter === 'review' && Boolean(p.review_needed));

      // Search filter
      const q = search.trim().toLowerCase();
      const matchSearch = !q || 
        (p.title && p.title.toLowerCase().includes(q)) || 
        (p.frontend_id && String(p.frontend_id).toLowerCase().includes(q)) ||
        (p.number && String(p.number).includes(q)) ||
        (p.pattern_title && p.pattern_title.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.user_notes && p.user_notes.toLowerCase().includes(q));

      return matchDomain && matchPattern && matchDiff && matchStatus && matchSearch;
    });
  }, [solvedProblems, domainFilter, patternFilter, diffFilter, statusFilter, search]);

  // 4. Sort problems
  const sortedProblems = useMemo(() => {
    const list = [...filteredProblems];
    const diffRanks = { easy: 1, medium: 2, hard: 3 };

    list.sort((a, b) => {
      let result = 0;
      switch (sortField) {
        case 'number': {
          const numA = Number(a.number) || parseInt(a.frontend_id, 10) || 0;
          const numB = Number(b.number) || parseInt(b.frontend_id, 10) || 0;
          result = numA - numB;
          break;
        }
        case 'title': {
          result = (a.title || '').localeCompare(b.title || '');
          break;
        }
        case 'pattern': {
          const patA = a.pattern_title || a.pattern_id || 'zzz';
          const patB = b.pattern_title || b.pattern_id || 'zzz';
          result = patA.localeCompare(patB);
          break;
        }
        case 'difficulty': {
          const rankA = diffRanks[a.difficulty?.toLowerCase()] || 2;
          const rankB = diffRanks[b.difficulty?.toLowerCase()] || 2;
          result = rankA - rankB;
          break;
        }
        case 'status': {
          const statA = a.review_needed ? 1 : 0;
          const statB = b.review_needed ? 1 : 0;
          result = statA - statB;
          break;
        }
        case 'confidence': {
          const ratingA = a.user_rating || 0;
          const ratingB = b.user_rating || 0;
          result = ratingA - ratingB;
          break;
        }
        default:
          result = 0;
      }

      if (result === 0) {
        // Fallback secondary sort by number
        const numA = Number(a.number) || parseInt(a.frontend_id, 10) || 0;
        const numB = Number(b.number) || parseInt(b.frontend_id, 10) || 0;
        result = numA - numB;
      }

      return sortOrder === 'asc' ? result : -result;
    });

    return list;
  }, [filteredProblems, sortField, sortOrder]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIndicator = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-[#94a3b8] opacity-60 group-hover:opacity-100 transition-opacity" />;
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-[#059669]" />
      : <ArrowDown className="w-3.5 h-3.5 text-[#059669]" />;
  };

  const openDetail = (p) => {
    setSelectedProblem({ ...p });
    setIsModalOpen(true);
  };

  const handleSaveProblem = async () => {
    if (!selectedProblem) return;
    try {
      await updateProblem(selectedProblem.slug || selectedProblem.id, {
        user_notes: selectedProblem.user_notes,
        user_rating: selectedProblem.user_rating,
        is_solved: selectedProblem.is_solved ? 1 : 0,
        review_needed: selectedProblem.review_needed ? 1 : 0
      });
      setIsModalOpen(false);
      addToast({
        message: `Updated #${selectedProblem.frontend_id || selectedProblem.id} ${selectedProblem.title}`,
        type: 'success'
      });
      if (onRefresh) onRefresh();
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
            placeholder="Search solved problems, numbers, or notes"
            aria-label="Search solved problems"
            className="asymptote-input w-full !pl-10"
          />
        </div>

        {/* Category / Domain Filter */}
        <div className="sm:w-48">
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            aria-label="Filter by category"
            className="asymptote-input w-full cursor-pointer font-medium"
          >
            <option value="all">All categories ({filterCounts.domainCounts.all})</option>
            <option value="Algorithms">Algorithms ({filterCounts.domainCounts.Algorithms})</option>
            <option value="Database">Database ({filterCounts.domainCounts.Database})</option>
            <option value="pandas">Pandas ({filterCounts.domainCounts.pandas})</option>
            <option value="JavaScript">JavaScript ({filterCounts.domainCounts.JavaScript})</option>
            <option value="Concurrency">Concurrency ({filterCounts.domainCounts.Concurrency})</option>
            <option value="Shell">Shell ({filterCounts.domainCounts.Shell})</option>
          </select>
        </div>

        {/* All patterns */}
        <div className="sm:w-52">
          <select
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            aria-label="Filter by pattern"
            className="asymptote-input w-full cursor-pointer"
          >
            <option value="all">All patterns ({filterCounts.total})</option>
            {filterCounts.patternCounts.uncurated > 0 && (
              <option value="uncurated">Uncurated / Synced ({filterCounts.patternCounts.uncurated})</option>
            )}
            {sortedPatterns.map(p => {
              const count = filterCounts.patternCounts[p.id] || 0;
              return (
                <option key={p.id} value={p.id}>
                  {p.title} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* All difficulties */}
        <div className="sm:w-40">
          <select
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            aria-label="Filter by difficulty"
            className="asymptote-input w-full cursor-pointer"
          >
            <option value="all">All difficulties ({filterCounts.diffCounts.all})</option>
            <option value="Easy">Easy ({filterCounts.diffCounts.Easy})</option>
            <option value="Medium">Medium ({filterCounts.diffCounts.Medium})</option>
            <option value="Hard">Hard ({filterCounts.diffCounts.Hard})</option>
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
            <option value="all">All statuses ({filterCounts.statusCounts.all})</option>
            <option value="solved">Solved ({filterCounts.statusCounts.solved})</option>
            <option value="review">Review ({filterCounts.statusCounts.review})</option>
          </select>
        </div>

        {/* Count Chip */}
        <Chip variant="neutral" className="shrink-0 self-start sm:self-center">
          {sortedProblems.length === solvedProblems.length 
            ? `${solvedProblems.length} solved` 
            : `${sortedProblems.length} of ${solvedProblems.length} solved`}
        </Chip>

        {/* Reset Filters button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#475569] hover:text-[#0f172a] bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#cbd5e1] transition-colors shrink-0 self-start sm:self-center focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 cursor-pointer"
            title="Reset all filters and search"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Table inside one card, no zebra striping */}
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-[#e2e8f0] bg-white text-[13px] font-bold text-[#64748b]">
                <th className="py-3.5 px-5 w-24">
                  <button 
                    type="button"
                    onClick={() => toggleSort('number')}
                    className="group inline-flex items-center gap-1.5 hover:text-[#1e2033] transition-colors focus:outline-none"
                  >
                    <span>#</span>
                    {renderSortIndicator('number')}
                  </button>
                </th>
                <th className="py-3.5 px-5">
                  <button 
                    type="button"
                    onClick={() => toggleSort('title')}
                    className="group inline-flex items-center gap-1.5 hover:text-[#1e2033] transition-colors focus:outline-none"
                  >
                    <span>Problem</span>
                    {renderSortIndicator('title')}
                  </button>
                </th>
                <th className="py-3.5 px-5">
                  <button 
                    type="button"
                    onClick={() => toggleSort('pattern')}
                    className="group inline-flex items-center gap-1.5 hover:text-[#1e2033] transition-colors focus:outline-none"
                  >
                    <span>Pattern</span>
                    {renderSortIndicator('pattern')}
                  </button>
                </th>
                <th className="py-3.5 px-5 w-32">
                  <button 
                    type="button"
                    onClick={() => toggleSort('difficulty')}
                    className="group inline-flex items-center gap-1.5 hover:text-[#1e2033] transition-colors focus:outline-none"
                  >
                    <span>Difficulty</span>
                    {renderSortIndicator('difficulty')}
                  </button>
                </th>
                <th className="py-3.5 px-5 w-28">
                  <button 
                    type="button"
                    onClick={() => toggleSort('status')}
                    className="group inline-flex items-center gap-1.5 hover:text-[#1e2033] transition-colors focus:outline-none"
                  >
                    <span>Status</span>
                    {renderSortIndicator('status')}
                  </button>
                </th>
                <th className="py-3.5 px-5 w-36">
                  <button 
                    type="button"
                    onClick={() => toggleSort('confidence')}
                    className="group inline-flex items-center gap-1.5 hover:text-[#1e2033] transition-colors focus:outline-none"
                  >
                    <span>Confidence</span>
                    {renderSortIndicator('confidence')}
                  </button>
                </th>
                <th className="py-3.5 px-5 text-right w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] bg-white">
              {sortedProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#64748b] text-[15px]">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <span>
                        {solvedProblems.length === 0 
                          ? 'No solved problems recorded yet. Sync your LeetCode account or solve a problem to see it here.'
                          : 'No solved problems match the active filters.'}
                      </span>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold text-[#4338ca] bg-[#eef2ff] hover:bg-[#e0e7ff] border border-[#c7d2fe] transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset all filters</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                sortedProblems.map(p => {
                  const patternLabel = p.pattern_title || p.pattern_id;
                  const isCurated = Boolean(p.verified);

                  return (
                    <tr key={p.slug || p.id} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="py-3.5 px-5 font-mono text-[#64748b] text-[13px] font-semibold">
                        #{p.number || p.frontend_id || p.id}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-[#1e2033]">
                        <div className="flex flex-col">
                          <span>{p.title}</span>
                          {p.user_notes && (
                            <span className="text-[12px] text-[#64748b] line-clamp-1 italic mt-0.5">
                              "{p.user_notes}"
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-[#475569]">
                        {patternLabel ? (
                          <div className="inline-flex items-center gap-1.5 flex-wrap">
                            <span className="font-medium text-[#1e2033]">{patternLabel}</span>
                            {isCurated ? (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                                Curated
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]">
                                Catalog
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]">
                            Unclassified
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <Chip variant={(p.difficulty || 'medium').toLowerCase()}>
                          {p.difficulty || 'Medium'}
                        </Chip>
                      </td>
                      <td className="py-3.5 px-5 font-medium">
                        {p.review_needed ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">
                            Review
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                            Solved
                          </span>
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
                })
              )}
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
                  #{selectedProblem.number || selectedProblem.frontend_id || selectedProblem.id} {selectedProblem.title}
                </h2>
                <Chip variant={(selectedProblem.difficulty || 'medium').toLowerCase()}>
                  {selectedProblem.difficulty || 'Medium'}
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

            {/* Field 1: Pattern variation / Archetype */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1e2033] block">
                Pattern variation
              </label>
              <div className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-lg p-3 text-[14px] text-[#334155] leading-relaxed">
                {selectedProblem.twist_type || selectedProblem.pattern_title || 'Standard algorithmic archetype'}
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
                rows={4}
                placeholder="Personal notes, key edge cases, and takeaways..."
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

            {/* Field 4: Saved solution */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1e2033] block">
                Saved solution
              </label>
              <pre className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-lg p-3.5 font-mono text-[13px] text-[#1e2033] leading-relaxed max-h-48 overflow-y-auto whitespace-pre">
                <code>{selectedProblem.user_code || selectedProblem.solution_python || '# No solution saved yet'}</code>
              </pre>
            </div>

            {/* Footer: 'Mark for review' on left, 'Cancel' and 'Save changes' on right */}
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
