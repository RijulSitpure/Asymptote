import { 
  LayoutDashboard, 
  RotateCcw, 
  Compass, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  stats 
}) {
  const totalSolved = stats?.totalSolved ?? stats?.solvedCount ?? 0;
  const queueCount = stats?.weakSpots?.length || 0;

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'queue', label: 'Review', icon: RotateCcw, badge: queueCount > 0 ? `${queueCount}` : null },
    { id: 'patterns', label: 'Patterns', icon: Compass },
    { id: 'solver', label: 'Solver', icon: Lightbulb },
    { id: 'wizard', label: 'Pattern finder', icon: Sparkles },
    { id: 'solved', label: 'Solved', icon: CheckCircle2, badge: totalSolved > 0 ? `${totalSolved}` : null },
  ];

  const username = stats?.username || 'Rijul-Sitpure';
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <aside 
      className="w-[232px] h-screen sticky top-0 shrink-0 flex flex-col border-r border-[#e2e8f0] bg-[#ffffff] z-40 select-none"
    >
      {/* Top: 32px tile + wordmark */}
      <div className="h-16 flex items-center px-5 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <img 
            src="./asymptote-icon-small.svg" 
            alt="Asymptote" 
            className="w-8 h-8 shrink-0 block" 
            width="32" 
            height="32" 
          />
          <span className="font-bold text-[20px] text-[#1e2033] font-heading leading-none">
            Asymptote
          </span>
        </div>
      </div>

      {/* Navigation Items: 18px line icon, 15px label, 10px 12px padding, radius 8 */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
                isActive 
                  ? 'bg-[#ecfdf5] text-[#1e2033] font-bold' 
                  : 'text-[#475569] hover:text-[#1e2033] hover:bg-[#f8fafc] font-medium'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon 
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive ? 'text-[#059669]' : 'text-[#64748b]'
                  }`} 
                  strokeWidth={2}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] font-medium leading-none">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: avatar circle (slate, white initial), "Synced with LeetCode", and an 8px emerald dot */}
      <div className="p-4 border-t border-[#e2e8f0] bg-[#ffffff]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1e2033] text-[#ffffff] flex items-center justify-center font-bold text-xs shrink-0">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-[#334155] truncate">
                Synced with LeetCode
              </span>
              <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" title="Connected"></span>
            </div>
            <span className="text-[12px] text-[#64748b] truncate block">
              {username}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
