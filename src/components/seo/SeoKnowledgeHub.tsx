import React, { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  CalendarCheck,
  Binary,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Info,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SeoKnowledgeHub: React.FC = () => {
  const { setActiveToolId } = useApp();
  const [activeTab, setActiveTab] = useState<'jee-neet' | 'cbse' | 'attendance' | 'cgpa' | 'stem' | 'faqs'>('jee-neet');
  const [isExpandedAll, setIsExpandedAll] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const tabs = [
    { id: 'jee-neet', label: 'JEE & NEET', icon: TrendingUp, count: 'Predictors' },
    { id: 'cbse', label: 'CBSE Best 5', icon: GraduationCap, count: 'Boards' },
    { id: 'attendance', label: '75% Attendance', icon: CalendarCheck, count: 'Bunk Math' },
    { id: 'cgpa', label: 'University CGPA', icon: Calculator, count: '8 Formulas' },
    { id: 'stem', label: 'STEM & Matrices', icon: Binary, count: 'Engineering' },
    { id: 'faqs', label: 'FAQs & Glossary', icon: HelpCircle, count: '16 Questions' },
  ] as const;

  return (
    <article className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 space-y-6 text-slate-800 dark:text-slate-200">
      {/* Knowledge Hub Header Banner */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-brand-600/10 via-indigo-600/5 to-purple-600/10 border border-brand-500/20 backdrop-blur-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Knowledge Base & Reference Manual</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Official Exam Formulas, Board Regulations & University Conversion Matrix
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Verified academic algorithms for CBSE Best 5, NTA JEE percentiles, NEET cutoffs, 75% college bunk math, and Indian university grading scales.
          </p>
        </div>

        <button
          onClick={() => setIsExpandedAll(!isExpandedAll)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm shrink-0 self-start sm:self-center"
        >
          {isExpandedAll ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Compact View</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand All Sections</span>
            </>
          )}
        </button>
      </header>

      {/* Interactive Tabs Navigation (Compact) */}
      {!isExpandedAll && (
        <nav aria-label="Academic Guide Tabs" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-600 dark:text-brand-400'}`} />
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </div>
                <span className="text-xs font-bold leading-snug">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Guide Content Display Container */}
      <div className="space-y-6">
        {/* SECTION 1: JEE & NEET COMPETITIVE EXAMS */}
        {(isExpandedAll || activeTab === 'jee-neet') && (
          <section id="jee-neet-guide" className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  1. India Competitive Exams: JEE Main & NEET UG Scoring Mechanics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  NTA Percentiles, All India Ranks (AIR), Multi-Shift Normalization, and AIQ Cutoffs.
                </p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                Competitive examinations in India, organized by the National Testing Agency (NTA), involve multi-session computer-based tests with varying difficulty levels across morning and evening shifts. To ensure absolute equity, raw scores are converted into <strong>NTA Percentile Scores</strong> through mathematical normalization.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                {/* JEE Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    JEE Main: Marks vs. Percentile vs. Rank Formula
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    The NTA percentile indicates the percentage of candidates who have scored EQUAL TO OR LESS than that particular candidate in that session:
                  </p>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-[11px] text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
                    Percentile = (100 × Candidates with Raw Score ≤ Your Score) / (Total Shift Candidates)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Once final multi-session percentiles are announced, estimated <strong>All India Rank (AIR)</strong> is calculated across ~14,00,000 unique candidates using:
                  </p>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-[11px] text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
                    Expected AIR ≈ ((100 - Your NTA Percentile) / 100) × Total Candidates Registered
                  </div>
                  <button
                    onClick={() => {
                      setActiveToolId('jee-predictor');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline pt-1"
                  >
                    Launch JEE Main Rank & NIT Predictor →
                  </button>
                </div>

                {/* NEET Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    NEET UG: 720 Score & Seat Probability
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    NEET UG comprises 180 questions totaling 720 marks across Physics (180), Chemistry (180), and Biology (360). Every correct response yields <strong>+4 marks</strong>, while an incorrect response incurs a <strong>-1 mark penalty</strong>.
                  </p>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700">
                    Total Score = (Correct Answers × 4) - (Incorrect Answers × 1)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong>Cutoff Benchmarks (General Category AIQ 15%):</strong>
                    <br />• 650+ Marks: Top Government Medical Colleges (AIIMS, MAMC, AFMC).
                    <br />• 605 - 645 Marks: State Government Medical Colleges (85% State Quota).
                    <br />• Below 550 Marks: Deemed Universities & Private Colleges.
                  </p>
                  <button
                    onClick={() => {
                      setActiveToolId('neet-calc');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
                  >
                    Launch NEET UG Score & Seat Calculator →
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: CBSE & BOARD EXAMS */}
        {(isExpandedAll || activeTab === 'cbse') && (
          <section id="cbse-board-guide" className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  2. CBSE Class 10 & 12: Best of 5 Rule and CGPA 9.5 Formula
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Official evaluation guidelines, vocational subject substitution, and grade point conversions.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                The Central Board of Secondary Education (CBSE) does not officially award overall divisions or percentages on marksheets. Instead, university admissions and eligibility criteria compute percentages using the <strong>Best of 5 Rule</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Rule 1: Language Mandatory</h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    At least one Language subject (English / Hindi Core) must be included in your Best of 5 subjects calculation.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Rule 2: Top 4 Electives</h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    The remaining 4 subjects are chosen from your highest-scoring core electives (Math, Physics, Chemistry, Biology, Commerce, Arts).
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Rule 3: Skill Subject Swap</h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    If a student scores lower in a compulsory academic subject, it can be substituted by a 6th Skill/Vocational Subject (IT, AI, Healthcare).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/50 space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                  Why Does CBSE Multiply CGPA by 9.5?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  CBSE analysed statistical marks distributions of candidates scoring between 91 and 100 marks over 5 years. The average national score of top candidates was <strong>95%</strong>. Hence, a Grade Point of 10 corresponds to 95%, yielding <strong>95 / 10 = 9.5</strong>.
                </p>
                <div className="font-mono text-[11px] text-brand-700 dark:text-brand-300 bg-white dark:bg-slate-900 p-2 rounded-xl border border-brand-200 dark:border-brand-800">
                  Indicative Percentage (%) = CGPA × 9.5 &nbsp;|&nbsp; Subject Percentage (%) = Grade Point (GP) × 9.5
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: 75% ATTENDANCE & BUNK MATHEMATICS */}
        {(isExpandedAll || activeTab === 'attendance') && (
          <section id="attendance-math-guide" className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  3. College Attendance Engineering: 75% Attendance & Bunk Mathematics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Algorithmic proof of minimum classes needed and safe bunk limits to prevent exam debarment.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Statutory councils (UGC, AICTE, BCI, NMC) mandate <strong>75% minimum attendance</strong> to appear for semester end-term examinations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                {/* Scenario A: Below 75% */}
                <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <Info className="w-3.5 h-3.5" />
                    <span>Scenario A: Current Attendance &lt; 75% (Catch-Up Mode)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Let $A$ be attended classes, $T$ be total classes, and $x$ be consecutive upcoming classes you must attend:
                  </p>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-[11px] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    (A + x) / (T + x) ≥ 0.75 <br />
                    <strong>x = ⌈ (0.75 × Total - Attended) / 0.25 ⌉</strong>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    <em>Example: If Total = 60 and Attended = 35 (58.3%), x = ⌈ (45 - 35)/0.25 ⌉ = 40 consecutive classes required without missing.</em>
                  </p>
                </div>

                {/* Scenario B: Above 75% */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Scenario B: Current Attendance ≥ 75% (Safe Bunk Meter)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Let $y$ be upcoming classes you can safely skip without dropping below 75%:
                  </p>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-[11px] text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    A / (T + y) ≥ 0.75 <br />
                    <strong>y = ⌊ (Attended - 0.75 × Total) / 0.75 ⌋</strong>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    <em>Example: If Total = 80 and Attended = 72 (90%), y = ⌊ (72 - 60)/0.75 ⌋ = 16 lectures can be safely skipped while staying ≥ 75.0%.</em>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: UNIVERSITY CGPA CONVERSION MATRIX */}
        {(isExpandedAll || activeTab === 'cgpa') && (
          <section id="university-cgpa-matrix" className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  4. Indian Universities CGPA-to-Percentage Official Formula Matrix
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  State and central universities have distinct evaluation scales.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold">
                  <tr>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">University / Board</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Grading Scale</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Official Percentage Formula</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Example (8.0 CGPA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">CBSE & UGC Standard</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">Percentage = CGPA × 9.5</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">76.00%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">Mumbai University (MU)</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">
                      If CGPA ≥ 7: (7.1 × CGPA) + 11<br />
                      If CGPA &lt; 7: (7.25 × CGPA) + 11
                    </td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">67.80%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">VTU Karnataka</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.75) × 10</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">72.50%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">Anna University (AU)</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">Percentage = CGPA × 10</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">80.00%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">AKTU / UPTU Lucknow</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.75) × 10</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">72.50%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">SPPU (Pune University)</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">
                      Grade O (≥9.0): (CGPA × 20) - 100<br />
                      Grade A+ (8.25-8.99): (CGPA × 12) - 28<br />
                      Grade A (7.50-8.24): (CGPA × 10) - 11.5
                    </td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">68.50%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">MAKAUT (WBUT West Bengal)</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.75) × 10</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">72.50%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold">GTU Gujarat</td>
                    <td className="p-3">10-Point Scale</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.5) × 10</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">75.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 5: STEM & COMPUTATIONAL SUITE */}
        {(isExpandedAll || activeTab === 'stem') && (
          <section id="stem-math-guide" className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  5. STEM & Engineering Math: Matrices, Quadratics, and Citations
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Linear algebra algorithms, second-order polynomial discriminant, and client-side PDF safety.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Matrix Algebra & Inversion</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  For any square matrix A of size n × n, the matrix inverse A⁻¹ exists if and only if the determinant det(A) ≠ 0 (non-singular matrix):
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 font-mono text-[11px] text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-slate-700">
                  A⁻¹ = (1 / det(A)) × adj(A)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Where adj(A) is the transpose of the cofactor matrix C_ij = (-1)^(i+j) · M_ij. Used in graphics pipelines and solving linear systems via Cramer's Rule.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Quadratic Equations & Discriminant</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  For standard polynomials $ax^2 + bx + c = 0$ ($a \neq 0$), the discriminant $\Delta = b^2 - 4ac$ governs the nature of solutions:
                </p>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 font-mono text-[11px] text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-slate-700">
                  x = (-b ± √(b² - 4ac)) / (2a)
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside space-y-0.5">
                  <li><strong>$\Delta &gt; 0$:</strong> Two distinct real roots.</li>
                  <li><strong>$\Delta = 0$:</strong> Two equal real roots (parabola is tangent to x-axis).</li>
                  <li><strong>$\Delta &lt; 0$:</strong> Two complex conjugate roots ($x = \alpha \pm i\beta$).</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: FAQS & GLOSSARY */}
        {(isExpandedAll || activeTab === 'faqs') && (
          <section id="student-faqs" className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  6. Frequently Asked Academic & Tool Questions (FAQs)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant answers to high-volume queries searched by students and parents.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  q: 'How does the 75% attendance bunk calculator calculate required classes?',
                  a: 'The calculator uses the formula: Required Classes = ceil((0.75 * Total Classes - Attended Classes) / 0.25). Every additional consecutive class attended adds to both numerator and denominator until the attended ratio reaches at least 0.75 (75%).'
                },
                {
                  q: 'Can I replace a core subject with an additional subject in CBSE Class 10 & 12?',
                  a: 'Yes. Under the CBSE scheme, if a candidate fails or achieves a lower score in a compulsory academic subject and has opted for a 6th Skill/Vocational subject, the skill subject replaces the lower score for the Best 5 percentage (with 1 Language mandatory).'
                },
                {
                  q: 'How do I convert CGPA to Percentage for CBSE 10th & 12th board results?',
                  a: 'Multiply your overall CGPA by 9.5. For example, 8.4 CGPA = 8.4 × 9.5 = 79.80%. For individual subjects, multiply the Subject Grade Point (GP) by 9.5.'
                },
                {
                  q: 'What is the difference between JEE Main Percentile and JEE Main Percentage?',
                  a: 'Percentage is (Raw Marks Obtained / Total Marks) × 100. NTA Percentile indicates the percentage of all students in your specific exam shift who scored equal to or less than you. A 99.0 percentile means you outperformed 99% of shift test takers.'
                },
                {
                  q: 'How are NEET UG marks calculated from the official answer key?',
                  a: 'Each correct answer in Physics, Chemistry, Botany, and Zoology awards +4 marks. Incorrect answers deduct -1 mark. Unattempted carry 0 marks. Total Marks = (Correct × 4) - (Incorrect × 1), out of 720.'
                },
                {
                  q: 'Are PDF files uploaded to a server when I merge or split them here?',
                  a: 'No. All PDF files and certificates are processed 100% locally in your browser sandbox using WebAssembly. No files ever leave your device or touch remote servers.'
                },
                {
                  q: 'What formula is used for Mumbai University CGPA conversion?',
                  a: 'Mumbai University uses: For CGPA ≥ 7.0, Percentage = (7.1 × CGPA) + 11. For CGPA < 7.0, Percentage = (7.25 × CGPA) + 11.'
                },
                {
                  q: 'Is MyStudentDesk free and accessible offline?',
                  a: 'Yes, MyStudentDesk is 100% free with no registration. Once loaded, all calculators, predictors, bunk meters, and PDF utilities continue functioning seamlessly without internet.'
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                      <p className="pt-2.5">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
