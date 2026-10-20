import { Search, RefreshCw, MessageSquare, CheckCircle2 } from 'lucide-react';

export function Header({ 
  activeTab, 
  openSyncModal, 
  openFeedbackModal,
  quickProblemSearch, 
  setQuickProblemSearch, 
  onSearchSubmit,
  stats
}) {
  const tabTitles = {
    dashboard: 'Overview',
    roadmap: 'Curriculum',
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
    <header className="h-[60px] sticky top-0 z-30 shrink-0 border-b border-[#e2e8f0] bg-[#ffffff] px-8 py-3 flex items-center justify-between">
      {/* Left: Page name with fixed container width so tab label length never pushes layout */}
      <div className="w-[180px] shrink-0 flex items-center">
        <span className="text-[15px] font-bold text-[#1e2033] leading-none truncate">
          {tabTitles[activeTab] || 'Overview'}
        </span>
      </div>

      {/* Center: Search box centered and stationary across all tab switches */}
      <div className="flex-1 flex justify-center px-4 hidden sm:flex">
        <div className="relative flex items-center w-full max-w-[420px]">
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

      {/* Right: Solved count badge, Feedback, and Sync */}
      <div className="shrink-0 flex items-center justify-end gap-3 min-w-[240px]">
        <div 
          className="hidden md:inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[13px] text-[#475569] shadow-2xs font-medium"
          title={`${totalSolved} problems solved`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
          <span className="font-bold text-[#1e2033]">{totalSolved}</span>
          <span className="text-[#64748b]">solved</span>
        </div>

        {openFeedbackModal && (
          <button 
            type="button"
            onClick={openFeedbackModal}
            title="Share feedback or report an issue"
            className="btn-secondary !px-2.5 !py-2 text-[13px] flex items-center gap-1.5 hover:!border-[#cbd5e1]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#64748b]" />
            <span className="hidden md:inline">Feedback</span>
          </button>
        )}

        <button 
          type="button"
          onClick={openSyncModal}
          title="Sync solved LeetCode questions"
          className="btn-primary !px-3.5 !py-2 text-[14px] flex items-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sync</span>
        </button>
      </div>
    </header>
  );
}
