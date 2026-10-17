
/**
 * Card
 * Spec: white, 1px #e2e8f0 border, radius 12, padding 22. No shadows.
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white border border-[#e2e8f0] rounded-[12px] p-[22px] shadow-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
