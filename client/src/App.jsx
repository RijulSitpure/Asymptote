import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { PatternAtlas } from './components/PatternAtlas';
import { SocraticSolver } from './components/SocraticSolver';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { SolvedLog } from './components/SolvedLog';
import { ReviewQueue } from './components/ReviewQueue';
import { SyncModal } from './components/SyncModal';
import { ExtensionModal } from './components/ExtensionModal';
import { ToastProvider } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab') || window.location.hash.replace('#', '');
      if (['dashboard', 'queue', 'patterns', 'solver', 'wizard', 'solved'].includes(tab)) {
        return tab;
      }
    }
    return 'dashboard';
  });
  const [stats, setStats] = useState(null);
  const [patterns, setPatterns] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedPatternId, setSelectedPatternId] = useState(null);
  const [socraticProblemQuery, setSocraticProblemQuery] = useState('');
  const [quickSearch, setQuickSearch] = useState('');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sync') === '1');
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);

  const loadData = async () => {
    try {
      const results = await Promise.allSettled([
        fetch('/api/patterns').then(async r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        }),
        fetch('/api/problems').then(async r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        }),
        fetch('/api/stats').then(async r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
      ]);

      const isEmptyTest = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('empty') === '1';

      if (results[0].status === 'fulfilled' && results[0].value) {
        setPatterns(results[0].value);
      } else if (results[0].status === 'rejected') {
        console.error('Failed to load patterns:', results[0].reason);
      }

      if (isEmptyTest) {
        setProblems([]);
        setStats({
          username: 'NewUser',
          totalSolved: 0,
          solvedCount: 0,
          difficultyBreakdown: { Easy: 0, Medium: 0, Hard: 0 },
          patternDistribution: [],
          weakSpots: [],
          coveredPatternsCount: 0,
          totalPatternsCount: results[0]?.value?.length || 37,
          patternCoveragePercent: 0
        });
        return;
      }

      if (results[1].status === 'fulfilled' && results[1].value) {
        setProblems(results[1].value);
      } else if (results[1].status === 'rejected') {
        console.error('Failed to load problems:', results[1].reason);
      }

      if (results[2].status === 'fulfilled' && results[2].value) {
        setStats(results[2].value);
      } else if (results[2].status === 'rejected') {
        console.error('Failed to load stats:', results[2].reason);
      }
    } catch (err) {
      console.error('Error loading initial data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectPattern = (patternId) => {
    setSelectedPatternId(patternId);
    setActiveTab('patterns');
  };

  const handleGlobalSearchSubmit = () => {
    if (!quickSearch.trim()) return;
    setSocraticProblemQuery(quickSearch.trim());
    setActiveTab('solver');
  };

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K, Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('header input[type="text"]') || document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'Escape') {
        setIsSyncModalOpen(false);
        setIsExtensionModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <div className="h-screen w-screen bg-[#f6f8fa] text-[#334155] flex selection:bg-[#10b981] selection:text-white relative overflow-hidden">
        {/* Fixed Sidebar - 232px wide */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          stats={stats}
        />

        {/* Main Content Area - Scroll Container with Checked Background */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto asymptote-grid-bg relative z-10">
          {/* Top Bar */}
          <Header
            activeTab={activeTab}
            openSyncModal={() => setIsSyncModalOpen(true)}
            quickProblemSearch={quickSearch}
            setQuickProblemSearch={setQuickSearch}
            onSearchSubmit={handleGlobalSearchSubmit}
            stats={stats}
          />

          {/* Content max-width 1040px, centered, padding 40px 32px, 24px gap between blocks */}
          <main className="flex-1 max-w-[1040px] w-full mx-auto px-8 py-10 space-y-6">
            <div key={activeTab}>
              {activeTab === 'dashboard' && (
                <StatsDashboard
                  stats={stats}
                  patterns={patterns}
                  problems={problems}
                  onSelectPattern={handleSelectPattern}
                  onPracticeProblem={(query) => {
                    setSocraticProblemQuery(query);
                    setActiveTab('solver');
                  }}
                  onOpenQueue={() => setActiveTab('queue')}
                />
              )}

              {activeTab === 'queue' && (
                <ReviewQueue
                  stats={stats}
                  patterns={patterns}
                  problems={problems}
                  onSelectPattern={handleSelectPattern}
                  onPracticeProblem={(query) => {
                    setSocraticProblemQuery(query);
                    setActiveTab('solver');
                  }}
                />
              )}

              {activeTab === 'patterns' && (
                <PatternAtlas
                  patterns={patterns}
                  selectedPatternId={selectedPatternId}
                />
              )}

              {activeTab === 'solver' && (
                <SocraticSolver
                  initialProblemQuery={socraticProblemQuery}
                />
              )}

              {activeTab === 'wizard' && (
                <DiagnosticWizard
                  onSelectPattern={handleSelectPattern}
                />
              )}

              {activeTab === 'solved' && (
                <SolvedLog
                  problems={problems}
                  patterns={patterns}
                  onRefresh={loadData}
                />
              )}
            </div>
          </main>
        </div>

        {/* Modals */}
        <SyncModal
          isOpen={isSyncModalOpen}
          onClose={() => setIsSyncModalOpen(false)}
          onSyncComplete={loadData}
        />

        <ExtensionModal
          isOpen={isExtensionModalOpen}
          onClose={() => setIsExtensionModalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
