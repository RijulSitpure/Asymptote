import { ShieldCheck, Sparkles, Bug, MessageSquare, Star, BookOpen } from 'lucide-react';

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

export function Footer({ onOpenFeedback }) {
  return (
    <footer className="mt-16 border-t border-[#e2e8f0] bg-white/70 backdrop-blur-sm -mx-8 px-8 py-10 text-[#475569]">
      <div className="max-w-[1040px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#e2e8f0]">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img 
                src="./asymptote-icon-small.svg" 
                alt="Asymptote" 
                className="w-6 h-6 shrink-0 block" 
                width="24" 
                height="24" 
              />
              <span className="font-heading font-bold text-[18px] text-[#1e2033]">
                Asymptote
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-semibold">
                v2.0.0
              </span>
            </div>
            <p className="text-[13px] text-[#64748b] leading-relaxed">
              A Socratic mentor for LeetCode that runs offline. Learn the approach instead of memorizing solutions.
            </p>
            <div className="flex items-center gap-2 text-[12px] text-[#047857] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>100% Local & Offline • Zero Telemetry</span>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#1e2033]" />
              <h4 className="text-[13px] font-bold text-[#1e2033] uppercase tracking-wider font-heading">
                How It Works
              </h4>
            </div>
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-start gap-2 text-[#64748b]">
                <span className="text-[#059669] font-bold">•</span>
                <span><strong>4-Tier Socratic Guidance:</strong> Progressive hints from obstacle to blueprint without giving away answers.</span>
              </li>
              <li className="flex items-start gap-2 text-[#64748b]">
                <span className="text-[#059669] font-bold">•</span>
                <span><strong>100% Local & Offline:</strong> Runs entirely in your browser with zero telemetry or remote tracking.</span>
              </li>
              <li className="flex items-start gap-2 text-[#64748b]">
                <span className="text-[#059669] font-bold">•</span>
                <span><strong>Invariant Patterns:</strong> Master core algorithmic archetypes across 6 domains.</span>
              </li>
            </ul>
          </div>

          {/* Connect & Feedback */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold text-[#1e2033] uppercase tracking-wider font-heading">
              Developer & Community
            </h4>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/RijulSitpure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#334155] hover:text-[#1e2033] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>@RijulSitpure</span>
                </a>
                <span className="text-[#cbd5e1]">•</span>
                <a
                  href="https://www.linkedin.com/in/rijulsitpure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#0a66c2] hover:text-[#004182] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="https://chromewebstore.google.com/detail/micohhdeepmpciohinomlngdlhkpbfhh?utm_source=item-share-cb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-1.5 !px-3 !text-[12px] flex items-center gap-1.5 hover:!border-[#10b981] hover:!text-[#047857] transition-colors"
                  title="Install Asymptote from Chrome Web Store"
                >
                  <img src="./asymptote-icon-small.svg" className="w-3.5 h-3.5" alt="" />
                  <span>Chrome Store</span>
                </a>

                <a
                  href="https://github.com/RijulSitpure/Asymptote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-1.5 !px-3 !text-[12px] flex items-center gap-1.5 hover:!border-[#eab308] hover:!text-[#854d0e] transition-colors"
                  title="Star this repository on GitHub"
                >
                  <Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]" />
                  <span>Star on GitHub</span>
                </a>

                {onOpenFeedback && (
                  <button
                    type="button"
                    onClick={() => onOpenFeedback('general')}
                    className="btn-secondary !py-1.5 !px-3 !text-[12px] flex items-center gap-1.5 hover:!border-[#10b981] hover:!text-[#047857]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Feedback</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#64748b]">
          <div>
            <span>© 2026 Rijul Sitpure. Asymptote is an independent project and is not affiliated with LeetCode.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenFeedback && onOpenFeedback('bug')}
              className="hover:text-[#9f1239] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 text-[12px] text-inherit"
            >
              <Bug className="w-3.5 h-3.5 text-[#e11d48]" />
              <span>Report an Issue</span>
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenFeedback && onOpenFeedback('feature')}
              className="hover:text-[#047857] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 text-[12px] text-inherit"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>Suggest Pattern</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
