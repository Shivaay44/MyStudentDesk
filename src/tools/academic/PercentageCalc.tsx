import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Percent, ArrowRight, RotateCcw } from 'lucide-react';

type Mode = 'marks' | 'valueOf' | 'change' | 'discount';

export const PercentageCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();
  const [mode, setMode] = useState<Mode>('marks');

  // Mode 1: Marks
  const [obtained, setObtained] = useState<number | string>(425);
  const [total, setTotal] = useState<number | string>(500);

  // Mode 2: X% of Y
  const [percentVal, setPercentVal] = useState<number | string>(18);
  const [baseVal, setBaseVal] = useState<number | string>(2500);

  // Mode 3: Change
  const [oldVal, setOldVal] = useState<number | string>(80);
  const [newVal, setNewVal] = useState<number | string>(95);

  // Mode 4: Discount
  const [originalPrice, setOriginalPrice] = useState<number | string>(1999);
  const [discountPercent, setDiscountPercent] = useState<number | string>(25);

  // Calculation Results
  let mainResult = '0%';
  let mainLabel = 'Calculated Percentage';
  let stats: any[] = [];
  let formula = '';
  let explanation = '';
  let copyText = '';

  if (mode === 'marks') {
    const obt = Number(obtained) || 0;
    const tot = Number(total) || 1;
    const pct = ((obt / tot) * 100);
    const formatted = Number(pct.toFixed(2));
    mainResult = `${formatted}%`;
    mainLabel = 'Percentage Score';
    stats = [
      { label: 'Marks Obtained', value: obt },
      { label: 'Total Marks', value: tot },
      { label: 'Lost Marks', value: Math.max(0, tot - obt) },
      { label: 'Performance', value: pct >= 90 ? 'Outstanding' : pct >= 75 ? 'Distinction' : pct >= 60 ? 'First Class' : 'Average', badge: pct >= 75 ? 'Pass' : undefined }
    ];
    formula = `Percentage (%) = (Marks Obtained / Total Marks) × 100 = (${obt} / ${tot}) × 100 = ${formatted}%`;
    explanation = 'Calculates your direct academic percentage score based on aggregate marks obtained vs total maximum marks.';
    copyText = `Marks: ${obt}/${tot} = ${formatted}%`;
  } else if (mode === 'valueOf') {
    const p = Number(percentVal) || 0;
    const b = Number(baseVal) || 0;
    const res = (p * b) / 100;
    mainResult = Number(res.toFixed(2)).toString();
    mainLabel = `${p}% of ${b}`;
    stats = [
      { label: 'Percentage', value: `${p}%` },
      { label: 'Base Value', value: b },
      { label: 'Remaining Balance', value: Number((b - res).toFixed(2)) }
    ];
    formula = `Value = (${p} × ${b}) / 100 = ${Number(res.toFixed(2))}`;
    explanation = `Computes the exact quantitative share equal to ${p}% of a total ${b}.`;
    copyText = `${p}% of ${b} = ${mainResult}`;
  } else if (mode === 'change') {
    const o = Number(oldVal) || 1;
    const n = Number(newVal) || 0;
    const diff = n - o;
    const pctChange = (diff / Math.abs(o)) * 100;
    const formatted = Number(pctChange.toFixed(2));
    const isInc = formatted >= 0;
    mainResult = `${isInc ? '+' : ''}${formatted}%`;
    mainLabel = isInc ? 'Percentage Increase' : 'Percentage Decrease';
    stats = [
      { label: 'Initial Value', value: o },
      { label: 'Final Value', value: n },
      { label: 'Absolute Difference', value: `${isInc ? '+' : ''}${Number(diff.toFixed(2))}` },
      { label: 'Trend', value: isInc ? 'Growth' : 'Decline', badge: isInc ? 'Positive' : 'Negative', badgeColor: isInc ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600' }
    ];
    formula = `Percentage Change = [(${n} - ${o}) / ${o}] × 100 = ${formatted}%`;
    explanation = 'Measures the relative change from an original value to a new value expressed as a percentage.';
    copyText = `Change from ${o} to ${n} = ${mainResult}`;
  } else if (mode === 'discount') {
    const op = Number(originalPrice) || 0;
    const dp = Number(discountPercent) || 0;
    const saved = (op * dp) / 100;
    const finalPrice = Math.max(0, op - saved);
    mainResult = `₹${Number(finalPrice.toFixed(2))}`;
    mainLabel = 'Final Discounted Price';
    stats = [
      { label: 'Original Price', value: `₹${op}` },
      { label: 'Discount', value: `${dp}%` },
      { label: 'You Save', value: `₹${Number(saved.toFixed(2))}`, badge: 'Savings' },
    ];
    formula = `Savings = (${op} × ${dp}%) = ₹${Number(saved.toFixed(2))} | Final Price = ₹${op} - ₹${Number(saved.toFixed(2))} = ₹${Number(finalPrice.toFixed(2))}`;
    explanation = 'Calculates final price after applying a percentage discount on books, courses, or gadgets.';
    copyText = `Original ₹${op} with ${dp}% off = Final ₹${Number(finalPrice.toFixed(2))} (Saved ₹${Number(saved.toFixed(2))})`;
  }

  const handleSaveToHistory = () => {
    addHistoryItem({
      toolId: 'percentage',
      toolName: 'Percentage Calculator',
      inputSummary: mode === 'marks' ? `${obtained}/${total}` : mode === 'valueOf' ? `${percentVal}% of ${baseVal}` : mode === 'change' ? `${oldVal} -> ${newVal}` : `₹${originalPrice} - ${discountPercent}%`,
      resultSummary: mainResult,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {[
          { id: 'marks', label: 'Marks to Percentage' },
          { id: 'valueOf', label: 'What is X% of Y?' },
          { id: 'change', label: 'Percentage Change' },
          { id: 'discount', label: 'Discount & Final Price' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as Mode)}
            className={`flex-1 min-w-[140px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === item.id
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Inputs Form */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        {mode === 'marks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Marks Obtained
              </label>
              <input
                type="number"
                value={obtained}
                onChange={e => setObtained(e.target.value)}
                placeholder="e.g. 425"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Total Maximum Marks
              </label>
              <input
                type="number"
                value={total}
                onChange={e => setTotal(e.target.value)}
                placeholder="e.g. 500"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
          </div>
        )}

        {mode === 'valueOf' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Percentage (%)
              </label>
              <input
                type="number"
                value={percentVal}
                onChange={e => setPercentVal(e.target.value)}
                placeholder="e.g. 18"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Of Total Value
              </label>
              <input
                type="number"
                value={baseVal}
                onChange={e => setBaseVal(e.target.value)}
                placeholder="e.g. 2500"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
          </div>
        )}

        {mode === 'change' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial / Old Value
              </label>
              <input
                type="number"
                value={oldVal}
                onChange={e => setOldVal(e.target.value)}
                placeholder="e.g. 80"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New / Final Value
              </label>
              <input
                type="number"
                value={newVal}
                onChange={e => setNewVal(e.target.value)}
                placeholder="e.g. 95"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
          </div>
        )}

        {mode === 'discount' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Original Price (₹)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={e => setOriginalPrice(e.target.value)}
                placeholder="e.g. 1999"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                value={discountPercent}
                onChange={e => setDiscountPercent(e.target.value)}
                placeholder="e.g. 25"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveToHistory}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-all shadow-md shadow-brand-500/20 flex items-center gap-1.5"
          >
            <span>Save Result to History</span>
          </button>
        </div>
      </div>

      {/* Result Display */}
      <ResultCard
        title="Percentage Output"
        mainValue={mainResult}
        mainLabel={mainLabel}
        accentColor="indigo"
        stats={stats}
        copyContent={copyText}
      />

      {/* Formula & Explanation */}
      <FormulaExplanation
        formula={formula}
        explanation={explanation}
        examples={[
          '425 marks out of 500 = (425 / 500) × 100 = 85.00%',
          '18% GST on ₹2,500 = (18 × 2500) / 100 = ₹450',
          'Score improved from 80 to 95 = ((95 - 80) / 80) × 100 = +18.75% increase'
        ]}
      />
    </div>
  );
};
