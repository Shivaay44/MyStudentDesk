import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { nPr, nCr, factorial } from '../../utils/mathHelpers';
import { Divide, Sparkles } from 'lucide-react';

export const PermutationCombination: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [n, setN] = useState<number | string>(7);
  const [r, setR] = useState<number | string>(3);
  const [allowRepetition, setAllowRepetition] = useState<boolean>(false);

  const numN = Math.max(0, Math.min(30, Number(n) || 0));
  const numR = Math.max(0, Math.min(numN, Number(r) || 0));

  let permVal = 0;
  let combVal = 0;

  if (allowRepetition) {
    permVal = Math.pow(numN, numR);
    combVal = nCr(numN + numR - 1, numR);
  } else {
    permVal = nPr(numN, numR);
    combVal = nCr(numN, numR);
  }

  const handleSave = () => {
    addHistoryItem({
      toolId: 'perm-comb',
      toolName: 'Permutation & Combination',
      inputSummary: `n=${numN}, r=${numR} (${allowRepetition ? 'With Repetition' : 'No Repetition'})`,
      resultSummary: `P = ${permVal.toLocaleString()}, C = ${combVal.toLocaleString()}`,
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Divide className="w-5 h-5 text-purple-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Combinatorics Input (n Items, r Selections)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Total Number of Items (n)
            </label>
            <input
              type="number"
              min="0"
              max="30"
              value={n}
              onChange={e => setN(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Items to Select / Arrange (r)
            </label>
            <input
              type="number"
              min="0"
              max={numN}
              value={r}
              onChange={e => setR(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="repCheck"
            checked={allowRepetition}
            onChange={e => setAllowRepetition(e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="repCheck" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            Allow item repetition in selections
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-500/20"
          >
            Save Result to History
          </button>
        </div>
      </div>

      {/* Result Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Permutations Card */}
        <ResultCard
          title={allowRepetition ? `Permutations nʳ (${numN}^${numR})` : `Permutations nPr (${numN}P${numR})`}
          mainValue={permVal.toLocaleString()}
          mainLabel="Total Ordered Arrangements (Order Matters)"
          accentColor="purple"
          stats={[
            { label: 'n Items', value: numN },
            { label: 'r Selected', value: numR },
            { label: 'n! Value', value: factorial(numN).toLocaleString() }
          ]}
          copyContent={`nPr(${numN}, ${numR}) = ${permVal}`}
        />

        {/* Combinations Card */}
        <ResultCard
          title={allowRepetition ? `Combinations with Repetition` : `Combinations nCr (${numN}C${numR})`}
          mainValue={combVal.toLocaleString()}
          mainLabel="Total Unordered Subsets (Order Does NOT Matter)"
          accentColor="indigo"
          stats={[
            { label: 'n Items', value: numN },
            { label: 'r Selected', value: numR },
            { label: 'Ratio (nPr / r!)', value: `${combVal}` }
          ]}
          copyContent={`nCr(${numN}, ${numR}) = ${combVal}`}
        />
      </div>

      <FormulaExplanation
        formula={allowRepetition ? `Permutations = nʳ | Combinations = (n + r - 1)! / (r! × (n - 1)!)` : `Permutation: ⁿPᵣ = n! / (n - r)! | Combination: ⁿCᵣ = n! / [r! × (n - r)!]`}
        explanation="Permutations are used when sequence/position matters (e.g. creating passwords, race rankings, seatings). Combinations are used when grouping without regard to order (e.g. picking a team, card hands)."
      />
    </div>
  );
};
