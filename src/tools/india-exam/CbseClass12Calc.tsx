import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { GraduationCap, RotateCcw, Sparkles } from 'lucide-react';

interface StreamSubject {
  name: string;
  theoryMarks: number;
  practicalMarks: number;
  maxTheory: number;
  maxPractical: number;
}

export const CbseClass12Calc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [stream, setStream] = useState<'pcm' | 'pcb' | 'commerce' | 'arts'>('pcm');
  
  const [subjects, setSubjects] = useState<StreamSubject[]>([
    { name: 'English Core', theoryMarks: 72, practicalMarks: 18, maxTheory: 80, maxPractical: 20 },
    { name: 'Physics', theoryMarks: 58, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
    { name: 'Chemistry', theoryMarks: 60, practicalMarks: 28, maxTheory: 70, maxPractical: 30 },
    { name: 'Mathematics', theoryMarks: 74, practicalMarks: 19, maxTheory: 80, maxPractical: 20 },
    { name: 'Computer Science / IP', theoryMarks: 65, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
  ]);

  const updateMarks = (index: number, field: 'theoryMarks' | 'practicalMarks', val: number) => {
    setSubjects(prev =>
      prev.map((s, idx) => {
        if (idx === index) {
          const max = field === 'theoryMarks' ? s.maxTheory : s.maxPractical;
          return { ...s, [field]: Math.min(max, Math.max(0, val)) };
        }
        return s;
      })
    );
  };

  const handleStreamChange = (newStream: 'pcm' | 'pcb' | 'commerce' | 'arts') => {
    setStream(newStream);
    if (newStream === 'pcm') {
      setSubjects([
        { name: 'English Core', theoryMarks: 72, practicalMarks: 18, maxTheory: 80, maxPractical: 20 },
        { name: 'Physics', theoryMarks: 58, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
        { name: 'Chemistry', theoryMarks: 60, practicalMarks: 28, maxTheory: 70, maxPractical: 30 },
        { name: 'Mathematics', theoryMarks: 74, practicalMarks: 19, maxTheory: 80, maxPractical: 20 },
        { name: 'Computer Science / PE', theoryMarks: 65, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
      ]);
    } else if (newStream === 'pcb') {
      setSubjects([
        { name: 'English Core', theoryMarks: 72, practicalMarks: 18, maxTheory: 80, maxPractical: 20 },
        { name: 'Physics', theoryMarks: 58, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
        { name: 'Chemistry', theoryMarks: 60, practicalMarks: 28, maxTheory: 70, maxPractical: 30 },
        { name: 'Biology', theoryMarks: 62, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
        { name: 'Physical Education / Biotech', theoryMarks: 65, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
      ]);
    } else if (newStream === 'commerce') {
      setSubjects([
        { name: 'English Core', theoryMarks: 72, practicalMarks: 18, maxTheory: 80, maxPractical: 20 },
        { name: 'Accountancy', theoryMarks: 68, practicalMarks: 19, maxTheory: 80, maxPractical: 20 },
        { name: 'Business Studies', theoryMarks: 70, practicalMarks: 19, maxTheory: 80, maxPractical: 20 },
        { name: 'Economics', theoryMarks: 71, practicalMarks: 18, maxTheory: 80, maxPractical: 20 },
        { name: 'Mathematics / Applied Math', theoryMarks: 74, practicalMarks: 19, maxTheory: 80, maxPractical: 20 },
      ]);
    } else {
      setSubjects([
        { name: 'English Core', theoryMarks: 72, practicalMarks: 18, maxTheory: 80, maxPractical: 20 },
        { name: 'History', theoryMarks: 68, practicalMarks: 19, maxTheory: 80, maxPractical: 20 },
        { name: 'Political Science', theoryMarks: 70, practicalMarks: 19, maxTheory: 80, maxPractical: 20 },
        { name: 'Geography / Sociology', theoryMarks: 58, practicalMarks: 29, maxTheory: 70, maxPractical: 30 },
        { name: 'Psychology / Economics', theoryMarks: 62, practicalMarks: 28, maxTheory: 70, maxPractical: 30 },
      ]);
    }
  };

  const subjectTotals = subjects.map(s => s.theoryMarks + s.practicalMarks);
  const totalScore = subjectTotals.reduce((a, b) => a + b, 0);
  const percentage = totalScore / 5;

  const handleCalculate = () => {
    if (percentage >= 90) triggerConfetti();
    addHistoryItem({
      toolId: 'cbse-class-12-percentage',
      toolName: 'CBSE Class 12 Percentage Calculator',
      inputSummary: `Stream: ${stream.toUpperCase()} (${totalScore}/500)`,
      resultSummary: `${percentage.toFixed(2)}%`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Select Stream & Enter Marks</span>
            </h2>
          </div>

          {/* Stream Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'pcm', label: 'Science (PCM)' },
              { id: 'pcb', label: 'Science (PCB)' },
              { id: 'commerce', label: 'Commerce' },
              { id: 'arts', label: 'Humanities / Arts' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleStreamChange(tab.id as any)}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  stream === tab.id
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            {subjects.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white">
                  <span>{s.name}</span>
                  <span className="text-brand-600 dark:text-brand-400">
                    Total: {s.theoryMarks + s.practicalMarks}/100
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                      Theory ({s.maxTheory} max)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={s.maxTheory}
                      value={s.theoryMarks || ''}
                      onChange={e => updateMarks(idx, 'theoryMarks', Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                      Practical ({s.maxPractical} max)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={s.maxPractical}
                      value={s.practicalMarks || ''}
                      onChange={e => updateMarks(idx, 'practicalMarks', Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calculate Class 12 Aggregate</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <ResultCard
          title="Class 12 Percentage"
          badge={percentage >= 75 ? 'Distinction' : 'Passed'}
          badgeColor={percentage >= 75 ? 'emerald' : 'indigo'}
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Aggregate Percentage
              </span>
              <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-brand-400">
                {percentage.toFixed(2)}%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Score: {totalScore} / 500 Marks
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
