import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { PatternAtlas } from './components/PatternAtlas';
import { SocraticSolver } from './components/SocraticSolver';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { SolvedLog } from './components/SolvedLog';
import { SyncModal } from './components/SyncModal';
import { ExtensionModal } from './components/ExtensionModal';
import { ToastProvider } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'patterns' | 'solver' | 'wizard' | 'solved'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState(null);
  const [patterns, setPatterns] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedPatternId, setSelectedPatternId] = useState(null);
  const [socraticProblemQuery, setSocraticProblemQuery] = useState('');
  const [quickSearch, setQuickSearch] = useState('');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);

  const loadData = async () => {
    try {
      const [patternsRes, problemsRes, statsRes] = await Promise.all([
        fetch('/api/patterns'),
        fetch('/api/problems'),
        fetch('/api/stats')
      ]);

      if (patternsRes.ok) {
        const pats = await patternsRes.json();
        setPatterns(pats);
      }
      if (problemsRes.ok) {
        const probs = await problemsRes.json();
        setProblems(probs);
      }
      if (statsRes.ok) {
        const st = await statsRes.json();
        setStats(st);
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
      <div className="min-h-screen bg-[#fcfcfd] text-[#1e2033] flex font-sans selection:bg-[#3a3f5c] selection:text-white">
        {/* Fixed Collapsible Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          stats={stats}
          openSyncModal={() => setIsSyncModalOpen(true)}
          openExtensionModal={() => setIsExtensionModalOpen(true)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sticky Header */}
          <Header
            activeTab={activeTab}
            openSyncModal={() => setIsSyncModalOpen(true)}
            quickProblemSearch={quickSearch}
            setQuickProblemSearch={setQuickSearch}
            onSearchSubmit={handleGlobalSearchSubmit}
          />

          {/* Tab Content Canvas */}
          <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
            {activeTab === 'dashboard' && (
              <StatsDashboard
                stats={stats}
                patterns={patterns}
                onSelectPattern={handleSelectPattern}
                onPracticeWeakSpot={handleSelectPattern}
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
