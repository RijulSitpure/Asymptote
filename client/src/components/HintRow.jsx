/**
 * HintRow
 * Spec Section 3 & 5.4:
 * Locked: white, 1px border, radius 10, level badge (#e2e8f0 background, #475569 text), title, Unlock action (amber outlined button with #92400e text).
 * Unlocked: #f0fdf4 background, #a7f3d0 border, level badge in slate with white text, title, clue text 15px.
 */
const GENERIC_HINT_TITLES = {
  1: 'Recognize the obstacle',
  2: 'Identify the core insight',
  3: 'Outline the procedure',
  4: 'See the blueprint'
};

export function HintRow({ 
  level, 
  title, 
  realTitle,
  genericTitle,
  clue, 
  isUnlocked, 
  onUnlock,
  unlockDisabled = false,
  unlockLabel = 'Unlock'
}) {
  const generic = genericTitle || GENERIC_HINT_TITLES[level] || `Hint ${level}`;
  const displayTitle = isUnlocked ? (realTitle || title || generic) : generic;

  if (isUnlocked) {
    return (
      <div className="bg-[#f0fdf4] border border-[#a7f3d0] rounded-[10px] p-[18px] transition-all">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-[#1e2033] text-white text-[12px] font-bold px-2.5 py-0.5 rounded-md leading-none">
            L{level}
          </span>
          <h4 className="font-heading text-[16px] font-bold text-[#1e2033]">
            {displayTitle}
          </h4>
        </div>
        {clue && (
          <div className="text-[15px] text-[#334155] leading-relaxed mt-2 whitespace-pre-wrap">
            {clue}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[10px] px-5 py-3.5 flex items-center justify-between gap-4 transition-all">
      <div className="flex items-center gap-3">
        <span className="bg-[#e2e8f0] text-[#475569] text-[12px] font-bold px-2.5 py-0.5 rounded-md leading-none">
          L{level}
        </span>
        <span className="text-[15px] font-medium text-[#475569]">
          {displayTitle}
        </span>
      </div>

      {onUnlock && (
        <button
          type="button"
          onClick={onUnlock}
          disabled={unlockDisabled}
          className="btn-hint"
        >
          {unlockLabel}
        </button>
      )}
    </div>
  );
}
