import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Sparkles, Building, CheckCircle2, GraduationCap } from 'lucide-react';

interface CuetSubject {
  id: string;
  name: string;
  maxMarks: number;
  obtained: number;
}

const COURSE_PRESETS: Record<string, { label: string; maxTotal: number; required: string }> = {
  'du-bcom-hons': {
    label: 'DU B.Com (Hons) / B.A. Economics',
    maxTotal: 800,
    required: '1 Language + Math/Acc + 2 Domain Subjects'
  },
  'du-ba-hons': {
    label: 'DU B.A. (Hons) English / History / Pol Sci',
    maxTotal: 800,
    required: '1 Language + 3 Domain Subjects'
  },
  'du-bsc-pcm': {
    label: 'DU B.Sc (Hons) Physics / Chemistry / Maths',
    maxTotal: 600,
    required: 'Physics + Chemistry + Mathematics (Language is qualifying 30%)'
  },
  'du-bms-bba': {
    label: 'DU BMS / BBA(FIA) / BBE',
    maxTotal: 650,
    required: '1 Language (200) + Mathematics (200) + General Test (250)'
  },
  'bhu-ba': {
    label: 'BHU B.A. (Hons) Arts / Social Sciences',
    maxTotal: 450,
    required: '1 Language (200) + General Test (250)'
  }
};

export const CuetCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [courseKey, setCourseKey] = useState<string>('du-bcom-hons');
  const [subjects, setSubjects] = useState<CuetSubject[]>([
    { id: '1', name: 'English (Language)', maxMarks: 200, obtained: 194 },
    { id: '2', name: 'Mathematics / Accountancy', maxMarks: 200, obtained: 188 },
    { id: '3', name: 'Economics / Business Studies', maxMarks: 200, obtained: 192 },
    { id: '4', name: 'Domain Subject 3', maxMarks: 200, obtained: 190 },
  ]);

  const preset = COURSE_PRESETS[courseKey] || COURSE_PRESETS['du-bcom-hons'];

  const updateSubjectScore = (id: string, obtained: number) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, obtained: Math.max(0, Math.min(s.maxMarks, obtained)) } : s));
  };

  const totalScore = subjects.reduce((acc, s) => acc + s.obtained, 0);
  const percentage = Number(((totalScore / preset.maxTotal) * 100).toFixed(2));

  let duCampusChance: 'North Campus (SRCC / Hindu / Hansraj)' | 'South Campus (Venkateswara / DRC)' | 'Off Campus Colleges' = 'Off Campus Colleges';
  if (totalScore >= 770) duCampusChance = 'North Campus (SRCC / Hindu / Hansraj)';
  else if (totalScore >= 720) duCampusChance = 'South Campus (Venkateswara / DRC)';

  const handleSave = () => {
    addHistoryItem({
      toolId: 'cuet-calc',
      toolName: 'CUET Score Calculator',
      inputSummary: `${preset.label}: ${totalScore}/${preset.maxTotal}`,
      resultSummary: `${percentage}% · ${duCampusChance}`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Course Target Preset */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Target University & Course Requirement
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {Object.entries(COURSE_PRESETS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setCourseKey(key)}
                className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                  courseKey === key
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">{val.label}</div>
                <div className="text-[11px] text-slate-400">Total: {val.maxTotal} Marks</div>
                <div className="text-[10px] text-brand-600 dark:text-brand-400 mt-1">{val.required}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Subject wise marks */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            CUET Normalized Scores
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subjects.map(sub => (
              <div
                key={sub.id}
                className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block">{sub.name}</span>
                  <span className="text-[11px] text-slate-400">Max: {sub.maxMarks} marks</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max={sub.maxMarks}
                  value={sub.obtained}
                  onChange={e => updateSubjectScore(sub.id, Number(e.target.value) || 0)}
                  className="w-20 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20"
          >
            Save CUET Aggregate
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="CUET Combined Merit Score"
        mainValue={`${totalScore} / ${preset.maxTotal}`}
        mainLabel={`Aggregate CUET Score (${percentage}%)`}
        accentColor="indigo"
        stats={[
          { label: 'Total Score', value: `${totalScore} / ${preset.maxTotal}` },
          { label: 'DU Allocation Chance', value: duCampusChance.split('(')[0].trim(), badge: 'CSAS' },
          { label: 'Campus Tier', value: duCampusChance },
          { label: 'Target Program', value: preset.label.split('/')[0].trim() }
        ]}
        copyContent={`CUET Aggregate: ${totalScore}/${preset.maxTotal} (${percentage}%) for ${preset.label} -> ${duCampusChance}`}
      />

      <FormulaExplanation
        formula="CUET Aggregate = Sum of mapped section scores required by target program"
        explanation="In Delhi University CSAS counseling, merit lists for B.Com/BA Hons courses are calculated out of 800 marks (1 Language + 3 Domain subjects), while B.Sc Science courses are out of 600 (PCM/PCB only)."
      />
    </div>
  );
};
