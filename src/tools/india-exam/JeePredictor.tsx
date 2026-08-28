import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { predictJeeRank } from '../../utils/indianExamData';
import { TrendingUp, Award, Building, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

export const JeePredictor: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [marks, setMarks] = useState<number | string>(185);
  const [category, setCategory] = useState<string>('General (UR)');
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'hard'>('moderate');

  const numMarks = Number(marks) || 0;
  const prediction = predictJeeRank(numMarks, category, difficulty);

  const handleSave = () => {
    addHistoryItem({
      toolId: 'jee-predictor',
      toolName: 'JEE Rank Predictor',
      inputSummary: `Marks: ${numMarks}/300 (${difficulty} shift, ${category})`,
      resultSummary: `${prediction.estimatedPercentile}%ile · AIR ~${prediction.estimatedAir.toLocaleString()}`,
    });
    if (prediction.isJeeAdvQualified) {
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Input Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              JEE Main 2025/2026 Shift Predictor
            </h3>
          </div>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg">
            NTA Normalized Curve
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Marks Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Expected Raw Marks (out of 300)
            </label>
            <div className="space-y-2">
              <input
                type="number"
                min="0"
                max="300"
                value={marks}
                onChange={e => setMarks(e.target.value)}
                placeholder="e.g. 185"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <input
                type="range"
                min="0"
                max="300"
                value={numMarks}
                onChange={e => setMarks(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>

          {/* Shift Difficulty */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Shift Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="easy">Easy Shift (High Marks for %ile)</option>
              <option value="moderate">Moderate / Balanced Shift</option>
              <option value="hard">Hard Shift (Lower Marks needed)</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1">Normalizes marks across morning/evening sessions.</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Reservation Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="General (UR)">General (Unreserved)</option>
              <option value="Gen-EWS">Gen-EWS</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="PwD">PwD</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1">For Category Rank & JEE Advanced cutoff.</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md shadow-orange-500/20"
          >
            Save Prediction to History
          </button>
        </div>
      </div>

      {/* Main Result Card with Confidence Interval */}
      <ResultCard
        title="JEE Main Predicted Rank & Percentile"
        mainValue={`${prediction.estimatedPercentile} %ile`}
        mainLabel={`Expected AIR Range (95% CI): ${prediction.airRankMin.toLocaleString()} – ${prediction.airRankMax.toLocaleString()}`}
        accentColor="amber"
        showPrint
        stats={[
          { label: 'Predicted AIR (95% CI)', value: `${prediction.airRankMin.toLocaleString()} – ${prediction.airRankMax.toLocaleString()}`, subtext: `Median Estimate: ~${prediction.estimatedAir.toLocaleString()}` },
          { label: 'Category Rank Range', value: `~${Math.round(prediction.categoryRank * 0.9).toLocaleString()} – ${Math.round(prediction.categoryRank * 1.15).toLocaleString()}`, badge: category.split(' ')[0] },
          { label: 'Percentile Range', value: `${prediction.percentileMin}% - ${prediction.percentileMax}%` },
          {
            label: 'JEE Advanced Cutoff',
            value: prediction.isJeeAdvQualified ? 'CLEARED' : 'BELOW CUTOFF',
            badge: prediction.isJeeAdvQualified ? 'Eligible' : 'Needs Higher Score',
            badgeColor: prediction.isJeeAdvQualified ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
          }
        ]}
        copyContent={`JEE Main Expected Marks ${numMarks}/300 (${difficulty} shift): ~${prediction.estimatedPercentile}%ile | Predicted AIR Range: ${prediction.airRankMin.toLocaleString()} - ${prediction.airRankMax.toLocaleString()} (${category} Rank: ~${prediction.categoryRank.toLocaleString()})`}
      />

      {/* Trust, Methodology & Disclaimer Card */}
      <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Statistical Methodology & Data Calibration (Updated: August 2026)
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            Based on ~14,00,000 NTA Candidates
          </span>
        </div>
        <p className="leading-relaxed">
          <strong>Methodology:</strong> Predictions are computed by applying NTA's percentile normalization formula to multi-shift raw score distributions. Because shift difficulty varies between morning and evening sessions, a 95% confidence interval is provided rather than an unrealistic exact integer rank.
        </p>
        <p className="text-[11px] text-slate-500 italic">
          <strong>Disclaimer:</strong> This tool provides statistical projections for academic planning purposes only and is not an official NTA allotment certificate.
        </p>
      </div>

      {/* College Admission Probability Matrix */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-brand-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              NIT / IIIT / GFTI College Probability (JoSAA Reference)
            </h4>
          </div>
        </div>

        <div className="space-y-2.5">
          {prediction.collegePredictions.map((col, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">{col.collegeType}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{col.branch}</span>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  col.chance === 'High'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : col.chance === 'Moderate'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {col.chance} Chance
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Cutoff Status Table */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Expected JEE Advanced Qualifying Cutoffs (NTA 2025/2026 Standard)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          {prediction.categoryCutoffs.map(c => (
            <div key={c.category} className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{c.category}</span>
                <span className="text-[11px] text-slate-400">Cutoff: ~{c.cutoffPercentile}%ile</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  c.status === 'Cleared'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : c.status === 'Borderline'
                    ? 'bg-amber-500/10 text-amber-600'
                    : 'bg-rose-500/10 text-rose-600'
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <FormulaExplanation
        formula="AIR ≈ ((100 - Percentile) / 100) × Total Candidates (≈ 14.5 Lakhs) + 1"
        explanation="NTA calculates percentile based on candidate score distributions within your session. Shift difficulty factors in that harder sessions require lower raw marks to reach 99th percentile compared to easier shifts."
        examples={[
          '200 marks in a moderate shift ≈ 98.80%ile -> AIR ~17,400',
          '240 marks in a hard shift ≈ 99.65%ile -> AIR ~5,000 (Top NIT CSE guaranteed)'
        ]}
      />
    </div>
  );
};
