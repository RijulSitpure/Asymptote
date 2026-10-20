import { describe, it, expect } from 'vitest';
import Curriculum from '../shared/curriculum-roadmap.js';

describe('Master Course & Roadmap Curriculum Module', () => {
  it('1. Contains 7 sequential pedagogical stages with valid metadata', () => {
    expect(Array.isArray(Curriculum.COURSE_ROADMAP)).toBe(true);
    expect(Curriculum.COURSE_ROADMAP.length).toBe(7);

    Curriculum.COURSE_ROADMAP.forEach((stage, idx) => {
      expect(stage.stageNumber).toBe(idx + 1);
      expect(typeof stage.title).toBe('string');
      expect(typeof stage.tagline).toBe('string');
      expect(typeof stage.estimatedHours).toBe('string');
      expect(Array.isArray(stage.patternIds)).toBe(true);
      expect(stage.patternIds.length).toBeGreaterThan(0);
      expect(Array.isArray(stage.milestones)).toBe(true);
      expect(stage.milestones.length).toBeGreaterThan(0);

      stage.milestones.forEach(m => {
        expect(typeof m.number).toBe('number');
        expect(typeof m.slug).toBe('string');
        expect(typeof m.title).toBe('string');
        expect(['Easy', 'Medium', 'Hard']).toContain(m.difficulty);
      });
    });
  });

  it('2. Calculates 0% completion correctly for new users', () => {
    const progress = Curriculum.calculateCurriculumProgress(Curriculum.COURSE_ROADMAP, []);
    expect(progress.totalMilestones).toBeGreaterThan(30);
    expect(progress.completedMilestones).toBe(0);
    expect(progress.overallPercent).toBe(0);
    expect(progress.stages[0].status).toBe('in-progress'); // Stage 1 unlocked by default
    expect(progress.stages[1].status).toBe('locked');
    expect(progress.nextMilestone).not.toBeNull();
    expect(progress.nextMilestone.number).toBe(1);
  });

  it('3. Dynamically advances completion when milestones are solved', () => {
    const solved = [
      { slug: 'two-sum', is_solved: 1 },
      { slug: 'two-sum-ii-input-array-is-sorted', is_solved: 1 },
      { slug: '3sum', is_solved: 1 },
      { slug: 'container-with-most-water', is_solved: 1 },
      { slug: 'longest-substring-without-repeating-characters', is_solved: 1 },
      { slug: 'subarray-sum-equals-k', is_solved: 1 }
    ];

    const progress = Curriculum.calculateCurriculumProgress(Curriculum.COURSE_ROADMAP, solved);
    expect(progress.completedMilestones).toBe(6);
    expect(progress.stages[0].percent).toBe(100);
    expect(progress.stages[0].status).toBe('completed');
    expect(progress.stages[1].status).toBe('in-progress'); // Unlocks Stage 2
    expect(progress.nextMilestone.stageNumber).toBe(2);
  });
});
