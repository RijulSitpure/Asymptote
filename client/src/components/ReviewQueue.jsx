import { useState } from 'react';
import { Card } from './Card';
import { Chip } from './Chip';
import { sortPatternsByPedagogy } from '../lib/curriculum';

export function ReviewQueue({ stats, patterns, problems, onSelectPattern, onPracticeProblem }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'patterns' | 'flagged'
  const [expandedId, setExpandedId] = useState(null);

  // Weak spot patterns (0 solved or low ratio)
  const weakSpots = sortPatternsByPedagogy((stats?.weakSpots || []).map(ws => {
    const fullPattern = (patterns || []).find(p => p.id === (ws?.id || ws?.pattern_id)) || {};
    return {
      type: 'pattern',
      id: ws?.id || ws?.pattern_id,
      name: ws?.title || ws?.pattern_title || fullPattern.title || 'Pattern',
      pattern_title: ws?.category || fullPattern.category || 'Algorithmic Pattern',
      difficulty: ws?.difficulty || fullPattern.difficulty || 'Medium',
      is_solved: (ws?.solved_problems || 0) > 0,
      short_description: ws?.short_description || fullPattern.short_description || '',
      twists: fullPattern.twists || [],
      mental_triggers: fullPattern.mental_triggers || [],
      complexity: fullPattern.complexity || ws?.complexity || null
    };
  }));

  // Problems flagged for review
  const flaggedProblems = sortPatternsByPedagogy((problems || [])
    .filter(p => Boolean(p?.review_needed))
    .map(p => ({
      type: 'problem',
      id: p?.id,
      frontend_id: p?.frontend_id,
      name: p?.frontend_id ? `#${p.frontend_id} ${p?.title || ''}` : (p?.title || 'Problem'),
      query: p?.frontend_id ? String(p.frontend_id) : (p?.title_slug || p?.slug || p?.title || ''),
      pattern_title: (p?.verified || p?.source === 'curated') ? (p?.pattern_title || p?.pattern_category || 'Pattern') : (p?.pattern_title ? `${p.pattern_title} (Catalog)` : null),
      difficulty: p?.difficulty || 'Medium',
      is_solved: !!p?.is_solved,
      short_description: p?.summary || p?.user_notes || '',
      twist: p?.twist_type || '',
      twists: [],
      mental_triggers: p?.trigger_clues || [],
      complexity: null
    })));

  const allItems = [...weakSpots, ...flaggedProblems];

  const filteredItems = filterType === 'patterns' 
    ? weakSpots 
    : filterType === 'flagged' 
    ? flaggedProblems 
    : allItems;

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-heading text-[32px] font-bold text-[#1e2033] leading-tight">
          Review
        </h1>
        <p className="text-[16px] text-[#475569] mt-1">
          Problems and patterns that need another pass.
        </p>
      </div>

      {/* Filter Tabs: All, Patterns, Flagged */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-lg text-[14px] transition-colors ${
            filterType === 'all'
              ? 'bg-[#1e2033] text-white font-bold'
              : 'bg-white border border-[#cbd5e1] text-[#1e2033] font-medium hover:bg-[#f8fafc]'
          }`}
        >
          All ({allItems.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('patterns')}
          className={`px-3.5 py-1.5 rounded-lg text-[14px] transition-colors ${
            filterType === 'patterns'
              ? 'bg-[#1e2033] text-white font-bold'
              : 'bg-white border border-[#cbd5e1] text-[#1e2033] font-medium hover:bg-[#f8fafc]'
          }`}
        >
          Patterns ({weakSpots.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('flagged')}
          className={`px-3.5 py-1.5 rounded-lg text-[14px] transition-colors ${
            filterType === 'flagged'
              ? 'bg-[#1e2033] text-white font-bold'
              : 'bg-white border border-[#cbd5e1] text-[#1e2033] font-medium hover:bg-[#f8fafc]'
          }`}
        >
          Flagged ({flaggedProblems.length})
        </button>
      </div>

      {/* One Card with a row per item */}
      <Card className="!p-0 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-[#64748b] text-[15px]">
            No items in this review view.
          </div>
        ) : (
          <div className="divide-y divide-[#e2e8f0]">
            {filteredItems.map(item => {
              const itemKey = `${item.type}-${item.id}`;
              const isExpanded = expandedId === itemKey;

              return (
                <div key={itemKey} className="transition-colors">
                  <div className="px-[22px] py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Item Name & Chips */}
                    <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                      <span className="text-[15px] font-medium text-[#1e2033]">
                        {item.name}
                      </span>
                      {item.pattern_title && (
                        <Chip variant="neutral">
                          {item.pattern_title}
                        </Chip>
                      )}
                      <Chip variant={item.difficulty.toLowerCase()}>
                        {item.difficulty}
                      </Chip>
                      <Chip variant={item.is_solved ? 'solved' : 'unsolved'}>
                        {item.is_solved ? 'Solved' : 'Unsolved'}
                      </Chip>
                    </div>

                    {/* Actions: Secondary Explain, Primary Practice */}
                    <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => toggleExpand(itemKey)}
                        className="btn-secondary !py-1.5 !px-3 !text-[13px]"
                      >
                        {isExpanded ? 'Hide' : 'Explain'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (item.type === 'pattern') {
                            onSelectPattern(item.id);
                          } else {
                            onPracticeProblem(item.query || item.id);
                          }
                        }}
                        className="btn-primary !py-1.5 !px-3 !text-[13px]"
                      >
                        Practice
                      </button>
                    </div>
                  </div>

                  {/* Expandable Explanation Panel */}
                  {isExpanded && (
                    <div className="px-[22px] pb-5 pt-2 bg-[#f8fafc] border-t border-[#e2e8f0] space-y-3 text-[14px]">
                      {item.short_description && (
                        <div>
                          <span className="font-bold text-[#1e2033] block mb-1">
                            Description
                          </span>
                          <p className="text-[#475569] leading-relaxed">
                            {item.short_description}
                          </p>
                        </div>
                      )}

                      {item.twist && (
                        <div className="p-3 bg-white rounded-lg border border-[#e2e8f0]">
                          <span className="font-bold text-[#b45309] block mb-0.5">
                            Pattern variation
                          </span>
                          <span className="text-[#334155]">{item.twist}</span>
                        </div>
                      )}

                      {item.mental_triggers && item.mental_triggers.length > 0 && (
                        <div>
                          <span className="font-bold text-[#1e2033] block mb-1">
                            Recognition signals
                          </span>
                          <ul className="list-disc pl-5 space-y-1 text-[#475569]">
                            {item.mental_triggers.map((trigger, idx) => (
                              <li key={idx}>{trigger}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
