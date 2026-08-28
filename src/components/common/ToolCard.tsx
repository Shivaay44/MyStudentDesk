import React from 'react';
import { Star, ChevronRight, Sparkles } from 'lucide-react';
import { ToolMetadata } from '../../types/tools';
import { IconRenderer } from './IconRenderer';
import { useApp } from '../../context/AppContext';

interface ToolCardProps {
  tool: ToolMetadata;
  featured?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, featured = false }) => {
  const { setActiveToolId, toggleFavorite, isFavorite } = useApp();
  const favorite = isFavorite(tool.id);

  const categoryGradients: Record<string, string> = {
    'india-exam': 'from-orange-500/10 to-amber-500/5 text-orange-500 border-orange-500/20 group-hover:border-orange-500/40',
    'academic': 'from-brand-500/10 to-indigo-500/5 text-brand-500 border-brand-500/20 group-hover:border-brand-500/40',
    'attendance': 'from-emerald-500/10 to-teal-500/5 text-emerald-500 border-emerald-500/20 group-hover:border-emerald-500/40',
    'math': 'from-purple-500/10 to-pink-500/5 text-purple-500 border-purple-500/20 group-hover:border-purple-500/40',
    'productivity': 'from-rose-500/10 to-red-500/5 text-rose-500 border-rose-500/20 group-hover:border-rose-500/40',
    'utility': 'from-cyan-500/10 to-blue-500/5 text-cyan-500 border-cyan-500/20 group-hover:border-cyan-500/40',
  };

  const iconBg: Record<string, string> = {
    'india-exam': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white',
    'academic': 'bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white',
    'attendance': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
    'math': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white',
    'productivity': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
    'utility': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white',
  };

  return (
    <div
      onClick={() => setActiveToolId(tool.id)}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl border bg-white dark:bg-slate-900/80 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5 ${
        featured
          ? 'border-brand-500/40 shadow-md shadow-brand-500/5 dark:border-brand-500/30'
          : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className={`p-3 rounded-xl transition-all duration-300 ${iconBg[tool.category] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
            <IconRenderer name={tool.iconName} className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.badge && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                {tool.badge}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(tool.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-4 h-4 ${favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Short Description */}
        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
          {tool.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.shortDesc}
        </p>
      </div>

      {/* Footer / Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        <span className="capitalize">{tool.category.replace('-', ' ')}</span>
        <span className="inline-flex items-center gap-0.5 transform translate-x-0 group-hover:translate-x-1 transition-transform">
          Open Tool <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
