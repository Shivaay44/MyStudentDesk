import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, CheckCircle2, AlertCircle, Award } from 'lucide-react';

interface SubjectEntry {
  id: string;
  name: string;
  maxMarks: number;
  passMarks: number;
  obtainedMarks: number;
}

export const MarksCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [subjects, setSubjects] = useState<SubjectEntry[]>([
    { id: '1', name: 'Mathematics', maxMarks: 100, passMarks: 33, obtainedMarks: 92 },
    { id: '2', name: 'Physics', maxMarks: 100, passMarks: 33, obtainedMarks: 85 },
    { id: '3', name: 'Chemistry', maxMarks: 100, passMarks: 33, obtainedMarks: 88 },
    { id: '4', name: 'English Core', maxMarks: 100, passMarks: 33, obtainedMarks: 90 },
    { id: '5', name: 'Computer Science', maxMarks: 100, passMarks: 33, obtainedMarks: 96 },
  ]);

  const addSubject = () => {
    setSubjects(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: `Subject ${prev.length + 1}`,
        maxMarks: 100,
        passMarks: 33,
        obtainedMarks: 80,
      }
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof SubjectEntry, val: any) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const totalMax = subjects.reduce((acc, s) => acc + (Number(s.maxMarks) || 0), 0);
  const totalObtained = subjects.reduce((acc, s) => acc + (Number(s.obtainedMarks) || 0), 0);
  const percentage = totalMax > 0 ? Number(((totalObtained / totalMax) * 100).toFixed(2)) : 0;

  const failedSubjects = subjects.filter(s => s.obtainedMarks < s.passMarks);
  const isPassed = failedSubjects.length === 0;

  const sorted = [...subjects].sort((a, b) => b.obtainedMarks - a.obtainedMarks);
  const highestSubject = sorted[0];
  const lowestSubject = sorted[sorted.length - 1];

  const handleSave = () => {
    addHistoryItem({
      toolId: 'marks-calc',
      toolName: 'Marks Calculator',
      inputSummary: `${totalObtained}/${totalMax} across ${subjects.length} subjects`,
      resultSummary: `${percentage}% (${isPassed ? 'Passed' : 'Failed in ' + failedSubjects.length})`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Subject list card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Subject Wise Marks Entry
          </h3>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {subjects.length} Subjects Added
          </span>
        </div>

        <div className="space-y-3">
          {subjects.map((sub, idx) => {
            const hasPassed = sub.obtainedMarks >= sub.passMarks;
            return (
              <div
                key={sub.id}
                className="grid grid-cols-12 gap-2 sm:gap-3 items-center p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
              >
                {/* Subject Name */}
                <div className="col-span-12 sm:col-span-5">
                  <input
                    type="text"
                    value={sub.name}
                    onChange={e => updateSubject(sub.id, 'name', e.target.value)}
                    placeholder="Subject Name"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                {/* Obtained Marks */}
                <div className="col-span-4 sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Obtained</label>
                  <input
                    type="number"
                    min="0"
                    max={sub.maxMarks}
                    value={sub.obtainedMarks}
                    onChange={e => updateSubject(sub.id, 'obtainedMarks', Number(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                {/* Max Marks */}
                <div className="col-span-4 sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Max Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={sub.maxMarks}
                    onChange={e => updateSubject(sub.id, 'maxMarks', Number(e.target.value) || 100)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                {/* Pass/Fail Status Indicator */}
                <div className="col-span-2 sm:col-span-2 text-center">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${
                      hasPassed
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {hasPassed ? 'Pass' : 'Fail'}
                  </span>
                </div>

                {/* Delete button */}
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeSubject(sub.id)}
                    disabled={subjects.length <= 1}
                    className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={addSubject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Subject</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20"
          >
            Save Result
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Aggregate Score & Performance"
        mainValue={`${percentage}%`}
        mainLabel={`Total Score: ${totalObtained} / ${totalMax}`}
        accentColor={isPassed ? 'emerald' : 'rose'}
        showPrint
        stats={[
          { label: 'Total Marks Obtained', value: `${totalObtained} / ${totalMax}` },
          { label: 'Overall Status', value: isPassed ? 'PASSED' : 'COMPARTMENT / FAIL', badge: isPassed ? 'Cleared' : 'Attention', badgeColor: isPassed ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600' },
          { label: 'Top Subject', value: `${highestSubject?.name} (${highestSubject?.obtainedMarks})` },
          { label: 'Lowest Subject', value: `${lowestSubject?.name} (${lowestSubject?.obtainedMarks})` },
        ]}
        copyContent={`Total Marks: ${totalObtained}/${totalMax} (${percentage}%). Result: ${isPassed ? 'Passed' : 'Failed in ' + failedSubjects.map(s => s.name).join(', ')}`}
      />

      <FormulaExplanation
        formula="Percentage (%) = (Sum of Marks in All Subjects / Sum of Max Marks) × 100"
        explanation="Standard aggregate marks percentage evaluation. To pass, you must meet the individual passing cutoff in every single subject as well as achieve the minimum aggregate cutoff."
      />
    </div>
  );
};
