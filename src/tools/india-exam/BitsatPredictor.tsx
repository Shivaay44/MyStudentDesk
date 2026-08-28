import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Target, RotateCcw, Sparkles, Building, Info, ShieldCheck } from 'lucide-react';

export const BitsatPredictor: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [score, setScore] = useState<number>(295);

  const getBranches = (s: number) => {
    const list = [
      { campus: 'BITS Pilani (Main)', branch: 'Computer Science (CS)', cutoff: 331 },
      { campus: 'BITS Goa', branch: 'Computer Science (CS)', cutoff: 301 },
      { campus: 'BITS Hyderabad', branch: 'Computer Science (CS)', cutoff: 298 },
      { campus: 'BITS Pilani (Main)', branch: 'Electronics & Communication (ECE)', cutoff: 314 },
      { campus: 'BITS Goa', branch: 'Electronics & Communication (ECE)', cutoff: 282 },
      { campus: 'BITS Hyderabad', branch: 'Electronics & Communication (ECE)', cutoff: 280 },
      { campus: 'BITS Pilani (Main)', branch: 'Electrical & Electronics (EEE)', cutoff: 292 },
      { campus: 'BITS Goa', branch: 'Electrical & Electronics (EEE)', cutoff: 265 },
      { campus: 'BITS Hyderabad', branch: 'Electrical & Electronics (EEE)', cutoff: 262 },
      { campus: 'BITS Pilani (Main)', branch: 'Mechanical Engineering', cutoff: 254 },
      { campus: 'BITS Goa', branch: 'Mechanical Engineering', cutoff: 232 },
      { campus: 'BITS Hyderabad', branch: 'Mechanical Engineering', cutoff: 228 },
      { campus: 'BITS Pilani (Main)', branch: 'M.Sc Economics (Dual Degree)', cutoff: 275 },
      { campus: 'BITS Goa', branch: 'M.Sc Economics (Dual Degree)', cutoff: 252 },
      { campus: 'BITS Hyderabad', branch: 'M.Sc Economics (Dual Degree)', cutoff: 248 },
      { campus: 'BITS Pilani (Main)', branch: 'Civil / Chemical / Manufacturing', cutoff: 215 },
    ];

    return list.map(item => ({
      ...item,
      status: s >= item.cutoff ? 'High Probability' : s >= item.cutoff - 15 ? 'Moderate / Borderline' : 'Low Probability',
      color: s >= item.cutoff ? 'emerald' : s >= item.cutoff - 15 ? 'amber' : 'slate',
    }));
  };

  const branches = getBranches(score);
  const eligibleCount = branches.filter(b => b.status === 'High Probability').length;

  const handleCalculate = () => {
    if (score >= 300) triggerConfetti();
    addHistoryItem({
      toolId: 'bitsat-predictor',
      toolName: 'BITSAT Score & Cutoff Predictor',
      inputSummary: `Score: ${score}/390`,
      resultSummary: `${eligibleCount} branches eligible across BITS campuses`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter BITSAT Score (Out of 390)</span>
            </h2>
            <button
              onClick={() => setScore(295)}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Total BITSAT Score (Physics, Chem, Math/Bio, English & LR)
            </label>
            <input
              type="number"
              min="0"
              max="390"
              value={score || ''}
              onChange={e => setScore(Math.min(390, Math.max(0, Number(e.target.value))))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g. 295"
            />
          </div>

          {/* Quick Score Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-semibold">Quick Score Presets:</span>
            <div className="flex gap-2 flex-wrap">
              {[220, 260, 290, 315, 340].map(s => (
                <button
                  key={s}
                  onClick={() => setScore(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    score === s
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {s} Marks
                </button>
              ))}
            </div>
          </div>

          {/* Accuracy & Methodology Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-[11px]">
              <Info className="w-3.5 h-3.5 text-brand-600" />
              <span>Data Source & Methodology:</span>
            </div>
            <p className="leading-relaxed">
              Based on historical multi-iteration allotment cutoffs from BITS Admission Iterations (Pilani, Goa, and Hyderabad campuses). Updated: August 2026.
            </p>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Evaluate BITS Campus Cutoffs</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="Branch Admission Chances"
          badge={`${eligibleCount} Eligible Branches`}
          badgeColor={eligibleCount > 0 ? 'emerald' : 'slate'}
        >
          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {branches.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">{b.branch}</h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{b.campus}</span>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      b.status === 'High Probability'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        : b.status === 'Moderate / Borderline'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {b.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Cutoff: ~{b.cutoff}</p>
                </div>
              </div>
            ))}
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
