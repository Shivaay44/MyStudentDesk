import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { CheckSquare, RotateCcw, Sparkles, Award } from 'lucide-react';

export const MarksPercentageCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [marksObtained, setMarksObtained] = useState<number>(435);
  const [totalMarks, setTotalMarks] = useState<number>(500);

  const percentage = totalMarks > 0 ? (marksObtained / totalMarks) * 100 : 0;

  const getDivision = (pct: number) => {
    if (pct >= 75) return { text: 'First Division with Distinction', color: 'text-emerald-600 dark:text-emerald-400', badge: 'Distinction' };
    if (pct >= 60) return { text: 'First Division (First Class)', color: 'text-brand-600 dark:text-brand-400', badge: '1st Division' };
    if (pct >= 50) return { text: 'Second Division', color: 'text-amber-600 dark:text-amber-400', badge: '2nd Division' };
    if (pct >= 33) return { text: 'Third Division (Pass)', color: 'text-blue-600 dark:text-blue-400', badge: 'Pass' };
    return { text: 'Needs Improvement / Compartment', color: 'text-rose-600 dark:text-rose-400', badge: 'Below Pass Mark' };
  };

  const divInfo = getDivision(percentage);

  const handleCalculate = () => {
    if (percentage >= 90) triggerConfetti();
    addHistoryItem({
      toolId: 'marks-percentage',
      toolName: 'Marks Percentage Calculator',
      inputSummary: `${marksObtained} / ${totalMarks} Marks`,
      resultSummary: `${percentage.toFixed(2)}% (${divInfo.badge})`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter Marks Obtained</span>
            </h2>
            <button
              onClick={() => {
                setMarksObtained(435);
                setTotalMarks(500);
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Marks Scored / Obtained
              </label>
              <input
                type="number"
                min="0"
                value={marksObtained || ''}
                onChange={e => setMarksObtained(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="e.g. 435"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Total / Maximum Marks
              </label>
              <input
                type="number"
                min="1"
                value={totalMarks || ''}
                onChange={e => setTotalMarks(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="e.g. 500"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-medium">Common Max Marks:</span>
            <div className="flex gap-2 flex-wrap">
              {[100, 300, 500, 600, 720, 800, 1000].map(max => (
                <button
                  key={max}
                  onClick={() => setTotalMarks(max)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    totalMarks === max
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  /{max}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calculate Percentage</span>
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="Percentage Outcome"
          badge={divInfo.badge}
          badgeColor={percentage >= 75 ? 'emerald' : percentage >= 50 ? 'indigo' : 'rose'}
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Calculated Percentage
              </span>
              <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-brand-400">
                {percentage.toFixed(2)}%
              </div>
              <p className={`text-xs font-bold ${divInfo.color}`}>
                {divInfo.text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-400">Marks Lost:</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  {Math.max(0, totalMarks - marksObtained)} Marks
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-400">Fraction:</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  {marksObtained} / {totalMarks}
                </p>
              </div>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
