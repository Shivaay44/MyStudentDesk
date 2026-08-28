import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { HeartPulse, Droplets, Utensils, Sparkles } from 'lucide-react';

export const BmiCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric
  const [heightCm, setHeightCm] = useState<number | string>(172);
  const [weightKg, setWeightKg] = useState<number | string>(64);

  // Imperial
  const [heightFt, setHeightFt] = useState<number | string>(5);
  const [heightIn, setHeightIn] = useState<number | string>(8);
  const [weightLbs, setWeightLbs] = useState<number | string>(140);

  let heightInMeters = 1.72;
  let weightInKg = 64;

  if (unitSystem === 'metric') {
    heightInMeters = (Number(heightCm) || 1) / 100;
    weightInKg = Number(weightKg) || 1;
  } else {
    const totalInches = ((Number(heightFt) || 0) * 12) + (Number(heightIn) || 0);
    heightInMeters = totalInches * 0.0254;
    weightInKg = (Number(weightLbs) || 1) * 0.453592;
  }

  const bmi = heightInMeters > 0 ? Number((weightInKg / (heightInMeters * heightInMeters)).toFixed(1)) : 0;

  // Ideal weight range for 18.5 to 24.9 BMI
  const minIdealKg = Number((18.5 * heightInMeters * heightInMeters).toFixed(1));
  const maxIdealKg = Number((24.9 * heightInMeters * heightInMeters).toFixed(1));

  // Daily water intake estimate (35ml per kg)
  const dailyWaterLitres = Number(((weightInKg * 35) / 1000).toFixed(1));

  let category = 'Normal Weight';
  let badgeColor = 'bg-emerald-500/10 text-emerald-600';
  let accentColor: 'emerald' | 'amber' | 'rose' | 'indigo' = 'emerald';

  if (bmi < 18.5) {
    category = 'Underweight';
    badgeColor = 'bg-amber-500/10 text-amber-600';
    accentColor = 'amber';
  } else if (bmi <= 24.9) {
    category = 'Healthy / Normal';
    badgeColor = 'bg-emerald-500/10 text-emerald-600';
    accentColor = 'emerald';
  } else if (bmi <= 29.9) {
    category = 'Overweight';
    badgeColor = 'bg-amber-500/10 text-amber-600';
    accentColor = 'amber';
  } else {
    category = 'Obese';
    badgeColor = 'bg-rose-500/10 text-rose-600';
    accentColor = 'rose';
  }

  const handleSave = () => {
    addHistoryItem({
      toolId: 'bmi-calc',
      toolName: 'BMI & Health Calculator',
      inputSummary: `${weightInKg.toFixed(1)}kg @ ${(heightInMeters * 100).toFixed(0)}cm`,
      resultSummary: `BMI: ${bmi} (${category})`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Unit Switcher */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm">
        <button
          onClick={() => setUnitSystem('metric')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            unitSystem === 'metric'
              ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Metric (cm / kg)
        </button>
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            unitSystem === 'imperial'
              ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Imperial (ft / lbs)
        </button>
      </div>

      {/* Input Form Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-cyan-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Student Health & BMI Index
            </h3>
          </div>
        </div>

        {unitSystem === 'metric' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Height in Centimeters (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={e => setHeightCm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Weight in Kilograms (kg)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Height (Feet)
              </label>
              <input
                type="number"
                value={heightFt}
                onChange={e => setHeightFt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Height (Inches)
              </label>
              <input
                type="number"
                value={heightIn}
                onChange={e => setHeightIn(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                value={weightLbs}
                onChange={e => setWeightLbs(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-md shadow-cyan-500/20"
          >
            Save Health Result
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Body Mass Index Result"
        mainValue={`${bmi} BMI`}
        mainLabel={`Classification: ${category}`}
        accentColor={accentColor}
        stats={[
          { label: 'BMI Category', value: category, badge: 'WHO Standard', badgeColor },
          { label: 'Ideal Weight Range', value: `${minIdealKg} - ${maxIdealKg} kg` },
          { label: 'Daily Hydration Goal', value: `${dailyWaterLitres} Litres/day`, badge: 'Hydration' },
          { label: 'Active Height', value: `${(heightInMeters * 100).toFixed(0)} cm` }
        ]}
        notes="Maintaining a balanced BMI of 18.5 - 24.9 improves study stamina, mental focus during exam preparation, and sleep quality."
        copyContent={`BMI: ${bmi} (${category}) | Ideal Weight Range: ${minIdealKg}-${maxIdealKg} kg`}
      />

      <FormulaExplanation
        formula="BMI = Weight (kg) / [Height (m)]² | Daily Water = Weight (kg) × 0.035 Litres"
        explanation="Body Mass Index is an established biometric screening tool used worldwide to assess healthy body composition according to stature."
      />
    </div>
  );
};
