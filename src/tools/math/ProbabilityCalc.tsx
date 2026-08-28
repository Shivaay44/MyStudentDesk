import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { Dice5, Coins, Sparkles, Play } from 'lucide-react';

export const ProbabilityCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [fav, setFav] = useState<number | string>(3);
  const [total, setTotal] = useState<number | string>(10);

  // Two events
  const [probA, setProbA] = useState<number | string>(0.4);
  const [probB, setProbB] = useState<number | string>(0.5);

  // Simulator
  const [simResults, setSimResults] = useState<{ heads: number; tails: number; total: number } | null>(null);

  const numFav = Math.max(0, Number(fav) || 0);
  const numTot = Math.max(1, Number(total) || 1);
  const singleProb = Math.min(1, numFav / numTot);
  const percentage = (singleProb * 100).toFixed(2);
  const complement = (1 - singleProb).toFixed(4);
  const oddsInFavor = `${numFav} : ${Math.max(0, numTot - numFav)}`;

  const pA = Math.max(0, Math.min(1, Number(probA) || 0));
  const pB = Math.max(0, Math.min(1, Number(probB) || 0));
  const pBoth = (pA * pB).toFixed(4); // Independent
  const pEither = (pA + pB - (pA * pB)).toFixed(4);

  const runCoinSim = (count: number) => {
    let heads = 0;
    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.5) heads++;
    }
    setSimResults({ heads, tails: count - heads, total: count });
    triggerConfetti();
  };

  const handleSave = () => {
    addHistoryItem({
      toolId: 'probability-calc',
      toolName: 'Probability Calculator',
      inputSummary: `P(A) = ${numFav}/${numTot} (${percentage}%)`,
      resultSummary: `Prob: ${singleProb.toFixed(4)} | Odds: ${oddsInFavor}`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Single Event Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Dice5 className="w-5 h-5 text-purple-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Single Event Probability: P(E) = n(E) / n(S)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Favorable Outcomes n(E)
            </label>
            <input
              type="number"
              min="0"
              value={fav}
              onChange={e => setFav(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Total Sample Space n(S)
            </label>
            <input
              type="number"
              min="1"
              value={total}
              onChange={e => setTotal(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-500/20"
          >
            Save Probability
          </button>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Probability Metrics"
        mainValue={`${percentage}%`}
        mainLabel={`P(Event) = ${singleProb.toFixed(4)}`}
        accentColor="purple"
        stats={[
          { label: 'Decimal Probability', value: singleProb.toFixed(4) },
          { label: 'Odds in Favor', value: oddsInFavor },
          { label: 'Complement P(A\')', value: complement },
          { label: 'Fraction', value: `${numFav} / ${numTot}` }
        ]}
        copyContent={`P(E) = ${numFav}/${numTot} = ${percentage}% (Decimal: ${singleProb.toFixed(4)}, Odds: ${oddsInFavor})`}
      />

      {/* Live Coin Simulator */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Monte Carlo Coin Toss Simulator
            </h4>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => runCoinSim(10)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Simulate 10 Flips
          </button>
          <button
            onClick={() => runCoinSim(100)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Simulate 100 Flips
          </button>
          <button
            onClick={() => runCoinSim(1000)}
            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-xs font-bold text-white shadow-md shadow-brand-500/20"
          >
            Simulate 1,000 Flips
          </button>
        </div>

        {simResults && (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 text-center">
              <span className="text-xs text-slate-500 font-bold block">Heads (H)</span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">{simResults.heads}</span>
              <span className="text-xs text-slate-400">{((simResults.heads / simResults.total) * 100).toFixed(1)}% Frequency</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-center">
              <span className="text-xs text-slate-500 font-bold block">Tails (T)</span>
              <span className="text-2xl font-black text-slate-700 dark:text-slate-300 mt-1 block">{simResults.tails}</span>
              <span className="text-xs text-slate-400">{((simResults.tails / simResults.total) * 100).toFixed(1)}% Frequency</span>
            </div>
          </div>
        )}
      </div>

      <FormulaExplanation
        formula="P(A ∪ B) = P(A) + P(B) - P(A ∩ B) | Complement: P(A') = 1 - P(A)"
        explanation="According to the Law of Large Numbers, as the number of trials increases, the empirical experimental frequency converges toward the theoretical mathematical probability (0.50)."
      />
    </div>
  );
};
