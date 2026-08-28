import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { getCbseGrade, CBSE_GRADE_TABLE } from '../../utils/indianExamData';
import { Plus, Trash2, Printer, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  marks: number;
  isCompulsory?: boolean;
}

const STREAM_PRESETS: Record<string, { label: string; subjects: string[] }> = {
  '10th': {
    label: 'Class 10 (All Streams)',
    subjects: ['English Language & Literature', 'Mathematics (Standard / Basic)', 'Science', 'Social Science', 'Hindi / 2nd Regional Language', 'Information Technology (Skill)']
  },
  '12th-pcm': {
    label: 'Class 12 - Science (PCM)',
    subjects: ['English Core', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science / IP', 'Physical Education']
  },
  '12th-pcb': {
    label: 'Class 12 - Science (PCB / PCMB)',
    subjects: ['English Core', 'Physics', 'Chemistry', 'Biology', 'Mathematics / Informatics Practices', 'Physical Education']
  },
  '12th-comm': {
    label: 'Class 12 - Commerce',
    subjects: ['English Core', 'Accountancy', 'Business Studies', 'Economics', 'Applied Mathematics / IP', 'Physical Education']
  },
  '12th-arts': {
    label: 'Class 12 - Humanities / Arts',
    subjects: ['English Core', 'History', 'Political Science', 'Geography / Psychology', 'Economics / Sociology', 'Physical Education / Fine Arts']
  }
};

export const CbsePercentageCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [stream, setStream] = useState<string>('12th-pcm');
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'English Core', marks: 92, isCompulsory: true },
    { id: '2', name: 'Physics', marks: 88 },
    { id: '3', name: 'Chemistry', marks: 91 },
    { id: '4', name: 'Mathematics', marks: 95 },
    { id: '5', name: 'Computer Science', marks: 98 },
    { id: '6', name: 'Physical Education', marks: 94 },
  ]);

  const handleStreamChange = (newStream: string) => {
    setStream(newStream);
    const defaultSubs = STREAM_PRESETS[newStream].subjects;
    setSubjects(
      defaultSubs.map((sName, idx) => ({
        id: (idx + 1).toString(),
        name: sName,
        marks: 85 + (idx % 4) * 3,
        isCompulsory: idx === 0, // Language compulsory in CBSE
      }))
    );
  };

  const updateSubjectMarks = (id: string, marks: number) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, marks: Math.max(0, Math.min(100, marks)) } : s));
  };

  const updateSubjectName = (id: string, name: string) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, name } : s));
  };

  const addExtraSubject = () => {
    setSubjects(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: `Additional Subject ${prev.length + 1}`,
        marks: 80,
      }
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 5) return;
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  // Official CBSE Best-5 Calculation Rule:
  // 1. Language (English or 1st language) is mandatory.
  // 2. Out of the remaining subjects, the top 4 highest scoring subjects are selected.
  const languageSubject = subjects[0];
  const remainingSubjects = [...subjects.slice(1)].sort((a, b) => b.marks - a.marks);
  const best4Remaining = remainingSubjects.slice(0, 4);

  const best5Subjects = languageSubject ? [languageSubject, ...best4Remaining] : subjects.slice(0, 5);
  const totalBest5Marks = best5Subjects.reduce((acc, s) => acc + s.marks, 0);
  const best5Percentage = Number((totalBest5Marks / 5).toFixed(2));

  // All subjects average
  const totalAllMarks = subjects.reduce((acc, s) => acc + s.marks, 0);
  const allPercentage = Number((totalAllMarks / subjects.length).toFixed(2));

  const equivalentCgpa = Number((best5Percentage / 9.5).toFixed(2));

  const handleSave = () => {
    addHistoryItem({
      toolId: 'cbse-percentage',
      toolName: 'CBSE Percentage Calculator',
      inputSummary: `${STREAM_PRESETS[stream].label} (${totalBest5Marks}/500)`,
      resultSummary: `Best 5: ${best5Percentage}% (${equivalentCgpa} CGPA)`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Stream Selector Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {Object.entries(STREAM_PRESETS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleStreamChange(key)}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              stream === key
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Subject Marks Table Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              CBSE Subject Marks (Theory + Practical/Internal out of 100)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Highlighting subjects included in the official <strong>Best 5 Aggregate</strong>.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {subjects.map((sub, idx) => {
            const isIncludedInBest5 = best5Subjects.some(b => b.id === sub.id);
            const gradeInfo = getCbseGrade(sub.marks);

            return (
              <div
                key={sub.id}
                className={`grid grid-cols-12 gap-2 sm:gap-3 items-center p-3 rounded-xl border transition-all ${
                  isIncludedInBest5
                    ? 'border-orange-500/30 bg-orange-500/5 dark:bg-orange-950/20'
                    : 'border-slate-200/60 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 opacity-70'
                }`}
              >
                {/* Subject Name */}
                <div className="col-span-12 sm:col-span-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={e => updateSubjectName(sub.id, e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                    {sub.isCompulsory && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0">
                        Language (Req)
                      </span>
                    )}
                  </div>
                </div>

                {/* Marks Slider & Input */}
                <div className="col-span-6 sm:col-span-4 flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sub.marks}
                    onChange={e => updateSubjectMarks(sub.id, Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={sub.marks}
                    onChange={e => updateSubjectMarks(sub.id, Number(e.target.value))}
                    className="w-16 px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                {/* Grade Pill */}
                <div className="col-span-4 sm:col-span-2 text-center">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm">
                    {gradeInfo.grade} ({gradeInfo.gp} GP)
                  </span>
                </div>

                {/* Best 5 Badge / Delete */}
                <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-1">
                  {isIncludedInBest5 ? (
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950/60" title="Included in Best 5">
                      Best 5
                    </span>
                  ) : subjects.length > 5 ? (
                    <button
                      onClick={() => removeSubject(sub.id)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                      title="Remove extra subject"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={addExtraSubject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Additional / 6th Subject</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md shadow-orange-500/20"
          >
            Save CBSE Result
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="CBSE Official Percentage"
        mainValue={`${best5Percentage}%`}
        mainLabel={`Best 5 Aggregate: ${totalBest5Marks} / 500`}
        accentColor="amber"
        showPrint
        stats={[
          { label: 'Best 5 Marks', value: `${totalBest5Marks} / 500` },
          { label: 'Indicative CGPA', value: `${equivalentCgpa} / 10.0` },
          { label: 'All Subjects Avg', value: `${allPercentage}%` },
          { label: 'Pass Status', value: best5Percentage >= 33 ? 'QUALIFIED / PASS' : 'COMPARTMENT', badge: best5Percentage >= 75 ? 'Distinction' : undefined }
        ]}
        notes="According to CBSE circulars, colleges calculate admission eligibility based on your mandatory Language + 4 highest scoring domain/skill electives."
        copyContent={`CBSE Best 5 Percentage: ${best5Percentage}% (${totalBest5Marks}/500) | CGPA: ${equivalentCgpa}`}
      />

      <FormulaExplanation
        formula="Best 5 (%) = (Language Score + Top 4 Electives Score) / 5 | Indicative CGPA = Best 5 % / 9.5"
        explanation="CBSE board guidelines allow 6th additional/skill subjects (like Physical Education, AI, IT, Fine Arts) to replace any lower-scoring non-language main subject (Physics, Chemistry, Maths, Economics) for calculating the top 5 percentage."
        examples={[
          'Total 465/500 in Best 5 = (465 / 500) × 100 = 93.00%',
          '93.00% converted to CBSE CGPA = 93.00 / 9.5 = 9.79 CGPA'
        ]}
      />
    </div>
  );
};
