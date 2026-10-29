import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle, ExternalLink, Download, Upload, Database, Loader2 } from 'lucide-react';
import { fetchStats, downloadUserDataBackup, importUserDataFromFile } from '../lib/engineClient';

export function SyncModal({ isOpen, onClose, onSyncComplete }) {
  const [statusMessage, setStatusMessage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const data = await downloadUserDataBackup();
      setStatusMessage({
        type: 'success',
        text: `Exported backup with ${data.total_problems || Object.keys(data.user_problems || {}).length} problems!`
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Export failed: ${err.message || 'Unknown error'}`
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsImporting(true);
      const res = await importUserDataFromFile(file);
      setStatusMessage({
        type: 'success',
        text: `Successfully imported ${res.importedCount} problems into local storage!`
      });
      if (onSyncComplete) onSyncComplete();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Import failed: ${err.message || 'Invalid backup JSON file'}`
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

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
            <source srcSet="./sync-demo-poster.png" media="(prefers-reduced-motion: reduce)" />
            <img 
              src="./sync-demo.gif" 
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

        {/* 1-Click Progress Backup & Restore */}
        <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold text-[#1e2033] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#64748b]" />
                Offline Backup & Restore
              </h3>
              <p className="text-[12px] text-[#64748b] mt-0.5">
                Save or restore your solved history, custom notes, confidence ratings, and review queue to a local file.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="btn-secondary !py-1.5 !px-3 !text-[12px] inline-flex items-center gap-1.5"
            >
              {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isExporting ? 'Exporting...' : 'Export Backup (.json)'}</span>
            </button>
            <label className={`btn-secondary !py-1.5 !px-3 !text-[12px] inline-flex items-center gap-1.5 cursor-pointer ${isImporting ? 'opacity-50 pointer-events-none' : ''}`}>
              {isImporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{isImporting ? 'Importing...' : 'Import Backup (.json)'}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleImport}
                disabled={isImporting}
              />
            </label>
          </div>
        </div>

        {/* Footer buttons: Chrome Web Store link, "Close" and "Open LeetCode" */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
          <a
            href="https://chromewebstore.google.com/detail/micohhdeepmpciohinomlngdlhkpbfhh?utm_source=item-share-cb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-[#047857] hover:text-[#065f46] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Get Extension ↗</span>
          </a>
          <div className="flex items-center gap-2.5">
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
    </div>
  );
}
