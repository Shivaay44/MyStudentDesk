import React from 'react';
import { Home, ChevronRight, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../utils/toolsData';

export const Breadcrumb: React.FC = () => {
  const { currentTool, setActiveToolId, toggleFavorite, isFavorite } = useApp();

  if (!currentTool) return null;

  const category = CATEGORIES.find(c => c.id === currentTool.category);
  const favorite = isFavorite(currentTool.id);

  return (
    <div className="flex items-center justify-between gap-3 mb-6 flex-wrap no-print">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <button
          onClick={() => setActiveToolId(null)}
          className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        {category && (
          <>
            <span className="font-medium text-slate-600 dark:text-slate-300">{category.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </>
        )}
        <span className="font-semibold text-slate-900 dark:text-white truncate">{currentTool.name}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleFavorite(currentTool.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            favorite
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-400'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${favorite ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>{favorite ? 'Pinned to Favs' : 'Pin to Favs'}</span>
        </button>
      </div>
    </div>
  );
};
