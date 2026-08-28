import React, { useState, useEffect, useRef } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { useApp } from '../../context/AppContext';
import { Play, Pause, RotateCcw, Flag, Clock, Tag, Sparkles } from 'lucide-react';

interface LapItem {
  id: number;
  time: number;
  split: number;
  tag: string;
}

const SUBJECT_TAGS = ['Physics', 'Mathematics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'History', 'General Revision'];

export const StudyTimer: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<string>('Physics');
  const [laps, setLaps] = useState<LapItem[]>([]);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    const lastLapTime = laps.length > 0 ? laps[0].time : 0;
    const split = time - lastLapTime;
    setLaps(prev => [{ id: prev.length + 1, time, split, tag: currentTag }, ...prev]);
  };

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const centis = Math.floor((ms % 1000) / 10);

    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  };

  const handleSaveSession = () => {
    const totalMins = Math.round(time / 60000);
    addHistoryItem({
      toolId: 'study-timer',
      toolName: 'Study Stopwatch',
      inputSummary: `${currentTag} Study Session (${laps.length} laps)`,
      resultSummary: `${formatTime(time)} logged (~${totalMins} mins)`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Subject Tag Selector */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto">
        {SUBJECT_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setCurrentTag(tag)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentTag === tag
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Main Stopwatch Face */}
      <div className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl max-w-xl mx-auto flex flex-col items-center justify-center space-y-6 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-200 dark:border-brand-900">
          <Tag className="w-3.5 h-3.5" />
          <span>Active Subject: {currentTag}</span>
        </div>

        <div className="text-5xl sm:text-7xl font-black font-mono tracking-tight text-slate-900 dark:text-white select-none">
          {formatTime(time)}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleReset}
            disabled={time === 0}
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-300 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-bold text-base text-white shadow-xl transition-all transform active:scale-95 flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                : 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/25'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{isRunning ? 'Pause' : 'Start Timer'}</span>
          </button>

          <button
            onClick={handleLap}
            disabled={!isRunning}
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-300 transition-colors"
            title="Record Split / Lap"
          >
            <Flag className="w-5 h-5" />
          </button>
        </div>

        {time > 0 && !isRunning && (
          <button
            onClick={handleSaveSession}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline pt-2"
          >
            Save This Study Session to History →
          </button>
        )}
      </div>

      {/* Lap Times Table */}
      {laps.length > 0 && (
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Recorded Laps / Topic Splits ({laps.length})
            </h4>
          </div>

          <div className="space-y-1.5 max-h-52 overflow-y-auto font-mono text-xs">
            {laps.map(lap => (
              <div
                key={lap.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400">#{lap.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-sans font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    {lap.tag}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">+{formatTime(lap.split)}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatTime(lap.time)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
