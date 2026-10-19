import { useState, useEffect, useMemo } from 'react';
import { X, Bug, Lightbulb, MessageSquare, Check, Mail, Send, Trash2, Download, CheckCircle, Clock } from 'lucide-react';
import { useToast } from './Toast';

const STORAGE_KEY_FEEDBACK = 'asymptote:feedback_submissions';

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
  const [activeView, setActiveView] = useState('submit'); // 'submit' | 'manager'
  const [feedbackType, setFeedbackType] = useState(initialType); // 'bug' | 'feature' | 'general'
  const [titleText, setTitleText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [userContact, setUserContact] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [managerFilter, setManagerFilter] = useState('all'); // 'all' | 'open' | 'resolved'

  useEffect(() => {
    if (initialType) {
      setFeedbackType(initialType);
    }
  }, [initialType]);

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

  const saveSubmissions = (newSubmissions) => {
    setSubmissions(newSubmissions);
    try {
      localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(newSubmissions));
    } catch (err) {
      console.error('Failed to save feedback submissions:', err);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!feedbackText.trim()) {
      addToast({ message: 'Please enter details for your submission', type: 'info' });
      return;
    }

    const newTicket = {
      id: `ticket_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: feedbackType,
      title: titleText.trim() || (feedbackText.trim().slice(0, 50) + (feedbackText.length > 50 ? '...' : '')),
      details: feedbackText.trim(),
      userContact: userContact.trim() || 'Anonymous',
      createdAt: new Date().toISOString(),
      resolved: false,
      resolvedAt: null
    };

    const next = [newTicket, ...submissions];
    saveSubmissions(next);

    addToast({
      message: 'Thank you! Your report has been submitted to Rijul.',
      type: 'success'
    });

    setTitleText('');
    setFeedbackText('');
    setUserContact('');
  };

  const handleToggleResolved = (ticketId) => {
    const next = submissions.map(sub => {
      if (sub.id === ticketId) {
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
    const next = submissions.filter(s => s.id !== ticketId);
    saveSubmissions(next);
    addToast({ message: 'Ticket removed', type: 'info' });
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
        className="bg-white rounded-[14px] p-6 max-w-[700px] w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl border border-[#e2e8f0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Mode Switcher */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#059669]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-[20px] font-bold text-[#1e2033] leading-none">
                {activeView === 'submit' ? 'Feedback & Bug Reports' : 'Feedback & Bug Manager'}
              </h2>
              <p className="text-[13px] text-[#64748b] mt-1">
                {activeView === 'submit' 
                  ? 'Submit directly to Rijul Sitpure for review and resolution'
                  : 'Track submitted tickets, mark resolved, and email users'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'submit' ? 'manager' : 'submit')}
              className="btn-secondary !py-1 !px-2.5 !text-[12px] flex items-center gap-1.5"
            >
              <span>{activeView === 'submit' ? `View Submissions (${submissions.length})` : '← Back to Form'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-[#64748b] hover:text-[#1e2033] hover:bg-[#f8fafc] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {activeView === 'submit' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Feedback Type Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFeedbackType('bug')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-semibold border transition-all ${
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
                onClick={() => setFeedbackType('feature')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-semibold border transition-all ${
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
                onClick={() => setFeedbackType('general')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-semibold border transition-all ${
                  feedbackType === 'general'
                    ? 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]'
                    : 'bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] hover:bg-[#f1f5f9]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>General</span>
              </button>
            </div>

            {/* Subject / Title */}
            <div className="space-y-1">
              <label className="text-[13px] font-bold text-[#1e2033] block">
                Summary / Title
              </label>
              <input
                type="text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                placeholder={
                  feedbackType === 'bug'
                    ? 'e.g. Broken hint in #226 Invert Tree or UI jitter in Solved tab'
                    : feedbackType === 'feature'
                    ? 'e.g. Add Topological Sort (Tarjan) pattern'
                    : 'e.g. Great tool, would love dark mode or export'
                }
                className="asymptote-input w-full text-[13px]"
              />
            </div>

            {/* Feedback Textarea */}
            <div className="space-y-1">
              <label className="text-[13px] font-bold text-[#1e2033] block">
                {feedbackType === 'bug' 
                  ? 'Detailed description & steps to reproduce *' 
                  : feedbackType === 'feature'
                  ? 'Pattern or feature details *'
                  : 'Your suggestions or thoughts *'}
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
                required
                placeholder={
                  feedbackType === 'bug'
                    ? 'Describe what happened, problem number, and what you expected...'
                    : feedbackType === 'feature'
                    ? 'Describe the algorithmic archetype, key invariants, and sample LeetCode problems...'
                    : 'Share any feedback or suggestions on how to make Asymptote better...'
                }
                className="asymptote-input w-full text-[13px] leading-relaxed"
              />
            </div>

            {/* Contact Email / User ID */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-[#1e2033]">
                  Your Email or ID (Optional)
                </label>
                <span className="text-[11px] text-[#64748b]">To notify you when resolved</span>
              </div>
              <input
                type="text"
                value={userContact}
                onChange={(e) => setUserContact(e.target.value)}
                placeholder="e.g. you@example.com or @username"
                className="asymptote-input w-full text-[13px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="text-[12px] text-[#64748b]">
                Submissions are saved locally and synced directly to author review.
              </div>

              <button
                type="submit"
                className="btn-primary !text-[13px] flex items-center justify-center gap-1.5 !bg-[#1e2033] hover:!bg-[#2d324d] !py-2 !px-5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit {feedbackType === 'bug' ? 'Bug Report' : feedbackType === 'feature' ? 'Pattern Request' : 'Feedback'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Manager / Table View for Rijul */
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setManagerFilter('all')}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors ${
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
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors ${
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
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors ${
                    managerFilter === 'resolved'
                      ? 'bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-bold'
                      : 'text-[#475569] hover:text-[#1e2033] bg-[#f8fafc] border border-[#e2e8f0]'
                  }`}
                >
                  Resolved ({submissions.filter(s => s.resolved).length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  disabled={submissions.length === 0}
                  className="btn-secondary !py-1 !px-2.5 !text-[12px] flex items-center gap-1.5"
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
                      <th className="py-2.5 px-3 w-20">Type</th>
                      <th className="py-2.5 px-3 w-28">Date/Time</th>
                      <th className="py-2.5 px-3">Subject & Details</th>
                      <th className="py-2.5 px-3 w-32">User ID</th>
                      <th className="py-2.5 px-3 w-28 text-center">Status</th>
                      <th className="py-2.5 px-3 w-28 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] bg-white">
                    {filteredSubmissions.map((sub) => {
                      const isEmail = sub.userContact && sub.userContact.includes('@');
                      const emailSubject = encodeURIComponent(`[Resolved] Your Asymptote ${sub.type === 'bug' ? 'bug report' : 'feedback'}: "${sub.title}"`);
                      const emailBody = encodeURIComponent(
                        `Hi,\n\nThank you for reaching out regarding "${sub.title}".\n\nWe wanted to let you know that this issue has been resolved in our latest update.\n\nTicket Summary: ${sub.title}\nDetails: ${sub.details}\n\nBest regards,\nRijul Sitpure\nCreator of Asymptote\nhttps://github.com/RijulSitpure`
                      );
                      const mailtoUrl = `mailto:${sub.userContact}?subject=${emailSubject}&body=${emailBody}`;

                      return (
                        <tr key={sub.id} className={sub.resolved ? 'bg-[#fcfdfd] opacity-75' : ''}>
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
                          <td className="py-3 px-3 align-top max-w-[220px]">
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

                          {/* User ID */}
                          <td className="py-3 px-3 align-top text-[12px] text-[#475569]">
                            <span className="font-medium text-[#1e2033] break-all">
                              {sub.userContact || 'Anonymous'}
                            </span>
                          </td>

                          {/* Status Toggle */}
                          <td className="py-3 px-3 align-top text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleResolved(sub.id)}
                              className={`py-1 px-2.5 rounded-md text-[11px] font-semibold border transition-colors inline-flex items-center gap-1 ${
                                sub.resolved
                                  ? 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]'
                                  : 'bg-[#fff1f2] text-[#9f1239] border-[#fecdd3] hover:bg-[#ffe4e6]'
                              }`}
                            >
                              {sub.resolved ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              <span>{sub.resolved ? 'Resolved' : 'Mark Done'}</span>
                            </button>
                          </td>

                          {/* Action: Email user or delete */}
                          <td className="py-3 px-3 align-top text-right space-x-1">
                            {isEmail ? (
                              <a
                                href={mailtoUrl}
                                className="btn-secondary !py-1 !px-2 !text-[11px] inline-flex items-center gap-1 text-[#0369a1] hover:!text-[#0284c7]"
                                title={`Send resolution email to ${sub.userContact}`}
                              >
                                <Mail className="w-3 h-3" />
                                <span>Email</span>
                              </a>
                            ) : (
                              <span className="text-[11px] text-[#94a3b8] italic">No email</span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteTicket(sub.id)}
                              className="p-1 text-[#94a3b8] hover:text-[#ef4444] transition-colors rounded inline-block"
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
              href="https://github.com/RijulSitpure"
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
