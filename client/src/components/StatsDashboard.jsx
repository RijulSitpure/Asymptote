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
  CheckCircle2, 
  Brain, 
  AlertTriangle, 
  Flame, 
  ExternalLink, 
  Sparkles,
  TrendingUp 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function StatsDashboard({ stats, patterns, onSelectPattern, onPracticeWeakSpot }) {
  if (!stats) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Loading analytics & mastery radar...
      </div>
    );
  }

  // Prepare data for Category Distribution chart
  const categoryData = (stats.categoryDistribution || []).map(c => ({
    name: c.category.length > 12 ? c.category.slice(0, 12) + '…' : c.category,
    fullName: c.category,
    count: c.count
  }));

  // Prepare difficulty data for Pie Chart
  const diffData = [
    { name: 'Easy', value: stats.difficultyBreakdown?.Easy || 0, color: '#10b981' },
    { name: 'Medium', value: stats.difficultyBreakdown?.Medium || 0, color: '#f59e0b' },
    { name: 'Hard', value: stats.difficultyBreakdown?.Hard || 0, color: '#ef4444' }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Solved */}
        <Card className="bg-zinc-900/80 border-zinc-800/80 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Solved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-100">{stats.totalSolved || 0}</h3>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
              <span>{stats.difficultyBreakdown?.Easy || 0} Easy</span> • 
              <span>{stats.difficultyBreakdown?.Medium || 0} Med</span> • 
              <span>{stats.difficultyBreakdown?.Hard || 0} Hard</span>
            </p>
          </div>
        </Card>

        {/* Card 2: Pattern Coverage */}
        <Card className="bg-zinc-900/80 border-zinc-800/80 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Pattern Coverage</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-zinc-100">{stats.patternCoveragePercent || 0}%</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Active across {stats.coveredPatternsCount || 0} / {stats.totalPatternsCount || 37} patterns
            </p>
          </div>
        </Card>

        {/* Card 3: Weak Spot Alerts */}
        <Card className="bg-zinc-900/80 border-zinc-800/80 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Weak-Spot Gaps</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-extrabold text-amber-400">{stats.weakSpots?.length || 0}</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Uncovered patterns in high-frequency sets
            </p>
          </div>
        </Card>

        {/* Card 4: Synced Profile */}
        <Card className="bg-zinc-900/80 border-zinc-800/80 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Synced User</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-bold text-zinc-100 truncate">{stats.username || 'Local Catalog'}</h3>
            <p className="text-xs text-zinc-500 mt-1 truncate">
              {stats.lastSync ? `Last synced: ${new Date(stats.lastSync).toLocaleDateString()}` : 'Live auto-sync active'}
            </p>
          </div>
        </Card>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown Bar Chart */}
        <Card className="lg:col-span-2 bg-zinc-900/80 border-zinc-800/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-zinc-100">Solved Distribution by Category</h4>
              <p className="text-xs text-zinc-400">Problems mastered across core algorithmic domains</p>
            </div>
            <Badge variant="outline" className="text-[10px] text-zinc-400 border-zinc-800">
              {categoryData.length} Categories
            </Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#71717a', fontSize: 10 }} 
                  angle={-25} 
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: '#71717a', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    border: '1px solid #27272a', 
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#fafafa'
                  }}
                  formatter={(value, name, item) => [value, item.payload.fullName]}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Difficulty Donut Chart */}
        <Card className="bg-zinc-900/80 border-zinc-800/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-sm text-zinc-100">Difficulty Ratio</h4>
                <p className="text-xs text-zinc-400">Distribution of solved questions</p>
              </div>
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
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {diffData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#18181b', 
                      border: '1px solid #27272a', 
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#fafafa'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800">
            {diffData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                  {d.name}
                </span>
                <span className="font-mono font-bold text-zinc-100">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Priority Weak-Spot Review Queue */}
      <Card className="bg-zinc-900/80 border-zinc-800/80 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-sm text-zinc-100">Priority Weak-Spot Review Queue</h4>
          </div>
          <span className="text-xs text-zinc-500">Targeted patterns to raise your interview hit-rate</span>
        </div>

        {(!stats.weakSpots || stats.weakSpots.length === 0) ? (
          <div className="p-6 text-center text-xs text-zinc-500">
            🎉 Great job! You have coverage across all major patterns.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.weakSpots.slice(0, 6).map((ws) => (
              <div 
                key={ws.id} 
                className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase">{ws.category}</span>
                    <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/20 bg-amber-500/10">
                      0 Solved
                    </Badge>
                  </div>
                  <h5 className="font-semibold text-xs text-zinc-100 mb-1">{ws.title}</h5>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {ws.short_description || 'Essential interview pattern archetype.'}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-zinc-900 flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 font-mono">{ws.difficulty || 'Medium'}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onPracticeWeakSpot(ws.id)}
                    className="h-7 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 gap-1 px-2"
                  >
                    <span>View Pattern</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
