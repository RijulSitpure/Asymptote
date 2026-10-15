import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
      <Card className="bg-zinc-900/80 border-zinc-800/80 p-6">
        <div className="max-w-2xl">
          <Badge variant="outline" className="text-indigo-400 bg-indigo-500/10 border-indigo-500/20 text-xs mb-3 gap-1.5 py-1">
            <Cpu className="w-3.5 h-3.5" />
            Pattern Inference Engine
          </Badge>
          <h2 className="text-xl font-bold text-zinc-100">Pattern Diagnostic Wizard</h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Facing a completely new problem and have no idea which pattern applies? Answer these 4 diagnostic questions based on the problem statement and constraints.
          </p>
        </div>

        {/* 4 Diagnostic Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Question 1: Data Structure */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-mono">1</span>
              Underlying Data Structure or Geometry
            </label>
            <select
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="graph">General Graph (nodes and edges with weights)</option>
              <option value="dag">Directed Acyclic Graph (DAG / strict topological order)</option>
              <option value="tree">Tree (connected, acyclic, N nodes, N-1 edges)</option>
              <option value="grid">2D Grid / Matrix</option>
              <option value="array">1D Array / Sequence of numbers</option>
              <option value="string">String / Characters</option>
            </select>
          </div>

          {/* Question 2: Constraints */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-mono">2</span>
              What are the Constraints on N?
            </label>
            <select
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="n_small">N &le; 16 (Exponential / 2^N Bitmask possible)</option>
              <option value="n_400">N &le; 400 (O(N^3) Interval DP / Floyd-Warshall)</option>
              <option value="n_2000">N &le; 2000 (O(N^2) 2D Dynamic Programming)</option>
              <option value="n_10_5">N &le; 10^5 (O(N) or O(N log N) Linear / Stack / Binary Search)</option>
              <option value="range_10_9">Answer is in range 1 to 10^9 (Binary Search on Answer Space)</option>
            </select>
          </div>

          {/* Question 3: Output Objective */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-mono">3</span>
              What is the Target Output?
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="k_steps">Shortest / Cheapest path with at most K steps or time limit</option>
              <option value="shortest_all_nodes">Visit all nodes / collect all keys / TSP</option>
              <option value="longest_path">Longest path or sequence length</option>
              <option value="all_roots">Calculate answer for every node as root of tree</option>
              <option value="next_greater">Next / Previous greater or smaller element</option>
              <option value="merge">Merge adjacent elements or burst balloons</option>
              <option value="min_max">Minimize the maximum (or maximize the minimum)</option>
              <option value="longest_valid_subarray">Longest / Shortest contiguous subarray</option>
            </select>
          </div>

          {/* Question 4: Twist / Property */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-mono">4</span>
              Special Nuance / Twist Signal
            </label>
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="limited_steps">Limited steps or restricted turns</option>
              <option value="binary_weights">Edge weights are strictly 0 or 1</option>
              <option value="strictly_increasing">Strictly increasing values (eliminates cycles!)</option>
              <option value="state_machine">Mutually exclusive modes (e.g. cooldown / fee)</option>
              <option value="none">Standard textbook problem without extra flags</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={runDiagnosis}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-xs font-semibold gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Evaluating...' : 'Diagnose Best Pattern'}</span>
          </Button>
        </div>
      </Card>

      {/* Diagnostic Results */}
      {results && results.candidates && results.candidates.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Top Matching Algorithmic Patterns ({results.candidates.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.candidates.map((c, idx) => (
              <Card key={idx} className="bg-zinc-900/80 border-zinc-800/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10 text-xs">
                    Match Score: {c.score} pts
                  </Badge>
                  <span className="text-[10px] font-mono text-zinc-500">Rank #{idx + 1}</span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-zinc-100">{c.pattern?.title || c.pattern_id}</h4>
                  <p className="text-xs text-zinc-400 mt-1">{c.pattern?.short_description}</p>
                </div>

                <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80 text-xs text-zinc-300">
                  <span className="font-semibold text-zinc-200 block mb-0.5">Why this fits:</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">{c.reason}</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelectPattern(c.pattern?.id || c.pattern_id)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 border-indigo-500/30 gap-1.5"
                  >
                    <span>View Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
