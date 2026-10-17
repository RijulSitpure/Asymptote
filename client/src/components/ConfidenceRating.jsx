import React from 'react';

/**
 * ConfidenceRating
 * Spec: five 10px circles, 4px gap, emerald (#10b981) when filled and #e2e8f0 when empty.
 */
export function ConfidenceRating({ value = 0, onChange, readonly = false, size = 10 }) {
  const stars = [1, 2, 3, 4, 5];
  
  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={`Confidence rating: ${value} of 5`}>
      {stars.map((level) => {
        const isFilled = level <= (value || 0);
        return (
          <button
            key={level}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onChange && onChange(level)}
            className={`w-[10px] h-[10px] rounded-full transition-colors ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:opacity-80'
            } ${isFilled ? 'bg-[#10b981]' : 'bg-[#e2e8f0]'}`}
            title={`Confidence ${level} of 5`}
            aria-label={`Confidence ${level} of 5`}
          />
        );
      })}
    </div>
  );
}
