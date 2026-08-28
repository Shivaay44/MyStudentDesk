import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { CBSE_GRADE_TABLE } from '../../utils/indianExamData';
import { Check, Plus, Trash2 } from 'lucide-react';

interface SubjectGP {
  id: string;
  name: string;
  grade: string;
  gp: number;
}

export const CbseCgpaCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [subjects, setSubjects] = useState<SubjectGP[]>([
    { id: '1', name: 'English', grade: 'A1', gp: 10 },
    { id: '2', name: 'Mathematics', grade: 'A1', gp: 10 },
    { id: '3', name: 'Science', grade: 'A2', gp: 9 },
    { id: '4', name: 'Social Science', grade: 'A2', gp: 9 },
    { id: '5', name: 'Hindi / 2nd Language', grade: 'B1', gp: 8 },
  ]);

  const updateGrade = (id: string, gradeStr: string) => {
    const tableItem = CBSE_GRADE_TABLE.find(g => g.grade === gradeStr) || CBSE_GRADE_TABLE[0];
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, grade: tableItem.grade, gp: tableItem.gp } : s));
  };

  const totalGP = subjects.reduce((acc, s) => acc + s.gp, 0);
  const cgpa = Number((totalGP / subjects.length).toFixed(2));
  const percentage = Number((cgpa * 9.5).toFixed(2));

  const handleSave = () => {
    addHistoryItem({
      toolId: 'cbse-cgpa',
      toolName: 'CBSE CGPA Calculator',
      inputSummary: `${subjects.length} Subjects (Total GP: ${totalGP})`,
      resultSummary: `${cgpa} CGPA (${percentage}%)`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Subject Grade Points Input */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            CBSE Subject Letter Grades
          </h3>
          <span className="text-xs font-semibold text-slate-400">5 Main Subjects</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjects.map((sub, idx) => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
            >
              <div className="min-w-0 flex-1 mr-3">
                <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                  {sub.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  Indicative Marks: ~{(sub.gp * 9.5).toFixed(1)}%
                </span>
              </div>

              <select
                value={sub.grade}
                onChange={e => updateGrade(sub.id, e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {CBSE_GRADE_TABLE.map(g => (
                  <option key={g.grade} value={g.grade}>
                    Grade {g.grade} ({g.gp} GP)
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md shadow-orange-500/20"
          >
            Save CGPA Result
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="CBSE CGPA to Percentage"
        mainValue={`${cgpa} CGPA`}
        mainLabel={`Equivalent Percentage: ${percentage}%`}
        accentColor="amber"
        stats={[
          { label: 'Overall CGPA', value: `${cgpa} / 10.0` },
          { label: 'Calculated % (× 9.5)', value: `${percentage}%` },
          { label: 'Total Grade Points', value: `${totalGP} / ${subjects.length * 10}` },
          { label: 'Academic Standing', value: cgpa >= 9.0 ? 'Outstanding (A1)' : cgpa >= 8.0 ? 'Excellent (A2)' : 'Good', badge: 'CBSE' }
        ]}
        copyContent={`CBSE CGPA: ${cgpa} = ${percentage}% (Multiplier: 9.5)`}
      />

      {/* Grade Conversion Lookup Table */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Official CBSE Grade Point Scale
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {CBSE_GRADE_TABLE.map(g => (
            <div key={g.grade} className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-between font-bold">
                <span className="text-orange-500">Grade {g.grade}</span>
                <span className="text-slate-500">{g.gp} Points</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Marks: {g.min}-{g.max}</p>
            </div>
          ))}
        </div>
      </div>

      <FormulaExplanation
        formula="Overall CGPA = Sum of 5 Grade Points / 5 | Overall Percentage (%) = CGPA × 9.5"
        explanation="CBSE uses 9.5 as the multiplying factor because the 9.5x scale was determined by taking the average marks of candidate cohorts scoring in the top percentile brackets."
      />
    </div>
  );
};
