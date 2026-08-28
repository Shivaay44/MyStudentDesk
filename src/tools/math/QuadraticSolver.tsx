import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import { solveQuadratic } from '../../utils/mathHelpers';
import { Activity, Sparkles } from 'lucide-react';

export const QuadraticSolver: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [a, setA] = useState<number | string>(1);
  const [b, setB] = useState<number | string>(-5);
  const [c, setC] = useState<number | string>(6);

  let result: any = null;
  let errorMsg = '';

  try {
    const numA = Number(a);
    const numB = Number(b);
    const numC = Number(c);
    if (numA === 0) {
      errorMsg = "Coefficient 'a' cannot be 0 in a quadratic equation.";
    } else {
      result = solveQuadratic(numA, numB, numC);
    }
  } catch (err: any) {
    errorMsg = err.message || 'Invalid input coefficients';
  }

  const handleSave = () => {
    if (result) {
      addHistoryItem({
        toolId: 'quadratic-solver',
        toolName: 'Quadratic Equation Solver',
        inputSummary: `${a}x² ${Number(b) >= 0 ? '+' : ''}${b}x ${Number(c) >= 0 ? '+' : ''}${c} = 0`,
        resultSummary: `Roots: x₁=${result.root1.text}, x₂=${result.root2.text} (D=${result.discriminant})`,
      });
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Input Card */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Enter Coefficients (ax² + bx + c = 0)
            </h3>
          </div>
        </div>

        {/* Input Coefficients */}
        <div className="flex items-center gap-3 font-mono text-base flex-wrap">
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={a}
              onChange={e => setA(e.target.value)}
              className="w-20 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <span className="font-bold text-slate-700 dark:text-slate-300">x² +</span>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="number"
              value={b}
              onChange={e => setB(e.target.value)}
              className="w-20 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <span className="font-bold text-slate-700 dark:text-slate-300">x +</span>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="number"
              value={c}
              onChange={e => setC(e.target.value)}
              className="w-20 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <span className="font-bold text-slate-700 dark:text-slate-300">= 0</span>
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={!result}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-purple-500/20"
          >
            Save Quadratic Roots
          </button>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <ResultCard
          title="Quadratic Roots & Properties"
          mainValue={`x₁ = ${result.root1.text},  x₂ = ${result.root2.text}`}
          mainLabel={`Nature of Roots: ${result.rootType === 'two_real' ? 'Two Distinct Real Roots' : result.rootType === 'one_real' ? 'One Repeated Real Root' : 'Complex Conjugate Roots'}`}
          accentColor="purple"
          stats={[
            { label: 'Discriminant (D)', value: result.discriminant, badge: result.discriminant > 0 ? 'D > 0' : result.discriminant === 0 ? 'D = 0' : 'D < 0', badgeColor: result.discriminant >= 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-purple-500/10 text-purple-600' },
            { label: 'Parabola Vertex (h, k)', value: `(${result.vertex.x}, ${result.vertex.y})` },
            { label: 'Axis of Symmetry', value: `x = ${result.axisOfSymmetry}` },
            { label: 'Y-Intercept', value: `(0, ${result.yIntercept})` }
          ]}
          notes={result.factoredForm ? `Factored Representation: ${result.factoredForm}` : undefined}
          copyContent={`Equation: ${a}x² + ${b}x + ${c} = 0 | Roots: x₁ = ${result.root1.text}, x₂ = ${result.root2.text} (Discriminant D = ${result.discriminant})`}
        >
          {/* Step-by-Step Factoring Box */}
          <div className="mt-4 p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 space-y-1.5 font-mono text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-xs uppercase tracking-wider font-sans text-purple-600 dark:text-purple-400 block mb-2">
              Step-by-Step Derivation:
            </span>
            {result.steps.map((step: string, sIdx: number) => (
              <div key={sIdx}>• {step}</div>
            ))}
          </div>
        </ResultCard>
      )}

      <FormulaExplanation
        formula="Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a) | Vertex: (-b/2a, c - b²/4a)"
        explanation="The discriminant D = b² - 4ac dictates whether the quadratic curve intersects the x-axis twice (D > 0), touches at a single tangent vertex (D = 0), or floats entirely above/below the axis with imaginary roots (D < 0)."
      />
    </div>
  );
};
