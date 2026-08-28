import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { CalendarRange, Sparkles } from 'lucide-react';

export const DateDiffCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  });
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(true);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();
  let totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  if (includeEndDay && totalDays >= 0) totalDays += 1;

  // Working days (Monday - Friday) and (Monday - Saturday)
  let monFriDays = 0;
  let monSatDays = 0;
  let weekendDays = 0;

  if (totalDays > 0) {
    const cur = new Date(start);
    const limit = includeEndDay ? totalDays : totalDays - 1;
    for (let i = 0; i < totalDays; i++) {
      const dayOfWeek = cur.getDay(); // 0 is Sunday, 6 is Saturday
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        monFriDays++;
        monSatDays++;
      } else if (dayOfWeek === 6) {
        monSatDays++; // Saturday study day
        weekendDays++;
      } else {
        weekendDays++; // Sunday
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  const weeks = Math.floor(totalDays / 7);
  const remDays = totalDays % 7;

  const handleSave = () => {
    addHistoryItem({
      toolId: 'date-diff',
      toolName: 'Date Difference Calculator',
      inputSummary: `${startDate} to ${endDate}`,
      resultSummary: `${totalDays} Total Days (${monSatDays} Study Days)`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CalendarRange className="w-5 h-5 text-cyan-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Date Duration & Exam Prep Timeline
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Start / Current Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target / Exam End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="includeEnd"
            checked={includeEndDay}
            onChange={e => setIncludeEndDay(e.target.checked)}
            className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
          />
          <label htmlFor="includeEnd" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            Include final end day in total calculation
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-md shadow-cyan-500/20"
          >
            Save Date Difference
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Time Duration Results"
        mainValue={`${totalDays} Days`}
        mainLabel={`Equivalent to ${weeks} Weeks & ${remDays} Days`}
        accentColor="cyan"
        stats={[
          { label: 'Total Days', value: `${totalDays} Days` },
          { label: 'Working Days (Mon-Fri)', value: `${monFriDays} Days` },
          { label: 'Study Days (Mon-Sat)', value: `${monSatDays} Days`, badge: 'Recommended' },
          { label: 'Weekends / Rest Days', value: `${weekendDays} Days` }
        ]}
        copyContent={`Duration from ${startDate} to ${endDate}: ${totalDays} total days (${monSatDays} study days).`}
      />
    </div>
  );
};
