import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Calculator, RotateCcw, Sparkles, Building } from 'lucide-react';

export const SgpaToPercentageCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [sgpa, setSgpa] = useState<number>(8.4);
  const [university, setUniversity] = useState<string>('standard');

  const calculatePercentage = (val: number, uni: string): number => {
    switch (uni) {
      case 'vtu':
      case 'aktu':
      case 'makaut':
        return Math.max(0, (val - 0.75) * 10);
      case 'mumbai':
        return val >= 7.0 ? 7.1 * val + 11 : 7.25 * val + 11;
      case 'anna':
        return val * 10;
      case 'gtu':
        return Math.max(0, (val - 0.5) * 10);
      case 'sppu':
        if (val >= 9.0) return val * 20 - 100;
        if (val >= 8.25) return val * 12 - 28;
        if (val >= 7.5) return val * 10 - 11.5;
        return val * 10;
      case 'standard':
      default:
        return val * 9.5;
    }
  };

  const percentage = calculatePercentage(sgpa, university);

  const handleCalculate = () => {
    if (percentage >= 85) triggerConfetti();
    addHistoryItem({
      toolId: 'sgpa-to-percentage',
      toolName: 'SGPA to Percentage Converter',
      inputSummary: `${sgpa} SGPA (${university.toUpperCase()})`,
      resultSummary: `${percentage.toFixed(2)}%`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter Semester SGPA</span>
            </h2>
            <button
              onClick={() => {
                setSgpa(8.4);
                setUniversity('standard');
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Semester SGPA (on 10.0 Scale)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={sgpa || ''}
              onChange={e => setSgpa(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g. 8.4"
            />
          </div>

          {/* University Preset Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-brand-600" />
              <span>Select University / Board Scale</span>
            </label>
            <select
              value={university}
              onChange={e => setUniversity(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="standard">Standard UGC / CBSE (SGPA × 9.5)</option>
              <option value="vtu">VTU Karnataka ((SGPA - 0.75) × 10)</option>
              <option value="mumbai">Mumbai University (7.1 × SGPA + 11)</option>
              <option value="anna">Anna University (SGPA × 10)</option>
              <option value="aktu">AKTU / UPTU Lucknow ((SGPA - 0.75) × 10)</option>
              <option value="sppu">SPPU Pune University</option>
              <option value="makaut">MAKAUT WBUT ((SGPA - 0.75) × 10)</option>
              <option value="gtu">GTU Gujarat ((SGPA - 0.5) × 10)</option>
            </select>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Convert to Percentage</span>
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="Equivalent Semester Percentage"
          badge={percentage >= 75 ? 'Distinction' : percentage >= 60 ? 'First Class' : 'Pass'}
          badgeColor={percentage >= 75 ? 'emerald' : 'indigo'}
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Converted Percentage
              </span>
              <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-brand-400">
                {percentage.toFixed(2)}%
              </div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Based on {university.toUpperCase()} official conversion formula
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">Active Formula:</span>
              <p className="text-slate-600 dark:text-slate-400 font-mono">
                {university === 'standard' && 'Percentage = SGPA × 9.5'}
                {(university === 'vtu' || university === 'aktu' || university === 'makaut') && 'Percentage = (SGPA - 0.75) × 10'}
                {university === 'mumbai' && 'Percentage = (7.1 × SGPA) + 11 (for SGPA ≥ 7)'}
                {university === 'anna' && 'Percentage = SGPA × 10'}
                {university === 'gtu' && 'Percentage = (SGPA - 0.5) × 10'}
                {university === 'sppu' && 'Piecewise scale based on Grade Points'}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
