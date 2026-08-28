import React, { useState } from 'react';
import { ResultCard } from '../../components/common/ResultCard';
import { useApp } from '../../context/AppContext';
import { Calculator, Delete, RotateCcw, Copy, History } from 'lucide-react';
import { factorial } from '../../utils/mathHelpers';

export const ScientificCalc: React.FC = () => {
  const { addHistoryItem } = useApp();

  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(true);
  const [tape, setTape] = useState<{ expr: string; res: string }[]>([]);

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    if (display.length <= 1 || display === 'Error') {
      setDisplay('0');
    } else {
      setDisplay(prev => prev.slice(0, -1));
    }
  };

  const appendChar = (char: string) => {
    if (display === '0' && !['+', '-', '*', '/', '%', '.'].includes(char)) {
      setDisplay(char);
    } else if (display === 'Error') {
      setDisplay(char);
    } else {
      setDisplay(prev => prev + char);
    }
  };

  const evaluateMath = () => {
    try {
      let expr = display;
      // replace symbols
      expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, `${Math.PI}`).replace(/e/g, `${Math.E}`);

      // Handle trigonometric and special functions safely
      // Replace sin(x), cos(x), tan(x) with radian/deg mode
      const degToRad = (val: number) => isRad ? val : (val * Math.PI) / 180;

      // Handle factorial n!
      expr = expr.replace(/(\d+)!/g, (_, n) => `${factorial(Number(n))}`);

      // Handle sqrt(x)
      expr = expr.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
      expr = expr.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');
      expr = expr.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
      expr = expr.replace(/sin\(([^)]+)\)/g, isRad ? 'Math.sin($1)' : 'Math.sin(($1)*Math.PI/180)');
      expr = expr.replace(/cos\(([^)]+)\)/g, isRad ? 'Math.cos($1)' : 'Math.cos(($1)*Math.PI/180)');
      expr = expr.replace(/tan\(([^)]+)\)/g, isRad ? 'Math.tan($1)' : 'Math.tan(($1)*Math.PI/180)');
      expr = expr.replace(/\^/g, '**');

      // Safe evaluation using Function
      const result = Function(`'use strict'; return (${expr})`)();
      const formatted = Number.isFinite(result) ? Number(Number(result).toFixed(8)).toString() : 'Error';

      setEquation(`${display} =`);
      setTape(prev => [{ expr: display, res: formatted }, ...prev.slice(0, 10)]);
      setDisplay(formatted);

      addHistoryItem({
        toolId: 'scientific-calc',
        toolName: 'Scientific Calculator',
        inputSummary: display,
        resultSummary: formatted,
      });
    } catch (err) {
      setDisplay('Error');
    }
  };

  const calcButtons = [
    // Row 1
    { label: isRad ? 'RAD' : 'DEG', action: () => setIsRad(!isRad), type: 'fn', highlight: true },
    { label: 'sin', action: () => appendChar('sin('), type: 'fn' },
    { label: 'cos', action: () => appendChar('cos('), type: 'fn' },
    { label: 'tan', action: () => appendChar('tan('), type: 'fn' },
    { label: 'π', action: () => appendChar('π'), type: 'fn' },

    // Row 2
    { label: 'ln', action: () => appendChar('ln('), type: 'fn' },
    { label: 'log', action: () => appendChar('log('), type: 'fn' },
    { label: '√', action: () => appendChar('sqrt('), type: 'fn' },
    { label: 'x^y', action: () => appendChar('^'), type: 'fn' },
    { label: 'x!', action: () => appendChar('!'), type: 'fn' },

    // Row 3
    { label: '(', action: () => appendChar('('), type: 'op' },
    { label: ')', action: () => appendChar(')'), type: 'op' },
    { label: '%', action: () => appendChar('/100'), type: 'op' },
    { label: 'C', action: handleClear, type: 'clear' },
    { label: '⌫', action: handleBackspace, type: 'clear' },

    // Row 4
    { label: '7', action: () => appendChar('7'), type: 'num' },
    { label: '8', action: () => appendChar('8'), type: 'num' },
    { label: '9', action: () => appendChar('9'), type: 'num' },
    { label: '÷', action: () => appendChar('÷'), type: 'op' },
    { label: 'e', action: () => appendChar('e'), type: 'fn' },

    // Row 5
    { label: '4', action: () => appendChar('4'), type: 'num' },
    { label: '5', action: () => appendChar('5'), type: 'num' },
    { label: '6', action: () => appendChar('6'), type: 'num' },
    { label: '×', action: () => appendChar('×'), type: 'op' },
    { label: '1/x', action: () => appendChar('1/('), type: 'fn' },

    // Row 6
    { label: '1', action: () => appendChar('1'), type: 'num' },
    { label: '2', action: () => appendChar('2'), type: 'num' },
    { label: '3', action: () => appendChar('3'), type: 'num' },
    { label: '-', action: () => appendChar('-'), type: 'op' },
    { label: 'x²', action: () => appendChar('^2'), type: 'fn' },

    // Row 7
    { label: '0', action: () => appendChar('0'), type: 'num' },
    { label: '.', action: () => appendChar('.'), type: 'num' },
    { label: '+', action: () => appendChar('+'), type: 'op' },
    { label: '=', action: evaluateMath, type: 'eq', span: 2 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Calculator Body */}
      <div className="lg:col-span-8 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl space-y-4">
        {/* Display Screen */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-right space-y-1 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-sans font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {isRad ? 'RAD' : 'DEG'}
            </span>
            <span className="truncate">{equation}</span>
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight overflow-x-auto whitespace-nowrap py-1">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
          {calcButtons.map((btn, idx) => {
            let bgClass = 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200';
            if (btn.type === 'fn') bgClass = 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-semibold';
            if (btn.type === 'op') bgClass = 'bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:hover:bg-brand-900/40 text-brand-600 dark:text-brand-300 font-bold';
            if (btn.type === 'clear') bgClass = 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 font-bold';
            if (btn.type === 'eq') bgClass = 'bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-md shadow-brand-500/25';

            return (
              <button
                key={idx}
                type="button"
                onClick={btn.action}
                className={`py-3 sm:py-3.5 rounded-xl font-mono text-xs sm:text-sm active:scale-95 transition-all ${bgClass} ${
                  btn.span === 2 ? 'col-span-2' : 'col-span-1'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side Tape History */}
      <div className="lg:col-span-4 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <History className="w-4 h-4 text-brand-500" />
              <span>Calculation Tape</span>
            </div>
            {tape.length > 0 && (
              <button onClick={() => setTape([])} className="text-[11px] text-rose-500 hover:underline">
                Clear
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto space-y-2 py-3 font-mono text-xs">
            {tape.length === 0 ? (
              <p className="text-center text-slate-400 py-8">No calculations on tape yet</p>
            ) : (
              tape.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setDisplay(item.res)}
                  className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-brand-500/40 cursor-pointer transition-all"
                >
                  <div className="text-slate-400 truncate">{item.expr} =</div>
                  <div className="text-brand-500 font-bold text-sm mt-0.5">{item.res}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          💡 Click any tape result to load it back into the calculator display.
        </div>
      </div>
    </div>
  );
};
