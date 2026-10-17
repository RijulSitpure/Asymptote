import { Search, RefreshCw } from 'lucide-react';

export function Header({ 
  activeTab, 
  openSyncModal, 
  quickProblemSearch, 
  setQuickProblemSearch, 
  onSearchSubmit,
  stats
}) {
  const tabTitles = {
    dashboard: 'Overview',
    queue: 'Review',
    patterns: 'Patterns',
    solver: 'Solver',
    wizard: 'Pattern finder',
    solved: 'Solved',
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  const totalSolved = stats?.totalSolved ?? stats?.solvedCount ?? 0;

  return (
    <header className="h-[60px] sticky top-0 z-30 shrink-0 border-b border-[#e2e8f0] bg-[#ffffff] px-8 py-3.5 flex items-center justify-between">
      {/* Left: Page name (15px bold, DM Sans, slate) */}
      <div className="flex items-center">
        <span className="text-[15px] font-bold text-[#1e2033] leading-none">
          {tabTitles[activeTab] || 'Overview'}
        </span>
      </div>

      {/* Center: Search box (max 420px, "Search problems or patterns") */}
      <div className="flex-1 max-w-[420px] mx-6 hidden sm:block">
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={quickProblemSearch}
            onChange={(e) => setQuickProblemSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search problems or patterns"
            aria-label="Search problems or patterns"
            className="w-full bg-[#ffffff] border border-[#cbd5e1] focus:border-[#1e2033] rounded-lg pl-10 pr-10 py-2 text-[14px] text-[#1e2033] placeholder:text-[#64748b] outline-none transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <kbd className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-[#f8fafc] border border-[#e2e8f0] text-[#64748b] leading-none">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Solved count ('190 solved') and Sync button (primary, padding 10px 16px) */}
      <div className="flex items-center gap-4">
        <span className="text-[14px] text-[#475569] hidden md:inline">
          {totalSolved} solved
        </span>

        <button 
          onClick={openSyncModal}
          title="Sync solved LeetCode questions"
          className="btn-primary !px-4 !py-2.5 text-[14px]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sync</span>
        </button>
      </div>
    </header>
  );
}
