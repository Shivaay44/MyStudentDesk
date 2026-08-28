import React, { useState, useEffect, useRef } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { useApp } from '../../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Maximize2,
  Minimize2,
  Flame,
} from 'lucide-react';

type Mode = 'focus' | 'shortBreak' | 'longBreak';
type AmbientSound = 'none' | 'whitenoise' | 'rain' | 'drone';

export const PomodoroTimer: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [mode, setMode] = useState<Mode>('focus');
  const [focusTime, setFocusTime] = useState<number>(25);
  const [shortBreakTime, setShortBreakTime] = useState<number>(5);
  const [longBreakTime, setLongBreakTime] = useState<number>(15);

  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  // Audio Ambient sound player using Web Audio API
  const [ambientSound, setAmbientSound] = useState<AmbientSound>('none');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Study tasks list
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: '1', text: 'Revise JEE Physics Formulae (Mechanics)', done: false },
    { id: '2', text: 'Complete Math Assignment Questions 1-15', done: true },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // Mode durations
  const getDurationForMode = (m: Mode) => {
    if (m === 'focus') return focusTime * 60;
    if (m === 'shortBreak') return shortBreakTime * 60;
    return longBreakTime * 60;
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(getDurationForMode(newMode));
  };

  // Timer Tick
  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      triggerConfetti();

      // Play finished beep tone
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 tone
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch {}

      if (mode === 'focus') {
        const nextCount = completedSessions + 1;
        setCompletedSessions(nextCount);
        addHistoryItem({
          toolId: 'pomodoro',
          toolName: 'Pomodoro Focus Timer',
          inputSummary: `${focusTime} min focus session`,
          resultSummary: `Session #${nextCount} completed!`,
        });
        if (nextCount % 4 === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        switchMode('focus');
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  // Ambient sound synthesis
  useEffect(() => {
    if (ambientSound === 'none' || !isRunning) {
      if (noiseNodeRef.current) {
        try {
          (noiseNodeRef.current as any).stop?.();
          noiseNodeRef.current.disconnect();
        } catch {}
        noiseNodeRef.current = null;
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate brown / white noise
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (ambientSound === 'rain' || ambientSound === 'drone') {
          // Brown noise integration
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        } else {
          output[i] = white * 0.1;
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = ambientSound === 'rain' ? 'lowpass' : ambientSound === 'drone' ? 'bandpass' : 'allpass';
      filter.frequency.value = ambientSound === 'rain' ? 800 : 432;

      const gain = ctx.createGain();
      gain.gain.value = 0.12;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
    } catch {}

    return () => {
      if (noiseNodeRef.current) {
        try {
          (noiseNodeRef.current as any).stop?.();
          noiseNodeRef.current.disconnect();
        } catch {}
      }
    };
  }, [ambientSound, isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalDuration = getDurationForMode(mode);
  const progressPct = ((totalDuration - timeLeft) / totalDuration) * 100;

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), text: newTaskInput.trim(), done: false }]);
    setNewTaskInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Mode Selectors */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
        <button
          onClick={() => switchMode('focus')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'focus'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'shortBreak'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'longBreak'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Main Timer Display Circle */}
      <div className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl max-w-xl mx-auto flex flex-col items-center justify-center space-y-6 text-center">
        {/* Streak Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold">
          <Flame className="w-4 h-4 fill-rose-500" />
          <span>{completedSessions} Pomodoros Completed</span>
        </div>

        {/* Big Time Display */}
        <div className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-slate-900 dark:text-white select-none">
          {formattedTime}
        </div>

        {/* Progress Line */}
        <div className="w-full max-w-xs h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              mode === 'focus' ? 'bg-rose-500' : mode === 'shortBreak' ? 'bg-emerald-500' : 'bg-indigo-500'
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => setTimeLeft(getDurationForMode(mode))}
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-bold text-base text-white shadow-xl transition-all transform active:scale-95 flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                : mode === 'focus'
                ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/25'
                : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>
        </div>

        {/* Ambient Sound Selector */}
        <div className="flex items-center gap-2 pt-4 text-xs font-semibold text-slate-500">
          <Volume2 className="w-4 h-4 text-slate-400" />
          <span>Ambient Study Sound:</span>
          <select
            value={ambientSound}
            onChange={e => setAmbientSound(e.target.value as AmbientSound)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs"
          >
            <option value="none">Mute / Off</option>
            <option value="rain">Soothing Rain (Brown Noise)</option>
            <option value="whitenoise">Pure White Noise</option>
            <option value="drone">432Hz Focus Drone</option>
          </select>
        </div>
      </div>

      {/* Study Task Checklist */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
            Current Focus Session Tasks
          </h4>
          <span className="text-xs text-slate-400">
            {tasks.filter(t => t.done).length} / {tasks.length} Done
          </span>
        </div>

        {/* Add Task Input */}
        <form onSubmit={addTask} className="flex gap-2">
          <input
            type="text"
            value={newTaskInput}
            onChange={e => setNewTaskInput(e.target.value)}
            placeholder="Add study task (e.g. Solve 20 Chemistry MCQs)..."
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        {/* Task items */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {tasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                task.done
                  ? 'border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-400 line-through'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs font-medium min-w-0">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${task.done ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}
                />
                <span className="truncate">{task.text}</span>
              </div>

              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
