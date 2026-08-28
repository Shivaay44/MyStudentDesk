import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Target, CheckCircle2, AlertCircle, Calendar, Sparkles } from 'lucide-react';

export const RequiredAttendanceCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [totalHeld, setTotalHeld] = useState<number | string>(50);
  const [attended, setAttended] = useState<number | string>(32);
  const [targetPct, setTargetPct] = useState<number>(75);
  const [classesPerWeek, setClassesPerWeek] = useState<number>(20);

  const t = Number(totalHeld) || 0;
  const a = Number(attended) || 0;
  const target = Number(targetPct) || 75;
  const currentPct = t > 0 ? Number(((a / t) * 100).toFixed(2)) : 0;

  // Formula:
  // (a + x) / (t + x) >= target / 100
  // x = ceil((target * t - 100 * a) / (100 - target))
  let requiredClasses = 0;
  if (currentPct < target) {
    if (target < 100) {
      requiredClasses = Math.max(0, Math.ceil(((target * t) - (100 * a)) / (100 - target)));
    }
  }

  const weeksNeeded = classesPerWeek > 0 ? Number((requiredClasses / classesPerWeek).toFixed(1)) : 0;

  const handleSave = () => {
    addHistoryItem({
      toolId: 'required-attendance',
      toolName: 'Required Attendance Calculator',
      inputSummary: `Current: ${a}/${t} (${currentPct}%), Target: ${target}%`,
      resultSummary: currentPct >= target ? 'Target Already Achieved!' : `Must attend ${requiredClasses} consecutive classes (~${weeksNeeded} weeks)`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Target Attendance Recovery Plan
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
            Target Goal: {target}%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Total Classes Held
            </label>
            <input
              type="number"
              min="1"
              value={totalHeld}
              onChange={e => setTotalHeld(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Classes Attended
            </label>
            <input
              type="number"
              min="0"
              max={Number(totalHeld) || 1000}
              value={attended}
              onChange={e => setAttended(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Desired % ({target}%)
            </label>
            <div className="space-y-1">
              <input
                type="range"
                min="50"
                max="95"
                step="1"
                value={targetPct}
                onChange={e => setTargetPct(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>75%</span>
                <span>80%</span>
                <span>85%</span>
                <span>90%</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Weekly Classes Schedule
            </label>
            <input
              type="number"
              min="1"
              value={classesPerWeek}
              onChange={e => setClassesPerWeek(Number(e.target.value) || 20)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-500/20"
          >
            Save Target Plan
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Attendance Recovery Strategy"
        mainValue={currentPct >= target ? 'Goal Achieved!' : `${requiredClasses} Classes`}
        mainLabel={currentPct >= target ? `You already have ${currentPct}%, above your ${target}% target!` : `Must attend next ${requiredClasses} classes consecutively`}
        accentColor="emerald"
        stats={[
          { label: 'Current Attendance', value: `${currentPct}%` },
          { label: 'Target Goal', value: `${target}%` },
          { label: 'Estimated Time', value: currentPct >= target ? '0 Weeks' : `~${weeksNeeded} Weeks`, badge: 'Timeline' },
          { label: 'Total Future Classes', value: `${t + requiredClasses} Total` }
        ]}
        notes={
          currentPct >= target
            ? `Great job! Your current attendance of ${currentPct}% is already higher than your desired ${target}%.`
            : `To reach exactly ${target}%, attend all upcoming ${requiredClasses} classes without taking any leave. After completing ${requiredClasses} classes, your total will become ${a + requiredClasses}/${t + requiredClasses} = ${target}%.`
        }
        copyContent={`Target Attendance: ${currentPct}% -> ${target}%. Required: Attend ${requiredClasses} classes in a row (~${weeksNeeded} weeks).`}
      />

      <FormulaExplanation
        formula="Required Consecutive Classes N = ceil((Target% × Total - 100 × Attended) / (100 - Target%))"
        explanation="Solves for the exact integer number of upcoming classes you must attend (assuming 100% attendance during recovery) to lift your cumulative ratio to the target threshold."
        examples={[
          'If you attended 30/50 classes (60%) and want 75%: N = ((75×50 - 100×30) / 25) = (3750 - 3000)/25 = 750/25 = 30 classes.',
          'After 30 consecutive attended classes: (30+30)/(50+30) = 60/80 = 75.00%'
        ]}
      />
    </div>
  );
};
