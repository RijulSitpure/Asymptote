import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export function DiagnosticWizard({ onSelectPattern }) {
  const [structure, setStructure] = useState('graph');
  const [constraints, setConstraints] = useState('n_10_5');
  const [goal, setGoal] = useState('k_steps');
  const [property, setProperty] = useState('limited_steps');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const runDiagnosis = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wizard/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ structure, constraints, goal, property })
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Diagnosis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Wizard Header */}
      <div className="sarvam-card p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#646e82] uppercase tracking-wider">
            Inference Engine
          </span>
          <h2 className="text-2xl font-extrabold text-[#1e2033] tracking-tight">Wizard</h2>
          <p className="text-xs text-[#646e82] max-w-xl">
            Unsure which pattern applies? Answer 4 quick questions about structure and bounds to deduce the optimal approach.
          </p>
        </div>

        {/* 4 Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Question 1: Data Structure */}
          <div className="p-4 rounded-xl bg-[#f8f9fc] border border-[#eef0f4] space-y-2">
            <label className="text-xs font-semibold text-[#1e2033] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1e2033] text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
              Data Structure or Geometry
            </label>
            <select
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
              className="w-full bg-[#ffffff] border border-[#eef0f4] rounded-lg px-3 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
            >
              <option value="graph">General Graph (nodes & weighted edges)</option>
              <option value="dag">Directed Acyclic Graph (DAG / topological)</option>
              <option value="tree">Tree (connected, acyclic, N nodes, N-1 edges)</option>
              <option value="grid">2D Grid / Matrix</option>
              <option value="array">1D Array / Sequence</option>
              <option value="string">String / Characters</option>
            </select>
          </div>

          {/* Question 2: Constraints */}
          <div className="p-4 rounded-xl bg-[#f8f9fc] border border-[#eef0f4] space-y-2">
            <label className="text-xs font-semibold text-[#1e2033] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1e2033] text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
              Scale Constraints on N
            </label>
            <select
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="w-full bg-[#ffffff] border border-[#eef0f4] rounded-lg px-3 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
            >
              <option value="n_small">N &le; 16 (Exponential / 2^N Bitmask)</option>
              <option value="n_400">N &le; 400 (O(N^3) Interval DP / Floyd-Warshall)</option>
              <option value="n_2000">N &le; 2000 (O(N^2) 2D DP)</option>
              <option value="n_10_5">N &le; 10^5 (O(N) or O(N log N) Linear / Binary Search)</option>
              <option value="range_10_9">Answer in range 1 to 10^9 (Binary Search on Answer)</option>
            </select>
          </div>

          {/* Question 3: Output Objective */}
          <div className="p-4 rounded-xl bg-[#f8f9fc] border border-[#eef0f4] space-y-2">
            <label className="text-xs font-semibold text-[#1e2033] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1e2033] text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
              Target Objective
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-[#ffffff] border border-[#eef0f4] rounded-lg px-3 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
            >
              <option value="k_steps">Shortest path with at most K steps / threshold</option>
              <option value="shortest_all_nodes">Visit all nodes / collect all keys / TSP</option>
              <option value="longest_path">Longest path or sequence length</option>
              <option value="all_roots">Calculate answer for every node as root of tree</option>
              <option value="next_greater">Next / Previous greater element</option>
              <option value="merge">Merge adjacent elements or burst balloons</option>
              <option value="min_max">Minimize maximum (or maximize minimum)</option>
              <option value="longest_valid_subarray">Contiguous window / subarray</option>
            </select>
          </div>

          {/* Question 4: Twist / Special Property */}
          <div className="p-4 rounded-xl bg-[#f8f9fc] border border-[#eef0f4] space-y-2">
            <label className="text-xs font-semibold text-[#1e2033] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1e2033] text-white flex items-center justify-center text-xs font-mono font-bold">4</span>
              Special Nuance / Signal
            </label>
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full bg-[#ffffff] border border-[#eef0f4] rounded-lg px-3 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
            >
              <option value="limited_steps">Limited steps or edge count</option>
              <option value="binary_weights">Edge weights strictly 0 or 1</option>
              <option value="strictly_increasing">Strictly increasing values (acyclic)</option>
              <option value="state_machine">Mutually exclusive states (cooldown/fee)</option>
              <option value="none">Standard textbook problem without extra flags</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={runDiagnosis}
            disabled={loading}
            className="sarvam-btn-primary px-6 py-2.5 text-xs flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loading ? 'Inferring...' : 'Diagnose Pattern'}</span>
          </button>
        </div>
      </div>

      {/* Results */}
      {results && results.candidates && results.candidates.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-[#1e2033] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Top Matching Patterns ({results.candidates.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.candidates.map((c, idx) => (
              <div key={idx} className="sarvam-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Match: {c.score} pts
                  </span>
                  <span className="text-xs font-mono text-[#a0a8b7]">Rank #{idx + 1}</span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1e2033]">{c.pattern?.title || c.pattern_id}</h4>
                  <p className="text-xs text-[#646e82] mt-1">{c.pattern?.short_description}</p>
                </div>

                <div className="bg-[#f8f9fc] p-3 rounded-xl border border-[#eef0f4] text-xs text-[#646e82]">
                  <span className="font-semibold text-[#1e2033] block mb-0.5">Rationale:</span>
                  <p className="leading-relaxed">{c.reason}</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onSelectPattern(c.pattern?.id || c.pattern_id)}
                    className="sarvam-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5"
                  >
                    <span>View Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
