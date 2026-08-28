import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Info } from 'lucide-react';

interface FormulaExplanationProps {
  title?: string;
  formula: string;
  explanation: string;
  examples?: string[];
}

export const FormulaExplanation: React.FC<FormulaExplanationProps> = ({
  title = 'How is this calculated?',
  formula,
  explanation,
  examples,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden text-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-500" />
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-4 pt-0 space-y-3 border-t border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400">
          <div className="mt-3 p-3 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200/50 dark:border-brand-900/50 font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300">
            {formula}
          </div>

          <p className="text-xs sm:text-sm leading-relaxed">{explanation}</p>

          {examples && examples.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Examples / References:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs">
                {examples.map((ex, idx) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
