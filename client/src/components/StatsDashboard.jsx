import React from 'react';
import { Card } from './Card';
import { Chip } from './Chip';
import { ProgressBar } from './ProgressBar';

export function StatsDashboard({ 
  stats, 
  patterns = [], 
  problems = [], 
  onPracticeProblem,
  onOpenQueue 
}) {
  if (!stats) {
    return (
      <div className="p-12 text-center text-[#64748b] text-[15px]">
        Loading overview...
      </div>
    );
  }

  const totalSolved = stats.totalSolved ?? stats.solvedCount ?? 0;
  const easyCount = stats.difficultyBreakdown?.Easy || 0;
  const medCount = stats.difficultyBreakdown?.Medium || 0;
  const hardCount = stats.difficultyBreakdown?.Hard || 0;

  const totalPatternsCount = stats.totalPatternsCount ?? patterns?.length ?? 37;
  const coveredPatternsCount = stats.coveredPatternsCount ?? (stats.patternDistribution || []).filter(p => p.solved_problems > 0).length;
  const patternCoveragePercent = stats.patternCoveragePercent ?? (totalPatternsCount > 0 ? Math.round((coveredPatternsCount / totalPatternsCount) * 100) : 0);

  // Review items: problems marked for review or weak spot patterns
  const flaggedProblems = problems.filter(p => p.review_needed);
  const reviewCount = flaggedProblems.length > 0 ? flaggedProblems.length : (stats.weakSpots?.length || 0);

  // Take up to 5 review queue items
  let queueItems = [];
  if (flaggedProblems.length > 0) {
    queueItems = flaggedProblems.slice(0, 5).map(p => ({
      id: p.id,
      name: p.frontend_id ? `#${p.frontend_id} ${p.title}` : p.title,
      query: p.frontend_id ? String(p.frontend_id) : p.title_slug || p.title,
      pattern: (p.verified || p.source === 'curated') ? (p.pattern_title || 'General') : null
    }));
  } else if (stats.weakSpots && stats.weakSpots.length > 0) {
    queueItems = stats.weakSpots.slice(0, 5).map(ws => ({
      id: ws.id,
      name: ws.title || ws.pattern_title,
      query: ws.title || ws.pattern_title,
      pattern: ws.category || 'Pattern'
    }));
  }

  const maxDiffCount = Math.max(easyCount, medCount, hardCount, 1);

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-heading text-[32px] font-bold text-[#1e2033] leading-tight">
          Overview
        </h1>
        <p className="text-[16px] text-[#475569] mt-1">
          Where your practice stands.
        </p>
      </div>

      {/* Three Equal Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Solved */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-[14px] font-medium text-[#475569]">
              Solved
            </div>
            <div className="font-heading text-[40px] font-bold text-[#1e2033] mt-2 leading-none">
              {totalSolved}
            </div>
          </div>
          <div className="text-[14px] text-[#475569] mt-4">
            {easyCount} easy, {medCount} medium, {hardCount} hard
          </div>
        </Card>

        {/* Card 2: Pattern coverage */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-[14px] font-medium text-[#475569]">
              Pattern coverage
            </div>
            <div className="font-heading text-[40px] font-bold text-[#1e2033] mt-2 leading-none">
              {coveredPatternsCount} of {totalPatternsCount}
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <ProgressBar value={patternCoveragePercent} max={100} />
            <div className="text-[14px] text-[#475569]">
              {patternCoveragePercent}%
            </div>
          </div>
        </Card>

        {/* Card 3: Due for review */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-[14px] font-medium text-[#475569]">
              Due for review
            </div>
            <div className="font-heading text-[40px] font-bold text-[#1e2033] mt-2 leading-none">
              {reviewCount}
            </div>
          </div>
          <div className="text-[14px] text-[#475569] mt-4">
            problems
          </div>
        </Card>
      </div>

      {/* Below: Review Queue (2/3 width) and By Difficulty (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review Queue Card (2/3 width) */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-[18px] font-bold text-[#1e2033]">
              Review queue
            </h3>
          </div>

          {queueItems.length === 0 ? (
            <p className="text-[14px] text-[#64748b] py-6 text-center">
              No problems due for review.
            </p>
          ) : (
            <div className="divide-y divide-[#e2e8f0]">
              {queueItems.map((item) => (
                <div 
                  key={item.id} 
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className="text-[15px] font-medium text-[#1e2033] truncate">
                      {item.name}
                    </span>
                    {item.pattern && (
                      <Chip variant="neutral" className="shrink-0 max-w-[180px] sm:max-w-[240px] truncate">
                        {item.pattern}
                      </Chip>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onPracticeProblem && onPracticeProblem(item.query)}
                    className="btn-secondary !py-1.5 !px-3 !text-[13px] shrink-0"
                  >
                    Practice
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* By Difficulty Card (1/3 width) */}
        <Card className="lg:col-span-1">
          <h3 className="font-heading text-[18px] font-bold text-[#1e2033] mb-6">
            By difficulty
          </h3>

          <div className="space-y-5">
            {/* Easy Bar */}
            <div>
              <div className="flex items-center justify-between text-[14px] mb-1.5">
                <span className="font-medium text-[#047857]">Easy</span>
                <span className="font-medium text-[#1e2033]">{easyCount}</span>
              </div>
              <div className="h-2 bg-[#e2e8f0] rounded overflow-hidden w-full">
                <div 
                  className="h-full bg-[#047857] rounded transition-all duration-300"
                  style={{ width: `${(easyCount / maxDiffCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium Bar */}
            <div>
              <div className="flex items-center justify-between text-[14px] mb-1.5">
                <span className="font-medium text-[#b45309]">Medium</span>
                <span className="font-medium text-[#1e2033]">{medCount}</span>
              </div>
              <div className="h-2 bg-[#e2e8f0] rounded overflow-hidden w-full">
                <div 
                  className="h-full bg-[#b45309] rounded transition-all duration-300"
                  style={{ width: `${(medCount / maxDiffCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Hard Bar */}
            <div>
              <div className="flex items-center justify-between text-[14px] mb-1.5">
                <span className="font-medium text-[#be123c]">Hard</span>
                <span className="font-medium text-[#1e2033]">{hardCount}</span>
              </div>
              <div className="h-2 bg-[#e2e8f0] rounded overflow-hidden w-full">
                <div 
                  className="h-full bg-[#be123c] rounded transition-all duration-300"
                  style={{ width: `${(hardCount / maxDiffCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
