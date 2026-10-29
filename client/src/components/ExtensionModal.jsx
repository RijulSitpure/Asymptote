import { Puzzle, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

export function ExtensionModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#ffffff] border-[#eef0f4] text-[#1e2033] max-w-lg p-6 space-y-4 rounded-xl shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#1e2033] flex items-center justify-center text-white">
              <Puzzle className="w-3.5 h-3.5" />
            </div>
            <DialogTitle className="text-base font-bold text-[#1e2033]">Asymptote Companion Extension</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#646e82]">
            Injects Socratic clues & complexity analysis directly into LeetCode problem pages.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] text-xs leading-relaxed space-y-2">
          <span className="font-semibold text-[#047857] block flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#059669]" /> Available on Chrome Web Store
          </span>
          <p className="text-[12px] text-[#065f46]">
            Install in 1-click for automatic Over-The-Air pattern updates, Socratic hints, and in-page Big-O complexity targeter.
          </p>
          <div className="pt-1">
            <a
              href="https://chromewebstore.google.com/detail/micohhdeepmpciohinomlngdlhkpbfhh?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#1e2033] hover:bg-[#2b3046] text-white text-[13px] font-semibold rounded-lg transition-colors shadow-sm"
            >
              <Puzzle className="w-4 h-4 text-[#10b981]" />
              <span>Add to Chrome (Free) ↗</span>
            </a>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <span className="text-xs font-semibold text-[#64748b]">Developer / Unpacked Setup:</span>
          <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-[#64748b] bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0]">
            <li>Open <code className="bg-[#f1f5f9] px-1.5 py-0.5 rounded text-[#1e2033] font-mono">chrome://extensions</code></li>
            <li>Enable <strong className="text-[#1e2033]">Developer mode</strong> (top-right).</li>
            <li>Click <strong className="text-[#1e2033]">Load unpacked</strong> and select the <code className="bg-[#f1f5f9] px-1.5 py-0.5 rounded text-[#1e2033] font-mono">extension</code> folder.</li>
          </ol>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            onClick={onClose} 
            className="btn-secondary px-5 py-1.5 text-xs font-medium rounded-md"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
