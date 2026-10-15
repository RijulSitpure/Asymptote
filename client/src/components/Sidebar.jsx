import React from 'react';
import { 
  Compass, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Puzzle, 
  RefreshCw 
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, stats, openSyncModal, openExtensionModal }) {
  const navItems = [
    { id: 'dashboard', label: 'Analytics & Mastery', icon: BarChart3, badge: stats?.totalSolved ? `${stats.totalSolved} solved` : null },
    { id: 'atlas', label: 'Pattern Atlas', icon: Compass, badge: '37 Archetypes' },
    { id: 'socratic', label: 'Socratic Hints & Big-O', icon: Lightbulb, badge: 'Zero Spoilers' },
    { id: 'wizard', label: 'Diagnostic Wizard', icon: Sparkles, badge: 'Inference' },
    { id: 'problems', label: 'Solved Problems Log', icon: CheckCircle2, badge: stats?.totalSolved ? `${stats.totalSolved}` : null },
  ];

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r border-zinc-800/80 bg-zinc-950 transition-all duration-300 z-40 select-none",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm text-zinc-100 tracking-tight flex items-center gap-1.5">
                OpenLeet <span className="text-indigo-400">AI</span>
              </span>
              <span className="text-[11px] text-zinc-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Socratic Coach
              </span>
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                isActive 
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")} />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between text-left truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-mono ml-1.5 shrink-0",
                      isActive ? "bg-white/20 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Action Footer */}
      <div className="p-3 border-t border-zinc-800/80 space-y-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={openSyncModal}
          className={cn(
            "w-full justify-start gap-2 bg-zinc-900/80 border-zinc-800 hover:bg-zinc-800/70 text-zinc-200 text-xs",
            isCollapsed && "px-2 justify-center"
          )}
          title="Sync LeetCode Problems"
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          {!isCollapsed && <span className="truncate">Sync LeetCode</span>}
        </Button>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={openExtensionModal}
          className={cn(
            "w-full justify-start gap-2 text-zinc-400 hover:text-indigo-300 hover:bg-indigo-500/10 text-xs",
            isCollapsed && "px-2 justify-center"
          )}
          title="Chrome Extension Guide"
        >
          <Puzzle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          {!isCollapsed && <span className="truncate">Chrome Extension</span>}
        </Button>

        {!isCollapsed && (
          <div className="pt-2 px-1 text-[10px] text-zinc-500 flex items-center justify-between">
            <span>Local SQLite: Port 3001</span>
            <span className="text-emerald-400 font-mono">100% Private</span>
          </div>
        )}
      </div>
    </aside>
  );
}
