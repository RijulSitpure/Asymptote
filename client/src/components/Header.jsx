import React from 'react';
import { ChevronRight, Search, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Header({ activeTab, openSyncModal, quickProblemSearch, setQuickProblemSearch, onSearchSubmit }) {
  const tabTitles = {
    dashboard: 'Analytics & Mastery Radar',
    atlas: 'Algorithmic Pattern Atlas',
    socratic: 'Socratic Hints & Complexity Targeter',
    wizard: 'Pattern Diagnostic Wizard',
    problems: 'Solved Catalog & Pattern Mastery Log',
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="h-16 sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-zinc-500 font-medium">OpenLeet AI</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-400 font-medium">Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-100 font-semibold">{tabTitles[activeTab] || 'Overview'}</span>
      </div>

      {/* Global Quick Problem Jump */}
      <div className="flex items-center gap-3">
        <div className="relative w-64 hidden sm:block">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={quickProblemSearch}
            onChange={(e) => setQuickProblemSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search # / slug (e.g. 787, 329)..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-mono"
          />
        </div>

        <Button 
          onClick={openSyncModal}
          size="sm"
          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 text-xs gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sync</span>
        </Button>
      </div>
    </header>
  );
}
