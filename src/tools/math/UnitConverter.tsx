import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { UNIT_CATEGORIES, UnitCategory } from '../../utils/mathHelpers';
import { Scale, ArrowRightLeft } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const { addHistoryItem } = useApp();

  const [categoryId, setCategoryId] = useState<string>('length');
  const activeCategory = UNIT_CATEGORIES.find(c => c.id === categoryId) || UNIT_CATEGORIES[0];

  const [fromUnitId, setFromUnitId] = useState<string>(activeCategory.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(activeCategory.units[1].id);
  const [inputValue, setInputValue] = useState<number | string>(100);

  const handleCategoryChange = (newCatId: string) => {
    setCategoryId(newCatId);
    const cat = UNIT_CATEGORIES.find(c => c.id === newCatId) || UNIT_CATEGORIES[0];
    setFromUnitId(cat.units[0].id);
    setToUnitId(cat.units[1] ? cat.units[1].id : cat.units[0].id);
  };

  const swapUnits = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const fromUnit = activeCategory.units.find(u => u.id === fromUnitId) || activeCategory.units[0];
  const toUnit = activeCategory.units.find(u => u.id === toUnitId) || activeCategory.units[1] || activeCategory.units[0];

  const val = Number(inputValue) || 0;
  const baseValue = fromUnit.toBase(val);
  const convertedValue = toUnit.fromBase(baseValue);
  const formattedResult = Number.isInteger(convertedValue)
    ? convertedValue.toString()
    : Number(convertedValue.toFixed(6)).toString();

  // All other conversions in same category
  const allConversions = activeCategory.units.map(u => ({
    name: u.name,
    value: Number(u.fromBase(baseValue).toFixed(4)).toString(),
  }));

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {UNIT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              categoryId === cat.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Conversion Input Form */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
          {/* From Unit */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              From ({fromUnit.name})
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <select
              value={fromUnitId}
              onChange={e => setFromUnitId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              {activeCategory.units.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              onClick={swapUnits}
              className="p-3 rounded-full bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-colors shadow-sm"
              title="Swap units"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Unit */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              To ({toUnit.name})
            </label>
            <div className="w-full px-4 py-2.5 rounded-xl border border-brand-500/30 bg-brand-50/40 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 font-extrabold text-base truncate">
              {formattedResult}
            </div>
            <select
              value={toUnitId}
              onChange={e => setToUnitId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              {activeCategory.units.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Unit Conversion Result"
        mainValue={`${formattedResult} ${toUnit.id}`}
        mainLabel={`${val} ${fromUnit.name} =`}
        accentColor="indigo"
        copyContent={`${val} ${fromUnit.name} = ${formattedResult} ${toUnit.name}`}
      />

      {/* All Equivalent Values in Same Category */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          All Equivalent {activeCategory.name} Units
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {allConversions.map((conv, idx) => (
            <div key={idx} className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <span className="text-[11px] text-slate-400 font-medium block truncate">{conv.name}</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white truncate block mt-0.5">{conv.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
