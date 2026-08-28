import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CalculationHistoryItem, ToolCategory, ToolMetadata } from '../types/tools';
import { TOOLS } from '../utils/toolsData';

export interface RecentToolItem {
  id: string;
  timestamp: number;
}

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeToolId: string | null;
  setActiveToolId: (id: string | null) => void;
  selectedCategory: ToolCategory | 'all';
  setSelectedCategory: (cat: ToolCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  recentTools: string[];
  recentToolEntries: RecentToolItem[];
  addRecentTool: (toolId: string) => void;
  history: CalculationHistoryItem[];
  addHistoryItem: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  deleteHistoryItem: (id: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  triggerConfetti: () => void;
  currentTool: ToolMetadata | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const extractToolIdFromUrl = (): string | null => {
  // 1. Check path (e.g. /tools/cbse-percentage)
  const path = window.location.pathname;
  if (path.includes('/tools/')) {
    const slug = path.split('/tools/')[1]?.replace(/\/$/, '');
    if (slug && TOOLS.some(t => t.id === slug)) return slug;
  }

  // 2. Check hash (e.g. #/tools/cbse-percentage or #/cbse-percentage or #cbse-percentage)
  const hash = window.location.hash.replace('#/tools/', '').replace('#/', '').replace('#', '');
  if (hash && TOOLS.some(t => t.id === hash)) return hash;

  // 3. Check search params (e.g. ?tool=cbse-percentage)
  const params = new URLSearchParams(window.location.search);
  const paramTool = params.get('tool');
  if (paramTool && TOOLS.some(t => t.id === paramTool)) return paramTool;

  return null;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('mystudentdesk_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Active Tool & Navigation initialized directly from URL
  const [activeToolId, setActiveToolIdState] = useState<string | null>(() => extractToolIdFromUrl());

  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mystudentdesk_favs');
      return saved ? JSON.parse(saved) : ['jee-predictor', 'cbse-percentage', 'bunk-calculator', 'pomodoro'];
    } catch {
      return ['jee-predictor', 'cbse-percentage', 'bunk-calculator', 'pomodoro'];
    }
  });

  // Timestamped recent tools
  const [recentToolEntries, setRecentToolEntries] = useState<RecentToolItem[]>(() => {
    try {
      const saved = localStorage.getItem('mystudentdesk_recents_v2');
      if (saved) return JSON.parse(saved);
      return [
        { id: 'jee-predictor', timestamp: Date.now() - 1000 * 60 * 45 },
        { id: 'cbse-percentage', timestamp: Date.now() - 1000 * 60 * 180 },
        { id: 'bunk-calculator', timestamp: Date.now() - 1000 * 60 * 60 * 24 },
      ];
    } catch {
      return [];
    }
  });

  const recentTools = recentToolEntries.map(e => e.id);

  // Calculation History
  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('mystudentdesk_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mystudentdesk_theme', theme);
  }, [theme]);

  // Sync URL changes and deep links
  const setActiveToolId = (id: string | null) => {
    setActiveToolIdState(id);
    if (id) {
      window.location.hash = `#/tools/${id}`;
      addRecentTool(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const parsedId = extractToolIdFromUrl();
      setActiveToolIdState(parsedId);
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Dynamic SEO Title, Canonical & Meta Description update
  useEffect(() => {
    if (activeToolId) {
      const tool = TOOLS.find(t => t.id === activeToolId);
      if (tool) {
        document.title = `${tool.name} - Free Online Calculator & Predictor | MyStudentDesk`;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', `${tool.name}: ${tool.description} Fast, 100% private, and client-side calculator.`);
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
          ogUrl.setAttribute('content', `https://mystudentdesk.vercel.app/#/tools/${tool.id}`);
        }

        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', `https://mystudentdesk.vercel.app/#/tools/${tool.id}`);
        }
      }
    } else {
      document.title = `MyStudentDesk - Free ${TOOLS.length}+ Student Utilities, Exam Predictors & Calculators`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Free ultimate student workspace with ${TOOLS.length}+ academic tools: JEE Main Rank Predictor, NEET Score Calculator, CBSE Best 5 & CGPA Converter, 75% Attendance Bunk Meter, Matrix Math, PDF Merger, Pomodoro Timer, and APA/MLA Citation Generator.`
        );
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', 'https://mystudentdesk.vercel.app/');
      }

      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', 'https://mystudentdesk.vercel.app/');
      }
    }
  }, [activeToolId]);

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      localStorage.setItem('mystudentdesk_favs', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const addRecentTool = (toolId: string) => {
    setRecentToolEntries(prev => {
      const filtered = prev.filter(item => item.id !== toolId);
      const updated = [{ id: toolId, timestamp: Date.now() }, ...filtered].slice(0, 10);
      localStorage.setItem('mystudentdesk_recents_v2', JSON.stringify(updated));
      return updated;
    });
  };

  const addHistoryItem = (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: CalculationHistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    setHistory(prev => {
      const updated = [newItem, ...prev].slice(0, 30);
      localStorage.setItem('mystudentdesk_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mystudentdesk_history');
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem('mystudentdesk_history', JSON.stringify(updated));
      return updated;
    });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas not available
    }
  };

  const currentTool = TOOLS.find(t => t.id === activeToolId);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeToolId,
        setActiveToolId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        favorites,
        toggleFavorite,
        isFavorite,
        recentTools,
        recentToolEntries,
        addRecentTool,
        history,
        addHistoryItem,
        clearHistory,
        deleteHistoryItem,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        triggerConfetti,
        currentTool,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
