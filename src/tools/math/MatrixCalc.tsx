import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { FormulaExplanation } from '../../components/common/FormulaExplanation';
import { useApp } from '../../context/AppContext';
import {
  Matrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  determinantMatrix,
  inverseMatrix,
} from '../../utils/mathHelpers';
import { Grid, Sparkles } from 'lucide-react';

type Operation = 'add' | 'subtract' | 'multiply' | 'detA' | 'detB' | 'transposeA' | 'inverseA';

export const MatrixCalc: React.FC = () => {
  const { addHistoryItem, triggerConfetti } = useApp();

  const [dim, setDim] = useState<2 | 3>(2);
  const [op, setOp] = useState<Operation>('multiply');

  // 2x2 matrices
  const [matrixA2, setMatrixA2] = useState<Matrix>([
    [1, 2],
    [3, 4]
  ]);
  const [matrixB2, setMatrixB2] = useState<Matrix>([
    [5, 6],
    [7, 8]
  ]);

  // 3x3 matrices
  const [matrixA3, setMatrixA3] = useState<Matrix>([
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0]
  ]);
  const [matrixB3, setMatrixB3] = useState<Matrix>([
    [2, 0, -1],
    [1, 3, 2],
    [0, -2, 1]
  ]);

  const matA = dim === 2 ? matrixA2 : matrixA3;
  const matB = dim === 2 ? matrixB2 : matrixB3;

  const updateCell = (matName: 'A' | 'B', r: number, c: number, val: number) => {
    if (dim === 2) {
      if (matName === 'A') {
        setMatrixA2(prev => prev.map((row, rIdx) => rIdx === r ? row.map((v, cIdx) => cIdx === c ? val : v) : row));
      } else {
        setMatrixB2(prev => prev.map((row, rIdx) => rIdx === r ? row.map((v, cIdx) => cIdx === c ? val : v) : row));
      }
    } else {
      if (matName === 'A') {
        setMatrixA3(prev => prev.map((row, rIdx) => rIdx === r ? row.map((v, cIdx) => cIdx === c ? val : v) : row));
      } else {
        setMatrixB3(prev => prev.map((row, rIdx) => rIdx === r ? row.map((v, cIdx) => cIdx === c ? val : v) : row));
      }
    }
  };

  let matrixResult: Matrix | null = null;
  let scalarResult: number | null = null;
  let opTitle = '';

  if (op === 'add') {
    matrixResult = addMatrices(matA, matB);
    opTitle = 'Matrix Addition (A + B)';
  } else if (op === 'subtract') {
    matrixResult = subtractMatrices(matA, matB);
    opTitle = 'Matrix Subtraction (A - B)';
  } else if (op === 'multiply') {
    matrixResult = multiplyMatrices(matA, matB);
    opTitle = 'Matrix Multiplication (A × B)';
  } else if (op === 'detA') {
    scalarResult = determinantMatrix(matA);
    opTitle = 'Determinant of Matrix A (|A|)';
  } else if (op === 'detB') {
    scalarResult = determinantMatrix(matB);
    opTitle = 'Determinant of Matrix B (|B|)';
  } else if (op === 'transposeA') {
    matrixResult = transposeMatrix(matA);
    opTitle = 'Transpose of Matrix A (Aᵀ)';
  } else if (op === 'inverseA') {
    matrixResult = inverseMatrix(matA);
    opTitle = 'Inverse of Matrix A (A⁻¹)';
  }

  const renderMatrix = (m: Matrix) => {
    return (
      <div className="inline-grid gap-1.5 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 font-mono">
        {m.map((row, r) => (
          <div key={r} className="flex gap-1.5 justify-center">
            {row.map((val, c) => (
              <span key={c} className="w-12 h-10 flex items-center justify-center font-bold text-xs sm:text-sm bg-white dark:bg-slate-800 rounded-lg shadow-sm text-slate-900 dark:text-white border border-slate-200/60 dark:border-slate-700">
                {val}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handleSave = () => {
    addHistoryItem({
      toolId: 'matrix-calc',
      toolName: 'Matrix Calculator',
      inputSummary: `${dim}x${dim} Matrix ${opTitle}`,
      resultSummary: scalarResult !== null ? `Value = ${scalarResult}` : 'Matrix computed',
    });
    triggerConfetti();
  };

  return (
    <div className="space-y-6">
      {/* Dimension & Operations Header */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex gap-1.5 mr-auto">
          <button
            onClick={() => setDim(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              dim === 2
                ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            2 × 2 Matrix
          </button>
          <button
            onClick={() => setDim(3)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              dim === 3
                ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            3 × 3 Matrix
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'multiply', label: 'A × B' },
            { id: 'add', label: 'A + B' },
            { id: 'subtract', label: 'A - B' },
            { id: 'detA', label: '|A|' },
            { id: 'transposeA', label: 'Aᵀ' },
            { id: 'inverseA', label: 'A⁻¹' },
          ].map(o => (
            <button
              key={o.id}
              onClick={() => setOp(o.id as Operation)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                op === o.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matrix A */}
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">
              Matrix A ({dim} × {dim})
            </span>
            <span className="text-[11px] text-slate-400 font-mono">|A| = {determinantMatrix(matA)}</span>
          </div>

          <div className="flex justify-center p-2">
            <div className="grid gap-2">
              {matA.map((row, r) => (
                <div key={r} className="flex gap-2">
                  {row.map((val, c) => (
                    <input
                      key={c}
                      type="number"
                      value={val}
                      onChange={e => updateCell('A', r, c, Number(e.target.value) || 0)}
                      className="w-14 h-12 text-center text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Matrix B */}
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Matrix B ({dim} × {dim})
            </span>
            <span className="text-[11px] text-slate-400 font-mono">|B| = {determinantMatrix(matB)}</span>
          </div>

          <div className="flex justify-center p-2">
            <div className="grid gap-2">
              {matB.map((row, r) => (
                <div key={r} className="flex gap-2">
                  {row.map((val, c) => (
                    <input
                      key={c}
                      type="number"
                      value={val}
                      onChange={e => updateCell('B', r, c, Number(e.target.value) || 0)}
                      className="w-14 h-12 text-center text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title={opTitle}
        mainValue={scalarResult !== null ? scalarResult.toString() : 'Matrix Result Below'}
        mainLabel={opTitle}
        accentColor="purple"
        stats={[
          { label: 'Dimension', value: `${dim} × ${dim}` },
          { label: 'Det(A)', value: determinantMatrix(matA) },
          { label: 'Det(B)', value: determinantMatrix(matB) },
          { label: 'Singular Matrix?', value: determinantMatrix(matA) === 0 ? 'Yes (No Inverse)' : 'No (Invertible)' }
        ]}
      >
        {matrixResult ? (
          <div className="mt-4 flex justify-center">{renderMatrix(matrixResult)}</div>
        ) : op === 'inverseA' ? (
          <p className="text-rose-500 font-bold text-xs text-center">Matrix A has determinant 0 and is singular (no inverse exists).</p>
        ) : null}
      </ResultCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-500/20"
        >
          Save Matrix Operation
        </button>
      </div>

      <FormulaExplanation
        formula="Multiplication: C_ij = Σ(A_ik × B_kj) | Det(2x2): ad - bc | Inverse: A⁻¹ = (1/|A|) × Adj(A)"
        explanation="Matrix algebra operations are fundamental in linear transformations, 3D graphics, quantum mechanics, and electrical network analysis."
      />
    </div>
  );
};
