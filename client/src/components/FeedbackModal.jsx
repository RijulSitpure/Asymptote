import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  X, Bug, Lightbulb, MessageSquare, Check, Send, Trash2, 
  Download, CheckCircle, Clock, Copy, AlertTriangle, RefreshCw 
} from 'lucide-react';
import { useToast } from './Toast';
import { 
  STORAGE_KEY_FEEDBACK, 
  MAX_TITLE_LENGTH, 
  MAX_DETAILS_LENGTH, 
  MAX_EMAIL_LENGTH,
  validateFeedbackPayload,
  submitFeedbackToGoogleSheets,
  checkFeedbackStatus
} from '../lib/feedbackClient';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.88a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
    </svg>
  );
}

export function FeedbackModal({ isOpen, initialType = 'bug', onClose }) {
  const { addToast } = useToast();
  const [activeView, setActiveView] = useState('submit'); // 'submit' | 'confirmation' | 'manager'
  const [feedbackType, setFeedbackType] = useState(initialType); // 'bug' | 'feature' | 'general'
  const [titleText, setTitleText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [userContact, setUserContact] = useState('');
  const [honeypot, setHoneypot] = useState('');
  
  // Validation & Submission state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [copiedRefId, setCopiedRefId] = useState(false);

  // Local submissions management state
  const [submissions, setSubmissions] = useState([]);
  const [managerFilter, setManagerFilter] = useState('all'); // 'all' | 'open' | 'resolved'
  const [isSyncingStatus, setIsSyncingStatus] = useState(false);

  useEffect(() => {
    if (initialType) {
      setFeedbackType(initialType);
    }
  }, [initialType]);

  const saveSubmissions = (newSubmissions) => {
    setSubmissions(newSubmissions);
    try {
      localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(newSubmissions));
    } catch (err) {
      console.error('Failed to save feedback submissions:', err);
    }
  };

  const syncTicketStatuses = useCallback(async (currentList = submissions) => {
    if (!currentList || currentList.length === 0) return;
    const unresolved = currentList.filter(s => !s.resolved && s.referenceId);
    if (unresolved.length === 0) return;

    setIsSyncingStatus(true);
    try {
      const idsToCheck = unresolved.map(s => s.referenceId);
      const statuses = await checkFeedbackStatus(idsToCheck);
      
      let changed = false;
      const updated = currentList.map(sub => {
        if (!sub.resolved && sub.referenceId && statuses[sub.referenceId]) {
          const remoteStatus = String(statuses[sub.referenceId]).toLowerCase();
          if (remoteStatus === 'resolved' || remoteStatus === 'done' || remoteStatus === 'closed') {
            changed = true;
            return {
              ...sub,
              resolved: true,
              resolvedAt: new Date().toISOString()
            };
          }
        }
        return sub;
      });

      if (changed) {
        saveSubmissions(updated);
        addToast({
          message: 'Synced with server: Ticket(s) marked resolved.',
          type: 'success'
        });
      }
    } catch (err) {
      console.debug('Failed to sync ticket status:', err);
    } finally {
      setIsSyncingStatus(false);
    }
  }, [submissions, addToast]);

  // Load submissions from storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_FEEDBACK);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setSubmissions(parsed);
          }
        }
      } catch (err) {
        console.error('Failed to load feedback submissions:', err);
      }
    }
  }, [isOpen]);

  // Auto-sync unresolved tickets when entering manager view
  useEffect(() => {
    if (activeView === 'manager' && submissions.length > 0) {
      syncTicketStatuses(submissions);
    }
  }, [activeView]);

  // Live input validation
  const validateField = (field, value) => {
    const candidate = {
      type: feedbackType,
      title: field === 'title' ? value : titleText,
      details: field === 'details' ? value : feedbackText,
      email: field === 'email' ? value : userContact
    };
    const { errors: newErrors } = validateFeedbackPayload(candidate);
    setErrors(prev => {
      const copy = { ...prev };
      if (newErrors[field]) {
        copy[field] = newErrors[field];
      } else {
        delete copy[field];
      }
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (isSubmitting) return; // Prevent duplicate clicks

    // Validate all fields
    const { errors: formErrors, isValid } = validateFeedbackPayload({
      type: feedbackType,
      title: titleText,
      details: feedbackText,
      email: userContact
    });

    if (!isValid) {
      setErrors(formErrors);
      const firstErr = Object.values(formErrors)[0];
      setSubmissionError(firstErr);
      return;
    }

    setErrors({});
    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      // 1. Submit to Google Sheets via authoritative internal endpoint
      const res = await submitFeedbackToGoogleSheets({
        type: feedbackType,
        title: titleText,
        details: feedbackText,
        email: userContact,
        hp_company_field: honeypot
      });

      // 2. Verified write to Google Sheets confirmed
      const referenceId = res.referenceId;
      const serverTimestamp = res.timestamp;

      // 3. Save ticket to local submissions cache for Rijul
      const newTicket = {
        id: referenceId,
        referenceId: referenceId,
        type: feedbackType,
        title: titleText.trim(),
        details: feedbackText.trim(),
        userContact: userContact.trim() || 'Anonymous',
        createdAt: serverTimestamp,
        resolved: false,
        resolvedAt: null,
        syncedToSheets: true
      };

      const updatedSubmissions = [newTicket, ...submissions];
      saveSubmissions(updatedSubmissions);

      // 4. Update UI to Confirmation Screen
      setSubmittedResult({
        referenceId: referenceId,
        title: titleText.trim(),
        type: feedbackType,
        timestamp: serverTimestamp,
        email: userContact.trim()
      });
      setActiveView('confirmation');

      addToast({
        message: `Feedback recorded! Reference: ${referenceId}`,
        type: 'success'
      });

      // Clear input state only after verified success
      setTitleText('');
      setFeedbackText('');
      setUserContact('');
      setHoneypot('');
    } catch (err) {
      // Friendly error handling: Form inputs are preserved
      console.error('Feedback submission failed:', err);
      setSubmissionError(err.message || 'Failed to submit report. Please check your connection and try again.');
      addToast({
        message: 'Submission failed. Your text has been preserved.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleResolved = (ticketId) => {
    const next = submissions.map(sub => {
      if (sub.id === ticketId || sub.referenceId === ticketId) {
        const resolved = !sub.resolved;
        return {
          ...sub,
          resolved,
          resolvedAt: resolved ? new Date().toISOString() : null
        };
      }
      return sub;
    });
    saveSubmissions(next);
  };

  const handleDeleteTicket = (ticketId) => {
    const next = submissions.filter(s => s.id !== ticketId && s.referenceId !== ticketId);
    saveSubmissions(next);
    addToast({ message: 'Ticket removed from local manager', type: 'info' });
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `asymptote-feedback-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyRefId = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedRefId(true);
    setTimeout(() => setCopiedRefId(false), 2000);
  };

  const filteredSubmissions = useMemo(() => {
    if (managerFilter === 'open') return submissions.filter(s => !s.resolved);
    if (managerFilter === 'resolved') return submissions.filter(s => s.resolved);
    return submissions;
  }, [submissions, managerFilter]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2033]/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[14px] p-6 max-w-[720px] w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl border border-[#e2e8f0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Mode Switcher & Navigation */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#059669]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-[20px] font-bold text-[#1e2033] leading-none">
                {activeView === 'submit' 
                  ? 'Feedback & Bug Reports' 
                  : activeView === 'confirmation'
                  ? 'Submission Confirmed'
                  : 'Submitted Tickets'}
              </h2>
              <p className="text-[13px] text-[#64748b] mt-1">
                {activeView === 'submit' 
                  ? 'Send feedback, report bugs, or suggest new algorithmic patterns.' 
                  : activeView === 'confirmation'
                  ? 'Your submission has been recorded successfully.'
                  : 'Track the status of your submitted tickets.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (activeView === 'manager' || activeView === 'confirmation') {
                  setActiveView('submit');
                  setSubmissionError(null);
                } else {
                  setActiveView('manager');
                }
              }}
              className="btn-secondary !py-1 !px-2.5 !text-[12px] flex items-center gap-1.5 cursor-pointer"
            >
              <span>{activeView === 'submit' ? `View Submissions (${submissions.length})` : '← Back to Form'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-[#64748b] hover:text-[#1e2033] hover:bg-[#f8fafc] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. Submission Form View */}
        {activeView === 'submit' && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Friendly Error Banner on Submission Failure (Preserves User Input) */}
            {submissionError && (
              <div className="p-3.5 rounded-xl border border-[#fecdd3] bg-[#fff1f2] text-[#9f1239] text-[13px] flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#e11d48] mt-0.5" />
                <div className="flex-1">
                  <strong className="block font-semibold">Unable to submit report</strong>
                  <span className="leading-relaxed">{submissionError}</span>
                </div>
              </div>
            )}

            {/* Anti-Bot Honeypot Field (Invisible to legitimate human users) */}
            <input
              type="text"
              name="hp_company_field"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Feedback Type Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setFeedbackType('bug');
                  validateField('type', 'bug');
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-semibold border transition-all cursor-pointer ${
                  feedbackType === 'bug'
                    ? 'bg-[#fff1f2] text-[#9f1239] border-[#fecdd3]'
                    : 'bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] hover:bg-[#f1f5f9]'
                }`}
              >
                <Bug className="w-3.5 h-3.5 text-[#e11d48]" />
                <span>Report Bug</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFeedbackType('feature');
                  validateField('type', 'feature');
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-semibold border transition-all cursor-pointer ${
                  feedbackType === 'feature'
                    ? 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]'
                    : 'bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] hover:bg-[#f1f5f9]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#059669]" />
                <span>Suggest Pattern</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFeedbackType('general');
                  validateField('type', 'general');
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-semibold border transition-all cursor-pointer ${
                  feedbackType === 'general'
                    ? 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]'
                    : 'bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] hover:bg-[#f1f5f9]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>General</span>
              </button>
            </div>

            {/* Title / Summary */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-[#1e2033] block">
                  Summary / Title <span className="text-[#e11d48]">*</span>
                </label>
                <span className={`text-[11px] font-mono ${titleText.length > MAX_TITLE_LENGTH ? 'text-[#e11d48] font-bold' : 'text-[#94a3b8]'}`}>
                  {titleText.length}/{MAX_TITLE_LENGTH}
                </span>
              </div>
              <input
                type="text"
                value={titleText}
                onChange={(e) => {
                  setTitleText(e.target.value);
                  validateField('title', e.target.value);
                }}
                onBlur={() => validateField('title', titleText)}
                placeholder={
                  feedbackType === 'bug'
                    ? 'e.g. Broken hint in #226 Invert Tree or UI jitter in Solved tab'
                    : feedbackType === 'feature'
                    ? 'e.g. Add Topological Sort (Tarjan) pattern'
                    : 'e.g. Great tool, would love dark mode or export'
                }
                maxLength={MAX_TITLE_LENGTH + 10}
                className={`asymptote-input w-full text-[13px] ${
                  errors.title ? '!border-[#fda4af] !bg-[#fff1f2]/30 focus:!ring-[#e11d48]/20' : ''
                }`}
              />
              {errors.title && (
                <p className="text-[12px] text-[#e11d48] font-medium mt-0.5">{errors.title}</p>
              )}
            </div>

            {/* Details / Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-[#1e2033] block">
                  {feedbackType === 'bug' 
                    ? 'Detailed description & steps to reproduce' 
                    : feedbackType === 'feature'
                    ? 'Pattern or feature details'
                    : 'Your suggestions or thoughts'} <span className="text-[#e11d48]">*</span>
                </label>
                <span className={`text-[11px] font-mono ${feedbackText.length > MAX_DETAILS_LENGTH ? 'text-[#e11d48] font-bold' : 'text-[#94a3b8]'}`}>
                  {feedbackText.length}/{MAX_DETAILS_LENGTH}
                </span>
              </div>
              <textarea
                value={feedbackText}
                onChange={(e) => {
                  setFeedbackText(e.target.value);
                  validateField('details', e.target.value);
                }}
                onBlur={() => validateField('details', feedbackText)}
                rows={4}
                maxLength={MAX_DETAILS_LENGTH + 50}
                placeholder={
                  feedbackType === 'bug'
                    ? 'Describe what happened, problem number or URL, and what you expected to see...'
                    : feedbackType === 'feature'
                    ? 'Describe the algorithmic archetype, key invariants, and sample LeetCode problems...'
                    : 'Share any feedback or suggestions on how to make Asymptote better...'
                }
                className={`asymptote-input w-full text-[13px] leading-relaxed ${
                  errors.details ? '!border-[#fda4af] !bg-[#fff1f2]/30 focus:!ring-[#e11d48]/20' : ''
                }`}
              />
              {errors.details && (
                <p className="text-[12px] text-[#e11d48] font-medium mt-0.5">{errors.details}</p>
              )}
            </div>

            {/* Contact Email (Optional) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-[#1e2033]">
                  Your Email Address (Optional)
                </label>
                <span className="text-[11px] text-[#64748b]">Only used to notify you when resolved</span>
              </div>
              <input
                type="email"
                value={userContact}
                onChange={(e) => {
                  setUserContact(e.target.value);
                  validateField('email', e.target.value);
                }}
                onBlur={() => validateField('email', userContact)}
                placeholder="e.g. you@example.com"
                maxLength={MAX_EMAIL_LENGTH}
                className={`asymptote-input w-full text-[13px] ${
                  errors.email ? '!border-[#fda4af] !bg-[#fff1f2]/30 focus:!ring-[#e11d48]/20' : ''
                }`}
              />
              {errors.email && (
                <p className="text-[12px] text-[#e11d48] font-medium mt-0.5">{errors.email}</p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2 border-t border-[#e2e8f0] flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary !text-[13px] flex items-center justify-center gap-2 !bg-[#1e2033] hover:!bg-[#2d324d] !py-2.5 !px-6 cursor-pointer ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit {feedbackType === 'bug' ? 'Bug Report' : feedbackType === 'feature' ? 'Pattern Request' : 'Feedback'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* 2. Success Confirmation View */}
        {activeView === 'confirmation' && submittedResult && (
          <div className="py-6 px-4 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#ecfdf5] border-2 border-[#a7f3d0] text-[#059669] mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-[22px] font-bold text-[#1e2033]">
                Submission Received!
              </h3>
              <p className="text-[14px] text-[#475569] max-w-[480px] mx-auto">
                Thank you! Your {submittedResult.type === 'bug' ? 'bug report' : submittedResult.type === 'feature' ? 'pattern suggestion' : 'feedback'} has been submitted successfully.
              </p>
            </div>

            {/* Generated Reference ID Box */}
            <div className="max-w-[400px] mx-auto p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">
                Server Reference ID
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-[18px] font-bold text-[#1e2033] tracking-wider select-all">
                  {submittedResult.referenceId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyRefId(submittedResult.referenceId)}
                  className="p-1.5 rounded-md hover:bg-[#e2e8f0] text-[#64748b] hover:text-[#1e2033] transition-colors cursor-pointer"
                  title="Copy Reference ID"
                >
                  {copiedRefId ? <Check className="w-4 h-4 text-[#059669]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[11px] text-[#059669] font-medium">
                Initial Status: <strong>New</strong> (Queued for author review)
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveView('submit');
                  setSubmittedResult(null);
                }}
                className="btn-secondary !py-2 !px-4 !text-[13px] cursor-pointer"
              >
                Submit another response
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-primary !py-2 !px-6 !text-[13px] !bg-[#1e2033] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* 3. Manager / Table View for Rijul */}
        {activeView === 'manager' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setManagerFilter('all')}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                    managerFilter === 'all'
                      ? 'bg-[#1e2033] text-white font-bold'
                      : 'text-[#475569] hover:text-[#1e2033] bg-[#f8fafc] border border-[#e2e8f0]'
                  }`}
                >
                  All ({submissions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setManagerFilter('open')}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                    managerFilter === 'open'
                      ? 'bg-[#fff1f2] text-[#9f1239] border border-[#fecdd3] font-bold'
                      : 'text-[#475569] hover:text-[#1e2033] bg-[#f8fafc] border border-[#e2e8f0]'
                  }`}
                >
                  Open ({submissions.filter(s => !s.resolved).length})
                </button>
                <button
                  type="button"
                  onClick={() => setManagerFilter('resolved')}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                    managerFilter === 'resolved'
                      ? 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0] font-bold'
                      : 'text-[#475569] hover:text-[#1e2033] bg-[#f8fafc] border border-[#e2e8f0]'
                  }`}
                >
                  Resolved ({submissions.filter(s => s.resolved).length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => syncTicketStatuses(submissions)}
                  disabled={isSyncingStatus || submissions.length === 0}
                  className="btn-secondary !py-1 !px-2.5 !text-[12px] flex items-center gap-1.5 cursor-pointer"
                  title="Check Google Sheets for resolution updates"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingStatus ? 'animate-spin text-[#059669]' : ''}`} />
                  <span>{isSyncingStatus ? 'Checking...' : 'Refresh Status'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportJson}
                  disabled={submissions.length === 0}
                  className="btn-secondary !py-1 !px-2.5 !text-[12px] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="p-10 text-center text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-[14px]">
                No submissions matching filter.
              </div>
            ) : (
              <div className="border border-[#e2e8f0] rounded-xl overflow-hidden max-h-[50vh] overflow-y-auto">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] font-bold text-[11px] uppercase tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-3 w-28">Ref ID</th>
                      <th className="py-2.5 px-3 w-20">Type</th>
                      <th className="py-2.5 px-3 w-28">Date/Time</th>
                      <th className="py-2.5 px-3">Subject & Details</th>
                      <th className="py-2.5 px-3 w-28 text-center">Status</th>
                      <th className="py-2.5 px-3 w-24 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] bg-white">
                    {filteredSubmissions.map((sub) => {
                      const refId = sub.referenceId || sub.id;

                      return (
                        <tr key={refId} className={sub.resolved ? 'bg-[#fcfdfd] opacity-75' : ''}>
                          {/* Reference ID */}
                          <td className="py-3 px-3 align-top font-mono text-[11px] text-[#1e2033] font-bold">
                            <span className="block">{refId}</span>
                            {sub.syncedToSheets && (
                              <span className="inline-block mt-0.5 text-[9px] text-[#059669] bg-[#ecfdf5] px-1 rounded font-semibold border border-[#a7f3d0]">
                                Synced ✓
                              </span>
                            )}
                          </td>

                          {/* Type */}
                          <td className="py-3 px-3 align-top">
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              sub.type === 'bug'
                                ? 'bg-[#fff1f2] text-[#9f1239] border-[#fecdd3]'
                                : sub.type === 'feature'
                                ? 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]'
                                : 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]'
                            }`}>
                              {sub.type === 'bug' ? 'Bug' : sub.type === 'feature' ? 'Pattern' : 'General'}
                            </span>
                          </td>

                          {/* Date/Time */}
                          <td className="py-3 px-3 align-top font-mono text-[11px] text-[#64748b]">
                            <div>{new Date(sub.createdAt).toLocaleDateString()}</div>
                            <div className="text-[10px] text-[#94a3b8]">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>

                          {/* Subject & Details */}
                          <td className="py-3 px-3 align-top max-w-[260px]">
                            <strong className="block font-heading text-[13px] text-[#1e2033] mb-0.5">
                              {sub.title}
                            </strong>
                            <p className="text-[12px] text-[#475569] leading-relaxed line-clamp-3">
                              {sub.details}
                            </p>
                            {sub.resolved && sub.resolvedAt && (
                              <div className="text-[11px] text-[#047857] mt-1 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>Resolved {new Date(sub.resolvedAt).toLocaleDateString()}</span>
                              </div>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-3 align-top text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleResolved(refId)}
                              title={sub.resolved ? "Click to reopen ticket" : "Click to mark resolved locally"}
                              className={`py-1 px-2.5 rounded-md text-[11px] font-semibold border transition-colors inline-flex items-center gap-1 cursor-pointer ${
                                sub.resolved
                                  ? 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]'
                                  : 'bg-[#fff1f2] text-[#9f1239] border-[#fecdd3] hover:bg-[#ffe4e6]'
                              }`}
                            >
                              {sub.resolved ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              <span>{sub.resolved ? 'Resolved' : 'Open'}</span>
                            </button>
                          </td>

                          {/* Action: Copy Ref ID or delete */}
                          <td className="py-3 px-3 align-top text-right space-x-1">
                            <button
                              type="button"
                              onClick={() => handleCopyRefId(refId)}
                              className="p-1.5 text-[#64748b] hover:text-[#1e2033] hover:bg-[#f1f5f9] rounded transition-colors inline-block cursor-pointer"
                              title="Copy Reference ID"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTicket(refId)}
                              className="p-1.5 text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fff1f2] transition-colors rounded inline-block cursor-pointer"
                              title="Delete ticket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Connect with author footer */}
        <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] flex items-center justify-between text-[12px] text-[#64748b]">
          <span>Created by <strong className="text-[#1e2033]">Rijul Sitpure</strong></span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RijulSitpure/Asymptote"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1e2033] flex items-center gap-1 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rijulsitpure"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0a66c2] flex items-center gap-1 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
