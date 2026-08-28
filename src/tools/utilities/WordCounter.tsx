import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { CopyButton } from '../../components/common/CopyButton';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, RotateCcw, Copy, Sparkles } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const { addHistoryItem } = useApp();

  const [text, setText] = useState<string>(
    'MyStudentDesk provides 25+ essential tools for Indian students, including JEE Rank Predictors, CBSE Best-5 calculators, and Attendance Bunk meters.'
  );

  // Analysis metrics
  const cleanText = text.trim();
  const wordsArray = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  const wordCount = wordsArray.length;
  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s/g, '').length;
  const sentences = cleanText ? cleanText.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = cleanText ? cleanText.split(/\n+/).filter(Boolean).length : 0;

  // Reading time (200 words/min) & Speaking time (130 words/min)
  const readingTimeMin = (wordCount / 200).toFixed(1);
  const speakingTimeMin = (wordCount / 130).toFixed(1);

  // Top keywords density
  const wordFreq: Record<string, number> = {};
  wordsArray.forEach(w => {
    const cleanW = w.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    if (cleanW.length > 3) {
      wordFreq[cleanW] = (wordFreq[cleanW] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w, count]) => ({
      word: w,
      count,
      pct: ((count / Math.max(1, wordCount)) * 100).toFixed(1)
    }));

  // Case transforms
  const transformCase = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'kebab') => {
    if (!text) return;
    if (type === 'upper') setText(text.toUpperCase());
    if (type === 'lower') setText(text.toLowerCase());
    if (type === 'title') {
      setText(
        text
          .toLowerCase()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      );
    }
    if (type === 'sentence') {
      setText(
        text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
      );
    }
    if (type === 'camel') {
      setText(
        text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
          .replace(/\s+/g, '')
      );
    }
    if (type === 'kebab') {
      setText(
        text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Text Area Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Essay & Assignment Text Analyzer
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Copy Text" />
            <button
              onClick={() => setText('')}
              className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
              title="Clear text"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          rows={7}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste or type your assignment, essay, or research text here..."
          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none leading-relaxed"
        />

        {/* Case Transformer Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Case Converter:</span>
          {[
            { id: 'upper', label: 'UPPERCASE' },
            { id: 'lower', label: 'lowercase' },
            { id: 'title', label: 'Title Case' },
            { id: 'sentence', label: 'Sentence case' },
            { id: 'camel', label: 'camelCase' },
            { id: 'kebab', label: 'kebab-case' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => transformCase(c.id as any)}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-slate-700 dark:text-slate-300 hover:text-cyan-600 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Card */}
      <ResultCard
        title="Content Statistics"
        mainValue={`${wordCount.toLocaleString()} Words`}
        mainLabel={`${charWithSpaces.toLocaleString()} Characters with spaces (${charWithoutSpaces.toLocaleString()} without)`}
        accentColor="cyan"
        stats={[
          { label: 'Total Words', value: wordCount },
          { label: 'Characters', value: charWithSpaces },
          { label: 'Sentences', value: sentences },
          { label: 'Paragraphs', value: paragraphs },
          { label: 'Reading Time', value: `~${readingTimeMin} min`, badge: '200 wpm' },
          { label: 'Speaking Time', value: `~${speakingTimeMin} min`, badge: 'Speech' }
        ]}
      />

      {/* Keyword Density Table */}
      {topKeywords.length > 0 && (
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Top Keyword Density
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {topKeywords.map(kw => (
              <div key={kw.word} className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <span className="font-bold text-xs text-cyan-600 dark:text-cyan-400 block truncate">{kw.word}</span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {kw.count} times ({kw.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
