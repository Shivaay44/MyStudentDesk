import React, { useState } from 'react';
import {
  Search,
  Moon,
  Sun,
  History,
  Star,
  Command,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOOLS } from '../../utils/toolsData';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHistory }) => {
  const {
    theme,
    toggleTheme,
    setActiveToolId,
    setIsCommandPaletteOpen,
    favorites,
    history,
  } = useApp();

  const [showFavsDropdown, setShowFavsDropdown] = useState(false);
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Logo */}
          <div
            onClick={() => setActiveToolId(null)}
            className="cursor-pointer group"
          >
            <BrandLogo size="md" />
          </div>

          {/* Center: Search Trigger (Ctrl+K) */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search 25+ calculators, formulas, tools...</span>
              </div>
              <kbd className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-sm">
                <Command className="w-3 h-3" /> K
              </kbd>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFavsDropdown(!showFavsDropdown)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Favorite tools"
              >
                <Star className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </button>

              {showFavsDropdown && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setShowFavsDropdown(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Pinned Tools ({favorites.length})
                    </span>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {favoriteTools.length === 0 ? (
                      <p className="px-3 py-3 text-xs text-slate-400 text-center">No tools pinned yet. Click star on any tool!</p>
                    ) : (
                      favoriteTools.map(t => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setActiveToolId(t.id);
                            setShowFavsDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          <span className="font-medium truncate">{t.name}</span>
                          <span className="text-[10px] text-slate-400 capitalize">{t.category}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* History Drawer Trigger */}
            <button
              onClick={onOpenHistory}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Recent calculations history"
            >
              <History className="w-5 h-5" />
              {history.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
