import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, TOOLS } from '../../utils/toolsData';
import { ToolCard } from '../common/ToolCard';
import { SeoKnowledgeHub } from '../seo/SeoKnowledgeHub';
import {
  Search,
  Sparkles,
  Flame,
  Star,
  Clock,
  Compass,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  WifiOff,
  HeartHandshake,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    favorites,
    recentToolEntries,
    setActiveToolId,
    setIsCommandPaletteOpen,
  } = useApp();

  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));
  
  // Format humanized time for recent tools
  const formatTimeAgo = (timestamp: number) => {
    const elapsedMs = Date.now() - timestamp;
    const mins = Math.floor(elapsedMs / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `Used ${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Used ${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Used yesterday';
    return `Used ${days}d ago`;
  };

  const recentToolsList = recentToolEntries
    .map(entry => {
      const tool = TOOLS.find(t => t.id === entry.id);
      return tool ? { ...tool, timeAgo: formatTimeAgo(entry.timestamp) } : null;
    })
    .filter(Boolean) as (typeof TOOLS[0] & { timeAgo: string })[];

  // Smart natural language search
  const filteredTools = TOOLS.filter(tool => {
    // Category filter
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      
      // Direct keyword matches
      if (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDesc.toLowerCase().includes(q) ||
        tool.tags.some(tag => tag.toLowerCase().includes(q))
      ) {
        return true;
      }

      // Smart pattern detection
      if (q.includes('bunk') && (tool.id === 'bunk-calculator' || tool.id === 'attendance-calc')) return true;
      if (q.includes('out of') || q.includes('marks') && (tool.id === 'marks-percentage' || tool.id === 'percentage')) return true;
      if (q.includes('sgpa') && (tool.id === 'sgpa-to-percentage' || tool.id === 'gpa-calc')) return true;
      if (q.includes('cgpa') && (tool.id === 'cgpa-percentage' || tool.id === 'cbse-cgpa')) return true;
      if (q.includes('jee') && tool.id === 'jee-predictor') return true;
      if (q.includes('neet') && tool.id === 'neet-calc') return true;
      if (q.includes('bitsat') && tool.id === 'bitsat-predictor') return true;
      if (q.includes('cuet') && (tool.id === 'cuet-college-predictor' || tool.id === 'cuet-calc')) return true;
      if (q.includes('countdown') && tool.id === 'exam-countdown') return true;
      if (q.includes('loan') && tool.id === 'simple-interest-loan') return true;
      if (q.includes('fraction') && tool.id === 'fraction-percentage') return true;

      return false;
    }
    return true;
  });

  const popularTools = TOOLS.filter(t => t.isPopular).slice(0, 8);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-600/10 via-indigo-600/5 to-transparent p-6 sm:p-10 backdrop-blur-xl shadow-lg shadow-brand-500/5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{TOOLS.length}+ Academic, Math, Exam & Productivity Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Everything you need for{' '}
            <span className="gradient-text">Exams, Grades & Productivity</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            From JEE & NEET rank predictors and CBSE Best-5 calculators to college attendance bunk meters and client-side PDF tools — all fast, offline-first, and 100% free.
          </p>

          {/* Value Proposition Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pb-1">
            {[
              { icon: Zap, label: 'Instant', desc: '0ms calculation time' },
              { icon: Shield, label: '100% Private', desc: 'Zero data uploads' },
              { icon: WifiOff, label: 'Works Offline', desc: 'Browser cached' },
              { icon: HeartHandshake, label: 'Free Forever', desc: 'No paywalls' },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-xs"
                >
                  <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block text-[11px] leading-tight">
                      {p.label}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                      {p.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Search Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${TOOLS.length}+ tools (e.g. "87 out of 100", "can I bunk 3 classes", "JEE Rank", "BITSAT")...`}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
            >
              <span>Quick Search (Ctrl+K)</span>
            </button>
          </div>

          {/* Quick Launcher Pills */}
          <div className="pt-1 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-semibold">Popular Now:</span>
            {[
              { id: 'bunk-calculator', label: 'Bunk Calculator ⏰' },
              { id: 'jee-predictor', label: 'JEE Rank Predictor 🎯' },
              { id: 'cbse-percentage', label: 'CBSE Best 5 📜' },
              { id: 'marks-percentage', label: 'Marks to % 💯' },
              { id: 'neet-calc', label: 'NEET Score 🩺' },
              { id: 'pomodoro', label: 'Pomodoro Focus 🎧' },
              { id: 'pdf-tools', label: 'Private PDF 📄' },
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setActiveToolId(pill.id)}
                className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Scrolling Category Chips */}
      <div className="lg:hidden -mx-4 px-4 overflow-x-auto pb-2 scrollbar-none flex items-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
            selectedCategory === 'all'
              ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          All ({TOOLS.length})
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === c.id
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {c.name.split('&')[0].trim()}
          </button>
        ))}
      </div>

      {/* Continue Where You Left Off (Recently Used) */}
      {recentToolsList.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Continue Where You Left Off</span>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {recentToolsList.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveToolId(t.id)}
                className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all shrink-0 flex items-center gap-2.5 shadow-sm group"
              >
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white group-hover:text-brand-600">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">{t.timeAgo}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Pinned / Favorites Section OR Most Used for new visitors */}
      {favoriteTools.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Pinned Tools</h2>
            </div>
            <span className="text-xs text-slate-400">{favoriteTools.length} Saved</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Most Used Tools</h2>
            </div>
            <span className="text-xs text-slate-400">Popular right now</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.slice(0, 4).map(tool => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Tools Grid with Category Headers */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {selectedCategory === 'all'
                ? 'Explore All Tools'
                : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Tools'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </p>
          </div>

          {/* Desktop Category Filter Tabs */}
          <div className="hidden lg:flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All ({TOOLS.length})
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {c.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
            <Compass className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">No matching tools found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try searching with another keyword or select "All Tools".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* Comprehensive Academic Guide & SEO Knowledge Hub (Compact Tabbed View) */}
      <SeoKnowledgeHub />
    </div>
  );
};
