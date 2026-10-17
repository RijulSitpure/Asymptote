import { useState, useEffect } from 'react';
import { Card } from './Card';
import { Chip } from './Chip';
import { diagnoseWizard } from '../lib/engineClient';

const STRUCTURE_OPTIONS = [
  { value: 'graph', label: 'General Graph (nodes & weighted edges)' },
  { value: 'dag', label: 'Directed Acyclic Graph (DAG / topological)' },
  { value: 'tree', label: 'Tree (connected, acyclic, N nodes, N-1 edges)' },
  { value: 'grid', label: '2D Grid / Matrix' },
  { value: 'array', label: '1D Array / Sequence' },
  { value: 'string', label: 'String / Characters' },
];

const CONSTRAINTS_OPTIONS = [
  { value: 'n_small', label: 'N ≤ 16 (Exponential / 2^N Bitmask / Subsets)' },
  { value: 'n_400', label: 'N ≤ 400 (O(N^3) Interval DP / Floyd-Warshall)' },
  { value: 'n_2000', label: 'N ≤ 2000 (O(N^2) 2D Grid / LCS DP)' },
  { value: 'n_10_5', label: 'N ≤ 10^5 (O(N) or O(N log N) Linear / Binary Search)' },
  { value: 'range_10_9', label: 'Answer in range 1 to 10^9 (Binary Search on Answer)' },
];

const GOAL_OPTIONS = [
  { value: 'k_steps', label: 'Shortest path with at most K steps / threshold' },
  { value: 'shortest_all_nodes', label: 'Visit all nodes / collect all keys / TSP' },
  { value: 'longest_path', label: 'Longest path or sequence length' },
  { value: 'all_roots', label: 'Calculate answer for every node as root of tree' },
  { value: 'next_greater', label: 'Next / Previous greater element' },
  { value: 'merge', label: 'Merge adjacent elements or burst balloons' },
  { value: 'min_max', label: 'Minimize maximum (or maximize minimum)' },
  { value: 'longest_valid_subarray', label: 'Contiguous window / subarray' },
];

const PROPERTY_OPTIONS = [
  { value: 'limited_steps', label: 'Limited steps or edge count' },
  { value: 'binary_weights', label: 'Edge weights strictly 0 or 1' },
  { value: 'strictly_increasing', label: 'Strictly increasing values (acyclic)' },
  { value: 'state_machine', label: 'Mutually exclusive states (cooldown/fee)' },
  { value: 'none', label: 'Standard textbook problem without extra flags' },
];

export function DiagnosticWizard({ onSelectPattern }) {
  const [structure, setStructure] = useState('graph');
  const [constraints, setConstraints] = useState('n_10_5');
  const [goal, setGoal] = useState('k_steps');
  const [property, setProperty] = useState('limited_steps');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const runDiagnosis = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await diagnoseWizard({ 
        structure, 
        constraints, 
        goal, 
        property,
        properties: [property]
      });
      setResults(data);
    } catch (err) {
      console.error('Diagnosis failed:', err);
      setError(err.message || 'Failed to infer pattern');
    } finally {
      setLoading(false);
    }
  };

  // Initial diagnosis on mount
  useEffect(() => {
    runDiagnosis();
  }, []);

  const candidateList = results?.candidates || results?.results || (Array.isArray(results) ? results : []);
  const topMatch = candidateList[0];
  const otherCandidates = candidateList.slice(1);

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-heading text-[32px] font-bold text-[#1e2033] leading-tight">
          Pattern finder
        </h1>
        <p className="text-[16px] text-[#475569] mt-1">
          Describe the problem and get the most likely pattern.
        </p>
      </div>

      {/* Card with a 2x2 grid of labelled fields */}
      <Card className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Data structure */}
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-[#1e2033] block">
              1. Data structure
            </label>
            <select
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
              className="asymptote-input w-full cursor-pointer"
            >
              {STRUCTURE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Input size (N) */}
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-[#1e2033] block">
              2. Input size (N)
            </label>
            <select
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="asymptote-input w-full cursor-pointer"
            >
              {CONSTRAINTS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Goal */}
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-[#1e2033] block">
              3. Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="asymptote-input w-full cursor-pointer"
            >
              {GOAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Special condition */}
          <div className="space-y-2">
            <label className="text-[14px] font-bold text-[#1e2033] block">
              4. Special condition
            </label>
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="asymptote-input w-full cursor-pointer"
            >
              {PROPERTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary 'Find pattern' button below (was 'Re-run Diagnosis') */}
        <div className="pt-2">
          <button
            type="button"
            onClick={runDiagnosis}
            disabled={loading}
            className="btn-primary !py-2.5 !px-5"
          >
            {loading ? 'Finding pattern...' : 'Find pattern'}
          </button>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-[#fda4af] bg-[#fff1f2] text-[#9f1239] text-[14px]">
          {error}
        </Card>
      )}

      {/* Heading 'Top match' and Result Card */}
      {topMatch && (
        <div className="space-y-3">
          <h3 className="font-heading text-[18px] font-bold text-[#1e2033]">
            Top match
          </h3>

          {(() => {
            const pattern = topMatch.pattern || {};
            const patternId = pattern.id || topMatch.pattern_id;
            const patternTitle = pattern.title || topMatch.pattern_id;

            return (
              <Card className="space-y-4">
                {/* Header row: Pattern Name (22px), difficulty chip, Match 97 chip */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-heading text-[22px] font-bold text-[#1e2033]">
                    {patternTitle}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Chip variant={(pattern.difficulty || 'medium').toLowerCase()}>
                      {pattern.difficulty || 'Medium'}
                    </Chip>
                    <Chip variant="neutral">
                      Match {topMatch.score}
                    </Chip>
                  </div>
                </div>

                {/* A Time and Space line */}
                <div className="font-mono text-[13px] text-[#475569]">
                  {pattern.complexity || 'Time: O(N) • Space: O(1)'}
                </div>

                {/* Short description */}
                {pattern.short_description && (
                  <p className="text-[15px] text-[#334155] leading-relaxed">
                    {pattern.short_description}
                  </p>
                )}

                {/* Bordered 'Why this pattern' box (#f6f8fa background, 1px border, radius 10) */}
                {topMatch.reason && (
                  <div className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-[10px] p-4 space-y-1">
                    <span className="font-bold text-[14px] text-[#1e2033] block">
                      Why this pattern
                    </span>
                    <p className="text-[14px] text-[#475569] leading-relaxed">
                      {topMatch.reason}
                    </p>
                  </div>
                )}

                {/* Primary 'View blueprint' button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectPattern(patternId)}
                    className="btn-primary"
                  >
                    View blueprint
                  </button>
                </div>
              </Card>
            );
          })()}
        </div>
      )}

      {/* Additional Matches (if any) */}
      {otherCandidates.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="font-heading text-[18px] font-bold text-[#1e2033]">
            Other candidate matches
          </h3>

          <Card className="!p-0 overflow-hidden">
            <div className="divide-y divide-[#e2e8f0]">
              {otherCandidates.map((cand, idx) => {
                const pat = cand.pattern || {};
                const pId = pat.id || cand.pattern_id;
                const pTitle = pat.title || cand.pattern_id;

                return (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#1e2033]">{pTitle}</span>
                        <Chip variant="neutral">Match {cand.score}</Chip>
                      </div>
                      <p className="text-[14px] text-[#64748b] line-clamp-1">{pat.short_description}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPattern(pId)}
                      className="btn-secondary !py-1.5 !px-3.5 !text-[13px] shrink-0 self-start sm:self-auto"
                    >
                      View blueprint
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
