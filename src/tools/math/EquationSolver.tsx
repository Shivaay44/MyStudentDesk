import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { solveLinear2x2, solveLinear3x3 } from '../../utils/mathHelpers';
import { Layers, Sparkles } from 'lucide-react';

export const EquationSolver: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [systemType, setSystemType] = useState<'2x2' | '3x3'>('2x2');

  // 2x2 Coefficients: a1*x + b1*y = c1, a2*x + b2*y = c2
  const [a1, setA1] = useState<number | string>(2);
  const [b1, setB1] = useState<number | string>(3);
  const [c1, setC1] = useState<number | string>(13);

  const [a2, setA2] = useState<number | string>(5);
  const [b2, setB2] = useState<number | string>(-1);
  const [c2, setC2] = useState<number | string>(7);

  // 3x3 Coefficients
  const [m3, setM3] = useState<number[][]>([
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
  ]);
  const [const3, setConst3] = useState<number[]>([8, -11, -3]);

  let solution2x2: any = null;
  let solution3x3: any = null;

  if (systemType === '2x2') {
    solution2x2 = solveLinear2x2(
      Number(a1) || 0, Number(b1) || 0, Number(c1) || 0,
      Number(a2) || 0, Number(b2) || 0, Number(c2) || 0
    );
  } else {
    solution3x3 = solveLinear3x3(m3, const3);
  }

  const handleSave = () => {
    if (systemType === '2x2' && solution2x2.status === 'unique') {
      addHistoryItem({
        toolId: 'equation-solver',
        toolName: 'Linear Equation Solver',
        inputSummary: `2x2: ${a1}x+${b1}y=${c1} & ${a2}x+${b2}y=${c2}`,
        resultSummary: `x = ${solution2x2.x}, y = ${solution2x2.y}`,
      });
      triggerConfetti();
    } else if (systemType === '3x3' && solution3x3.status === 'unique') {
      addHistoryItem({
        toolId: 'equation-solver',
        toolName: 'Linear Equation Solver',
        inputSummary: `3x3 System`,
        resultSummary: `x = ${solution3x3.x}, y = ${solution3x3.y}, z = ${solution3x3.z}`,
      });
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6">
      {/* System Dimension Toggle */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setSystemType('2x2')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            systemType === '2x2'
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          2-Variable System (x, y)
        </button>
        <button
          onClick={() => setSystemType('3x3')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            systemType === '3x3'
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          3-Variable System (x, y, z)
        </button>
      </div>

      {/* Equations Form Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            {systemType === '2x2' ? 'Enter Linear System (a₁x + b₁y = c₁)' : 'Enter 3-Variable Linear System'}
          </h3>
        </div>

        {systemType === '2x2' ? (
          <div className="space-y-3">
            {/* Equation 1 */}
            <div className="flex items-center gap-2 font-mono text-sm flex-wrap">
              <span className="text-xs font-bold text-slate-400">Eq 1:</span>
              <input
                type="number"
                value={a1}
                onChange={e => setA1(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-bold text-slate-900 dark:text-white"
              />
              <span className="text-slate-500 font-bold">x +</span>
              <input
                type="number"
                value={b1}
                onChange={e => setB1(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-bold text-slate-900 dark:text-white"
              />
              <span className="text-slate-500 font-bold">y =</span>
              <input
                type="number"
                value={c1}
                onChange={e => setC1(e.target.value)}
                className="w-20 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-brand-50/50 dark:bg-brand-950/40 text-center font-bold text-brand-600 dark:text-brand-400"
              />
            </div>

            {/* Equation 2 */}
            <div className="flex items-center gap-2 font-mono text-sm flex-wrap">
              <span className="text-xs font-bold text-slate-400">Eq 2:</span>
              <input
                type="number"
                value={a2}
                onChange={e => setA2(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-bold text-slate-900 dark:text-white"
              />
              <span className="text-slate-500 font-bold">x +</span>
              <input
                type="number"
                value={b2}
                onChange={e => setB2(e.target.value)}
                className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-bold text-slate-900 dark:text-white"
              />
              <span className="text-slate-500 font-bold">y =</span>
              <input
                type="number"
                value={c2}
                onChange={e => setC2(e.target.value)}
                className="w-20 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-brand-50/50 dark:bg-brand-950/40 text-center font-bold text-brand-600 dark:text-brand-400"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2.5 font-mono text-xs sm:text-sm">
            {[0, 1, 2].map(r => (
              <div key={r} className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400">Eq {r + 1}:</span>
                <input
                  type="number"
                  value={m3[r][0]}
                  onChange={e => {
                    const val = Number(e.target.value) || 0;
                    setM3(prev => prev.map((row, rIdx) => rIdx === r ? [val, row[1], row[2]] : row));
                  }}
                  className="w-14 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-bold"
                />
                <span>x +</span>
                <input
                  type="number"
                  value={m3[r][1]}
                  onChange={e => {
                    const val = Number(e.target.value) || 0;
                    setM3(prev => prev.map((row, rIdx) => rIdx === r ? [row[0], val, row[2]] : row));
                  }}
                  className="w-14 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-bold"
                />
                <span>y +</span>
                <input
                  type="number"
                  value={m3[r][2]}
                  onChange={e => {
                    const val = Number(e.target.value) || 0;
                    setM3(prev => prev.map((row, rIdx) => rIdx === r ? [row[0], row[1], val] : row));
                  }}
                  className="w-14 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center font-bold"
                />
                <span>z =</span>
                <input
                  type="number"
                  value={const3[r]}
                  onChange={e => {
                    const val = Number(e.target.value) || 0;
                    setConst3(prev => prev.map((cVal, cIdx) => cIdx === r ? val : cVal));
                  }}
                  className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-brand-50/50 dark:bg-brand-950/40 text-center font-bold text-brand-600 dark:text-brand-400"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-500/20"
          >
            Save Solution
          </button>
        </div>
      </div>

      {/* Result Card */}
      {systemType === '2x2' ? (
        solution2x2.status === 'unique' ? (
          <ResultCard
            title="System Solution (2x2)"
            mainValue={`(x, y) = (${solution2x2.x}, ${solution2x2.y})`}
            mainLabel="Unique Solution Found"
            accentColor="purple"
            stats={[
              { label: 'x Value', value: solution2x2.x },
              { label: 'y Value', value: solution2x2.y },
              { label: 'Determinant D', value: solution2x2.det },
              { label: 'Dx / Dy', value: `${solution2x2.detX} / ${solution2x2.detY}` }
            ]}
            copyContent={`x = ${solution2x2.x}, y = ${solution2x2.y}`}
          >
            {/* Step by Step Breakdown */}
            <div className="mt-4 p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 space-y-1.5 font-mono text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-xs uppercase tracking-wider font-sans text-purple-600 dark:text-purple-400 block mb-2">
                Step-by-Step Cramer's Method:
              </span>
              {solution2x2.steps.map((step: string, sIdx: number) => (
                <div key={sIdx}>• {step}</div>
              ))}
            </div>
          </ResultCard>
        ) : (
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 font-semibold text-sm">
            {solution2x2.message}
          </div>
        )
      ) : (
        solution3x3.status === 'unique' ? (
          <ResultCard
            title="System Solution (3x3)"
            mainValue={`x=${solution3x3.x}, y=${solution3x3.y}, z=${solution3x3.z}`}
            mainLabel="Unique 3-Variable Solution"
            accentColor="purple"
            stats={[
              { label: 'x Solution', value: solution3x3.x },
              { label: 'y Solution', value: solution3x3.y },
              { label: 'z Solution', value: solution3x3.z },
              { label: 'Determinant D', value: solution3x3.D }
            ]}
            copyContent={`x = ${solution3x3.x}, y = ${solution3x3.y}, z = ${solution3x3.z}`}
          >
            <div className="mt-4 p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 space-y-1.5 font-mono text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-xs uppercase tracking-wider font-sans text-purple-600 dark:text-purple-400 block mb-2">
                Step-by-Step Determinant Expansion:
              </span>
              {solution3x3.steps.map((step: string, sIdx: number) => (
                <div key={sIdx}>• {step}</div>
              ))}
            </div>
          </ResultCard>
        ) : (
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 font-semibold text-sm">
            {solution3x3.message}
          </div>
        )
      )}

      <FormulaExplanation
        formula="Cramer's Rule: x = Dx / D, y = Dy / D, z = Dz / D (where D ≠ 0)"
        explanation="Cramer's rule expresses the solution of a system of linear equations in terms of determinants of coefficient matrices, replacing specific column vectors with constants."
      />
    </div>
  );
};
