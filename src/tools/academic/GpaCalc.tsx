import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, GraduationCap, Award, Printer } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

const GRADE_POINTS_10 = [
  { grade: 'O / A+ (Outstanding)', point: 10 },
  { grade: 'A (Excellent)', point: 9 },
  { grade: 'B+ (Very Good)', point: 8 },
  { grade: 'B (Good)', point: 7 },
  { grade: 'C+ (Above Average)', point: 6 },
  { grade: 'C (Average)', point: 5 },
  { grade: 'P (Pass)', point: 4 },
  { grade: 'F (Fail)', point: 0 },
];

export const GpaCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 'sem-1',
      name: 'Semester 1',
      courses: [
        { id: 'c1', name: 'Engineering Mathematics I', credits: 4, gradePoint: 10 },
        { id: 'c2', name: 'Programming & Data Structures', credits: 4, gradePoint: 9 },
        { id: 'c3', name: 'Physics / Chemistry', credits: 3, gradePoint: 8 },
        { id: 'c4', name: 'Engineering Graphics & Lab', credits: 2, gradePoint: 9 },
      ]
    },
    {
      id: 'sem-2',
      name: 'Semester 2',
      courses: [
        { id: 'c5', name: 'Engineering Mathematics II', credits: 4, gradePoint: 9 },
        { id: 'c6', name: 'Digital Logic & Circuitry', credits: 4, gradePoint: 8 },
        { id: 'c7', name: 'Object Oriented Programming', credits: 4, gradePoint: 9 },
        { id: 'c8', name: 'Technical Communication Lab', credits: 2, gradePoint: 10 },
      ]
    }
  ]);

  // Add Semester
  const addSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters(prev => [
      ...prev,
      {
        id: `sem-${Date.now()}`,
        name: `Semester ${nextNum}`,
        courses: [
          { id: `c-${Date.now()}-1`, name: 'Subject 1', credits: 4, gradePoint: 9 },
          { id: `c-${Date.now()}-2`, name: 'Subject 2', credits: 3, gradePoint: 8 },
          { id: `c-${Date.now()}-3`, name: 'Subject 3', credits: 3, gradePoint: 8 },
        ]
      }
    ]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length <= 1) return;
    setSemesters(prev => prev.filter(s => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    setSemesters(prev =>
      prev.map(sem => {
        if (sem.id !== semId) return sem;
        return {
          ...sem,
          courses: [
            ...sem.courses,
            { id: `c-${Date.now()}`, name: `Subject ${sem.courses.length + 1}`, credits: 3, gradePoint: 8 }
          ]
        };
      })
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(prev =>
      prev.map(sem => {
        if (sem.id !== semId) return sem;
        return {
          ...sem,
          courses: sem.courses.filter(c => c.id !== courseId)
        };
      })
    );
  };

  const updateCourse = (semId: string, courseId: string, field: keyof Course, val: any) => {
    setSemesters(prev =>
      prev.map(sem => {
        if (sem.id !== semId) return sem;
        return {
          ...sem,
          courses: sem.courses.map(c => (c.id === courseId ? { ...c, [field]: val } : c))
        };
      })
    );
  };

  // Calculate SGPA per semester
  const semesterResults = semesters.map(sem => {
    const totalCredits = sem.courses.reduce((acc, c) => acc + (Number(c.credits) || 0), 0);
    const weightedPoints = sem.courses.reduce((acc, c) => acc + ((Number(c.credits) || 0) * (Number(c.gradePoint) || 0)), 0);
    const sgpa = totalCredits > 0 ? Number((weightedPoints / totalCredits).toFixed(2)) : 0;
    return {
      id: sem.id,
      name: sem.name,
      totalCredits,
      weightedPoints,
      sgpa
    };
  });

  // Calculate Cumulative CGPA
  const totalCumulativeCredits = semesterResults.reduce((acc, s) => acc + s.totalCredits, 0);
  const totalCumulativePoints = semesterResults.reduce((acc, s) => acc + s.weightedPoints, 0);
  const cumulativeCgpa = totalCumulativeCredits > 0 ? Number((totalCumulativePoints / totalCumulativeCredits).toFixed(2)) : 0;
  const equivalentPercentage = Number((cumulativeCgpa * 9.5).toFixed(2));

  const handleSave = () => {
    addHistoryItem({
      toolId: 'gpa-calc',
      toolName: 'GPA / SGPA Calculator',
      inputSummary: `${semesters.length} Semesters (${totalCumulativeCredits} Credits)`,
      resultSummary: `CGPA: ${cumulativeCgpa} (${equivalentPercentage}%)`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Semesters Card Container */}
      <div className="space-y-6">
        {semesters.map((sem, sIdx) => {
          const semRes = semesterResults.find(r => r.id === sem.id);
          return (
            <div
              key={sem.id}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4"
            >
              {/* Semester Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 font-bold text-xs">
                    Sem {sIdx + 1}
                  </div>
                  <input
                    type="text"
                    value={sem.name}
                    onChange={e => {
                      const newName = e.target.value;
                      setSemesters(prev => prev.map(s => s.id === sem.id ? { ...s, name: newName } : s));
                    }}
                    className="font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none text-base"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-lg">
                    SGPA: {semRes?.sgpa || 0}
                  </span>
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(sem.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                      title="Delete Semester"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Course Rows */}
              <div className="space-y-2.5">
                {sem.courses.map((course, cIdx) => (
                  <div key={course.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center">
                    {/* Course Title */}
                    <div className="col-span-12 sm:col-span-5">
                      <input
                        type="text"
                        value={course.name}
                        onChange={e => updateCourse(sem.id, course.id, 'name', e.target.value)}
                        placeholder="Subject Name"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>

                    {/* Credits */}
                    <div className="col-span-4 sm:col-span-2">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={course.credits}
                        onChange={e => updateCourse(sem.id, course.id, 'credits', Number(e.target.value) || 0)}
                        placeholder="Credits"
                        title="Credits"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>

                    {/* Grade Points */}
                    <div className="col-span-6 sm:col-span-4">
                      <select
                        value={course.gradePoint}
                        onChange={e => updateCourse(sem.id, course.id, 'gradePoint', Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      >
                        {GRADE_POINTS_10.map(gp => (
                          <option key={gp.point} value={gp.point}>
                            {gp.grade} ({gp.point} pts)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete */}
                    <div className="col-span-2 sm:col-span-1 flex justify-end">
                      <button
                        onClick={() => removeCourse(sem.id, course.id)}
                        disabled={sem.courses.length <= 1}
                        className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Subject Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => addCourse(sem.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subject</span>
                </button>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Semester Credits: <strong className="text-slate-900 dark:text-white">{semRes?.totalCredits || 0}</strong>
                </span>
              </div>
            </div>
          );
        })}

        {/* Add Semester Button */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={addSemester}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-brand-400 dark:border-brand-600 text-brand-600 dark:text-brand-400 font-bold text-xs hover:bg-brand-50/50 dark:hover:bg-brand-950/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Next Semester</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20"
          >
            Save Transcript to History
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Cumulative Grade Report"
        mainValue={`${cumulativeCgpa} CGPA`}
        mainLabel="Cumulative CGPA across all semesters"
        accentColor="indigo"
        showPrint
        stats={[
          { label: 'Total Credits', value: totalCumulativeCredits },
          { label: 'Equivalent %', value: `${equivalentPercentage}%` },
          { label: 'Total Semesters', value: semesters.length },
          { label: 'Grade Standing', value: cumulativeCgpa >= 9.0 ? 'Outstanding (O)' : cumulativeCgpa >= 8.0 ? 'Distinction (A+)' : cumulativeCgpa >= 7.0 ? 'First Class (A)' : 'Second Class', badge: 'Class' }
        ]}
        copyContent={`Cumulative CGPA: ${cumulativeCgpa} (${equivalentPercentage}%) across ${semesters.length} semesters (${totalCumulativeCredits} credits).`}
      />

      <FormulaExplanation
        formula="SGPA = Σ(Credit × Grade Point) / ΣCredits | CGPA = Σ(SGPA × Semester Credits) / Total Degree Credits"
        explanation="Weighted credit grade point averaging ensures high-credit subjects (e.g. 4-credit core subjects vs 1-credit labs) carry their appropriate proportional weight toward your official degree transcript."
      />
    </div>
  );
};
