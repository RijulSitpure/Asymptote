import React from 'react';
import { Puzzle, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function ExtensionModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg p-6 space-y-4">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Puzzle className="w-4 h-4 text-indigo-400" />
            <DialogTitle className="text-base font-bold">OpenLeet AI Chrome Extension</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-zinc-400">
            Free, open-source alternative to LeetCode Premium ($35/mo) with in-page Socratic coach & auto-sync.
          </DialogDescription>
        </DialogHeader>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed space-y-1">
          <span className="font-semibold text-indigo-300 block">⚡ 100% Shadow DOM Isolated</span>
          <p className="text-[11px] text-zinc-300">
            Injects cleanly into any LeetCode problem with zero layout shifts, zero CSS conflicts, and tabs for <strong>[ Ask AI ] | [ Solution ] | [ Complexity ]</strong>.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-200">1-Minute Setup Guide:</span>
          <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-300 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800">
            <li>Open Chrome/Brave/Arc and go to <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-300 font-mono">chrome://extensions</code></li>
            <li>Enable <strong className="text-zinc-100">Developer mode</strong> (top-right corner).</li>
            <li>Click <strong className="text-zinc-100">Load unpacked</strong> (top-left button).</li>
            <li>Select the <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-300 font-mono">extension</code> directory in this repo!</li>
          </ol>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
