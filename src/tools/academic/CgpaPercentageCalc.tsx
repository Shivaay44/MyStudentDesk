import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { ArrowLeftRight, Check, Sparkles } from 'lucide-react';

interface PresetFormula {
  id: string;
  name: string;
  calc: (cgpa: number) => number;
  reverse: (pct: number) => number;
  formulaStr: string;
  notes: string;
}

const PRESETS: PresetFormula[] = [
  {
    id: 'cbse',
    name: 'CBSE Standard (× 9.5)',
    calc: c => c * 9.5,
    reverse: p => p / 9.5,
    formulaStr: 'Percentage (%) = CGPA × 9.5',
    notes: 'Official CBSE guideline for Class 10 & 12 board evaluations.'
  },
  {
    id: 'vtu',
    name: 'VTU Karnataka ((CGPA - 0.75) × 10)',
    calc: c => Math.max(0, (c - 0.75) * 10),
    reverse: p => (p / 10) + 0.75,
    formulaStr: 'Percentage (%) = (CGPA - 0.75) × 10',
    notes: 'Official Visvesvaraya Technological University formula.'
  },
  {
    id: 'mumbai',
    name: 'Mumbai University (7.1 × CGPA + 12 / 7.25 × CGPA + 11)',
    calc: c => c >= 7.0 ? (7.1 * c) + 12 : (7.25 * c) + 11,
    reverse: p => p >= 61.7 ? (p - 12) / 7.1 : (p - 11) / 7.25,
    formulaStr: 'Percentage = 7.1 × CGPA + 12 (if ≥ 7) or 7.25 × CGPA + 11',
    notes: 'Official Mumbai University circular for Engineering & Arts/Science.'
  },
  {
    id: 'anna',
    name: 'Anna University / Direct (× 10.0)',
    calc: c => c * 10.0,
    reverse: p => p / 10.0,
    formulaStr: 'Percentage (%) = CGPA × 10.0',
    notes: 'Used by Anna University, standard 10-point colleges and international conversions.'
  },
  {
    id: 'ktu',
    name: 'KTU Kerala ((CGPA - 0.5) × 10)',
    calc: c => Math.max(0, (c - 0.5) * 10),
    reverse: p => (p / 10) + 0.5,
    formulaStr: 'Percentage (%) = (CGPA - 0.5) × 10',
    notes: 'APJ Abdul Kalam Technological University grading norm.'
  },
  {
    id: 'custom',
    name: 'Custom Multiplier',
    calc: c => c * 9.5, // dynamic
    reverse: p => p / 9.5,
    formulaStr: 'Percentage (%) = CGPA × Custom Multiplier',
    notes: 'Input any formula multiplier provided by your specific university.'
  }
];

export const CgpaPercentageCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [direction, setDirection] = useState<'cgpaToPct' | 'pctToCgpa'>('cgpaToPct');
  const [selectedPreset, setSelectedPreset] = useState<string>('cbse');
  const [cgpaInput, setCgpaInput] = useState<number | string>(8.6);
  const [pctInput, setPctInput] = useState<number | string>(81.7);
  const [customMult, setCustomMult] = useState<number | string>(9.5);

  const preset = PRESETS.find(p => p.id === selectedPreset) || PRESETS[0];

  let percentage = 0;
  let cgpaResult = 0;

  if (direction === 'cgpaToPct') {
    const c = Number(cgpaInput) || 0;
    if (preset.id === 'custom') {
      const m = Number(customMult) || 9.5;
      percentage = c * m;
    } else {
      percentage = preset.calc(c);
    }
    percentage = Number(percentage.toFixed(2));
  } else {
    const p = Number(pctInput) || 0;
    if (preset.id === 'custom') {
      const m = Number(customMult) || 9.5;
      cgpaResult = p / m;
    } else {
      cgpaResult = preset.reverse(p);
    }
    cgpaResult = Number(cgpaResult.toFixed(2));
  }

  const handleSave = () => {
    addHistoryItem({
      toolId: 'cgpa-percentage',
      toolName: 'CGPA → Percentage Converter',
      inputSummary: direction === 'cgpaToPct' ? `CGPA: ${cgpaInput} (${preset.name})` : `Percentage: ${pctInput}% (${preset.name})`,
      resultSummary: direction === 'cgpaToPct' ? `${percentage}%` : `CGPA: ${cgpaResult}`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Direction Switcher */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex gap-2">
          <button
            onClick={() => setDirection('cgpaToPct')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              direction === 'cgpaToPct'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            CGPA → Percentage (%)
          </button>
          <button
            onClick={() => setDirection('pctToCgpa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              direction === 'pctToCgpa'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Percentage (%) → CGPA
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Select University / Board Formula
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {PRESETS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPreset(p.id)}
                className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                  selectedPreset === p.id
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>{p.name}</span>
                  {selectedPreset === p.id && <Check className="w-3.5 h-3.5 text-brand-500" />}
                </div>
                <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">{p.formulaStr}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {direction === 'cgpaToPct' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Enter Your CGPA (out of 10.0)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={cgpaInput}
                onChange={e => setCgpaInput(e.target.value)}
                placeholder="e.g. 8.6"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Enter Your Percentage Score (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={pctInput}
                onChange={e => setPctInput(e.target.value)}
                placeholder="e.g. 81.7"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}

          {selectedPreset === 'custom' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Custom Multiplier Factor
              </label>
              <input
                type="number"
                step="0.01"
                value={customMult}
                onChange={e => setCustomMult(e.target.value)}
                placeholder="e.g. 9.5 or 10.0"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-all shadow-md shadow-brand-500/20"
          >
            Save Result to History
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Conversion Result"
        mainValue={direction === 'cgpaToPct' ? `${percentage}%` : `${cgpaResult} CGPA`}
        mainLabel={direction === 'cgpaToPct' ? `Equivalent Percentage for CGPA ${cgpaInput}` : `Equivalent CGPA for ${pctInput}%`}
        accentColor="indigo"
        stats={[
          { label: 'Formula Used', value: preset.name.split('(')[0].trim() },
          { label: 'Conversion Rule', value: preset.formulaStr },
          {
            label: 'Academic Class',
            value: (direction === 'cgpaToPct' ? percentage : Number(pctInput)) >= 75 ? 'First Class with Distinction' : (direction === 'cgpaToPct' ? percentage : Number(pctInput)) >= 60 ? 'First Class' : 'Second Class',
            badge: 'Status'
          }
        ]}
        notes={preset.notes}
        copyContent={direction === 'cgpaToPct' ? `CGPA ${cgpaInput} = ${percentage}% (${preset.name})` : `${pctInput}% = CGPA ${cgpaResult} (${preset.name})`}
      />

      <FormulaExplanation
        formula={preset.formulaStr}
        explanation={`Why this formula? ${preset.notes} Many Indian universities standardise CGPA onto a 100-mark percentage scale using historical cohort standard deviation scaling.`}
        examples={[
          'CGPA 9.2 in CBSE = 9.2 × 9.5 = 87.4%',
          'CGPA 8.5 in VTU = (8.5 - 0.75) × 10 = 77.5%',
          'CGPA 8.0 in Mumbai University = 7.1 × 8.0 + 12 = 68.8%'
        ]}
      />
    </div>
  );
};
