import { useState } from 'react';
import { Card } from './Card';
import { Chip } from './Chip';
import { COURSE_ROADMAP, calculateCurriculumProgress } from '../lib/curriculum-roadmap';
import { 
  GraduationCap, 
  CheckCircle2, 
  CircleDot, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export function CourseRoadmap({ problems = [], onSelectPattern, onPracticeProblem }) {
  const [expandedStages, setExpandedStages] = useState(() => {
    // Open stage 1 and whichever stage is active by default
    return { 'stage-1-foundations': true };
  });

  const progress = calculateCurriculumProgress(COURSE_ROADMAP, problems);

  const toggleStage = (stageId) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Title & Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-[32px] font-bold text-[#1e2033] leading-tight">
              Curriculum & Roadmap
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
              <GraduationCap className="w-3.5 h-3.5" />
              Mastery Track
            </span>
          </div>
          <p className="text-[16px] text-[#475569] mt-1">
            A guided 7-stage path from algorithmic intuition to systems-level interview mastery.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5 flex items-center gap-3 self-start sm:self-auto shrink-0 shadow-none">
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#64748b] block">
              Curriculum Progress
            </span>
            <span className="font-heading text-[18px] font-bold text-[#1e2033]">
              {progress.completedMilestones} / {progress.totalMilestones} ({progress.overallPercent}%)
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-[#e2e8f0] flex items-center justify-center font-bold text-[13px] text-[#047857] relative">
            <span className="z-10">{progress.overallPercent}%</span>
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#10b981]"
                strokeDasharray={`${progress.overallPercent}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Up Next Recommended Milestone Banner */}
      {progress.nextMilestone && (
        <Card className="!p-5 bg-gradient-to-r from-[#f0fdf4] to-[#f8fafc] border-[#a7f3d0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#047857]">
                <Sparkles className="w-4 h-4 text-[#10b981]" />
                <span>RECOMMENDED NEXT TARGET • STAGE {progress.nextMilestone.stageNumber}</span>
              </div>
              <h3 className="font-heading text-[19px] font-bold text-[#1e2033]">
                #{progress.nextMilestone.number} {progress.nextMilestone.title}
              </h3>
              <p className="text-[13px] text-[#475569]">
                Target milestone in <span className="font-semibold text-[#1e2033]">{progress.nextMilestone.stageTitle}</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Chip variant={progress.nextMilestone.difficulty.toLowerCase()}>
                {progress.nextMilestone.difficulty}
              </Chip>
              <button
                type="button"
                onClick={() => onPracticeProblem(progress.nextMilestone.slug || String(progress.nextMilestone.number))}
                className="btn-primary !py-2 !px-4 !text-[14px] flex items-center gap-2"
              >
                <span>Practice in Solver</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Stages List */}
      <div className="space-y-4">
        {progress.stages.map((stage) => {
          const isExpanded = !!expandedStages[stage.id];
          const isCompleted = stage.status === 'completed';
          const isInProgress = stage.status === 'in-progress';
          const isLocked = stage.status === 'locked';

          return (
            <Card key={stage.id} className="!p-0 overflow-hidden transition-all">
              {/* Stage Header */}
              <div 
                onClick={() => toggleStage(stage.id)}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                  isInProgress ? 'bg-[#fafafa]' : 'bg-white hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  {/* Status Indicator Icon */}
                  <div className="mt-0.5 sm:mt-0 shrink-0">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-[#ecfdf5] border border-[#6ee7b7] flex items-center justify-center text-[#047857]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : isInProgress ? (
                      <div className="w-8 h-8 rounded-full bg-[#fffbeb] border border-[#fcd34d] flex items-center justify-center text-[#b45309]">
                        <CircleDot className="w-5 h-5 animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8]">
                        <Lock className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-[18px] font-bold text-[#1e2033]">
                        {stage.title}
                      </span>
                      {isCompleted && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                          Completed
                        </span>
                      )}
                      {isInProgress && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#fffbeb] text-[#b45309] border border-[#fcd34d]">
                          In Progress
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b]">
                          Up Next
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[#64748b] mt-0.5 line-clamp-1">
                      {stage.tagline}
                    </p>
                  </div>
                </div>

                {/* Right Meta & Progress Indicator */}
                <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#64748b] font-medium justify-end">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{stage.estimatedHours}</span>
                    </div>
                    <div className="text-[13px] font-bold text-[#1e2033] mt-0.5">
                      {stage.completedMilestones} of {stage.totalMilestones} ({stage.percent}%)
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-20 bg-[#e2e8f0] h-2 rounded-full overflow-hidden hidden sm:block">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`}
                      style={{ width: `${stage.percent}%` }}
                    />
                  </div>

                  <button 
                    type="button" 
                    className="p-1 rounded-md text-[#64748b] hover:text-[#1e2033] hover:bg-[#e2e8f0]/50"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Stage Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-[#e2e8f0] bg-[#ffffff] space-y-4">
                  {/* Stage Description & Strategy */}
                  <p className="text-[14px] text-[#475569] leading-relaxed pt-2">
                    {stage.description}
                  </p>

                  {/* Patterns Covered */}
                  <div>
                    <span className="text-[12px] uppercase font-bold text-[#64748b] block mb-2 tracking-wider">
                      Core Patterns Taught
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {stage.patternIds.map(patId => (
                        <button
                          key={patId}
                          type="button"
                          onClick={() => onSelectPattern && onSelectPattern(patId)}
                          className="px-2.5 py-1 rounded-lg text-[13px] font-medium bg-[#f8fafc] hover:bg-[#ecfdf5] hover:text-[#047857] hover:border-[#6ee7b7] text-[#334155] border border-[#e2e8f0] transition-colors"
                        >
                          {patId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ↗
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Milestone Problems List */}
                  <div>
                    <span className="text-[12px] uppercase font-bold text-[#64748b] block mb-2 tracking-wider">
                      Milestone Problems ({stage.completedMilestones}/{stage.totalMilestones} Solved)
                    </span>

                    <div className="divide-y divide-[#f1f5f9] border border-[#e2e8f0] rounded-xl overflow-hidden">
                      {stage.milestonesWithStatus.map((m) => (
                        <div 
                          key={m.number} 
                          className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#f8fafc] transition-colors"
                        >
                          <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                            <span className="text-[13px] font-bold text-[#64748b]">
                              #{m.number}
                            </span>
                            <span className="text-[14px] font-semibold text-[#1e2033]">
                              {m.title}
                            </span>
                            <Chip variant={m.difficulty.toLowerCase()}>
                              {m.difficulty}
                            </Chip>
                            <Chip variant={m.isSolved ? 'solved' : 'unsolved'}>
                              {m.isSolved ? 'Solved' : 'Unsolved'}
                            </Chip>
                          </div>

                          <button
                            type="button"
                            onClick={() => onPracticeProblem && onPracticeProblem(m.slug || String(m.number))}
                            className="btn-secondary !py-1.5 !px-3 !text-[12px] shrink-0 self-end sm:self-center"
                          >
                            Practice
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
