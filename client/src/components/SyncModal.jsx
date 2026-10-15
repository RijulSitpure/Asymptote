import React, { useState } from 'react';
import { RefreshCw, Zap, ClipboardList, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function SyncModal({ isOpen, onClose, onSyncComplete }) {
  const [quickInput, setQuickInput] = useState('');
  const [username, setUsername] = useState('Rijul-Sitpure');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fillBlind75Sample = () => {
    setQuickInput('1, 15, 20, 21, 53, 70, 121, 198, 206, 300, 322, 329, 739, 787, 847, 312, 1368, 834, 1011, 875, 76, 3, 2050, 1928, 864');
  };

  const handleQuickImport = async () => {
    if (!quickInput.trim()) return;
    setLoading(true);
    setStatusMessage(null);
    try {
      const items = quickInput.split(/[\s,]+/).filter(Boolean);
      const res = await fetch('/api/sync/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Imported',
          problems: items.map(p => ({
            id: isNaN(p) ? null : parseInt(p, 10),
            title_slug: isNaN(p) ? p.toLowerCase() : '',
            title: isNaN(p) ? p : `Problem #${p}`
          }))
        })
      });
      const data = await res.json();
      setStatusMessage({ type: 'success', text: `Imported ${items.length} problems (${data.newlySynced || 0} new, ${data.updatedCount || 0} updated)!` });
      setQuickInput('');
      onSyncComplete();
    } catch (err) {
      setStatusMessage({ type: 'error', text: `Import failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameSync = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/sync/leetcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStatusMessage({ type: 'success', text: `Synced ${data.syncedCount || 0} submissions for ${username}!` });
      onSyncComplete();
    } catch (err) {
      setStatusMessage({ type: 'error', text: `Sync failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg p-6 space-y-4">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            <DialogTitle className="text-base font-bold">Sync Solved Problems</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-zinc-400">
            Import your solved history to map them automatically into 37+ algorithmic patterns.
          </DialogDescription>
        </DialogHeader>

        {statusMessage && (
          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            statusMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Method 1: Extension */}
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Method 1: Extension 1-Click Sync (Recommended)
            </span>
            <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">
              Zero Limits
            </Badge>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            Open the OpenLeet extension popup on leetcode.com and click <strong className="text-emerald-400">"⚡ Sync All Solved Questions"</strong> to pull your complete catalog instantly.
          </p>
        </div>

        {/* Method 2: Quick-Paste */}
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-indigo-400" /> Method 2: Quick-Paste Numbers or Slugs
            </span>
          </div>
          <textarea
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            rows={2}
            placeholder="1, 15, 206, 787, 329, 847, 53, 70..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={fillBlind75Sample}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              Fill Sample (25 questions)
            </button>
            <Button
              size="sm"
              disabled={loading || !quickInput.trim()}
              onClick={handleQuickImport}
              className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Import & Classify
            </Button>
          </div>
        </div>

        {/* Method 3: Public Profile */}
        <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/80 space-y-2">
          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-500" /> Method 3: Public Username Sync
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Rijul-Sitpure"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
            />
            <Button
              size="sm"
              variant="outline"
              disabled={loading || !username.trim()}
              onClick={handleUsernameSync}
              className="h-8 text-xs text-zinc-200 border-zinc-700"
            >
              Sync
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
