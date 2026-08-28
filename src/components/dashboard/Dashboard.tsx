import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, TOOLS } from '../../utils/toolsData';
import { ToolCard } from '../common/ToolCard';
import {
  Search,
  Sparkles,
  Flame,
  Star,
  Clock,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    favorites,
    recentTools,
    setActiveToolId,
    setIsCommandPaletteOpen,
  } = useApp();

  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));
  const recentToolsList = recentTools.map(id => TOOLS.find(t => t.id === id)).filter(Boolean) as typeof TOOLS;

  const filteredTools = TOOLS.filter(tool => {
    // Category filter
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDesc.toLowerCase().includes(q) ||
        tool.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const popularTools = TOOLS.filter(t => t.isPopular);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-600/10 via-indigo-600/5 to-transparent p-6 sm:p-10 backdrop-blur-xl shadow-lg shadow-brand-500/5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>25+ Academic, Math, Exam & Document Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Everything you need for{' '}
            <span className="gradient-text">Exams, Grades & Productivity</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            From JEE & NEET rank predictors and CBSE Best-5 calculators to college attendance bunk meters and client-side PDF tools — all fast, offline-first, and 100% free.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search any tool (e.g. JEE Rank, CBSE Percentage, Bunk Meter, Matrix, PDF)..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
            >
              <span>Quick Command (Ctrl+K)</span>
            </button>
          </div>

          {/* Quick Launcher Pills */}
          <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-semibold">Popular Now:</span>
            {[
              { id: 'jee-predictor', label: 'JEE Rank Predictor 🎯' },
              { id: 'cbse-percentage', label: 'CBSE Best 5 📜' },
              { id: 'attendance-calc', label: 'Attendance Bunk ⏰' },
              { id: 'neet-calc', label: 'NEET Score 🩺' },
              { id: 'pomodoro', label: 'Pomodoro 🎧' },
              { id: 'pdf-tools', label: 'Merge PDF 📄' },
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

      {/* Pinned / Favorites Section */}
      {favoriteTools.length > 0 && (
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
      )}

      {/* Recent Tools Row */}
      {recentToolsList.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Jump Back In</span>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {recentToolsList.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveToolId(t.id)}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all shrink-0 flex items-center gap-2 shadow-sm"
              >
                <span>{t.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
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

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1">
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
    </div>
  );
};
