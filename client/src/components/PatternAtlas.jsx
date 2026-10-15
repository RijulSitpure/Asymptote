import React, { useState, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Search, ChevronDown, ChevronUp, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
        (p.short_description && p.short_description.toLowerCase().includes(q)) ||
        (p.mental_triggers && p.mental_triggers.some(t => t.toLowerCase().includes(q)));
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
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 37+ patterns, triggers, or concepts..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? `All Categories (${patterns.length})` : c}
              </option>
            ))}
          </select>
          <Badge variant="outline" className="text-zinc-400 border-zinc-800 text-xs px-2.5 py-1">
            {filteredPatterns.length} Found
          </Badge>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPatterns.map(pattern => {
          const isExpanded = expandedId === pattern.id;
          const code = langTab === 'py' ? (pattern.base_template_py || '# Python template coming soon') : (pattern.base_template_cpp || '// C++ template coming soon');

          return (
            <Card key={pattern.id} className="bg-zinc-900/80 border-zinc-800/80 overflow-hidden">
              <div 
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-zinc-800/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : pattern.id)}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                      {pattern.category}
                    </span>
                    <Badge variant="outline" className="text-[10px] text-zinc-400 border-zinc-800">
                      {pattern.difficulty || 'Medium'}
                    </Badge>
                    <span className="text-[11px] font-mono text-zinc-400">{pattern.complexity}</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-100">{pattern.title}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-1">{pattern.short_description}</p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-400 gap-1">
                    <span>{isExpanded ? 'Collapse' : 'View Blueprint'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-zinc-800/80 p-5 space-y-4 bg-zinc-950/40">
                  {/* Triggers & Signals Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        Mental Recognition Triggers
                      </span>
                      <ul className="space-y-1.5">
                        {(pattern.mental_triggers || []).map((trig, idx) => (
                          <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/60">
                            <span className="text-indigo-400">•</span>
                            <span>{trig}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        Constraint Signals
                      </span>
                      <ul className="space-y-1.5">
                        {(pattern.constraint_signals || []).map((sig, idx) => (
                          <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/60">
                            <span className="text-amber-400">•</span>
                            <span>{sig}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Interview Twists Callout */}
                  {pattern.twists && pattern.twists.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Interview Mutation Twists
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {pattern.twists.map((tw, idx) => (
                          <div key={idx} className="bg-zinc-950/50 p-2.5 rounded-lg border border-zinc-800/80">
                            <strong className="text-zinc-200 block mb-0.5">{tw.title}</strong>
                            <span className="text-zinc-400 text-[11px] leading-relaxed">{tw.explanation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Monaco Code Editor Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant={langTab === 'py' ? 'default' : 'outline'}
                          onClick={() => setLangTab('py')}
                          className="h-7 text-xs px-2.5"
                        >
                          Python 3
                        </Button>
                        <Button 
                          size="sm" 
                          variant={langTab === 'cpp' ? 'default' : 'outline'}
                          onClick={() => setLangTab('cpp')}
                          className="h-7 text-xs px-2.5"
                        >
                          C++
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(pattern.id, code)}
                        className="h-7 text-xs text-zinc-400 hover:text-zinc-100 gap-1.5"
                      >
                        {copiedId === pattern.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === pattern.id ? 'Copied' : 'Copy Blueprint'}</span>
                      </Button>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#1e1e1e]">
                      <Editor
                        height="240px"
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
            </Card>
          );
        })}
      </div>
    </div>
  );
}
