import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Calendar, Clock, RotateCcw, Plus, Trash2, Sparkles } from 'lucide-react';

interface ExamEvent {
  id: string;
  name: string;
  targetDate: string;
  category: string;
}

export const ExamCountdown: React.FC = () => {
  const [exams, setExams] = useState<ExamEvent[]>([
    { id: '1', name: 'JEE Main 2027 (Session 1)', targetDate: '2027-01-24T09:00', category: 'Engineering' },
    { id: '2', name: 'CBSE Class 12 Board Exams', targetDate: '2027-02-15T10:30', category: 'Boards' },
    { id: '3', name: 'NEET UG 2027', targetDate: '2027-05-02T14:00', category: 'Medical' },
    { id: '4', name: 'CUET UG 2027', targetDate: '2027-05-15T09:00', category: 'Central Univ' },
  ]);

  const [selectedExamId, setSelectedExamId] = useState<string>('1');
  const [customName, setCustomName] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentExam = exams.find(e => e.id === selectedExamId) || exams[0];
  const targetTime = new Date(currentExam.targetDate).getTime();
  const diffMs = Math.max(0, targetTime - now);

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const addCustomExam = () => {
    if (!customName || !customDate) return;
    const newExam: ExamEvent = {
      id: Date.now().toString(),
      name: customName,
      targetDate: customDate,
      category: 'Custom Exam',
    };
    setExams(prev => [newExam, ...prev]);
    setSelectedExamId(newExam.id);
    setCustomName('');
    setCustomDate('');
  };

  const removeExam = (id: string) => {
    setExams(prev => prev.filter(e => e.id !== id));
    if (selectedExamId === id && exams.length > 1) {
      setSelectedExamId(exams[0].id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Select or Add Target Exam</span>
            </h2>
          </div>

          {/* Exam Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Preset Major Exams:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exams.map(e => (
                <div
                  key={e.id}
                  onClick={() => setSelectedExamId(e.id)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedExamId === e.id
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-xs truncate">{e.name}</p>
                    <span className={`text-[10px] ${selectedExamId === e.id ? 'text-white/80' : 'text-slate-400'}`}>
                      {new Date(e.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                  {exams.length > 1 && (
                    <button
                      onClick={evt => {
                        evt.stopPropagation();
                        removeExam(e.id);
                      }}
                      className={`p-1 rounded-lg ${
                        selectedExamId === e.id ? 'hover:bg-white/20 text-white' : 'hover:bg-slate-200 text-slate-400'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Exam Form */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-brand-600" />
              <span>Track Custom Exam / Test Date</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                placeholder="Exam Name (e.g. Semester Finals)"
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
              />
              <input
                type="datetime-local"
                value={customDate}
                onChange={e => setCustomDate(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
            <button
              onClick={addCustomExam}
              disabled={!customName || !customDate}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-50 transition-colors"
            >
              Add to Live Timers
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title={currentExam.name}
          badge={`${days} Days Left`}
          badgeColor={days > 30 ? 'emerald' : days > 10 ? 'amber' : 'rose'}
        >
          <div className="space-y-6">
            {/* Countdown Flip Units */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl sm:text-4xl font-black text-brand-600 dark:text-brand-400 font-mono">
                  {days}
                </div>
                <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400">Days</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                  {hours.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400">Hours</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                  {minutes.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400">Mins</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl sm:text-4xl font-black text-rose-600 dark:text-rose-400 font-mono">
                  {seconds.toString().padStart(2, '0')}
                </div>
                <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400">Secs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/50 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">Study Plan Tip:</span>
              <p>
                You have approximately <strong>{days * 8} study hours</strong> available assuming 8 hours of dedicated daily revision.
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
