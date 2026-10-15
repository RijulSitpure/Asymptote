import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Compass, 
  AlertCircle,
  Flame 
} from 'lucide-react';

export function StatsDashboard({ stats, patterns, onSelectPattern, onPracticeWeakSpot }) {
  if (!stats) {
    return (
      <div className="p-12 text-center text-[#646e82]">
        Loading overview...
      </div>
    );
  }

  // Category distribution data
  const categoryData = (stats.categoryDistribution || []).map(c => ({
    name: c.category.length > 12 ? c.category.slice(0, 12) + '…' : c.category,
    fullName: c.category,
    count: c.count
  }));

  // Difficulty breakdown data
  const diffData = [
    { name: 'Easy', value: stats.difficultyBreakdown?.Easy || 0, color: '#10b981' },
    { name: 'Medium', value: stats.difficultyBreakdown?.Medium || 0, color: '#f59e0b' },
    { name: 'Hard', value: stats.difficultyBreakdown?.Hard || 0, color: '#ef4444' }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      {/* Hero Welcome with Sarvam atmospheric subtle glow */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-[#ffffff] border border-[rgba(30,32,51,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 sarvam-glow pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-[#646e82] uppercase tracking-wider">
              Pattern Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e2033] tracking-tight">
              Overview
            </h2>
            <p className="text-xs sm:text-sm text-[#646e82] max-w-xl leading-relaxed">
              Real-time algorithmic mastery, constraint readiness, and priority review queues.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#f8f9fc] border border-[#eef0f4] rounded-2xl px-5 py-3 text-center">
              <span className="text-[11px] text-[#646e82] block font-medium">Curated Archetypes</span>
              <span className="text-xl font-extrabold text-[#1e2033]">{stats.totalPatternsCount || 37}</span>
            </div>
            <div className="bg-[#f8f9fc] border border-[#eef0f4] rounded-2xl px-5 py-3 text-center">
              <span className="text-[11px] text-[#646e82] block font-medium">Active Coverage</span>
              <span className="text-xl font-extrabold text-[#1e2033]">{stats.patternCoveragePercent || 0}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Focused Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Solved Questions */}
        <div className="sarvam-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#646e82] uppercase tracking-wider">Solved Problems</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <h3 className="text-4xl font-extrabold text-[#1e2033] mt-3">
              {stats.totalSolved || 0}
            </h3>
          </div>
          <div className="mt-4 pt-4 border-t border-[#f4f5f8] flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-[11px]">
              {stats.difficultyBreakdown?.Easy || 0} Easy
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium text-[11px]">
              {stats.difficultyBreakdown?.Medium || 0} Med
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-medium text-[11px]">
              {stats.difficultyBreakdown?.Hard || 0} Hard
            </span>
          </div>
        </div>

        {/* Card 2: Pattern Coverage */}
        <div className="sarvam-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#646e82] uppercase tracking-wider">Pattern Coverage</span>
              <Compass className="w-4 h-4 text-[#1e2033]" />
            </div>
            <h3 className="text-4xl font-extrabold text-[#1e2033] mt-3">
              {stats.coveredPatternsCount || 0} <span className="text-lg font-normal text-[#646e82]">/ {stats.totalPatternsCount || 37}</span>
            </h3>
          </div>
          <div className="mt-4 pt-4 border-t border-[#f4f5f8]">
            <div className="w-full bg-[#f4f5f8] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#1e2033] h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.patternCoveragePercent || 0}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-[#646e82] mt-1.5 block">
              {stats.patternCoveragePercent || 0}% of core patterns solved at least once
            </span>
          </div>
        </div>

        {/* Card 3: Priority Review Queue */}
        <div className="sarvam-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#646e82] uppercase tracking-wider">Review Queue</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-4xl font-extrabold text-amber-600 mt-3">
              {stats.weakSpots?.length || 0}
            </h3>
          </div>
          <div className="mt-4 pt-4 border-t border-[#f4f5f8] text-xs text-[#646e82]">
            <span>High-frequency archetypes needing first solve</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution Bar Chart */}
        <div className="sarvam-card lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-[#1e2033]">Category Distribution</h4>
              <p className="text-xs text-[#646e82]">Questions mastered across algorithmic domains</p>
            </div>
            <span className="text-xs font-mono text-[#646e82] bg-[#f8f9fc] border border-[#eef0f4] px-2.5 py-1 rounded-full">
              {categoryData.length} Domains
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -25, bottom: 25 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#646e82', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} 
                  angle={-25} 
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: '#646e82', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid rgba(30,32,51,0.1)', 
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#1e2033',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                  }}
                  formatter={(value, name, item) => [value, item.payload.fullName]}
                />
                <Bar dataKey="count" fill="#1e2033" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty Donut Chart */}
        <div className="sarvam-card p-6 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <h4 className="font-bold text-sm text-[#1e2033]">Difficulty Ratio</h4>
              <p className="text-xs text-[#646e82]">Distribution of solved catalog</p>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diffData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {diffData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid rgba(30,32,51,0.1)', 
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#1e2033'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#f4f5f8]">
            {diffData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[#646e82]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                  {d.name}
                </span>
                <span className="font-semibold text-[#1e2033] font-mono">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Review Queue */}
      <div className="sarvam-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-sm text-[#1e2033]">Priority Review Queue</h4>
          </div>
          <span className="text-xs text-[#646e82]">Targeted archetypes for interview readiness</span>
        </div>

        {(!stats.weakSpots || stats.weakSpots.length === 0) ? (
          <div className="p-8 text-center text-xs text-[#646e82]">
            ✨ Excellent! You have solved questions across all pattern archetypes.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.weakSpots.slice(0, 6).map((ws) => (
              <div 
                key={ws.id} 
                className="p-4 rounded-xl bg-[#fbfbfc] border border-[#eef0f4] hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#646e82] font-semibold uppercase">{ws.category}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                      0 Solved
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-[#1e2033] mb-1">{ws.title}</h5>
                  <p className="text-[11px] text-[#646e82] line-clamp-2 leading-relaxed">
                    {ws.short_description || 'High-frequency algorithmic pattern archetype.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f4f5f8] flex items-center justify-between">
                  <span className="text-[10px] text-[#a0a8b7] font-mono">{ws.difficulty || 'Medium'}</span>
                  <button 
                    onClick={() => onPracticeWeakSpot(ws.id)}
                    className="sarvam-btn-secondary px-3 py-1 text-xs flex items-center gap-1"
                  >
                    <span>Practice</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
