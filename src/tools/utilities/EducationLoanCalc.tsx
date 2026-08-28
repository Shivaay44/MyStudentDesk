import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResultCard } from '../../components/common/ResultCard';
import { Coins, RotateCcw, Sparkles } from 'lucide-react';

export const EducationLoanCalc: React.FC = () => {
  const { addHistoryItem } = useApp();
  const [loanAmount, setLoanAmount] = useState<number>(1500000); // 15 Lakhs
  const [interestRate, setInterestRate] = useState<number>(9.5); // 9.5%
  const [tenureYears, setTenureYears] = useState<number>(7); // 7 years
  const [moratoriumYears, setMoratoriumYears] = useState<number>(4); // 4 years study

  // Simple moratorium interest added to principal or paid
  const moratoriumInterest = loanAmount * (interestRate / 100) * moratoriumYears;
  const effectivePrincipal = loanAmount + moratoriumInterest;

  // Monthly EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const monthlyEmi = totalMonths > 0 && monthlyRate > 0
    ? (effectivePrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  const totalRepayment = monthlyEmi * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  const handleCalculate = () => {
    addHistoryItem({
      toolId: 'simple-interest-loan',
      toolName: 'Student Education Loan & EMI Calculator',
      inputSummary: `₹${(loanAmount / 100000).toFixed(1)} Lakhs @ ${interestRate}% (${tenureYears} yrs)`,
      resultSummary: `EMI: ₹${Math.round(monthlyEmi).toLocaleString()}/mo | Total: ₹${Math.round(totalRepayment).toLocaleString()}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>Loan Amount & Terms</span>
            </h2>
            <button
              onClick={() => {
                setLoanAmount(1500000);
                setInterestRate(9.5);
                setTenureYears(7);
                setMoratoriumYears(4);
              }}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Loan Amount (Principal)</span>
                <span className="text-brand-600 font-bold">₹{loanAmount.toLocaleString()} (₹{(loanAmount / 100000).toFixed(1)} Lakhs)</span>
              </div>
              <input
                type="number"
                step="50000"
                value={loanAmount || ''}
                onChange={e => setLoanAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Annual Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate || ''}
                  onChange={e => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Repayment Tenure (Years)</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={tenureYears || ''}
                  onChange={e => setTenureYears(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Course / Moratorium Period</span>
                <span className="text-slate-500">{moratoriumYears} Years (Study + 6 months)</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                value={moratoriumYears}
                onChange={e => setMoratoriumYears(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calculate Monthly Repayment EMI</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <ResultCard
          title="Loan Repayment Schedule"
          badge={`₹${Math.round(monthlyEmi).toLocaleString()} / month`}
          badgeColor="emerald"
        >
          <div className="space-y-6">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Monthly Repayment EMI
              </span>
              <div className="text-4xl sm:text-5xl font-black text-brand-600 dark:text-brand-400">
                ₹{Math.round(monthlyEmi).toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">
                For {tenureYears * 12} monthly installments after course completion
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-400">Total Interest Payable:</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  ₹{Math.round(totalInterest).toLocaleString()}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-slate-400">Total Repayment Amount:</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  ₹{Math.round(totalRepayment).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
