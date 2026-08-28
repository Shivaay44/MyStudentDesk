import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Compass, RotateCcw, Sparkles, Info } from 'lucide-react';

export const WbjeePredictor: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [marks, setMarks] = useState<number>(105);

  const estimateGmr = (m: number) => {
    if (m >= 135) return { min: 1, max: 150 };
    if (m >= 120) return { min: 151, max: 500 };
    if (m >= 105) return { min: 501, max: 1500 };
    if (m >= 90) return { min: 1501, max: 3500 };
    if (m >= 75) return { min: 3501, max: 7000 };
    if (m >= 60) return { min: 7001, max: 13000 };
    if (m >= 45) return { min: 13001, max: 25000 };
    return { min: 25001, max: 55000 };
  };

  const gmr = estimateGmr(marks);

  const colleges = [
    { name: 'Jadavpur University (JU)', branch: 'Computer Science (CSE)', cutoff: 350 },
    { name: 'Jadavpur University (JU)', branch: 'Information Technology (IT)', cutoff: 650 },
    { name: 'Jadavpur University (JU)', branch: 'Electronics & Telecommunication (ETCE)', cutoff: 900 },
    { name: 'Jadavpur University (JU)', branch: 'Mechanical / Electrical', cutoff: 1800 },
    { name: 'Calcutta University (CU)', branch: 'Computer Science & Engineering', cutoff: 2200 },
    { name: 'Kalyani Government Engineering College', branch: 'Computer Science & Engg', cutoff: 3200 },
    { name: 'Jalpaiguri Government Engineering College', branch: 'Computer Science', cutoff: 4800 },
    { name: 'Heritage Institute of Technology, Kolkata', branch: 'Computer Science & Engg', cutoff: 6500 },
  ];

  const handleCalculate = () => {
    if (marks >= 110) triggerConfetti();
    addHistoryItem({
      toolId: 'wbjee-predictor',
      toolName: 'WBJEE Rank & College Predictor',
      inputSummary: `${marks}/200 Marks`,
      resultSummary: `Expected GMR: ${gmr.min} - ${gmr.max}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter WBJEE Score (Out of 200)</span>
            </h2>
            <button
              onClick={() => setMarks(105)}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Expected Total Marks in WBJEE (Math 100 + Physics/Chem 100)
            </label>
            <input
              type="number"
              min="0"
              max="200"
              value={marks || ''}
              onChange={e => setMarks(Math.min(200, Math.max(0, Number(e.target.value))))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g. 105"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-[11px]">
              <Info className="w-3.5 h-3.5 text-brand-600" />
              <span>Data Source:</span>
            </div>
            <p>
              Based on WBJEE past year merit lists and Jadavpur University admission counseling cutoffs. Updated: August 2026.
            </p>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Predict General Merit Rank (GMR)</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="WBJEE Prediction"
          badge={`GMR Rank: ~${gmr.min} - ${gmr.max}`}
          badgeColor={gmr.max <= 2000 ? 'emerald' : 'indigo'}
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Expected General Merit Rank (GMR)
              </span>
              <div className="text-3xl sm:text-4xl font-black text-brand-600 dark:text-brand-400">
                {gmr.min.toLocaleString()} – {gmr.max.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">
                Out of ~1,10,000 candidates registered for WBJEE
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Jadavpur & Top Bengal Colleges:
              </span>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {colleges.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{c.name}</h4>
                      <p className="text-[11px] text-slate-500">{c.branch}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        gmr.max <= c.cutoff
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {gmr.max <= c.cutoff ? 'High Chance' : 'Competitive'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
