import React from 'react';

/**
 * Chip
 * Spec: 1px border, 13px text, padding 3px 10px, fully round, neutral by default.
 * Difficulty chips:
 *   Easy: #047857 text, #6ee7b7 border
 *   Medium: #b45309 text, #fcd34d border
 *   Hard: #be123c text, #fda4af border
 *   "Unsolved": Medium colors (#b45309 text, #fcd34d border)
 *   "Solved": Easy colors (#047857 text, #6ee7b7 border)
 */
export function Chip({ children, variant = 'neutral', className = '' }) {
  const norm = String(variant).toLowerCase();
  
  let chipClass = 'chip';
  if (norm === 'easy') {
    chipClass = 'chip chip-easy';
  } else if (norm === 'medium' || norm === 'med') {
    chipClass = 'chip chip-medium';
  } else if (norm === 'hard') {
    chipClass = 'chip chip-hard';
  } else if (norm === 'unsolved') {
    chipClass = 'chip chip-unsolved';
  } else if (norm === 'solved') {
    chipClass = 'chip chip-solved';
  }

  return (
    <span className={`${chipClass} ${className}`}>
      {children}
    </span>
  );
}
