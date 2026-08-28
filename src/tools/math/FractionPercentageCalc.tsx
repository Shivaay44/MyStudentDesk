import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Divide, RotateCcw, Sparkles } from 'lucide-react';

export const FractionPercentageCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(8);

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const commonDivisor = denominator !== 0 ? gcd(Math.abs(numerator), Math.abs(denominator)) : 1;
  const simplifiedNum = numerator / commonDivisor;
  const simplifiedDen = denominator / commonDivisor;

  const decimalVal = denominator !== 0 ? numerator / denominator : 0;
  const percentage = decimalVal * 100;

  const handleCalculate = () => {
    if (percentage === 100) triggerConfetti();
    addHistoryItem({
      toolId: 'fraction-percentage',
      toolName: 'Fraction to Percentage Calculator',
      inputSummary: `${numerator} / ${denominator}`,
      resultSummary: `${percentage.toFixed(2)}% (Decimal: ${decimalVal.toFixed(4)})`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Divide className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Enter Fraction (Numerator / Denominator)</span>
            </h2>
            <button
              onClick={() => {
                setNumerator(3);
                setDenominator(8);
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 py-4">
            <div className="space-y-1 text-center">
              <label className="text-[11px] font-semibold text-slate-400">Numerator (Top)</label>
              <input
                type="number"
                value={numerator || ''}
                onChange={e => setNumerator(Number(e.target.value))}
                className="w-28 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-center text-slate-900 dark:text-white text-2xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="3"
              />
            </div>

            <div className="text-3xl font-light text-slate-400 pt-5">/</div>

            <div className="space-y-1 text-center">
              <label className="text-[11px] font-semibold text-slate-400">Denominator (Bottom)</label>
              <input
                type="number"
                value={denominator || ''}
                onChange={e => setDenominator(Number(e.target.value))}
                className="w-28 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-center text-slate-900 dark:text-white text-2xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="8"
              />
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-semibold">Common Fractions:</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { n: 1, d: 2 },
                { n: 1, d: 4 },
                { n: 3, d: 4 },
                { n: 1, d: 3 },
                { n: 2, d: 3 },
                { n: 3, d: 5 },
                { n: 7, d: 8 },
              ].map(f => (
                <button
                  key={`${f.n}/${f.d}`}
                  onClick={() => {
                    setNumerator(f.n);
                    setDenominator(f.d);
                  }}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500"
                >
                  {f.n}/{f.d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Convert to Percentage & Decimal</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="Converted Results"
          badge={`${percentage.toFixed(2)}%`}
          badgeColor="emerald"
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Percentage Equivalent
              </span>
              <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-brand-400">
                {percentage.toFixed(2)}%
              </div>
              <p className="text-xs text-slate-500">
                Decimal: <strong>{decimalVal.toFixed(6)}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-400">Simplified Fraction:</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  {simplifiedNum} / {simplifiedDen}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-400">Ratio Notation:</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  {simplifiedNum} : {simplifiedDen}
                </p>
              </div>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
