import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { BookOpen, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

interface SubjectMark {
  id: string;
  name: string;
  isLanguage: boolean;
  marks: number;
}

export const CbseClass10Calc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [subjects, setSubjects] = useState<SubjectMark[]>([
    { id: '1', name: 'English (Language 1)', isLanguage: true, marks: 88 },
    { id: '2', name: 'Hindi / Regional Language', isLanguage: true, marks: 84 },
    { id: '3', name: 'Mathematics (Standard/Basic)', isLanguage: false, marks: 95 },
    { id: '4', name: 'Science', isLanguage: false, marks: 91 },
    { id: '5', name: 'Social Science', isLanguage: false, marks: 89 },
    { id: '6', name: 'Information Technology (Skill)', isLanguage: false, marks: 96 },
  ]);

  const updateMark = (id: string, val: number) => {
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, marks: Math.min(100, Math.max(0, val)) } : s))
    );
  };

  // Best of 5 Rule calculation: 1 Language + Top 4 other subjects
  const languageSubjects = subjects.filter(s => s.isLanguage);
  const bestLanguage = languageSubjects.reduce((max, s) => (s.marks > max.marks ? s : max), languageSubjects[0]);

  const remainingSubjects = subjects.filter(s => s.id !== bestLanguage.id);
  const sortedRemaining = [...remainingSubjects].sort((a, b) => b.marks - a.marks);
  const top4Remaining = sortedRemaining.slice(0, 4);

  const best5Subjects = [bestLanguage, ...top4Remaining];
  const totalBest5Marks = best5Subjects.reduce((sum, s) => sum + s.marks, 0);
  const best5Percentage = totalBest5Marks / 5;

  const handleCalculate = () => {
    if (best5Percentage >= 90) triggerConfetti();
    addHistoryItem({
      toolId: 'cbse-class-10-percentage',
      toolName: 'CBSE Class 10 Percentage Calculator',
      inputSummary: `Best 5 Total: ${totalBest5Marks}/500`,
      resultSummary: `${best5Percentage.toFixed(2)}%`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter Class 10 Subject Marks (Out of 100)</span>
            </h2>
            <button
              onClick={() => {
                setSubjects([
                  { id: '1', name: 'English (Language 1)', isLanguage: true, marks: 88 },
                  { id: '2', name: 'Hindi / Regional Language', isLanguage: true, marks: 84 },
                  { id: '3', name: 'Mathematics (Standard/Basic)', isLanguage: false, marks: 95 },
                  { id: '4', name: 'Science', isLanguage: false, marks: 91 },
                  { id: '5', name: 'Social Science', isLanguage: false, marks: 89 },
                  { id: '6', name: 'Information Technology (Skill)', isLanguage: false, marks: 96 },
                ]);
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-3">
            {subjects.map(s => (
              <div
                key={s.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{s.name}</p>
                  <span className="text-[10px] text-slate-400">
                    {s.isLanguage ? 'Mandatory Language Pool' : 'Academic / Skill Subject'}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={s.marks || ''}
                    onChange={e => updateMark(s.id, Number(e.target.value))}
                    className="w-20 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    placeholder="0-100"
                  />
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Compute Class 10 Best 5 Percentage</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <ResultCard
          title="Class 10 Result"
          badge={best5Percentage >= 90 ? 'Merit' : 'Passed'}
          badgeColor={best5Percentage >= 75 ? 'emerald' : 'indigo'}
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Official Best of 5 Percentage
              </span>
              <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-brand-400">
                {best5Percentage.toFixed(2)}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total: {totalBest5Marks} / 500 Marks
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Included in Best 5:
              </span>
              <ul className="space-y-1.5 text-xs">
                {best5Subjects.map((s, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{s.name}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{s.marks}/100</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
