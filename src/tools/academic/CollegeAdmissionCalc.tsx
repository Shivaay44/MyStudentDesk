import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Building2, Sliders, CheckCircle, Sparkles } from 'lucide-react';

export const CollegeAdmissionCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [calcType, setCalcType] = useState<'composite' | 'tnea' | 'du'>('composite');

  // Composite inputs
  const [boardMarks, setBoardMarks] = useState<number | string>(94.5);
  const [boardWeight, setBoardWeight] = useState<number | string>(50);
  const [entranceMarks, setEntranceMarks] = useState<number | string>(88.0);
  const [entranceWeight, setEntranceWeight] = useState<number | string>(50);

  // TNEA inputs (Maths 100, Physics 50, Chemistry 50 -> Out of 200)
  const [mathsMarks, setMathsMarks] = useState<number | string>(98);
  const [physicsMarks, setPhysicsMarks] = useState<number | string>(92);
  const [chemistryMarks, setChemistryMarks] = useState<number | string>(95);

  let compositeScore = 0;
  let maxScale = 100;
  let stats: any[] = [];
  let mainLabel = 'Admission Merit Index';

  if (calcType === 'composite') {
    const bm = Number(boardMarks) || 0;
    const bw = Number(boardWeight) || 0;
    const em = Number(entranceMarks) || 0;
    const ew = Number(entranceWeight) || 0;
    const totalW = bw + ew || 100;
    compositeScore = Number((((bm * bw) + (em * ew)) / totalW).toFixed(2));
    maxScale = 100;
    mainLabel = `Composite Merit Score (Out of 100)`;
    stats = [
      { label: '12th Board Contribution', value: `${((bm * bw) / totalW).toFixed(2)} pts` },
      { label: 'Entrance Contribution', value: `${((em * ew) / totalW).toFixed(2)} pts` },
      { label: 'Weightage Ratio', value: `${bw} : ${ew}` },
      { label: 'Merit Tier', value: compositeScore >= 90 ? 'Top Tier 1' : compositeScore >= 80 ? 'Tier 2 High' : 'Tier 3', badge: 'Eligible' }
    ];
  } else if (calcType === 'tnea') {
    const m = Number(mathsMarks) || 0;
    const p = Number(physicsMarks) || 0;
    const c = Number(chemistryMarks) || 0;
    // TNEA Cutoff = Maths + (Physics / 2) + (Chemistry / 2)
    const tneaCutoff = m + (p / 2) + (c / 2);
    compositeScore = Number(tneaCutoff.toFixed(2));
    maxScale = 200;
    mainLabel = 'TNEA Engineering Cutoff (Out of 200)';
    stats = [
      { label: 'Mathematics (100)', value: `${m} / 100` },
      { label: 'Physics (50)', value: `${(p / 2).toFixed(1)} / 50` },
      { label: 'Chemistry (50)', value: `${(c / 2).toFixed(1)} / 50` },
      { label: 'CEG / MIT Chennai Chance', value: compositeScore >= 195 ? 'Very High' : compositeScore >= 190 ? 'Moderate' : 'Low', badge: compositeScore >= 190 ? 'Top Rank' : undefined }
    ];
  }

  const handleSave = () => {
    addHistoryItem({
      toolId: 'college-admission',
      toolName: 'College Merit & Cutoff Calculator',
      inputSummary: calcType === 'composite' ? `Board: ${boardMarks}% (${boardWeight}%), Entrance: ${entranceMarks}% (${entranceWeight}%)` : `PCM: M${mathsMarks}, P${physicsMarks}, C${chemistryMarks}`,
      resultSummary: `Merit: ${compositeScore} / ${maxScale}`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCalcType('composite')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            calcType === 'composite'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Weighted Composite Merit (Board + Entrance)
        </button>
        <button
          onClick={() => setCalcType('tnea')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            calcType === 'tnea'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          TNEA Engineering Cutoff (200 Scale)
        </button>
      </div>

      {/* Form Fields */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        {calcType === 'composite' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                12th Board Exam Score (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={boardMarks}
                onChange={e => setBoardMarks(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Board Weightage Weight (%)
              </label>
              <input
                type="number"
                value={boardWeight}
                onChange={e => {
                  const bw = Number(e.target.value) || 0;
                  setBoardWeight(bw);
                  setEntranceWeight(Math.max(0, 100 - bw));
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Entrance Exam Score (Normalized %)
              </label>
              <input
                type="number"
                step="0.1"
                value={entranceMarks}
                onChange={e => setEntranceMarks(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Entrance Weightage Weight (%)
              </label>
              <input
                type="number"
                value={entranceWeight}
                onChange={e => setEntranceWeight(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mathematics Marks (Out of 100)
              </label>
              <input
                type="number"
                max="100"
                value={mathsMarks}
                onChange={e => setMathsMarks(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Physics Marks (Out of 100)
              </label>
              <input
                type="number"
                max="100"
                value={physicsMarks}
                onChange={e => setPhysicsMarks(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Chemistry Marks (Out of 100)
              </label>
              <input
                type="number"
                max="100"
                value={chemistryMarks}
                onChange={e => setChemistryMarks(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20"
          >
            Save Merit Calculation
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="College Admission Merit"
        mainValue={`${compositeScore} / ${maxScale}`}
        mainLabel={mainLabel}
        accentColor="indigo"
        stats={stats}
        copyContent={`Admission Score: ${compositeScore} / ${maxScale}`}
      />

      <FormulaExplanation
        formula={calcType === 'composite' ? 'Composite = (Board% × Weight1 + Entrance% × Weight2) / Total Weight' : 'TNEA Cutoff (200) = Maths + (Physics / 2) + (Chemistry / 2)'}
        explanation="State admission bodies and centralized universities use weighted merit normalization to rank applicants across different schooling boards and test formats fairly."
      />
    </div>
  );
};
