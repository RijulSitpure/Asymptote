import React, { useState, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Search, ChevronDown, ChevronUp, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function PatternAtlas({ patterns, selectedPatternId }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(selectedPatternId || null);
  const [langTab, setLangTab] = useState('py'); // 'py' | 'cpp'
  const [copiedId, setCopiedId] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(patterns.map(p => p.category));
    return ['all', ...Array.from(set)];
  }, [patterns]);

  // Filter patterns
  const filteredPatterns = useMemo(() => {
    return patterns.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.short_description && p.short_description.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [patterns, selectedCategory, search]);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search and Category Filters */}
      <div className="sarvam-card p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#a0a8b7] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 37+ algorithmic patterns..."
            className="w-full bg-[#f8f9fc] border border-[#eef0f4] rounded-full pl-9 pr-4 py-2 text-xs text-[#1e2033] placeholder-[#a0a8b7] focus:outline-none focus:border-[#1e2033] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#f8f9fc] border border-[#eef0f4] rounded-full px-4 py-2 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? `All Categories (${patterns.length})` : c}
              </option>
            ))}
          </select>
          <span className="text-xs font-mono text-[#646e82] bg-[#f8f9fc] border border-[#eef0f4] px-3 py-2 rounded-full">
            {filteredPatterns.length}
          </span>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="space-y-3">
        {filteredPatterns.map(pattern => {
          const isExpanded = expandedId === pattern.id;
          const code = langTab === 'py' ? (pattern.base_template_py || '# Python template coming soon') : (pattern.base_template_cpp || '// C++ template coming soon');

          return (
            <div key={pattern.id} className="sarvam-card overflow-hidden">
              <div 
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-[#fafafc] transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : pattern.id)}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold uppercase text-[#1e2033] bg-[#f4f5f9] border border-[#eef0f4] px-2.5 py-0.5 rounded-full">
                      {pattern.category}
                    </span>
                    <span className="text-xs font-medium text-[#646e82] bg-[#f8f9fc] border border-[#eef0f4] px-2 py-0.5 rounded-full">
                      {pattern.difficulty || 'Medium'}
                    </span>
                    <span className="text-xs font-mono text-[#646e82]">{pattern.complexity}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#1e2033] tracking-tight">{pattern.title}</h4>
                  <p className="text-xs text-[#646e82] line-clamp-1">{pattern.short_description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs text-[#646e82] font-medium">
                    {isExpanded ? 'Hide' : 'Inspect'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[#646e82]" /> : <ChevronDown className="w-4 h-4 text-[#646e82]" />}
                </div>
              </div>

              {/* Expanded Inspection */}
              {isExpanded && (
                <div className="border-t border-[#eef0f4] p-5 sm:p-6 space-y-5 bg-[#fafafc]">
                  {/* Triggers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#ffffff] p-4 rounded-xl border border-[#eef0f4] space-y-2">
                      <span className="text-xs font-semibold text-[#1e2033] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1e2033]" />
                        Recognition Signals
                      </span>
                      <ul className="space-y-1.5">
                        {(pattern.mental_triggers || []).slice(0, 3).map((trig, idx) => (
                          <li key={idx} className="text-xs text-[#646e82] flex items-start gap-2">
                            <span className="text-[#1e2033] font-bold">•</span>
                            <span>{trig}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#ffffff] p-4 rounded-xl border border-[#eef0f4] space-y-2">
                      <span className="text-xs font-semibold text-[#1e2033] flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Constraint Clues
                      </span>
                      <ul className="space-y-1.5">
                        {(pattern.constraint_signals || []).slice(0, 3).map((sig, idx) => (
                          <li key={idx} className="text-xs text-[#646e82] flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{sig}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Monaco Code Editor */}
                  <div className="bg-[#ffffff] p-4 rounded-xl border border-[#eef0f4] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setLangTab('py')}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium transition-all",
                            langTab === 'py' ? "bg-[#1e2033] text-white shadow-sm" : "text-[#646e82] hover:text-[#1e2033] bg-[#f8f9fc]"
                          )}
                        >
                          Python 3
                        </button>
                        <button
                          onClick={() => setLangTab('cpp')}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium transition-all",
                            langTab === 'cpp' ? "bg-[#1e2033] text-white shadow-sm" : "text-[#646e82] hover:text-[#1e2033] bg-[#f8f9fc]"
                          )}
                        >
                          C++
                        </button>
                      </div>

                      <button
                        onClick={() => handleCopy(pattern.id, code)}
                        className="sarvam-btn-secondary px-3 py-1 text-xs flex items-center gap-1.5"
                      >
                        {copiedId === pattern.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === pattern.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-[#eef0f4]">
                      <Editor
                        height="220px"
                        language={langTab === 'py' ? 'python' : 'cpp'}
                        theme="vs-dark"
                        value={code}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 12,
                          lineNumbers: 'on',
                          scrollBeyondLastLine: false,
                          fontFamily: 'JetBrains Mono, Menlo, monospace',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
