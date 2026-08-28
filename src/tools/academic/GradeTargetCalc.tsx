import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Target, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';

export const GradeTargetCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [currentGrade, setCurrentGrade] = useState<number>(78);
  const [targetGrade, setTargetGrade] = useState<number>(85);
  const [finalExamWeight, setFinalExamWeight] = useState<number>(30);

  // Formula: Required Final Score = (Target - Current * (1 - Weight)) / Weight
  const currentWeight = (100 - finalExamWeight) / 100;
  const examWeightRatio = finalExamWeight / 100;
  const requiredFinalScore = examWeightRatio > 0
    ? (targetGrade - currentGrade * currentWeight) / examWeightRatio
    : 0;

  const isAchievable = requiredFinalScore <= 100;

  const handleCalculate = () => {
    if (isAchievable && requiredFinalScore <= 90) triggerConfetti();
    addHistoryItem({
      toolId: 'grade-calculator',
      toolName: 'Final Grade & Target Exam Score Calculator',
      inputSummary: `Current: ${currentGrade}% | Target: ${targetGrade}% (Final Weight: ${finalExamWeight}%)`,
      resultSummary: isAchievable ? `Need ${requiredFinalScore.toFixed(1)}% on Final Exam` : 'Unachievable (>100% needed)',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter Current Standing & Target</span>
            </h2>
            <button
              onClick={() => {
                setCurrentGrade(78);
                setTargetGrade(85);
                setFinalExamWeight(30);
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Current Overall Grade (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={currentGrade || ''}
                onChange={e => setCurrentGrade(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="e.g. 78"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Target Desired Course Grade (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={targetGrade || ''}
                onChange={e => setTargetGrade(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="e.g. 85"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Final Exam Weight</span>
                <span className="text-brand-600 font-bold">{finalExamWeight}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={finalExamWeight}
                onChange={e => setFinalExamWeight(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calculate Required Final Exam Score</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="Required Final Score"
          badge={isAchievable ? (requiredFinalScore <= 80 ? 'Easy Target' : 'Challenging') : 'Impossible'}
          badgeColor={isAchievable && requiredFinalScore <= 80 ? 'emerald' : isAchievable ? 'amber' : 'rose'}
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Minimum Score Needed on Final Exam
              </span>
              <div className={`text-4xl sm:text-5xl font-black ${isAchievable ? 'text-brand-600 dark:text-brand-400' : 'text-rose-600'}`}>
                {requiredFinalScore > 0 ? requiredFinalScore.toFixed(1) : 0}%
              </div>
              <p className="text-xs text-slate-500">
                {isAchievable
                  ? `Score at least ${Math.ceil(requiredFinalScore)}% on the final to secure ${targetGrade}% overall.`
                  : `Even with 100% on the final exam, maximum possible course grade is ${(currentGrade * currentWeight + 100 * examWeightRatio).toFixed(1)}%.`}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
