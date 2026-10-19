import { useState, useMemo, useEffect } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { Card } from './Card';
import { Chip } from './Chip';
import { sortPatternsByPedagogy, sortCategoriesByPedagogy } from '../lib/curriculum';
import { getSupportedLanguagesForPattern, getPatternCode } from '../lib/codeTemplates';

const DOMAIN_OPTIONS = [
  { id: 'Algorithms', label: 'Algorithms' },
  { id: 'Database', label: 'Database (SQL)' },
  { id: 'pandas', label: 'Pandas' },
  { id: 'JavaScript', label: 'JavaScript' },
  { id: 'Concurrency', label: 'Concurrency' },
  { id: 'Shell', label: 'Shell' },
  { id: 'all', label: 'All Domains' }
];

export function PatternAtlas({ patterns = [], selectedPatternId }) {
  const [selectedDomain, setSelectedDomain] = useState('Algorithms');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(selectedPatternId || null);
  const [langTab, setLangTab] = useState('python3');
  const [copiedId, setCopiedId] = useState(null);

  // Sync selectedPatternId when navigated from Wizard or Queue
  useEffect(() => {
    if (selectedPatternId) {
      setExpandedId(selectedPatternId);
      const targetPattern = patterns.find(p => p.id === selectedPatternId);
      if (targetPattern) {
        if (targetPattern.domain) {
          setSelectedDomain(targetPattern.domain);
        }
        if (selectedCategory !== 'all' && selectedCategory !== targetPattern.category && selectedCategory !== targetPattern.family) {
          setSelectedCategory('all');
        }
      }
    }
  }, [selectedPatternId, patterns, selectedCategory]);

  // Filter patterns by domain
  const domainPatterns = useMemo(() => {
    if (selectedDomain === 'all') return patterns;
    return patterns.filter(p => {
      const d = p.domain || p.category;
      return d?.toLowerCase() === selectedDomain.toLowerCase() ||
        (selectedDomain === 'pandas' && (d === 'pandas' || d === 'Pandas')) ||
        (selectedDomain === 'Database' && d === 'Database');
    });
  }, [patterns, selectedDomain]);

  // Extract unique categories/families belonging to the active domain
  const categories = useMemo(() => {
    const set = new Set(domainPatterns.map(p => p.family || p.category).filter(Boolean));
    const sorted = sortCategoriesByPedagogy(Array.from(set));
    return ['all', ...sorted];
  }, [domainPatterns]);

  // Filter patterns and order by pedagogical curriculum
  const filteredPatterns = useMemo(() => {
    const matched = domainPatterns.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory || p.family === selectedCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || 
        (p.title && p.title.toLowerCase().includes(q)) || 
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.family && p.family.toLowerCase().includes(q)) ||
        (p.short_description && p.short_description.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
    return sortPatternsByPedagogy(matched);
  }, [domainPatterns, selectedCategory, search]);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const parseComplexity = (compStr) => {
    if (!compStr) return { time: 'Time O(N)', space: 'Space O(1)' };
    const parts = compStr.split('|').map(s => s.trim());
    const timePart = parts[0] || 'Time O(N)';
    const spacePart = parts[1] || 'Space O(1)';
    return {
      time: timePart.replace('Time:', 'Time').trim(),
      space: spacePart.replace('Space:', 'Space').trim()
    };
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-heading text-[32px] font-bold text-[#1e2033] leading-tight">
          Patterns
        </h1>
        <p className="text-[16px] text-[#475569] mt-1">
          Reference notes for every pattern.
        </p>
      </div>

      {/* Filter Row: Domain filter, Search field, Category select, Count chip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Domain Filter Select */}
        <div className="sm:w-44">
          <select
            value={selectedDomain}
            onChange={(e) => {
              setSelectedDomain(e.target.value);
              setSelectedCategory('all');
            }}
            aria-label="Filter by domain"
            className="asymptote-input w-full cursor-pointer font-medium"
          >
            {DOMAIN_OPTIONS.map(d => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patterns"
            aria-label="Search patterns"
            className="asymptote-input w-full !pl-10"
          />
        </div>

        {/* Category Select */}
        <div className="sm:w-60">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
            className="asymptote-input w-full cursor-pointer"
          >
            <option value="all">
              {selectedDomain === 'Algorithms' ? 'All families (19)' : 'All categories'}
            </option>
            {categories.filter(c => c !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Count Chip */}
        <Chip variant="neutral" className="shrink-0 self-start sm:self-center">
          {filteredPatterns.length} patterns
        </Chip>
      </div>

      {/* One Card with a row per pattern */}
      <Card className="!p-0 overflow-hidden">
        {filteredPatterns.length === 0 ? (
          <div className="p-12 text-center text-[#64748b] text-[15px]">
            No patterns found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-[#e2e8f0]">
            {filteredPatterns.map(pattern => {
              const isExpanded = expandedId === pattern.id;
              const { time, space } = parseComplexity(pattern.complexity);
              const supportedLangs = getSupportedLanguagesForPattern(pattern);
              const activeLangId = supportedLangs.some(l => l.id === langTab)
                ? langTab
                : (supportedLangs[0]?.id || 'python3');
              const code = getPatternCode(pattern, activeLangId);

              return (
                <div key={pattern.id} className="transition-colors">
                  {/* Pattern Row */}
                  <div className="px-[22px] py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Name and one-line description (14px, muted) */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="font-heading text-[18px] font-bold text-[#1e2033] tracking-tight">
                        {pattern.title}
                      </h3>
                      <p className="text-[14px] text-[#64748b] line-clamp-1">
                        {pattern.short_description}
                      </p>
                    </div>

                    {/* Right side group: Category chip, Difficulty chip, 2-line Time/Space, Open button */}
                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                      <Chip variant="neutral">
                        {pattern.category}
                      </Chip>

                      <Chip variant={(pattern.difficulty || 'medium').toLowerCase()}>
                        {pattern.difficulty || 'Medium'}
                      </Chip>

                      {/* Two-line Time O(...) / Space O(...) block */}
                      <div className="font-mono text-[12px] text-[#475569] leading-tight min-w-[110px]">
                        <div>{time}</div>
                        <div>{space}</div>
                      </div>

                      {/* Secondary "Open" button */}
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : pattern.id)}
                        className="btn-secondary !py-1.5 !px-3.5 !text-[13px]"
                      >
                        {isExpanded ? 'Close' : 'Open'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Blueprint Details */}
                  {isExpanded && (
                    <div className="px-[22px] pb-6 pt-3 bg-[#f8fafc] border-t border-[#e2e8f0] space-y-4">
                      {/* Recognition Signals & Constraint Clues */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pattern.mental_triggers && pattern.mental_triggers.length > 0 && (
                          <div className="bg-white p-4 rounded-lg border border-[#e2e8f0] space-y-2">
                            <span className="font-bold text-[14px] text-[#1e2033] block">
                              Recognition signals
                            </span>
                            <ul className="space-y-1.5 text-[14px] text-[#475569]">
                              {pattern.mental_triggers.map((trigger, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#10b981] font-bold">•</span>
                                  <span>{trigger}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {pattern.constraint_signals && pattern.constraint_signals.length > 0 && (
                          <div className="bg-white p-4 rounded-lg border border-[#e2e8f0] space-y-2">
                            <span className="font-bold text-[14px] text-[#1e2033] block">
                              Constraint signals
                            </span>
                            <ul className="space-y-1.5 text-[14px] text-[#475569]">
                              {pattern.constraint_signals.map((sig, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#b45309] font-bold">•</span>
                                  <span>{sig}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Light Monospace Blueprint Code Block */}
                      <div className="bg-white p-4 rounded-lg border border-[#e2e8f0] space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          {/* Language selector tabs */}
                          <div className="flex items-center gap-1.5">
                            {supportedLangs.map((lang) => (
                              <button
                                key={lang.id}
                                type="button"
                                onClick={() => setLangTab(lang.id)}
                                className={`px-2.5 py-1 rounded-md text-[13px] font-medium transition-colors ${
                                  activeLangId === lang.id
                                    ? 'bg-[#1e2033] text-white font-bold'
                                    : 'text-[#475569] hover:text-[#1e2033] bg-[#f8fafc] border border-[#e2e8f0]'
                                }`}
                              >
                                {lang.name}
                              </button>
                            ))}
                          </div>

                          {/* Secondary Copy Button */}
                          <button
                            type="button"
                            onClick={() => handleCopy(pattern.id, code)}
                            className="btn-secondary !py-1 !px-2.5 !text-[13px]"
                          >
                            {copiedId === pattern.id ? <Check className="w-3.5 h-3.5 text-[#047857]" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === pattern.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Light Monospace Code Box (No dark surfaces!) */}
                        <pre className="bg-[#f6f8fa] border border-[#e2e8f0] rounded-lg p-4 font-mono text-[13px] text-[#1e2033] leading-relaxed overflow-x-auto whitespace-pre">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
