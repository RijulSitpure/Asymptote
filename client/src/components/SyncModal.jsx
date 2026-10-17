import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { fetchStats } from '../lib/engineClient';

export function SyncModal({ isOpen, onClose, onSyncComplete }) {
  const [statusMessage, setStatusMessage] = useState(null);

  // Monitor stats updates while the modal is open to report progress and sync results
  useEffect(() => {
    if (!isOpen) return;

    let initialCount = null;
    const checkCount = async () => {
      try {
        const data = await fetchStats();
        const solved = data.total_solved || data.totalSolved || 0;
        if (initialCount === null) {
          initialCount = solved;
        } else if (solved > initialCount) {
          const diff = solved - initialCount;
          setStatusMessage({
            type: 'success',
            text: `Synced ${diff} newly solved problems from LeetCode!`
          });
          initialCount = solved;
          if (onSyncComplete) onSyncComplete();
        }
      } catch {
        // Polling fail silent
      }
    };

    checkCount();
    const interval = setInterval(checkCount, 3000);
    const handleFocus = () => checkCount();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isOpen, onSyncComplete]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2033]/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[14px] p-7 max-w-[520px] w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Title, subtitle, close button */}
        <div className="flex items-start justify-between pb-2 border-b border-[#e2e8f0]">
          <div>
            <h2 className="font-heading text-[22px] font-bold text-[#1e2033]">
              Sync solved problems
            </h2>
            <p className="text-[14px] text-[#475569] mt-0.5">
              Import your solved history to map them automatically into algorithmic patterns.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#64748b] hover:text-[#1e2033] hover:bg-[#f8fafc] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media area: sync-demo.gif with sync-demo-poster.png fallback for prefers-reduced-motion */}
        <div className="rounded-[10px] overflow-hidden border border-[#e2e8f0] bg-[#f6f8fa]">
          <picture>
            <source srcSet="/sync-demo-poster.png" media="(prefers-reduced-motion: reduce)" />
            <img 
              src="/sync-demo.gif" 
              alt="Demonstration of syncing solved problems from LeetCode via the Asymptote extension" 
              className="w-full h-auto block object-cover" 
            />
          </picture>
        </div>

        {/* Status / Result messaging */}
        {statusMessage && (
          <div className={`p-3.5 rounded-lg border text-[13px] flex items-center gap-2 ${
            statusMessage.type === 'success' 
              ? 'bg-[#f0fdf4] border-[#a7f3d0] text-[#047857]' 
              : 'bg-[#fff1f2] border-[#fecdd3] text-[#9f1239]'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#047857]" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-[#9f1239]" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Three numbered steps */}
        <div className="space-y-3 pt-1">
          <div className="flex items-start gap-3.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1e2033] text-white text-[12px] font-bold shrink-0 mt-0.5">
              1
            </span>
            <div>
              <p className="text-[14px] font-bold text-[#1e2033]">
                Open LeetCode
              </p>
              <p className="text-[13px] text-[#475569] mt-0.5 leading-normal">
                Navigate to your problem set or any problem page while logged into your LeetCode account.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1e2033] text-white text-[12px] font-bold shrink-0 mt-0.5">
              2
            </span>
            <div>
              <p className="text-[14px] font-bold text-[#1e2033]">
                Click sync in extension
              </p>
              <p className="text-[13px] text-[#475569] mt-0.5 leading-normal">
                Open the Asymptote extension popup and click <strong className="text-[#1e2033]">"Sync all solved problems"</strong>, or click the on-page pill.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1e2033] text-white text-[12px] font-bold shrink-0 mt-0.5">
              3
            </span>
            <div>
              <p className="text-[14px] font-bold text-[#1e2033]">
                Automatic pattern mapping
              </p>
              <p className="text-[13px] text-[#475569] mt-0.5 leading-normal">
                Your submissions will transfer locally and update your pattern coverage, difficulty stats, and review schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Footer buttons: "Close" and "Open LeetCode" */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary !py-2 !px-4 !text-[14px]"
          >
            Close
          </button>
          <a
            href="https://leetcode.com/problemset/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 !text-[14px] inline-flex items-center gap-1.5"
          >
            <span>Open LeetCode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
