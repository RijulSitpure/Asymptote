import React, { useState } from 'react';
import { RefreshCw, Zap, ClipboardList, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

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
      setStatusMessage({ type: 'success', text: `Imported ${items.length} questions (${data.newlySynced || 0} new, ${data.updatedCount || 0} updated)!` });
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
      <DialogContent className="bg-[#ffffff] border-[#eef0f4] text-[#1e2033] max-w-lg p-6 space-y-4 rounded-2xl shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#1e2033] flex items-center justify-center text-white">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <DialogTitle className="text-base font-bold text-[#1e2033]">Sync Solved Problems</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#646e82]">
            Import your solved history to map them automatically into 37+ algorithmic patterns.
          </DialogDescription>
        </DialogHeader>

        {statusMessage && (
          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            statusMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Method 1: Extension */}
        <div className="p-4 rounded-xl bg-[#f8f9fc] border border-[#eef0f4] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1e2033] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Method 1: Extension 1-Click Sync (Recommended)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
              Zero Limits
            </span>
          </div>
          <p className="text-[11px] text-[#646e82] leading-relaxed">
            Open the OpenLeet extension popup on leetcode.com and click <strong className="text-[#1e2033]">"⚡ Sync All Solved Questions"</strong> to pull your complete catalog instantly.
          </p>
        </div>

        {/* Method 2: Quick-Paste */}
        <div className="p-4 rounded-xl bg-[#ffffff] border border-[#eef0f4] space-y-2.5">
          <span className="text-xs font-semibold text-[#1e2033] flex items-center gap-1.5">
            <ClipboardList className="w-3.5 h-3.5 text-[#1e2033]" /> Method 2: Quick-Paste Numbers
          </span>
          <textarea
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            rows={2}
            placeholder="1, 15, 206, 787, 329, 847..."
            className="w-full bg-[#f8f9fc] border border-[#eef0f4] rounded-xl p-2.5 text-xs text-[#1e2033] placeholder-[#a0a8b7] focus:outline-none focus:border-[#1e2033] focus:bg-white font-mono"
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={fillBlind75Sample}
              className="text-[11px] text-[#1e2033] hover:underline font-medium"
            >
              Fill Sample (25 questions)
            </button>
            <button
              disabled={loading || !quickInput.trim()}
              onClick={handleQuickImport}
              className="sarvam-btn-primary px-3.5 py-1 text-xs"
            >
              Import
            </button>
          </div>
        </div>

        {/* Method 3: Public Profile */}
        <div className="p-4 rounded-xl bg-[#fafafc] border border-[#eef0f4] space-y-2">
          <span className="text-xs font-semibold text-[#646e82] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#a0a8b7]" /> Method 3: Username Sync
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Rijul-Sitpure"
              className="flex-1 bg-white border border-[#eef0f4] rounded-lg px-3 py-1.5 text-xs text-[#1e2033] focus:outline-none focus:border-[#1e2033]"
            />
            <button
              disabled={loading || !username.trim()}
              onClick={handleUsernameSync}
              className="sarvam-btn-secondary px-4 py-1.5 text-xs font-medium"
            >
              Sync
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
