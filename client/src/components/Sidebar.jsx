import React from 'react';
import { 
  Compass, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  LayoutDashboard, 
  ChevronLeft, 
  ChevronRight, 
  Puzzle, 
  RefreshCw,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, stats, openSyncModal, openExtensionModal }) {
  // Simplified, short section names
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'patterns', label: 'Patterns', icon: Compass },
    { id: 'solver', label: 'Solver', icon: Lightbulb },
    { id: 'wizard', label: 'Wizard', icon: Sparkles },
    { id: 'solved', label: 'Solved', icon: CheckCircle2, badge: stats?.totalSolved ? `${stats.totalSolved}` : null },
  ];

  const username = stats?.username || 'Rijul-Sitpure';
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r border-[#eef0f4] bg-[#ffffff] transition-all duration-300 z-40 select-none",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#eef0f4]">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Minimalist 3D architectural motif logo */}
          <div className="w-8 h-8 rounded-lg bg-[#1e2033] flex items-center justify-center shadow-sm shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm text-[#1e2033] tracking-tight">
                OpenLeet
              </span>
              <span className="text-[11px] text-[#646e82] truncate">
                Pattern Intelligence
              </span>
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded-md text-[#646e82] hover:text-[#1e2033] hover:bg-[#f4f5f8] transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 px-2.5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all",
                isActive 
                  ? "bg-[#f4f5f9] text-[#1e2033] font-semibold border border-[rgba(30,32,51,0.06)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" 
                  : "text-[#646e82] hover:text-[#1e2033] hover:bg-[#f8f9fa] font-medium"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={cn("w-4 h-4 shrink-0 transition-transform", isActive ? "text-[#1e2033]" : "text-[#646e82]")} />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between text-left truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-[#ffffff] border border-[#eef0f4] text-[#646e82]">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Left: Synced User Profile & System Status */}
      <div className="p-3 border-t border-[#eef0f4] space-y-2.5 bg-[#fcfcfd]">
        {/* Synced User Card at Bottom Left */}
        <div 
          onClick={openSyncModal}
          className={cn(
            "p-2 rounded-xl bg-[#ffffff] border border-[#eef0f4] shadow-[0_1px_3px_rgba(0,0,0,0.02)] cursor-pointer hover:border-slate-300 transition-all flex items-center gap-2.5",
            isCollapsed && "justify-center p-1.5"
          )}
          title="Click to Sync LeetCode"
        >
          <div className="w-7 h-7 rounded-full bg-[#1e2033] text-[#ffffff] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
            {userInitial}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1e2033] truncate">{username}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              </div>
              <span className="text-[10px] text-[#646e82] truncate block">
                {stats?.totalSolved || 0} Solved • Synced
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={openSyncModal}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#ffffff] hover:bg-[#f4f5f8] border border-[#eef0f4] text-[11px] font-medium text-[#1e2033] transition-colors",
              isCollapsed && "p-2"
            )}
            title="Sync Solved Problems"
          >
            <RefreshCw className="w-3 h-3 text-[#1e2033] shrink-0" />
            {!isCollapsed && <span>Sync</span>}
          </button>

          <button 
            onClick={openExtensionModal}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#ffffff] hover:bg-[#f4f5f8] border border-[#eef0f4] text-[11px] font-medium text-[#646e82] hover:text-[#1e2033] transition-colors",
              isCollapsed && "p-2"
            )}
            title="Chrome Extension Guide"
          >
            <Puzzle className="w-3 h-3 shrink-0" />
            {!isCollapsed && <span>Extension</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
