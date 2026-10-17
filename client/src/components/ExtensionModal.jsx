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

        <div className="p-4 rounded-lg bg-[#f8f9fc] border border-[#eef0f4] text-xs leading-relaxed space-y-1">
          <span className="font-semibold text-[#1e2033] block flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#1e2033]" /> Shadow DOM Isolated Architecture
          </span>
          <p className="text-[11px] text-[#646e82]">
            Runs cleanly on any problem page with tabs for <strong>[ Hints ] | [ Solution ] | [ Complexity ]</strong> and automatic submission syncing.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#1e2033]">Installation Steps:</span>
          <ol className="list-decimal list-inside space-y-2 text-xs text-[#646e82] bg-[#fbfbfc] p-4 rounded-lg border border-[#eef0f4]">
            <li>Open Chrome/Brave/Arc and go to <code className="bg-[#f0f2f6] px-1.5 py-0.5 rounded text-[#1e2033] font-mono">chrome://extensions</code></li>
            <li>Enable <strong className="text-[#1e2033]">Developer mode</strong> (top-right toggle).</li>
            <li>Click <strong className="text-[#1e2033]">Load unpacked</strong> (top-left button).</li>
            <li>Select the <code className="bg-[#f0f2f6] px-1.5 py-0.5 rounded text-[#1e2033] font-mono">extension</code> folder from this repo!</li>
          </ol>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            onClick={onClose} 
            className="btn-primary px-5 py-1.5 text-xs font-medium rounded-md"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
