import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { calculateNeetScore } from '../../utils/indianExamData';
import { Stethoscope, CheckCircle2, AlertCircle, Sparkles, Building2 } from 'lucide-react';

export const NeetCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  // Mode: Question Count Tally vs Direct Score Input
  const [entryMode, setEntryMode] = useState<'tally' | 'direct'>('tally');

  // Question counts
  const [physicsCorrect, setPhysicsCorrect] = useState<number>(38);
  const [physicsWrong, setPhysicsWrong] = useState<number>(4);

  const [chemCorrect, setChemCorrect] = useState<number>(40);
  const [chemWrong, setChemWrong] = useState<number>(3);

  const [bioCorrect, setBioCorrect] = useState<number>(84);
  const [bioWrong, setBioWrong] = useState<number>(4);

  const [category, setCategory] = useState<string>('General');

  // Direct score input
  const [directScore, setDirectScore] = useState<number>(645);

  let prediction: any;
  if (entryMode === 'tally') {
    prediction = calculateNeetScore(
      physicsCorrect, physicsWrong,
      chemCorrect, chemWrong,
      bioCorrect, bioWrong,
      category
    );
  } else {
    // calculate equivalent
    const score = Number(directScore) || 0;
    // synthesize proxy values
    prediction = calculateNeetScore(
      Math.round(score * (45 / 720)), 0,
      Math.round(score * (45 / 720)), 0,
      Math.round(score * (90 / 720)), 0,
      category
    );
    prediction.totalMarks = score;
    prediction.physicsMarks = Math.round(score * 0.25);
    prediction.chemistryMarks = Math.round(score * 0.25);
    prediction.biologyMarks = Math.round(score * 0.5);
  }

  const handleSave = () => {
    addHistoryItem({
      toolId: 'neet-calc',
      toolName: 'NEET Score Calculator',
      inputSummary: `${prediction.totalMarks}/720 (P: ${prediction.physicsMarks}, C: ${prediction.chemistryMarks}, B: ${prediction.biologyMarks})`,
      resultSummary: `AIR: ~${prediction.estimatedAir.toLocaleString()} · ${prediction.govtMBSChance} AIQ MBBS Chance`,
    });
    if (prediction.govtMBSChance === 'Very High' || prediction.govtMBSChance === 'High') {
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6">
      {/* Entry Mode Switcher */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setEntryMode('tally')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            entryMode === 'tally'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Question Answer Key Tally (+4 / -1)
        </button>
        <button
          onClick={() => setEntryMode('direct')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            entryMode === 'direct'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Direct Total Marks (out of 720)
        </button>
      </div>

      {/* Input Section */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              NEET UG 2025/2026 Score & Rank Evaluator
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-500">Category:</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="General">General / UR</option>
              <option value="OBC">OBC-NCL</option>
              <option value="EWS">Gen-EWS</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
        </div>

        {entryMode === 'tally' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Physics Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Physics (45 Qs)</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{prediction.physicsMarks} / 180</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mb-1">Correct (+4)</label>
                  <input
                    type="number"
                    min="0"
                    max="45"
                    value={physicsCorrect}
                    onChange={e => setPhysicsCorrect(Math.min(45, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-rose-500 font-bold mb-1">Wrong (-1)</label>
                  <input
                    type="number"
                    min="0"
                    max={45 - physicsCorrect}
                    value={physicsWrong}
                    onChange={e => setPhysicsWrong(Math.min(45 - physicsCorrect, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                  />
                </div>
              </div>
              <div className="text-[11px] text-slate-400">Unattempted: {45 - (physicsCorrect + physicsWrong)} Qs</div>
            </div>

            {/* Chemistry Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Chemistry (45 Qs)</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{prediction.chemistryMarks} / 180</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mb-1">Correct (+4)</label>
                  <input
                    type="number"
                    min="0"
                    max="45"
                    value={chemCorrect}
                    onChange={e => setChemCorrect(Math.min(45, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-rose-500 font-bold mb-1">Wrong (-1)</label>
                  <input
                    type="number"
                    min="0"
                    max={45 - chemCorrect}
                    value={chemWrong}
                    onChange={e => setChemWrong(Math.min(45 - chemCorrect, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                  />
                </div>
              </div>
              <div className="text-[11px] text-slate-400">Unattempted: {45 - (chemCorrect + chemWrong)} Qs</div>
            </div>

            {/* Biology Card */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Biology (Botany+Zoo 90 Qs)</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{prediction.biologyMarks} / 360</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mb-1">Correct (+4)</label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={bioCorrect}
                    onChange={e => setBioCorrect(Math.min(90, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-rose-500 font-bold mb-1">Wrong (-1)</label>
                  <input
                    type="number"
                    min="0"
                    max={90 - bioCorrect}
                    value={bioWrong}
                    onChange={e => setBioWrong(Math.min(90 - bioCorrect, Number(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center"
                  />
                </div>
              </div>
              <div className="text-[11px] text-slate-400">Unattempted: {90 - (bioCorrect + bioWrong)} Qs</div>
            </div>
          </div>
        ) : (
          <div className="max-w-md">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Enter NEET Total Score (out of 720)
            </label>
            <input
              type="number"
              min="0"
              max="720"
              value={directScore}
              onChange={e => setDirectScore(Math.min(720, Math.max(0, Number(e.target.value) || 0)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-500/20"
          >
            Save NEET Score
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="NEET UG Score & All India Rank (AIR)"
        mainValue={`${prediction.totalMarks} / 720`}
        mainLabel={`Expected All India Rank: ~${prediction.estimatedAir.toLocaleString()}`}
        accentColor="emerald"
        showPrint
        stats={[
          { label: 'Predicted AIR Rank', value: `~${prediction.estimatedAir.toLocaleString()}`, subtext: `Rank Range: ${prediction.airRange}` },
          { label: `${category} Category Rank`, value: `~${prediction.categoryRank.toLocaleString()}`, badge: category },
          { label: 'Govt MBBS Seat Chance', value: prediction.govtMBSChance, badge: 'AIQ 15% / State', badgeColor: prediction.govtMBSChance === 'Very High' || prediction.govtMBSChance === 'High' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600' },
          { label: 'Qualification Status', value: prediction.qualificationStatus, badge: 'NTA Standard', badgeColor: prediction.qualificationStatus === 'Qualified' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600' }
        ]}
        copyContent={`NEET Score: ${prediction.totalMarks}/720 (Physics: ${prediction.physicsMarks}, Chemistry: ${prediction.chemistryMarks}, Biology: ${prediction.biologyMarks}) | Predicted AIR: ~${prediction.estimatedAir.toLocaleString()} | Govt MBBS Chance: ${prediction.govtMBSChance}`}
      />

      <FormulaExplanation
        formula="NEET Score = (Correct Qs × 4) - (Incorrect Qs × 1) | Max = 720 (Phy: 180, Chem: 180, Bio: 360)"
        explanation="For AIQ 15% Government Medical College seats, the General category cutoff generally hovers around 625-645+ marks, while State Quota (85%) seats vary between 580-620+ depending on state domicile and category."
      />
    </div>
  );
};
