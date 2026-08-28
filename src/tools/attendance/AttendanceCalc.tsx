import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { CalendarCheck, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AttendanceCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [totalHeld, setTotalHeld] = useState<number | string>(64);
  const [attended, setAttended] = useState<number | string>(54);
  const [minReq, setMinReq] = useState<number | string>(75);

  const t = Number(totalHeld) || 0;
  const a = Number(attended) || 0;
  const req = Number(minReq) || 75;

  const currentPct = t > 0 ? Number(((a / t) * 100).toFixed(2)) : 0;

  // Calculate safe bunks left:
  // (a / (t + bunks)) >= req / 100
  // a * 100 >= req * (t + bunks)
  // bunks <= (100 * a - req * t) / req
  let safeBunks = 0;
  let classesNeeded = 0;

  if (currentPct >= req) {
    safeBunks = Math.floor(((100 * a) - (req * t)) / req);
    if (safeBunks < 0) safeBunks = 0;
  } else {
    // Need more classes:
    // (a + x) / (t + x) >= req / 100
    // 100a + 100x >= req*t + req*x
    // x(100 - req) >= req*t - 100a
    // x = ceil((req*t - 100*a) / (100 - req))
    if (req < 100) {
      classesNeeded = Math.ceil(((req * t) - (100 * a)) / (100 - req));
    }
  }

  const isSafe = currentPct >= req;

  const handleSave = () => {
    addHistoryItem({
      toolId: 'attendance-calc',
      toolName: 'Attendance & Bunk Calculator',
      inputSummary: `${a}/${t} classes (${req}% required)`,
      resultSummary: `${currentPct}% · ${isSafe ? safeBunks + ' Safe Bunks Left' : 'Must attend ' + classesNeeded + ' classes'}`,
    });
    if (isSafe) {
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              College & School Attendance Tracker
            </h3>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              isSafe
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
            }`}
          >
            {isSafe ? 'Safe Zone' : 'Shortage Alert'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Total Classes Held
            </label>
            <input
              type="number"
              min="1"
              value={totalHeld}
              onChange={e => setTotalHeld(e.target.value)}
              placeholder="e.g. 64"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Classes You Attended
            </label>
            <input
              type="number"
              min="0"
              max={Number(totalHeld) || 1000}
              value={attended}
              onChange={e => setAttended(e.target.value)}
              placeholder="e.g. 54"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Minimum % (Cutoff)
            </label>
            <select
              value={minReq}
              onChange={e => setMinReq(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="75">75% (Standard University)</option>
              <option value="80">80% (Strict Colleges)</option>
              <option value="85">85% (High Attendance)</option>
              <option value="65">65% (Medical Exemption)</option>
            </select>
          </div>
        </div>

        {/* Visual Attendance Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
            <span>Attendance Progress</span>
            <span className={isSafe ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-500 font-bold'}>
              {currentPct}% (Cutoff: {req}%)
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isSafe ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-rose-500 to-red-400'
              }`}
              style={{ width: `${Math.min(100, currentPct)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-500/20"
          >
            Save to History
          </button>
        </div>
      </div>

      {/* Main Result Card */}
      <ResultCard
        title="Attendance Status & Bunk Meter"
        mainValue={`${currentPct}%`}
        mainLabel={`Currently Attended ${a} out of ${t} classes`}
        accentColor={isSafe ? 'emerald' : 'rose'}
        stats={[
          {
            label: isSafe ? 'Safe Bunks Left' : 'Classes to Attend',
            value: isSafe ? `${safeBunks} Classes` : `${classesNeeded} Classes`,
            badge: isSafe ? 'Can Skip' : 'Must Attend',
            badgeColor: isSafe ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600',
            subtext: isSafe ? `Skipping ${safeBunks} classes keeps you at ≥ ${req}%` : `Must attend next ${classesNeeded} classes consecutively`
          },
          { label: 'Minimum Required', value: `${req}%` },
          { label: 'Absent Classes', value: `${t - a} Classes` },
          {
            label: 'Attendance Health',
            value: currentPct >= 85 ? 'Excellent' : currentPct >= 75 ? 'Safe' : 'Shortage Risk',
            badge: isSafe ? 'Good' : 'Warning'
          }
        ]}
        notes={
          isSafe
            ? `You have a safety buffer! You can safely skip up to ${safeBunks} more classes without falling below ${req}%.`
            : `Warning: You are currently below the required ${req}% cutoff. You must attend the next ${classesNeeded} classes in a row to get back to ${req}%.`
        }
        copyContent={`Attendance: ${a}/${t} = ${currentPct}%. Required: ${req}%. ${isSafe ? 'Safe bunks available: ' + safeBunks : 'Must attend next ' + classesNeeded + ' classes.'}`}
      />

      <FormulaExplanation
        formula="Safe Bunks = floor((100 × Attended - Target% × Total) / Target%) | Required Classes = ceil((Target% × Total - 100 × Attended) / (100 - Target%))"
        explanation="The bunk meter accurately computes the exact point of equilibrium so you never get debarred or detained from appearing in semester end exams."
      />
    </div>
  );
};
