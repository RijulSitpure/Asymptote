import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { PatternAtlas } from './components/PatternAtlas';
import { SocraticSolver } from './components/SocraticSolver';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { SolvedLog } from './components/SolvedLog';
import { ReviewQueue } from './components/ReviewQueue';
import { CourseRoadmap } from './components/CourseRoadmap';
import { SyncModal } from './components/SyncModal';
import { ExtensionModal } from './components/ExtensionModal';
import { Footer } from './components/Footer';
import { FeedbackModal } from './components/FeedbackModal';
import { ToastProvider } from './components/Toast';
import {
  fetchPatterns,
  fetchProblems,
  fetchStats,
  subscribeToStorageChanges
} from './lib/engineClient';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab') || window.location.hash.replace('#', '');
      if (['dashboard', 'roadmap', 'queue', 'patterns', 'solver', 'wizard', 'solved'].includes(tab)) {
        return tab;
      }
    }
    return 'dashboard';
  });
  const [stats, setStats] = useState(null);
  const [patterns, setPatterns] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedPatternId, setSelectedPatternId] = useState(null);
  const [socraticProblemQuery, setSocraticProblemQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    }
    return '';
  });
  const [quickSearch, setQuickSearch] = useState('');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sync') === '1');
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackInitialType, setFeedbackInitialType] = useState('bug');

  const loadData = async () => {
    try {
      const [patternsData, problemsData, statsData] = await Promise.all([
        fetchPatterns().catch(err => {
          console.error('Failed to load patterns:', err);
          return null;
        }),
        fetchProblems().catch(err => {
          console.error('Failed to load problems:', err);
          return null;
        }),
        fetchStats().catch(err => {
          console.error('Failed to load stats:', err);
          return null;
        })
      ]);

      const isEmptyTest = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('empty') === '1';

      if (patternsData) {
        setPatterns(patternsData);
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
          totalPatternsCount: patternsData?.length || 37,
          patternCoveragePercent: 0
        });
        return;
      }

      if (problemsData) {
        setProblems(problemsData);
      }

      if (statsData) {
        setStats(statsData);
      }
    } catch (err) {
      console.error('Error loading initial data from engine:', err);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToStorageChanges(() => {
      loadData();
    });
    const handleSilentDatasetUpdate = () => {
      loadData();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('asymptote:dataset_updated', handleSilentDatasetUpdate);
    }
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('asymptote:dataset_updated', handleSilentDatasetUpdate);
      }
    };
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
        setIsFeedbackModalOpen(false);
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
            openFeedbackModal={(type = 'general') => {
              setFeedbackInitialType(type);
              setIsFeedbackModalOpen(true);
            }}
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

              {activeTab === 'roadmap' && (
                <CourseRoadmap
                  problems={problems}
                  onSelectPattern={handleSelectPattern}
                  onPracticeProblem={(query) => {
                    setSocraticProblemQuery(query);
                    setActiveTab('solver');
                  }}
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
                  problems={problems}
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

          {/* Persistent Footer with social links, repo, and feedback */}
          <Footer onOpenFeedback={(type = 'general') => {
            setFeedbackInitialType(type);
            setIsFeedbackModalOpen(true);
          }} />
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

        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          initialType={feedbackInitialType}
          onClose={() => setIsFeedbackModalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
