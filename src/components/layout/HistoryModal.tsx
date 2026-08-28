import React from 'react';
import { X, Trash2, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CopyButton } from '../common/CopyButton';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const { history, clearHistory, deleteHistoryItem, setActiveToolId } = useApp();

  if (!isOpen) return null;

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-500" />
            <h2 className="font-bold text-base text-slate-900 dark:text-white">Calculation History</h2>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg flex items-center gap-1 transition-colors"
                title="Clear all history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3 stroke-[1.5]" />
              <p className="font-semibold text-sm text-slate-600 dark:text-slate-300">No calculations recorded yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                As you use calculators like JEE Predictor, Attendance Bunk, or Matrix Solver, your recent results will appear here.
              </p>
            </div>
          ) : (
            history.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-brand-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-600 dark:text-brand-400">{item.toolName}</span>
                  <span className="text-[11px] text-slate-400">{formatDate(item.timestamp)}</span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-sans">Input</div>
                  <div className="truncate">{item.inputSummary}</div>
                  <div className="text-brand-500 font-bold mt-1 text-[13px]">{item.resultSummary}</div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <CopyButton text={`${item.toolName}: ${item.inputSummary} -> ${item.resultSummary}`} label="Copy" />
                  <button
                    onClick={() => {
                      setActiveToolId(item.toolId);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-medium hover:underline text-xs"
                  >
                    <span>Open Tool</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
