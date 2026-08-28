import React from 'react';
import { CopyButton } from './CopyButton';
import { Share2, Printer, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StatItem {
  label: string;
  value: string | number;
  badge?: string;
  badgeColor?: string;
  subtext?: string;
}

interface ResultCardProps {
  title?: string;
  mainValue?: string | number;
  mainLabel?: string;
  accentColor?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'cyan';
  stats?: StatItem[];
  copyContent?: string;
  notes?: string;
  badge?: string;
  badgeColor?: string;
  showPrint?: boolean;
  onCelebration?: () => void;
  children?: React.ReactNode;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title = 'Calculation Result',
  mainValue,
  mainLabel,
  accentColor = 'indigo',
  stats,
  copyContent,
  notes,
  badge,
  badgeColor,
  showPrint = false,
  children,
}) => {
  const { triggerConfetti } = useApp();

  const colorStyles = {
    indigo: 'from-brand-600/15 via-indigo-600/5 to-transparent border-brand-500/30 text-brand-600 dark:text-brand-400',
    emerald: 'from-emerald-600/15 via-teal-600/5 to-transparent border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    amber: 'from-amber-600/15 via-orange-600/5 to-transparent border-amber-500/30 text-amber-600 dark:text-amber-400',
    rose: 'from-rose-600/15 via-pink-600/5 to-transparent border-rose-500/30 text-rose-600 dark:text-rose-400',
    purple: 'from-purple-600/15 via-fuchsia-600/5 to-transparent border-purple-500/30 text-purple-600 dark:text-purple-400',
    cyan: 'from-cyan-600/15 via-blue-600/5 to-transparent border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
  };

  const textGradient = {
    indigo: 'from-brand-600 to-indigo-500 dark:from-brand-400 dark:to-indigo-300',
    emerald: 'from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300',
    amber: 'from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-300',
    rose: 'from-rose-600 to-pink-500 dark:from-rose-400 dark:to-pink-300',
    purple: 'from-purple-600 to-fuchsia-500 dark:from-purple-400 dark:to-fuchsia-300',
    cyan: 'from-cyan-600 to-blue-500 dark:from-cyan-400 dark:to-blue-300',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border bg-gradient-to-b ${colorStyles[accentColor]} p-6 sm:p-7 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20`}>
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-500" />
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{title}</h3>
          {badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                badgeColor === 'emerald'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : badgeColor === 'amber'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  : badgeColor === 'rose'
                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  : 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/20'
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 no-print">
          {copyContent && <CopyButton text={copyContent} />}
          {showPrint && (
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all"
              title="Print results"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Focus Metric (if provided) */}
      {mainValue !== undefined && (
        <div className="my-3">
          {mainLabel && (
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {mainLabel}
            </p>
          )}
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${textGradient[accentColor]}`}>
              {mainValue}
            </span>
          </div>
        </div>
      )}

      {/* Secondary Stats Grid */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800/60">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">{stat.label}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">{stat.value}</span>
                {stat.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${stat.badgeColor || 'bg-brand-500/10 text-brand-600 dark:text-brand-400'}`}>
                    {stat.badge}
                  </span>
                )}
              </div>
              {stat.subtext && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.subtext}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Custom Children */}
      {children && <div className="mt-4">{children}</div>}

      {/* Notes / Tips */}
      {notes && (
        <div className="mt-4 pt-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/40 dark:border-slate-800/40 italic">
          💡 {notes}
        </div>
      )}
    </div>
  );
};
