import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CalculationHistoryItem, ToolCategory, ToolMetadata } from '../types/tools';
import { TOOLS } from '../utils/toolsData';

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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('mystudentdesk_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Active Tool & Navigation
  const [activeToolId, setActiveToolIdState] = useState<string | null>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash && TOOLS.some(t => t.id === hash)) return hash;
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mystudentdesk_favs');
      return saved ? JSON.parse(saved) : ['jee-predictor', 'cbse-percentage', 'attendance-calc', 'pomodoro'];
    } catch {
      return ['jee-predictor', 'cbse-percentage', 'attendance-calc', 'pomodoro'];
    }
  });

  // Recent tools
  const [recentTools, setRecentTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mystudentdesk_recents');
      return saved ? JSON.parse(saved) : ['jee-predictor', 'cbse-percentage', 'attendance-calc'];
    } catch {
      return [];
    }
  });

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

  // Sync URL hash
  const setActiveToolId = (id: string | null) => {
    setActiveToolIdState(id);
    if (id) {
      window.location.hash = `#/${id}`;
      addRecentTool(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '';
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash && TOOLS.some(t => t.id === hash)) {
        setActiveToolIdState(hash);
      } else if (!hash) {
        setActiveToolIdState(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    setRecentTools(prev => {
      const filtered = prev.filter(id => id !== toolId);
      const updated = [toolId, ...filtered].slice(0, 8);
      localStorage.setItem('mystudentdesk_recents', JSON.stringify(updated));
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
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
