import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Calendar, Cake, Sparkles, Heart } from 'lucide-react';

export const AgeCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [dob, setDob] = useState<string>('2006-04-15');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const birthDate = new Date(dob);
  const asOfDate = new Date(targetDate);

  let years = asOfDate.getFullYear() - birthDate.getFullYear();
  let months = asOfDate.getMonth() - birthDate.getMonth();
  let days = asOfDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Next birthday calculation
  const nextBday = new Date(asOfDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBday < asOfDate) {
    nextBday.setFullYear(asOfDate.getFullYear() + 1);
  }
  const diffTime = Math.abs(nextBday.getTime() - asOfDate.getTime());
  const daysUntilNextBday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Total Lifetime Stats
  const totalMs = asOfDate.getTime() - birthDate.getTime();
  const totalDays = Math.max(0, Math.floor(totalMs / (1000 * 60 * 60 * 24)));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalHeartbeats = totalDays * 24 * 60 * 75; // avg 75 bpm

  // Zodiac Sign
  const getZodiac = (m: number, d: number) => {
    const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    const signs = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    return d > dates[m] ? signs[m + 1] : signs[m];
  };

  const zodiac = getZodiac(birthDate.getMonth(), birthDate.getDate());

  const handleSave = () => {
    addHistoryItem({
      toolId: 'age-calc',
      toolName: 'Age Calculator',
      inputSummary: `Born: ${dob} (As of ${targetDate})`,
      resultSummary: `${years} Years, ${months} Months, ${days} Days`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Chronological Age & Milestone Calculator
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date of Birth (DOB)
            </label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Age As Of Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-md shadow-cyan-500/20"
          >
            Save Age Result
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Exact Age Breakdown"
        mainValue={`${years} Yrs, ${months} Mos, ${days} Days`}
        mainLabel={`Born on ${birthDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
        accentColor="cyan"
        stats={[
          { label: 'Next Birthday In', value: `${daysUntilNextBday} Days`, badge: 'Upcoming' },
          { label: 'Zodiac Sign', value: zodiac },
          { label: 'Total Weeks Lived', value: `${totalWeeks.toLocaleString()} Wks` },
          { label: 'Total Days Lived', value: `${totalDays.toLocaleString()} Days` }
        ]}
        copyContent={`Age: ${years} years, ${months} months, ${days} days. Next birthday in ${daysUntilNextBday} days.`}
      />

      {/* Fun Lifetime Milestones */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Lifetime Experience Counters
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium">Total Hours Lived</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{totalHours.toLocaleString()} hrs</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium">Total Minutes</span>
            <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">{(totalHours * 60).toLocaleString()} mins</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="text-slate-400 block font-medium">Approx Heartbeats</span>
            <span className="text-base font-bold text-rose-500 mt-0.5 block">~{(totalHeartbeats / 1000000).toFixed(1)}M beats</span>
          </div>
        </div>
      </div>
    </div>
  );
};
