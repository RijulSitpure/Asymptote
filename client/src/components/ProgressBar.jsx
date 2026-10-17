
/**
 * ProgressBar
 * Spec: 8px high, #e2e8f0 track, emerald (#10b981) fill, radius 4.
 */
export function ProgressBar({ value = 0, max = 100, className = '' }) {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  return (
    <div 
      className={`h-2 bg-[#e2e8f0] rounded overflow-hidden w-full ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full bg-[#10b981] rounded transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
