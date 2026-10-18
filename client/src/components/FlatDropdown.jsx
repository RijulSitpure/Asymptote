import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Accessible Flat Dropdown Menu
 * Replaces native <select> with a zero-layout-shift, hardware-accelerated menu.
 */
export function FlatDropdown({
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  ariaLabel = 'Select option',
  className = '',
  align = 'right',
  size = 'md'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  const selectedOption = options.find(opt => String(opt.value) === String(value)) || null;

  // Click outside listener to dismiss
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => {
        const activeItem = menuRef.current?.querySelector('[aria-selected="true"]') || menuRef.current?.querySelector('li');
        if (activeItem) activeItem.focus();
      }, 30);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleItemKeyDown = (e, opt, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(opt.value);
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const items = menuRef.current?.querySelectorAll('li');
      if (items && items[(idx + 1) % items.length]) {
        items[(idx + 1) % items.length].focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const items = menuRef.current?.querySelectorAll('li');
      if (items && items[(idx - 1 + items.length) % items.length]) {
        items[(idx - 1 + items.length) % items.length].focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center justify-between gap-3 bg-[#f8f9fc] hover:bg-[#ffffff] border border-[#eef0f4] hover:border-[#cbd5e1] focus:border-[#1e2033] focus:bg-[#ffffff] rounded-md font-sans text-[#1e2033] transition-all outline-none cursor-pointer select-none",
          size === 'sm' ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-xs",
          isOpen && "border-[#1e2033] bg-[#ffffff] ring-2 ring-[rgba(30,32,51,0.08)]"
        )}
      >
        <span className="truncate max-w-[200px] font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "w-3.5 h-3.5 text-[#646e82] transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-[#1e2033]"
          )} 
        />
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          role="listbox"
          aria-label={ariaLabel}
          className={cn(
            "absolute top-[calc(100%+4px)] z-50 min-w-[180px] max-h-60 overflow-y-auto bg-[#ffffff] border border-[#eef0f4] rounded-lg p-1 shadow-[0_10px_25px_-4px_rgba(30,32,51,0.12),0_4px_8px_-2px_rgba(30,32,51,0.05)] animate-in fade-in-0 zoom-in-95 duration-150 outline-none",
            align === 'left' ? "left-0" : "right-0"
          )}
        >
          {options.map((opt, idx) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <li
                key={opt.value}
                role="option"
                tabIndex={0}
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(e) => handleItemKeyDown(e, opt, idx)}
                className={cn(
                  "flex items-center justify-between gap-3 px-3 py-1.5 rounded-md text-xs font-sans cursor-pointer transition-colors outline-none select-none",
                  isSelected 
                    ? "bg-[#1e2033] text-white font-semibold" 
                    : "text-[#475569] font-normal hover:text-[#1e2033] hover:bg-[#f8f9fc] focus:bg-[#f8f9fc] focus:text-[#1e2033]"
                )}
              >
                <div className="flex flex-col min-w-0">
                  <span className="truncate">{opt.label}</span>
                  {opt.sublabel && (
                    <span className={cn(
                      "text-[10px] truncate",
                      isSelected ? "text-slate-300" : "text-[#94a3b8]"
                    )}>
                      {opt.sublabel}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 shrink-0 text-white" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
