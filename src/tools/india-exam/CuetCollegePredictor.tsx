import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Building, RotateCcw, Sparkles, Info } from 'lucide-react';

export const CuetCollegePredictor: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [normalizedScore, setNormalizedScore] = useState<number>(750);
  const [totalPossible, setTotalPossible] = useState<number>(800);
  const [course, setCourse] = useState<string>('bcom-hons');

  const getColleges = (score: number, max: number, crs: string) => {
    const pct = (score / max) * 100;
    const duColleges = [
      { name: 'Shri Ram College of Commerce (SRCC)', campus: 'North Campus, DU', minScore: 780 },
      { name: 'Hindu College', campus: 'North Campus, DU', minScore: 775 },
      { name: 'Hansraj College', campus: 'North Campus, DU', minScore: 760 },
      { name: 'Kirori Mal College (KMC)', campus: 'North Campus, DU', minScore: 745 },
      { name: 'Ramjas College', campus: 'North Campus, DU', minScore: 740 },
      { name: 'Sri Venkateswara College (Venky)', campus: 'South Campus, DU', minScore: 735 },
      { name: 'Atma Ram Sanatan Dharma (ARSD)', campus: 'South Campus, DU', minScore: 710 },
      { name: 'Delhi College of Arts and Commerce (DCAC)', campus: 'South Campus, DU', minScore: 690 },
      { name: 'Banaras Hindu University (BHU Main)', campus: 'Central University', minScore: 660 },
    ];

    return duColleges.map(c => ({
      ...c,
      chance: score >= c.minScore ? 'High Chance' : score >= c.minScore - 25 ? 'Moderate / Spot Round' : 'Low',
    }));
  };

  const colleges = getColleges(normalizedScore, totalPossible, course);
  const highChanceCount = colleges.filter(c => c.chance === 'High Chance').length;

  const handleCalculate = () => {
    if (normalizedScore >= 750) triggerConfetti();
    addHistoryItem({
      toolId: 'cuet-college-predictor',
      toolName: 'CUET DU & BHU College Predictor',
      inputSummary: `${normalizedScore}/${totalPossible} CUET Score`,
      resultSummary: `${highChanceCount} top colleges in High Chance bracket`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter CUET Normalized Score</span>
            </h2>
            <button
              onClick={() => {
                setNormalizedScore(750);
                setTotalPossible(800);
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Program</label>
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="bcom-hons">B.Com (Hons) / B.Com</option>
                <option value="ba-econ">B.A. (Hons) Economics</option>
                <option value="ba-polsci">B.A. (Hons) Political Science / History</option>
                <option value="bsc">B.Sc (Hons) Physics / Chem / Math</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Total Marks Scale</label>
              <select
                value={totalPossible}
                onChange={e => setTotalPossible(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="800">800 Marks (1 Lang + 3 Domain)</option>
                <option value="600">600 Marks (3 Domain Subjects)</option>
                <option value="500">500 Marks (Lang + GT combo)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Your Combined Normalized NTA Score
            </label>
            <input
              type="number"
              min="0"
              max={totalPossible}
              value={normalizedScore || ''}
              onChange={e => setNormalizedScore(Math.min(totalPossible, Math.max(0, Number(e.target.value))))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="e.g. 750"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Predict DU & Central Universities</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="DU & BHU College Forecast"
          badge={`${highChanceCount} High Chance Colleges`}
          badgeColor={highChanceCount > 0 ? 'emerald' : 'indigo'}
        >
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {colleges.map((c, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 flex justify-between items-center text-xs"
              >
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{c.name}</h3>
                  <span className="text-[11px] text-slate-500">{c.campus}</span>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      c.chance === 'High Chance'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        : c.chance === 'Moderate / Spot Round'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {c.chance}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Est. Cutoff: ~{c.minScore}</p>
                </div>
              </div>
            ))}
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
