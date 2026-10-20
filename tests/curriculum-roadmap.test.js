import { describe, it, expect } from 'vitest';
import Curriculum from '../shared/curriculum-roadmap.js';

describe('Master Course & Roadmap Curriculum Module', () => {
  it('1. Contains 13 sequential topic stages with valid metadata', () => {
    expect(Array.isArray(Curriculum.COURSE_ROADMAP)).toBe(true);
    expect(Curriculum.COURSE_ROADMAP.length).toBe(13);

    Curriculum.COURSE_ROADMAP.forEach((stage, idx) => {
      expect(stage.stageNumber).toBe(idx + 1);
      expect(typeof stage.title).toBe('string');
      expect(Array.isArray(stage.milestones)).toBe(true);
      expect(stage.milestones.length).toBeGreaterThan(0);

      stage.milestones.forEach(m => {
        expect(typeof m.number).toBe('number');
        expect(typeof m.slug).toBe('string');
        expect(typeof m.title).toBe('string');
        expect(['Easy', 'Medium', 'Hard']).toContain(m.difficulty);
        expect(typeof m.leetcodeUrl).toBe('string');
        expect(m.leetcodeUrl).toContain('leetcode.com/problems/');
      });
    });
  });

  it('2. Calculates 0% completion correctly for new users', () => {
    const progress = Curriculum.calculateCurriculumProgress(Curriculum.COURSE_ROADMAP, []);
    expect(progress.totalMilestones).toBe(118);
    expect(progress.completedMilestones).toBe(0);
    expect(progress.overallPercent).toBe(0);
    expect(progress.stages[0].status).toBe('in-progress'); // Stage 1 unlocked by default
    expect(progress.stages[1].status).toBe('locked');
  });

  it('3. Dynamically advances completion when milestones are solved', () => {
    const stage1Slugs = Curriculum.COURSE_ROADMAP[0].milestones.map(m => m.slug);
    const solved = stage1Slugs.map(slug => ({ slug, is_solved: 1 }));

    const progress = Curriculum.calculateCurriculumProgress(Curriculum.COURSE_ROADMAP, solved);
    expect(progress.completedMilestones).toBe(stage1Slugs.length);
    expect(progress.stages[0].percent).toBe(100);
    expect(progress.stages[0].status).toBe('completed');
    expect(progress.stages[1].status).toBe('in-progress'); // Unlocks Stage 2
  });
});
