import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
import { ToolRenderer } from './components/common/ToolRenderer';
import { CommandPalette } from './components/layout/CommandPalette';
import { HistoryModal } from './components/layout/HistoryModal';

const MainLayout: React.FC = () => {
  const { activeToolId } = useApp();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar onOpenHistory={() => setIsHistoryOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (shown on desktop or when on dashboard) */}
          {activeToolId === null && <Sidebar />}

          {/* Dynamic Content View */}
          <div className="flex-1 min-w-0">
            {activeToolId ? <ToolRenderer /> : <Dashboard />}
          </div>
        </div>
      </main>

      {/* Global Modals & Drawers */}
      <CommandPalette />
      <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
