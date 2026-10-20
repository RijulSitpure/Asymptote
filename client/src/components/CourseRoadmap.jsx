import { useState } from 'react';
import { Card } from './Card';
import { Chip } from './Chip';
import { COURSE_ROADMAP, calculateCurriculumProgress } from '../lib/curriculum-roadmap';
import { 
  CheckCircle2, 
  CircleDot, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink
} from 'lucide-react';

export function CourseRoadmap({ problems = [] }) {
  const [expandedStages, setExpandedStages] = useState(() => ({
    'arrays-and-strings': true
  }));

  const progress = calculateCurriculumProgress(COURSE_ROADMAP, problems);

  const toggleStage = (stageId) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const handleExpandAll = () => {
    const all = {};
    COURSE_ROADMAP.forEach(s => {
      all[s.id] = true;
    });
    setExpandedStages(all);
  };

  const handleCollapseAll = () => {
    setExpandedStages({});
  };

  const allExpanded = COURSE_ROADMAP.every(s => expandedStages[s.id]);

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-heading text-[28px] font-bold text-[#1e2033] leading-tight">
          Curriculum
        </h1>
        <p className="text-[14px] text-[#475569] mt-1">
          118 core algorithmic problems across 13 topics.
        </p>
      </div>

      {/* Simple, Clean Progress Bar */}
      <Card className="!p-5 bg-white border border-[#e2e8f0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <span className="font-heading text-[15px] font-bold text-[#1e2033]">
            Curriculum Progress
          </span>
          <span className="text-[13px] font-semibold text-[#047857]">
            {progress.completedMilestones} of {progress.totalMilestones} solved ({progress.overallPercent}%)
          </span>
        </div>
        <div className="w-full bg-[#f1f5f9] h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#10b981] h-full rounded-full transition-all duration-300"
            style={{ width: `${progress.overallPercent}%` }}
          />
        </div>
      </Card>

      {/* Topics Header & Toggle Controls */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[13px] font-bold text-[#64748b] uppercase tracking-wider">
          Topics ({COURSE_ROADMAP.length})
        </span>
        <button
          type="button"
          onClick={allExpanded ? handleCollapseAll : handleExpandAll}
          className="text-[13px] font-medium text-[#047857] hover:text-[#065f46] transition-colors"
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* Topic Stages List */}
      <div className="space-y-3">
        {progress.stages.map((stage) => {
          const isExpanded = !!expandedStages[stage.id];
          const isCompleted = stage.status === 'completed';
          const isInProgress = stage.status === 'in-progress';

          return (
            <Card key={stage.id} className="!p-0 overflow-hidden transition-all bg-white border border-[#e2e8f0]">
              {/* Stage Header */}
              <div 
                onClick={() => toggleStage(stage.id)}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                  isInProgress ? 'bg-[#fafafa]' : 'bg-white hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Status Indicator Icon */}
                  <div className="shrink-0">
                    {isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-[#ecfdf5] border border-[#6ee7b7] flex items-center justify-center text-[#047857]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8]">
                        <CircleDot className="w-4 h-4 text-[#64748b]" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-[16px] font-bold text-[#1e2033]">
                        {stage.stageNumber}. {stage.title}
                      </span>
                      {isCompleted && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Meta & Progress Indicator */}
                <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                  <span className="text-[13px] font-medium text-[#64748b]">
                    {stage.completedMilestones} of {stage.totalMilestones} solved
                  </span>

                  {/* Compact Progress Bar */}
                  <div className="w-20 bg-[#f1f5f9] h-2 rounded-full overflow-hidden hidden sm:block">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-[#10b981]' : 'bg-[#047857]'}`}
                      style={{ width: `${stage.percent}%` }}
                    />
                  </div>

                  <button 
                    type="button" 
                    className="p-1 rounded-md text-[#64748b] hover:text-[#1e2033] hover:bg-[#e2e8f0]/50"
                    aria-label={isExpanded ? 'Collapse topic' : 'Expand topic'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Problems List */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#e2e8f0] bg-white">
                  <div className="divide-y divide-[#f1f5f9] border border-[#e2e8f0] rounded-lg overflow-hidden">
                    {stage.milestonesWithStatus.map((m) => (
                      <div 
                        key={m.number || m.slug} 
                        className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f8fafc] transition-colors"
                      >
                        <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                          <span className="text-[13px] font-bold text-[#64748b] min-w-[42px]">
                            #{m.number}
                          </span>
                          <span className="text-[14px] font-medium text-[#1e2033]">
                            {m.title}
                          </span>
                          <Chip variant={m.difficulty.toLowerCase()}>
                            {m.difficulty}
                          </Chip>
                          {m.isSolved ? (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                              Solved
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]">
                              Unsolved
                            </span>
                          )}
                        </div>

                        {/* Open LeetCode Question Link */}
                        <a
                          href={m.leetcodeUrl || `https://leetcode.com/problems/${m.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary !py-1.5 !px-3 !text-[12px] flex items-center gap-1.5 shrink-0 self-end sm:self-center"
                        >
                          <span>LeetCode</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* More Problems Coming Soon Notice */}
      <div className="p-8 rounded-xl border border-dashed border-[#cbd5e1] bg-white text-center">
        <h3 className="font-heading text-[16px] font-bold text-[#1e2033]">
          More problems coming soon
        </h3>
        <p className="text-[13px] text-[#64748b] mt-1">
          We will be adding more curated question sets and advanced topics.
        </p>
      </div>
    </div>
  );
}
