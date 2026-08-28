import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Coffee, CheckCircle2, AlertTriangle, XCircle, RotateCcw, Calendar, Sparkles } from 'lucide-react';

export const BunkCalc: React.FC = () => {
  const { addHistoryItem } = useApp();
  const [totalClasses, setTotalClasses] = useState<number>(40);
  const [attendedClasses, setAttendedClasses] = useState<number>(34);
  const [targetPercentage, setTargetPercentage] = useState<number>(75);

  const currentPercent = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
  const isEligible = currentPercent >= targetPercentage;

  // Safe bunks available
  const safeBunks = isEligible
    ? Math.floor((attendedClasses - (targetPercentage / 100) * totalClasses) / (targetPercentage / 100))
    : 0;

  // Classes needed to recover
  const classesNeeded = !isEligible && targetPercentage < 100
    ? Math.ceil(((targetPercentage / 100) * totalClasses - attendedClasses) / (1 - targetPercentage / 100))
    : 0;

  const handleCalculate = () => {
    addHistoryItem({
      toolId: 'bunk-calculator',
      toolName: 'College Bunk Calculator',
      inputSummary: `${attendedClasses}/${totalClasses} classes attended (Target ${targetPercentage}%)`,
      resultSummary: isEligible ? `${safeBunks} safe bunks available` : `Must attend next ${classesNeeded} classes`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Coffee className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter Lecture Details</span>
            </h2>
            <button
              onClick={() => {
                setTotalClasses(40);
                setAttendedClasses(34);
                setTargetPercentage(75);
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Attended vs Total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Classes Attended So Far
              </label>
              <input
                type="number"
                min="0"
                max={totalClasses}
                value={attendedClasses || ''}
                onChange={e => {
                  const val = Number(e.target.value);
                  setAttendedClasses(val);
                }}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="e.g. 34"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Total Classes Held
              </label>
              <input
                type="number"
                min="1"
                value={totalClasses || ''}
                onChange={e => {
                  const val = Number(e.target.value);
                  setTotalClasses(val);
                }}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="e.g. 40"
              />
            </div>
          </div>

          {/* Target Percentage Selector */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Target Attendance Requirement</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">{targetPercentage}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[75, 80, 85, 90].map(pct => (
                <button
                  key={pct}
                  onClick={() => setTargetPercentage(pct)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    targetPercentage === pct
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calculate Bunk Allowance</span>
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="Bunk Meter Result"
          badge={isEligible ? 'In Safe Zone' : 'Below Target'}
          badgeColor={isEligible ? 'emerald' : 'rose'}
        >
          <div className="space-y-6">
            {/* Primary Stat */}
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Current Attendance
              </span>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                {currentPercent.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {attendedClasses} attended out of {totalClasses} conducted lectures
              </p>
            </div>

            {/* Bunk Outcome Banner */}
            {isEligible ? (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                    You can safely bunk {safeBunks} {safeBunks === 1 ? 'class' : 'classes'}!
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    Even after missing the next {safeBunks} lectures, your attendance will stay at{' '}
                    <strong>
                      {totalClasses + safeBunks > 0
                        ? ((attendedClasses / (totalClasses + safeBunks)) * 100).toFixed(1)
                        : 0}
                      %
                    </strong>{' '}
                    (≥ {targetPercentage}%).
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3.5">
                <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-rose-900 dark:text-rose-300 text-sm">
                    No Safe Bunks Available!
                  </h3>
                  <p className="text-xs text-rose-700 dark:text-rose-400 leading-relaxed">
                    You are currently <strong>{(targetPercentage - currentPercent).toFixed(1)}%</strong> below target.
                    You must attend the next <strong>{classesNeeded} consecutive classes</strong> with zero leaves to reach {targetPercentage}%.
                  </p>
                </div>
              </div>
            )}
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
