import React from 'react';
import { ChevronRight, Search, RefreshCw } from 'lucide-react';

export function Header({ activeTab, openSyncModal, quickProblemSearch, setQuickProblemSearch, onSearchSubmit }) {
  const tabTitles = {
    dashboard: 'Overview',
    patterns: 'Patterns',
    solver: 'Solver',
    wizard: 'Wizard',
    solved: 'Solved',
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="h-16 sticky top-0 z-30 border-b border-[#eef0f4] bg-[#ffffff]/80 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[#646e82] font-medium">OpenLeet</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#a0a8b7]" />
        <span className="text-[#1e2033] font-semibold">{tabTitles[activeTab] || 'Overview'}</span>
      </div>

      {/* Global Quick Problem Jump & Actions */}
      <div className="flex items-center gap-3">
        <div className="relative w-64 hidden sm:block">
          <Search className="w-3.5 h-3.5 text-[#a0a8b7] absolute left-3 top-2.5" />
          <input
            type="text"
            value={quickProblemSearch}
            onChange={(e) => setQuickProblemSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search # (e.g. 787)..."
            className="w-full bg-[#f8f9fc] border border-[#eef0f4] rounded-full pl-8 pr-12 py-1.5 text-xs text-[#1e2033] placeholder-[#a0a8b7] focus:outline-none focus:border-[#1e2033] focus:bg-white transition-all font-mono"
          />
          <kbd className="absolute right-2.5 top-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-[#eef0f4] text-[#a0a8b7] pointer-events-none shadow-xs">
            ⌘K
          </kbd>
        </div>

        <button 
          onClick={openSyncModal}
          className="sarvam-btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync</span>
        </button>
      </div>
    </header>
  );
}
