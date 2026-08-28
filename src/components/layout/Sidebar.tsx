import React from 'react';
import {
  Compass,
  GraduationCap,
  Award,
  CalendarCheck,
  Binary,
  Timer,
  FileText,
  Star,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, TOOLS } from '../../utils/toolsData';
import { ToolCategory } from '../../types/tools';

export const Sidebar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    activeToolId,
    setActiveToolId,
    favorites,
  } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    'all': <Compass className="w-4 h-4" />,
    'india-exam': <GraduationCap className="w-4 h-4 text-orange-500" />,
    'academic': <Award className="w-4 h-4 text-indigo-500" />,
    'attendance': <CalendarCheck className="w-4 h-4 text-emerald-500" />,
    'math': <Binary className="w-4 h-4 text-purple-500" />,
    'productivity': <Timer className="w-4 h-4 text-rose-500" />,
    'utility': <FileText className="w-4 h-4 text-cyan-500" />,
  };

  const getToolCount = (catId: ToolCategory | 'all') => {
    if (catId === 'all') return TOOLS.length;
    return TOOLS.filter(t => t.category === catId).length;
  };

  const handleCategoryClick = (catId: ToolCategory | 'all') => {
    setSelectedCategory(catId);
    if (activeToolId !== null) {
      setActiveToolId(null);
    }
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Category Filter Nav */}
      <div className="p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
        <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Categories
        </div>
        <div className="space-y-1 mt-1">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all' && activeToolId === null
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {iconMap['all']}
              <span>All Tools</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                selectedCategory === 'all' && activeToolId === null
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {getToolCount('all')}
            </span>
          </button>

          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id && activeToolId === null;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {iconMap[cat.id]}
                  <span className="truncate">{cat.name}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {getToolCount(cat.id)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Indian Exams Highlights Box */}
      <div className="p-4 rounded-2xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent text-xs">
        <div className="flex items-center gap-2 font-bold text-orange-600 dark:text-orange-400 mb-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>India Board & Entrances</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mb-3">
          Calibrated with 2025/2026 NTA shift curves, CBSE Best-5 rules & NEET 720 score model.
        </p>
        <div className="space-y-1.5">
          {TOOLS.filter(t => t.isIndiaSpecific)
            .slice(0, 4)
            .map(t => (
              <button
                key={t.id}
                onClick={() => setActiveToolId(t.id)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-slate-800/60 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between group transition-colors"
              >
                <span className="truncate">{t.name}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
        </div>
      </div>
    </aside>
  );
};
