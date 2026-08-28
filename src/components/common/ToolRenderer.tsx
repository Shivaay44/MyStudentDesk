import React from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from './Breadcrumb';
import { IconRenderer } from './IconRenderer';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';
import { ToolSeoSection } from '../seo/ToolSeoSection';

// Academic
import { PercentageCalc } from '../../tools/academic/PercentageCalc';
import { MarksPercentageCalc } from '../../tools/academic/MarksPercentageCalc';
import { CgpaPercentageCalc } from '../../tools/academic/CgpaPercentageCalc';
import { SgpaToPercentageCalc } from '../../tools/academic/SgpaToPercentageCalc';
import { GpaCalc } from '../../tools/academic/GpaCalc';
import { MarksCalc } from '../../tools/academic/MarksCalc';
import { GradeTargetCalc } from '../../tools/academic/GradeTargetCalc';
import { CollegeAdmissionCalc } from '../../tools/academic/CollegeAdmissionCalc';

// India Exams
import { CbsePercentageCalc } from '../../tools/india-exam/CbsePercentageCalc';
import { CbseClass10Calc } from '../../tools/india-exam/CbseClass10Calc';
import { CbseClass12Calc } from '../../tools/india-exam/CbseClass12Calc';
import { CbseCgpaCalc } from '../../tools/india-exam/CbseCgpaCalc';
import { JeePredictor } from '../../tools/india-exam/JeePredictor';
import { NeetCalc } from '../../tools/india-exam/NeetCalc';
import { CuetCalc } from '../../tools/india-exam/CuetCalc';
import { CuetCollegePredictor } from '../../tools/india-exam/CuetCollegePredictor';
import { BitsatPredictor } from '../../tools/india-exam/BitsatPredictor';
import { MhtCetPredictor } from '../../tools/india-exam/MhtCetPredictor';
import { WbjeePredictor } from '../../tools/india-exam/WbjeePredictor';

// Attendance
import { AttendanceCalc } from '../../tools/attendance/AttendanceCalc';
import { BunkCalc } from '../../tools/attendance/BunkCalc';
import { RequiredAttendanceCalc } from '../../tools/attendance/RequiredAttendanceCalc';

// Math
import { ScientificCalc } from '../../tools/math/ScientificCalc';
import { FractionPercentageCalc } from '../../tools/math/FractionPercentageCalc';
import { EquationSolver } from '../../tools/math/EquationSolver';
import { QuadraticSolver } from '../../tools/math/QuadraticSolver';
import { MatrixCalc } from '../../tools/math/MatrixCalc';
import { PermutationCombination } from '../../tools/math/PermutationCombination';
import { ProbabilityCalc } from '../../tools/math/ProbabilityCalc';
import { UnitConverter } from '../../tools/math/UnitConverter';

// Productivity
import { PomodoroTimer } from '../../tools/productivity/PomodoroTimer';
import { StudyTimer } from '../../tools/productivity/StudyTimer';
import { ExamCountdown } from '../../tools/productivity/ExamCountdown';

// Utility
import { AgeCalc } from '../../tools/utilities/AgeCalc';
import { DateDiffCalc } from '../../tools/utilities/DateDiffCalc';
import { BmiCalc } from '../../tools/utilities/BmiCalc';
import { WordCounter } from '../../tools/utilities/WordCounter';
import { CitationGenerator } from '../../tools/utilities/CitationGenerator';
import { QrGenerator } from '../../tools/utilities/QrGenerator';
import { PdfTools } from '../../tools/utilities/PdfTools';
import { EducationLoanCalc } from '../../tools/utilities/EducationLoanCalc';

export const ToolRenderer: React.FC = () => {
  const { currentTool, setActiveToolId } = useApp();

  if (!currentTool) return null;

  const renderToolComponent = () => {
    switch (currentTool.id) {
      // Academic
      case 'percentage':
        return <PercentageCalc />;
      case 'marks-percentage':
        return <MarksPercentageCalc />;
      case 'cgpa-percentage':
        return <CgpaPercentageCalc />;
      case 'sgpa-to-percentage':
        return <SgpaToPercentageCalc />;
      case 'gpa-calc':
        return <GpaCalc />;
      case 'marks-calc':
        return <MarksCalc />;
      case 'grade-calculator':
        return <GradeTargetCalc />;
      case 'college-admission':
        return <CollegeAdmissionCalc />;

      // India Exams
      case 'cbse-percentage':
        return <CbsePercentageCalc />;
      case 'cbse-class-10-percentage':
        return <CbseClass10Calc />;
      case 'cbse-class-12-percentage':
        return <CbseClass12Calc />;
      case 'cbse-cgpa':
        return <CbseCgpaCalc />;
      case 'jee-predictor':
        return <JeePredictor />;
      case 'neet-calc':
        return <NeetCalc />;
      case 'cuet-calc':
        return <CuetCalc />;
      case 'cuet-college-predictor':
        return <CuetCollegePredictor />;
      case 'bitsat-predictor':
        return <BitsatPredictor />;
      case 'mht-cet-predictor':
        return <MhtCetPredictor />;
      case 'wbjee-predictor':
        return <WbjeePredictor />;

      // Attendance
      case 'attendance-calc':
        return <AttendanceCalc />;
      case 'bunk-calculator':
        return <BunkCalc />;
      case 'required-attendance':
        return <RequiredAttendanceCalc />;

      // Math
      case 'scientific-calc':
        return <ScientificCalc />;
      case 'fraction-percentage':
        return <FractionPercentageCalc />;
      case 'equation-solver':
        return <EquationSolver />;
      case 'quadratic-solver':
        return <QuadraticSolver />;
      case 'matrix-calc':
        return <MatrixCalc />;
      case 'perm-comb':
        return <PermutationCombination />;
      case 'probability-calc':
        return <ProbabilityCalc />;
      case 'unit-converter':
        return <UnitConverter />;

      // Productivity
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'study-timer':
        return <StudyTimer />;
      case 'exam-countdown':
        return <ExamCountdown />;

      // Utilities
      case 'age-calc':
        return <AgeCalc />;
      case 'date-diff':
        return <DateDiffCalc />;
      case 'bmi-calc':
        return <BmiCalc />;
      case 'word-counter':
        return <WordCounter />;
      case 'citation-gen':
        return <CitationGenerator />;
      case 'qr-gen':
        return <QrGenerator />;
      case 'pdf-tools':
        return <PdfTools />;
      case 'simple-interest-loan':
        return <EducationLoanCalc />;

      default:
        return <div>Tool coming soon</div>;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Breadcrumb />

      {/* Tool Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              <IconRenderer name={currentTool.iconName} className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {currentTool.name}
                </h1>
                {currentTool.badge && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                    {currentTool.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                {currentTool.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveToolId(null)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Tools</span>
          </button>
        </div>
      </div>

      {/* Active Tool Content */}
      <div className="pt-2">{renderToolComponent()}</div>

      {/* In-Depth SEO Guide, Formulas, Worked Examples & FAQs for Active Tool */}
      <ToolSeoSection tool={currentTool} />
    </div>
  );
};
