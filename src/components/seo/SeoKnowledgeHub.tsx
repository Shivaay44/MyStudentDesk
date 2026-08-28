import React, { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  CalendarCheck,
  Binary,
  BookOpen,
  FileCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SeoKnowledgeHub: React.FC = () => {
  const { setActiveToolId } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <article className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800/80 space-y-16 text-slate-800 dark:text-slate-200">
      {/* Knowledge Hub Header Banner */}
      <header className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Student Knowledge Base & Academic Reference Manual</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
          Comprehensive Guide to Exam Predictions, Grade Conversions & College Productivity
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Detailed mathematical formulas, official board regulations (CBSE, NTA, Universities), attendance algorithms, and computational guides curated to empower students across India and worldwide.
        </p>
      </header>

      {/* Quick Navigation Cards */}
      <nav aria-label="SEO Table of Contents" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'JEE & NEET Guide', href: '#jee-neet-guide', icon: TrendingUp },
          { label: 'CBSE & Boards', href: '#cbse-board-guide', icon: GraduationCap },
          { label: '75% Attendance Math', href: '#attendance-math-guide', icon: CalendarCheck },
          { label: 'University CGPA Matrix', href: '#university-cgpa-matrix', icon: Calculator },
          { label: 'STEM & Matrix Math', href: '#stem-math-guide', icon: Binary },
          { label: 'Academic FAQs', href: '#student-faqs', icon: HelpCircle },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center hover:border-brand-500 hover:shadow-md transition-all group"
            >
              <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* SECTION 1: JEE & NEET COMPETITIVE EXAMS */}
      <section id="jee-neet-guide" className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              1. India Competitive Exams: JEE Main & NEET UG Scoring Mechanics
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Demystifying NTA Percentiles, All India Ranks (AIR), Normalization, and AIQ Cutoffs.
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Competitive examinations in India, organized by the National Testing Agency (NTA), involve multi-session computer-based tests with varying difficulty levels across morning and evening shifts. To ensure absolute equity, raw scores are converted into <strong>NTA Percentile Scores</strong> through mathematical normalization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            {/* JEE Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                JEE Main: Marks vs. Percentile vs. Rank Formula
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                The NTA percentile indicates the percentage of candidates who have scored EQUAL TO OR LESS than that particular candidate in that session. It is computed as:
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
                Percentile = (100 × Count of Candidates with Raw Score ≤ Your Score) / (Total Shift Candidates)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Once final multi-session percentiles are announced, estimated <strong>All India Rank (AIR)</strong> is calculated across ~14,00,000 unique candidates using:
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
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
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                NEET UG: 720 Score & Seat Probability
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                NEET UG comprises 180 questions totaling 720 marks across Physics (180), Chemistry (180), and Biology (360). Every correct response yields <strong>+4 marks</strong>, while an incorrect response incurs a <strong>-1 mark penalty</strong>.
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700">
                Total Score = (Correct Answers × 4) - (Incorrect Answers × 1)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Cutoff Benchmarks (General Category AIQ 15%):</strong>
                <br />• 650+ Marks: High probability for Top Government Medical Colleges (AIIMS, MAMC, AFMC).
                <br />• 605 - 645 Marks: Competitive for State Government Medical Colleges (85% State Quota).
                <br />• Below 550 Marks: Deemed Universities & Private Medical Colleges.
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

      {/* SECTION 2: CBSE & BOARD EXAMS */}
      <section id="cbse-board-guide" className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2. CBSE Class 10 & 12: Best of 5 Rule and CGPA 9.5 Formula
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Understanding official evaluation guidelines, vocational substitution, and grade point conversions.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            The Central Board of Secondary Education (CBSE) does not officially award overall divisions, ranks, or aggregate percentages on marksheets. Instead, higher education institutions, university admissions (like Delhi University), and government recruitment bodies compute percentages using specific criteria known as the <strong>Best of 5 Rule</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2">Rule 1: Language Mandatory</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                At least one Language subject (English Core / Hindi Core / Elective) must be included in your primary Best of 5 subjects calculation.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2">Rule 2: Top 4 Electives</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The remaining 4 subjects are chosen from your highest-scoring core or elective subjects (Mathematics, Physics, Chemistry, Biology, Economics, History, Computer Science).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2">Rule 3: Skill Subject Swap</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                If a student fails or scores lower in a compulsory academic subject (e.g. Science or Math in Class 10), it can be substituted by a 6th Skill/Vocational Subject (IT, AI, Healthcare).
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/50 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Why Does CBSE Multiply CGPA by 9.5?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              CBSE analysed statistical marks distributions of candidates who scored between 91 and 100 marks over a span of 5 years. The average score of top candidates across the country was <strong>95%</strong>. Hence, a Grade Point of 10 corresponds to 95%, yielding the official conversion factor of <strong>95 / 10 = 9.5</strong>.
            </p>
            <div className="font-mono text-xs text-brand-700 dark:text-brand-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-brand-200 dark:border-brand-800">
              Indicative Percentage (%) = CGPA × 9.5 &nbsp;|&nbsp; Subject Percentage (%) = Grade Point (GP) × 9.5
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 75% ATTENDANCE & BUNK MATHEMATICS */}
      <section id="attendance-math-guide" className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              3. College Attendance Engineering: The 75% Mandatory Attendance & Bunk Mathematics
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Algorithmic proof of minimum classes needed and safe bunk limits to prevent exam debarment.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Most Indian universities, colleges, and statutory councils (such as UGC, AICTE, BCI, and NMC) mandate a minimum of <strong>75% attendance</strong> (or 80% for medical and law disciplines) to be eligible to appear for semester end-term examinations. Falling below this threshold leads to academic detention or non-submission of hall tickets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
            {/* Scenario A: Below 75% */}
            <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Info className="w-4 h-4" />
                <span>Scenario A: Current Attendance &lt; 75% (Catch-Up Mode)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Let $A$ be classes attended, $T$ be total classes conducted so far, and $x$ be the number of consecutive upcoming classes you must attend to achieve target percentage $P$ (e.g. 75% or 0.75):
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                (A + x) / (T + x) ≥ 0.75 <br />
                A + x ≥ 0.75·T + 0.75·x <br />
                0.25·x ≥ 0.75·T - A <br />
                <strong>x = ⌈ (0.75 × Total - Attended) / 0.25 ⌉</strong>
              </div>
              <p className="text-xs text-slate-500">
                <em>Example: If Total = 60 and Attended = 35 (58.3%), x = ⌈ (45 - 35)/0.25 ⌉ = 40 consecutive classes must be attended without a single miss!</em>
              </p>
            </div>

            {/* Scenario B: Above 75% */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Scenario B: Current Attendance ≥ 75% (Safe Bunk Meter)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Let $y$ be the number of upcoming classes you can safely skip (bunk) without letting your overall attendance drop below target $P$ (0.75):
              </p>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                A / (T + y) ≥ 0.75 <br />
                A ≥ 0.75·T + 0.75·y <br />
                0.75·y ≤ A - 0.75·T <br />
                <strong>y = ⌊ (Attended - 0.75 × Total) / 0.75 ⌋</strong>
              </div>
              <p className="text-xs text-slate-500">
                <em>Example: If Total = 80 and Attended = 72 (90%), y = ⌊ (72 - 60)/0.75 ⌋ = 16 lectures can be safely skipped while staying at or above 75.0%.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: UNIVERSITY CGPA CONVERSION MATRIX */}
      <section id="university-cgpa-matrix" className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4. Indian Universities CGPA-to-Percentage Official Formula Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              State and central universities have distinct evaluation scales. Reference our master conversion table below.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">University / Board</th>
                <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Grading Scale</th>
                <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Official Percentage Formula</th>
                <th className="p-3.5 border-b border-slate-200 dark:border-slate-700">Example (8.0 CGPA)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">CBSE & UGC Standard</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">Percentage = CGPA × 9.5</td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">76.00%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">Mumbai University (MU)</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">
                  If CGPA ≥ 7: (7.1 × CGPA) + 11<br />
                  If CGPA &lt; 7: (7.25 × CGPA) + 11
                </td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">67.80%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">VTU Karnataka</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.75) × 10</td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">72.50%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">Anna University (AU)</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">Percentage = CGPA × 10</td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">80.00%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">AKTU / UPTU Lucknow</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.75) × 10</td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">72.50%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">SPPU (Pune University)</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">
                  Grade O (≥9.0): (CGPA × 20) - 100<br />
                  Grade A+ (8.25-8.99): (CGPA × 12) - 28<br />
                  Grade A (7.50-8.24): (CGPA × 10) - 11.5
                </td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">68.50%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">MAKAUT (WBUT West Bengal)</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.75) × 10</td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">72.50%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3.5 font-bold">GTU Gujarat</td>
                <td className="p-3.5">10-Point Scale</td>
                <td className="p-3.5 font-mono text-brand-600 dark:text-brand-400">Percentage = (CGPA - 0.5) × 10</td>
                <td className="p-3.5 font-semibold text-emerald-600 dark:text-emerald-400">75.00%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: STEM & COMPUTATIONAL SUITE */}
      <section id="stem-math-guide" className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5. STEM & Engineering Math: Matrices, Quadratics, and Probability
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              High precision algorithms for linear algebra, polynomials, and combinatorial statistics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Matrix Algebra & Inversion</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              For any square matrix A of size n × n, the matrix inverse A⁻¹ exists if and only if the determinant det(A) ≠ 0 (non-singular matrix):
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-slate-700">
              A⁻¹ = (1 / det(A)) × adj(A)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Where adj(A) is the transpose of the cofactor matrix C_ij = (-1)^(i+j) · M_ij. Used heavily in engineering mechanics, graphics pipelines, and solving simultaneous linear equations via Cramer's Rule.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Quadratic Equations & Discriminant</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              For standard second-order polynomials $ax^2 + bx + c = 0$ ($a \neq 0$), the discriminant $\Delta = b^2 - 4ac$ governs the nature of solutions:
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-slate-700">
              x = (-b ± √(b² - 4ac)) / (2a)
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
              <li><strong>$\Delta &gt; 0$:</strong> Two distinct real roots.</li>
              <li><strong>$\Delta = 0$:</strong> Two equal real roots (parabola is tangent to the x-axis).</li>
              <li><strong>$\Delta &lt; 0$:</strong> Two complex conjugate roots ($x = \alpha \pm i\beta$).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLIENT-SIDE PRIVACY & CITATIONS */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-600/10 via-slate-900/5 to-transparent border border-brand-500/20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              6. Client-Side Document Privacy & Academic Citation Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Zero-upload PDF processing security, plus APA, MLA, and IEEE citation formatting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 dark:text-slate-300">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Why 100% Client-Side PDF Tools Matter</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard online PDF tools upload your sensitive academic transcripts, Aadhaar cards, admit cards, and thesis drafts to remote third-party cloud servers. MyStudentDesk processes all PDF manipulations (merging, splitting, page reordering) directly inside your browser memory using <code>pdf-lib</code> and WebAssembly.
            </p>
            <ul className="text-xs text-emerald-600 dark:text-emerald-400 space-y-1 font-semibold">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> No server uploads or data logging</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Works 100% offline once loaded</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Instantaneous processing without upload latency</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Academic Citation Guide (7th & 9th Eds)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ensure academic integrity and prevent plagiarism in term papers, project reports, and published journals:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-brand-600 dark:text-brand-400">APA 7th:</span> Author, A. A. (Year). <em>Title of work</em>. Publisher. DOI/URL.
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-brand-600 dark:text-brand-400">MLA 9th:</span> Author. <em>Title of Book</em>. Publisher, Year.
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-brand-600 dark:text-brand-400">IEEE:</span> [1] J. K. Author, "Title of paper," <em>Journal</em>, vol. x, no. y, pp. 1-10, 2024.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INTERACTIVE FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section id="student-faqs" className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              7. Frequently Asked Academic & Tool Questions (FAQs)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Clear answers to the most common queries searched by school, engineering, medical, and university students.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does the 75% attendance bunk calculator calculate required classes?',
              a: 'The calculator uses the algebraic formula: Required Classes = ceil((0.75 * Total Classes - Attended Classes) / 0.25). This ensures that every additional consecutive class you attend adds to both the numerator and denominator until the attended ratio reaches at least 0.75 (75%).'
            },
            {
              q: 'Can I replace a core subject with an additional subject in CBSE Class 10 & 12?',
              a: 'Yes. Under the CBSE scheme of studies, if a candidate fails or achieves a lower score in any of the compulsory academic subjects (Science, Mathematics, Social Science, or Physics/Chemistry/Maths), and has opted for a 6th Skill/Vocational subject, the skill subject replaces the lower academic score in calculating the qualifying Best 5 percentage (provided 1 Language is retained).'
            },
            {
              q: 'How do I convert CGPA to Percentage for CBSE 10th & 12th board results?',
              a: 'Multiply your overall Cumulative Grade Point Average (CGPA) by 9.5. For example, if your CGPA is 8.4, your equivalent percentage is 8.4 × 9.5 = 79.80%. For individual subject percentage, multiply the Subject Grade Point (GP) by 9.5.'
            },
            {
              q: 'What is the difference between JEE Main Percentile and JEE Main Percentage?',
              a: 'Percentage is simply (Raw Marks Obtained / Total Marks) × 100. NTA Percentile, on the other hand, indicates the percentage of all students who scored equal to or less than you in your specific exam shift. A 99.0 percentile means you outperformed 99% of test takers in your shift, regardless of whether the exam was tough or easy.'
            },
            {
              q: 'How are NEET UG marks calculated from the official answer key?',
              a: 'For each correct answer in Physics, Chemistry, Botany, and Zoology, award yourself +4 marks. For every incorrect answer, deduct -1 mark. Unattempted questions carry 0 marks. The formula is: Total Marks = (Correct Answers × 4) - (Incorrect Answers × 1), out of a maximum of 720 marks.'
            },
            {
              q: 'How does the Pomodoro Study Technique enhance academic productivity?',
              a: 'The Pomodoro Technique structures deep study intervals (typically 25 minutes of intense focused study followed by a 5-minute restorative break). After completing four consecutive cycles, a longer 15-30 minute break is taken. This combats cognitive fatigue and maximizes working memory retention during exam cramming.'
            },
            {
              q: 'Are PDF files uploaded to a server when I merge or split them here?',
              a: 'No. All PDF files, certificates, and documents are processed 100% locally in your browser sandbox using WebAssembly and client-side JavaScript. No file bytes ever leave your device or touch any remote server, guaranteeing absolute privacy.'
            },
            {
              q: 'What formula is used for Mumbai University CGPA conversion?',
              a: 'Mumbai University uses a piecewise formula: For candidates with CGPA ≥ 7.0, Percentage = (7.1 × CGPA) + 11. For candidates with CGPA < 7.0, Percentage = (7.25 × CGPA) + 11.'
            },
            {
              q: 'How is CUET UG score calculated for Delhi University (DU) admissions?',
              a: 'Delhi University calculates merit scores by summing normalized scores of 1 Language subject + 3 Domain subjects matching the specific program criteria (e.g. for B.Com (Hons), English + Math/Accounts + 2 other subjects from Section II).'
            },
            {
              q: 'Is MyStudentDesk free and accessible offline?',
              a: 'Yes, MyStudentDesk is 100% free with no registration or paywalls. Once loaded in your browser, all calculators, math solvers, bunk meters, and PDF utilities continue functioning seamlessly without an active internet connection.'
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: GLOSSARY OF KEY ACADEMIC TERMINOLOGY */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              8. Academic Terminology & Competitive Exam Glossary
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Essential abbreviations and academic jargon explained for students and parents.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { term: 'AIR (All India Rank)', desc: 'The national merit position of a candidate across all test-takers in examinations like JEE, NEET, and UPSC.' },
            { term: 'NTA Score', desc: 'Normalized percentile score calculated up to 7 decimal places to prevent ties in multi-shift computer-based tests.' },
            { term: 'AIQ (All India Quota)', desc: '15% seats in government medical colleges and 50% in postgraduate institutes reserved for national counseling.' },
            { term: 'SGPA vs CGPA', desc: 'SGPA is the Grade Point Average for a single semester; CGPA is the cumulative weighted average across all completed semesters.' },
            { term: 'Credit Hours', desc: 'A quantifiable metric of instructional contact hours per week, used to weight grades in the Choice Based Credit System (CBCS).' },
            { term: 'Cramer’s Rule', desc: 'An explicit algebraic formula for solving systems of linear equations using determinants of matrices.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
              <h5 className="font-bold text-slate-900 dark:text-white">{item.term}</h5>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
