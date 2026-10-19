import { useState } from 'react';
import { X, Bug, Lightbulb, MessageSquare, ExternalLink, Check, Copy } from 'lucide-react';
import { useToast } from './Toast';

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

export function FeedbackModal({ isOpen, onClose }) {
  const { addToast } = useToast();
  const [feedbackType, setFeedbackType] = useState('bug'); // 'bug' | 'feature' | 'general'
  const [feedbackText, setFeedbackText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const githubRepoUrl = 'https://github.com/RijulSitpure/LeetCode-Pattern_Tracker';

  const getGithubIssueUrl = () => {
    const titlePrefix = feedbackType === 'bug' 
      ? '[Bug]: ' 
      : feedbackType === 'feature' 
      ? '[Pattern/Feature Request]: ' 
      : '[Feedback]: ';
    
    const label = feedbackType === 'bug' ? 'bug' : 'enhancement';
    const title = encodeURIComponent(titlePrefix + (feedbackText.slice(0, 50) || 'Feedback on Asymptote'));
    const body = encodeURIComponent(
      `### Feedback / Issue Description\n${feedbackText || '(Please describe what you experienced or would like to see)'}\n\n---\n*Submitted via Asymptote v2.0*`
    );

    return `${githubRepoUrl}/issues/new?title=${title}&labels=${label}&body=${body}`;
  };

  const handleCopy = () => {
    if (!feedbackText.trim()) {
      addToast({ message: 'Please enter some feedback first', type: 'info' });
      return;
    }
    navigator.clipboard.writeText(feedbackText);
    setCopied(true);
    addToast({ message: 'Feedback copied to clipboard', type: 'success' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e2033]/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[14px] p-6 max-w-[540px] w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#059669]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-[20px] font-bold text-[#1e2033] leading-none">
                Feedback & Bug Reports
              </h2>
              <p className="text-[13px] text-[#64748b] mt-1">
                Help improve Asymptote for algorithmic pattern mastery
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-[#64748b] hover:text-[#1e2033] hover:bg-[#f8fafc] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
            <Bug className="w-3.5 h-3.5" />
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
            <Lightbulb className="w-3.5 h-3.5" />
            <span>New Pattern</span>
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
            <MessageSquare className="w-3.5 h-3.5" />
            <span>General</span>
          </button>
        </div>

        {/* Feedback Textarea */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-[#1e2033] block">
            {feedbackType === 'bug' 
              ? 'What went wrong?' 
              : feedbackType === 'feature'
              ? 'What algorithmic pattern or feature would you like?'
              : 'Your suggestions or thoughts'}
          </label>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={4}
            placeholder={
              feedbackType === 'bug'
                ? 'Describe what happened, the problem number or tab, and expected behavior...'
                : feedbackType === 'feature'
                ? 'Suggest a pattern, problem, or feature you would love to see added...'
                : 'Share any feedback or thoughts on how to make Asymptote better...'
            }
            className="asymptote-input w-full text-[13px] leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="btn-secondary !text-[13px] flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
          </button>

          <a
            href={getGithubIssueUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="btn-primary !text-[13px] flex items-center justify-center gap-1.5 !bg-[#1e2033] hover:!bg-[#2d324d]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Open Issue on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Connect with author footer */}
        <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] flex items-center justify-between text-[12px] text-[#64748b]">
          <span>Created by Rijul Sitpure</span>
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
