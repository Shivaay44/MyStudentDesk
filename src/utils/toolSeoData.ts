export interface ToolSeoContent {
  title: string;
  formula?: string;
  overview: string;
  stepByStep: string[];
  example?: {
    scenario: string;
    calculation: string;
    result: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  faqs: {
    q: string;
    a: string;
  }[];
}

export const TOOL_SEO_DATA: Record<string, ToolSeoContent> = {
  'jee-predictor': {
    title: 'JEE Main Rank Predictor, NTA Percentile & Cutoff Analysis Guide',
    formula: 'Percentile = (100 × Candidates with Raw Score ≤ Your Score) / (Total Shift Candidates)\nEstimated AIR ≈ ((100 - NTA Percentile) / 100) × 14,00,000',
    overview:
      'The JEE Main Rank Predictor accurately estimates your expected National Testing Agency (NTA) score, percentile curve, and All India Rank (AIR) across Paper 1 (B.E./B.Tech). Multi-session computer-based testing requires normalization across varying shift difficulty metrics, historical scoring curves, and candidate registration volume.',
    stepByStep: [
      'Enter your estimated raw marks out of 300 (Physics 100, Chemistry 100, Mathematics 100).',
      'Select your specific examination shift difficulty (Easy, Moderate, or Tough).',
      'Choose your reservation category (General, EWS, OBC-NCL, SC, ST) for accurate category rank analysis.',
      'The tool computes your predicted percentile, expected AIR range, and cutoff eligibility for top NITs, IIITs, and GFTIs.',
    ],
    example: {
      scenario: 'A student scores 185 marks in a Moderate difficulty shift in JEE Main Session 1.',
      calculation: 'Score 185 in moderate shift corresponds to ~99.15 percentile on historical normalized curves.',
      result: 'Expected AIR ≈ ((100 - 99.15) / 100) × 14,00,000 ≈ 11,900 rank (Eligible for Top NIT Computer Science & JEE Advanced cutoff).',
    },
    faqs: [
      {
        q: 'What is a good score in JEE Main to get into top NITs?',
        a: 'A raw score of 180+ marks (99+ percentile) is generally required for Computer Science and top branches in premier institutes like NIT Trichy, NIT Surathkal, and NIT Warangal.',
      },
      {
        q: 'How does shift difficulty impact NTA percentile?',
        a: 'In a tougher shift, a lower raw score (e.g. 160 marks) can achieve 99 percentile, whereas in an easier shift, the same percentile might require 190+ marks.',
      },
      {
        q: 'Does this tool calculate category rank for OBC, SC, ST, and EWS?',
        a: 'Yes, based on the national reservation distribution (OBC 27%, EWS 10%, SC 15%, ST 7.5%), expected category rank is estimated.',
      },
    ],
  },

  'neet-calc': {
    title: 'NEET UG 720 Score Calculator, Marks vs Rank & MBBS Cutoff Guide',
    formula: 'Total Score = (Correct Answers × 4) - (Incorrect Answers × 1)\nMaximum Marks = 720 (Physics 180, Chemistry 180, Biology 360)',
    overview:
      'The NEET UG Score & Rank Calculator allows medical aspirants to evaluate their 720-mark answer sheet with official NTA marking scheme (+4 for correct, -1 for incorrect, 0 for unattempted). It predicts your All India Rank (AIR) and chances of securing a Government Medical College MBBS seat under the 15% All India Quota (AIQ) and 85% State Quota.',
    stepByStep: [
      'Enter the number of correct responses and incorrect responses across Physics, Chemistry, and Biology.',
      'The tool computes your positive score, negative penalty deductions, and net total out of 720.',
      'View your estimated AIR bracket and AIQ/State quota government MBBS admission probability.',
    ],
    example: {
      scenario: 'An aspirant gets 160 correct and 15 incorrect answers out of 180 questions.',
      calculation: 'Positive Marks = 160 × 4 = 640 | Negative Marks = 15 × 1 = 15 | Net Score = 640 - 15 = 625/720.',
      result: 'Net Score: 625/720 (Estimated AIR ~12,000 - 16,000, high probability for Government Medical College MBBS seat).',
    },
    faqs: [
      {
        q: 'What is the safe score for a Government MBBS seat in NEET UG?',
        a: 'For General category students under the 15% All India Quota, 615+ marks is generally considered a competitive safe score for government MBBS seats.',
      },
      {
        q: 'Is there negative marking for unattempted questions in NEET?',
        a: 'No. Unattempted questions carry zero marks and no penalty is applied.',
      },
      {
        q: 'What are the qualifying percentile cutoffs for NEET UG?',
        a: 'The qualifying cutoff is the 50th percentile for General/EWS candidates (typically 135-140 marks) and 40th percentile for SC/ST/OBC candidates (typically 105-110 marks).',
      },
    ],
  },

  'cbse-percentage': {
    title: 'CBSE Class 10 & 12 Percentage Calculator: Best of 5 Rule Guide',
    formula: 'Percentage (%) = (Sum of Marks in Best 5 Subjects / 500) × 100',
    overview:
      'The CBSE Percentage Calculator implements the official Central Board of Secondary Education criteria for Class 10 and Class 12 board examinations. It calculates aggregate percentages supporting PCM, PCB, Commerce, Arts, and Humanities streams with automatic Best 5 subject selection and vocational skill subject substitution.',
    stepByStep: [
      'Enter subject names and marks obtained (Theory + Internal/Practical out of 100).',
      'Ensure at least 1 mandatory Language subject (English/Hindi) is included.',
      'The tool automatically selects the Language subject and your 4 highest scoring elective subjects.',
      'Generates total aggregate marks out of 500, percentage, division, and printable summary.',
    ],
    example: {
      scenario: 'Class 12 student scores: English (88), Math (95), Physics (91), Chemistry (89), CS (98), PE (82).',
      calculation: 'Best 5 Subjects = English (88) + CS (98) + Math (95) + Physics (91) + Chemistry (89) = 461/500.',
      result: 'CBSE Percentage = (461 / 500) × 100 = 92.20% (First Division with Distinction).',
    },
    faqs: [
      {
        q: 'Can a 6th additional skill subject replace a main subject in CBSE?',
        a: 'Yes, if a student scores lower or fails in a main elective subject, the 6th skill/vocational subject can replace it, provided 1 language subject is included.',
      },
      {
        q: 'Does CBSE mention percentage or division on the official marksheet?',
        a: 'No, CBSE only awards subject-wise marks and grades. Aggregate percentage is calculated by universities and employers using the Best 5 rule.',
      },
      {
        q: 'Are practical and internal assessment marks included?',
        a: 'Yes, the marks entered must be the combined total of theory paper (70/80 marks) and practicals/internals (30/20 marks) out of 100.',
      },
    ],
  },

  'cbse-cgpa': {
    title: 'CBSE CGPA to Percentage Calculator: Official 9.5 Formula',
    formula: 'Indicative Percentage (%) = CGPA × 9.5\nSubject Percentage (%) = Subject Grade Point × 9.5',
    overview:
      'Convert CBSE Cumulative Grade Point Average (CGPA) and individual Subject Grade Points (GP) to exact percentage scores using the official CBSE 9.5 multiplication formula. Derived from 5-year nationwide statistical analysis of top scores scoring between 91 and 100 marks.',
    stepByStep: [
      'Enter your overall CGPA on the standard 10.0 scale (e.g., 8.8, 9.2, 10.0).',
      'Or enter individual subject grade points (A1=10, A2=9, B1=8, B2=7, C1=6, C2=5, D=4).',
      'The calculator multiplies by 9.5 to compute your official indicative percentage.',
    ],
    example: {
      scenario: 'A student receives a CGPA of 9.4 on their CBSE Class 10 grade report.',
      calculation: 'Percentage = 9.4 × 9.5 = 89.30%.',
      result: 'Equivalent CBSE Percentage is 89.30%.',
    },
    faqs: [
      {
        q: 'Why does CBSE use 9.5 instead of 10 as the multiplier?',
        a: 'The national average score of students scoring grade point 10 (91-100 marks) was found to be 95%. Dividing 95 by 10 yields the exact 9.5 conversion multiplier.',
      },
      {
        q: 'What percentage is 10 CGPA in CBSE?',
        a: 'A perfect 10 CGPA equals 10 × 9.5 = 95.00% indicative percentage.',
      },
      {
        q: 'Can this formula be used for CBSE Class 12?',
        a: 'Yes, any educational institution or application requiring CBSE CGPA conversion recognizes the 9.5 standard formula.',
      },
    ],
  },

  'cuet-calc': {
    title: 'CUET UG Score Calculator: Delhi University & BHU Merit Predictor',
    formula: 'Aggregated CUET Score = Normalized Score (Language) + Sum of Normalized Scores (3 Domain Subjects)',
    overview:
      'Calculate composite scores for Common University Entrance Test (CUET UG) admissions into central universities including Delhi University (DU), Banaras Hindu University (BHU), and JNU. Supports Section IA/IB Languages, Section II Domain Specific Subjects, and Section III General Test combinations.',
    stepByStep: [
      'Enter your normalized scores for Language, Domain subjects, and General Test.',
      'Select your target course category (e.g. B.Com Hons, B.Sc, B.A. Economics).',
      'The calculator sums eligible subject combinations according to university admission criteria.',
    ],
    example: {
      scenario: 'CUET aspirant applies for B.Com (Hons) at DU: English (190), Accounts (195), Economics (185), Business Studies (190).',
      calculation: 'Total Combined Score = 190 + 195 + 185 + 190 = 760 / 800.',
      result: 'Merit Score: 760/800 (95.0% - Competitive for SRCC, Hindu, Hansraj).',
    },
    faqs: [
      {
        q: 'What is the maximum marks in CUET UG for DU 4-subject combination?',
        a: 'For most DU undergraduate programs requiring 1 Language + 3 Domain subjects (200 marks each), the total maximum score is 800 marks.',
      },
      {
        q: 'Are raw scores or normalized NTA scores used in CUET counseling?',
        a: 'Universities conduct admissions based on the normalized NTA percentile and equi-percentile scores awarded on the scorecard.',
      },
      {
        q: 'Is the General Test compulsory for all courses?',
        a: 'No, General Test is only mandatory for specialized programs like BMS, BBA-FIA, B.Voc, and certain humanities courses.',
      },
    ],
  },

  'college-admission': {
    title: 'College Merit & Cutoff Calculator: Composite Weighting Analyzer',
    formula: 'Composite Merit = (Board Marks % × Weight_Board) + (Entrance Marks % × Weight_Entrance)',
    overview:
      'Compute weighted composite admission merit ranks for state engineering and university admissions (such as TNEA Tamil Nadu, MHT CET Maharashtra, GUJCET, KCET, and private universities). Supports 50:50, 60:40, 75:25, or custom percentage split configurations.',
    stepByStep: [
      'Enter your 12th Board marks percentage.',
      'Enter your entrance examination score or percentile.',
      'Select the institutional weighting split ratio.',
      'View your standardized aggregate merit score out of 100 or 200.',
    ],
    example: {
      scenario: 'State admission with 50:50 ratio: Board % = 90.0%, Entrance % = 80.0%.',
      calculation: 'Composite Merit = (90.0 × 0.50) + (80.0 × 0.50) = 45.0 + 40.0 = 85.0/100.',
      result: 'Composite Admission Merit = 85.00 / 100.',
    },
    faqs: [
      {
        q: 'How is TNEA engineering cutoff calculated in Tamil Nadu?',
        a: 'TNEA cutoff is calculated out of 200: Maths (100) + Physics (50) + Chemistry (50).',
      },
      {
        q: 'Can I use custom weighting ratios for private university admissions?',
        a: 'Yes, the calculator supports any custom ratio split from 0% to 100%.',
      },
      {
        q: 'Does this tool normalize marks across different boards (CBSE vs State Board)?',
        a: 'State counseling authorities apply specific board normalization factors; enter normalized percentage for highest accuracy.',
      },
    ],
  },

  'attendance-calc': {
    title: '75% Attendance & College Bunk Calculator: Safe Leave Analyzer',
    formula: 'If Attendance < 75%: Required Classes = ⌈ (0.75 × Total - Attended) / 0.25 ⌉\nIf Attendance ≥ 75%: Safe Bunks = ⌊ (Attended - 0.75 × Total) / 0.75 ⌋',
    overview:
      'The College Attendance & Bunk Calculator solves the mathematical condition for maintaining the mandatory 75% attendance threshold prescribed by UGC, AICTE, BCI, and universities. Find out exactly how many lectures you can safely skip without debarment, or how many consecutive classes you must attend to recover your percentage.',
    stepByStep: [
      'Enter total classes held so far in the current semester.',
      'Enter the number of classes you have physically attended.',
      'Select your target attendance percentage (default is 75%, adjustable to 80% or 85%).',
      'Get instant calculation of current %, safe bunk allowance, or recovery classes needed.',
    ],
    example: {
      scenario: 'A college student attended 42 out of 50 held classes (84% current attendance).',
      calculation: 'Safe Bunks = ⌊ (42 - 0.75 × 50) / 0.75 ⌋ = ⌊ (42 - 37.5) / 0.75 ⌋ = ⌊ 4.5 / 0.75 ⌋ = 6.',
      result: 'The student can safely bunk 6 upcoming lectures while remaining at or above 75.0% attendance.',
    },
    faqs: [
      {
        q: 'What happens if I miss a class when I am below 75%?',
        a: 'Every missed class increases the total denominator without increasing attendance, requiring 3 additional consecutive attended classes to compensate.',
      },
      {
        q: 'Can I calculate attendance for individual subjects or overall semester?',
        a: 'Both! You can use this calculator for single subjects (e.g. Math or Physics) or overall aggregate lecture counts.',
      },
      {
        q: 'Is medical leave or duty leave included in the 75% threshold?',
        a: 'In most universities, official medical or OD certificates add to your attended count once approved by the department.',
      },
    ],
  },

  'required-attendance': {
    title: 'Required Attendance Recovery Calculator: Target Attendance Formula',
    formula: 'Consecutive Classes to Attend = ⌈ (Target% × Total Held - Attended) / (1 - Target%) ⌉',
    overview:
      'When your attendance drops below 75% or 80%, this recovery calculator calculates the exact number of upcoming classes you must attend back-to-back with zero absences to reach your desired target attendance percentage.',
    stepByStep: [
      'Input total lectures held to date.',
      'Input attended lectures.',
      'Specify target threshold (75%, 80%, or custom).',
      'The tool computes the required recovery lectures and projects your updated attendance schedule.',
    ],
    example: {
      scenario: 'Student attended 28 out of 50 classes (56% attendance) and needs to reach 75%.',
      calculation: 'Classes = ⌈ (0.75 × 50 - 28) / (1 - 0.75) ⌉ = ⌈ (37.5 - 28) / 0.25 ⌉ = ⌈ 9.5 / 0.25 ⌉ = 38.',
      result: 'Must attend next 38 consecutive classes without a single absence to reach 75.0%.',
    },
    faqs: [
      {
        q: 'Why does it require so many classes to raise attendance from 60% to 75%?',
        a: 'Because each new class attended increases both the numerator and denominator (+1/+1), which converges toward 100% at a rate of 0.25 per class when target is 75%.',
      },
      {
        q: 'What if the semester does not have enough remaining classes?',
        a: 'If remaining scheduled classes in the semester are fewer than the required classes, contact your faculty for remedial assignments or medical leave approval.',
      },
      {
        q: 'Can I calculate for an 80% target for medical and law colleges?',
        a: 'Yes, simply set the target slider to 80% or 85%.',
      },
    ],
  },

  'percentage': {
    title: 'Percentage Calculator: Marks, Change, Discount & Ratios',
    formula: 'Percentage (%) = (Part / Whole) × 100\nPercentage Change = ((New Value - Old Value) / Old Value) × 100',
    overview:
      'Universal percentage computation tool supporting marks-to-percentage conversions, calculating X% of any value, finding percentage increase or decrease, and determining the original whole from a given fraction.',
    stepByStep: [
      'Select calculation mode: Marks Percentage, X% of Y, Percentage Change, or Reverse Percentage.',
      'Enter input values.',
      'View precise calculation steps, fraction breakdown, and visual progress representation.',
    ],
    example: {
      scenario: 'Student scored 435 marks out of a total maximum of 600.',
      calculation: 'Percentage = (435 / 600) × 100 = 0.725 × 100 = 72.50%.',
      result: '72.50% (Grade B / First Class).',
    },
    faqs: [
      {
        q: 'How do I calculate percentage increase in test scores?',
        a: 'Subtract initial score from final score, divide by initial score, and multiply by 100.',
      },
      {
        q: 'How to calculate reverse percentage (original price before discount)?',
        a: 'Divide the discounted price by (1 - discount%/100).',
      },
      {
        q: 'Does this calculator round off decimals?',
        a: 'The calculator outputs up to 2 decimal places with exact floating-point precision.',
      },
    ],
  },

  'cgpa-percentage': {
    title: 'CGPA to Percentage Converter: Master University Matrix Guide',
    formula: 'CBSE: CGPA × 9.5\nMumbai Univ (≥7): (7.1 × CGPA) + 11\nVTU / AKTU: (CGPA - 0.75) × 10\nAnna Univ: CGPA × 10',
    overview:
      'Comprehensive CGPA-to-Percentage conversion suite tailored for top Indian universities and global grading systems. Select your specific university from our database or input custom multipliers to generate official percentage certificates.',
    stepByStep: [
      'Choose your University or Educational Board from the preset list.',
      'Enter your Cumulative Grade Point Average (CGPA) on the 10.0 scale.',
      'The converter applies the official gazetted formula and outputs your exact equivalent percentage.',
    ],
    example: {
      scenario: 'VTU engineering student with 8.2 CGPA converts to percentage for job application.',
      calculation: 'VTU Formula = (8.2 - 0.75) × 10 = 7.45 × 10 = 74.50%.',
      result: '74.50% (First Class with Distinction eligibility).',
    },
    faqs: [
      {
        q: 'Which formula should I use for campus placements and resume?',
        a: 'Always use your university’s official formula as stated on the back of your degree transcript.',
      },
      {
        q: 'What is 8.0 CGPA in CBSE percentage?',
        a: '8.0 × 9.5 = 76.00%.',
      },
      {
        q: 'Is there a difference between SGPA to % and CGPA to %?',
        a: 'Most universities apply the identical conversion multiplier to both semester SGPA and cumulative CGPA.',
      },
    ],
  },

  'gpa-calc': {
    title: 'GPA & SGPA Multi-Semester College Grade Calculator',
    formula: 'SGPA = ∑ (Credit Hours × Grade Points) / ∑ (Credit Hours)\nCGPA = ∑ (Semester SGPA × Semester Credits) / ∑ (Total Credits)',
    overview:
      'Dynamic multi-semester credit hour and grade point calculator following UGC Choice Based Credit System (CBCS). Calculate weighted semester GPA (SGPA) and cumulative grade point average (CGPA) across up to 8 semesters.',
    stepByStep: [
      'Add courses with their respective credit hours (e.g. 4, 3, 2, 1).',
      'Select letter grades achieved (O=10, A+=9, A=8, B+=7, B=6, C=5, P=4, F=0).',
      'The tool computes weighted quality points and overall semester SGPA.',
      'Add multiple semesters to compute overall cumulative CGPA.',
    ],
    example: {
      scenario: 'Semester with 3 subjects: Sub 1 (4 credits, Grade A=8), Sub 2 (3 credits, Grade O=10), Sub 3 (3 credits, Grade B+=7).',
      calculation: 'Total Quality Points = (4×8) + (3×10) + (3×7) = 32 + 30 + 21 = 83 | Total Credits = 4+3+3 = 10.',
      result: 'Semester SGPA = 83 / 10 = 8.30.',
    },
    faqs: [
      {
        q: 'What is the Choice Based Credit System (CBCS)?',
        a: 'CBCS is the standardized grading framework introduced by UGC across Indian universities using letter grades and 10-point scale.',
      },
      {
        q: 'How do fail grades (F) affect SGPA?',
        a: 'An F grade carries 0 grade points, which drastically pulls down the weighted average until cleared in supplementary exams.',
      },
      {
        q: 'Can this calculate for 4.0 US GPA scale?',
        a: 'Yes, toggle the scale option between 10.0 and 4.0 grading systems.',
      },
    ],
  },

  'marks-calc': {
    title: 'Marks Calculator, Passing Margin & Target Analyzer',
    formula: 'Aggregate % = (Total Marks Scored / Maximum Possible Marks) × 100',
    overview:
      'Track subject-wise scores, evaluate aggregate passing margins, analyze minimum marks needed in final exams to hit target grade thresholds, and view comprehensive academic marks summary tables.',
    stepByStep: [
      'Enter marks scored and total marks for each subject.',
      'Set passing cutoff criteria (e.g. 33%, 40%, or 50%).',
      'View individual subject percentages, aggregate total, and passing margin report.',
    ],
    example: {
      scenario: '5 subjects with 100 marks each: scores are 78, 85, 92, 64, 81 out of 500.',
      calculation: 'Total Marks = 400 / 500 = 80.00%.',
      result: '80.00% Aggregate | Passed all subjects with Distinction.',
    },
    faqs: [
      {
        q: 'What is standard passing percentage in Indian schools vs colleges?',
        a: 'CBSE school passing threshold is 33% per subject; most university degree programs require 40% or 50% minimum.',
      },
      {
        q: 'Can I print or export my calculated marksheet?',
        a: 'Yes, use the export or print button to generate a clean PDF marksheet summary.',
      },
      {
        q: 'Can I add practical and viva marks separately?',
        a: 'Yes, add separate rows for Theory and Practicals to evaluate individual component cutoffs.',
      },
    ],
  },

  'scientific-calc': {
    title: 'Scientific Calculator Online: Trigonometry, Logarithms & Powers',
    formula: 'Trig: sin(θ), cos(θ), tan(θ) | Logs: ln(x), log₁₀(x) | Powers: xʸ, √x, x!',
    overview:
      'High precision scientific computing suite with trigonometric, inverse trig, hyperbolic, logarithmic, factorial, exponential, and memory register functions. Supports Degree and Radian modes with active calculation history tape.',
    stepByStep: [
      'Select angle mode (Deg or Rad).',
      'Input numbers and functions using keyboard or interactive keypad.',
      'Supports nested parentheses, exponent arithmetic, and persistent memory (M+, M-, MR, MC).',
    ],
    example: {
      scenario: 'Calculate sin(30°) + log₁₀(100) + 5!.',
      calculation: 'sin(30°) = 0.5 | log₁₀(100) = 2 | 5! = 120 | Sum = 0.5 + 2 + 120 = 122.5.',
      result: 'Result: 122.5.',
    },
    faqs: [
      {
        q: 'Is Deg or Rad the default angle mode?',
        a: 'Degrees (Deg) is default for school physics/math, toggleable to Radians (Rad) for calculus and advanced analysis.',
      },
      {
        q: 'How does factorial work for large numbers?',
        a: 'Factorials are computed up to 170! before exceeding standard IEEE 754 double floating limits.',
      },
      {
        q: 'Can I use keyboard shortcuts on desktop?',
        a: 'Yes, full standard numeric keypad and operators (+, -, *, /, ^, Enter) are supported.',
      },
    ],
  },

  'equation-solver': {
    title: 'Linear Equation Solver: 2x2 & 3x3 Systems (Cramer’s Rule)',
    formula: 'x = Dx / D | y = Dy / D | z = Dz / D\nWhere D is coefficient matrix determinant and Dx, Dy, Dz are replaced column determinants.',
    overview:
      'Solve systems of 2-variable and 3-variable linear equations step-by-step using Cramer’s Rule and matrix elimination. Displays coefficient determinants, solvability checks (consistent vs inconsistent systems), and exact fractions.',
    stepByStep: [
      'Choose 2-variable system (ax + by = c) or 3-variable system (ax + by + cz = d).',
      'Enter numeric coefficients.',
      'The solver computes determinant D. If D ≠ 0, Cramer’s Rule produces unique solutions for x, y, and z.',
    ],
    example: {
      scenario: 'Solve 2x + 3y = 8 and 3x - y = 1.',
      calculation: 'D = (2)(-1) - (3)(3) = -2 - 9 = -11 | Dx = (8)(-1) - (3)(1) = -11 => x = -11/-11 = 1 | Dy = (2)(1) - (8)(3) = -22 => y = -22/-11 = 2.',
      result: 'x = 1, y = 2.',
    },
    faqs: [
      {
        q: 'What happens if determinant D = 0?',
        a: 'If D = 0 and Dx = Dy = 0, the system has infinitely many solutions (dependent). If any Dx ≠ 0, no solution exists (inconsistent).',
      },
      {
        q: 'Does this solver display fractions or decimals?',
        a: 'The solver shows exact rational fraction steps and rounded decimal values.',
      },
      {
        q: 'What is Cramer’s Rule used for in engineering?',
        a: 'Used for solving electrical circuit loop mesh equations (Kirchhoff’s laws) and structural beam load distributions.',
      },
    ],
  },

  'quadratic-solver': {
    title: 'Quadratic Equation Solver: Real & Complex Roots, Discriminant',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)\nDiscriminant Δ = b² - 4ac | Vertex: (-b/2a, -Δ/4a)',
    overview:
      'Step-by-step solver for second-degree polynomials ax² + bx + c = 0. Analyzes the discriminant Δ, calculates real and complex conjugate roots, identifies parabolic vertex coordinates, axis of symmetry, and factored form.',
    stepByStep: [
      'Enter coefficients a, b, and c (with a ≠ 0).',
      'The tool evaluates discriminant Δ = b² - 4ac.',
      'Generates exact root values, imaginary components if Δ < 0, and parabolic vertex coordinates.',
    ],
    example: {
      scenario: 'Solve x² - 5x + 6 = 0 (a=1, b=-5, c=6).',
      calculation: 'Δ = (-5)² - 4(1)(6) = 25 - 24 = 1 | x = (5 ± √1)/2 = (5 ± 1)/2 => x₁ = 3, x₂ = 2.',
      result: 'Roots: x = 3, x = 2 | Vertex: (2.5, -0.25) | Factored: (x - 3)(x - 2) = 0.',
    },
    faqs: [
      {
        q: 'What does a negative discriminant (Δ < 0) mean?',
        a: 'A negative discriminant indicates that the parabola does not intersect the x-axis, resulting in two complex conjugate roots (α ± iβ).',
      },
      {
        q: 'What is the vertex of a quadratic function?',
        a: 'The vertex is the extreme point (minimum if a > 0, maximum if a < 0) located at x = -b / 2a.',
      },
      {
        q: 'Can this solve pure quadratic equations where b = 0?',
        a: 'Yes, handles all quadratic cases where a ≠ 0.',
      },
    ],
  },

  'matrix-calc': {
    title: 'Matrix Calculator: Determinant, Inverse, Multiply & Transpose',
    formula: 'A⁻¹ = (1 / det(A)) × adj(A)\nMultiplication: C_ij = ∑ (A_ik × B_kj) | det(2x2) = ad - bc',
    overview:
      'Complete matrix linear algebra calculator supporting 2x2, 3x3, and 4x4 matrices. Perform addition, subtraction, scalar multiplication, matrix dot products, determinants via cofactor expansion, adjugate inverses, and transpositions.',
    stepByStep: [
      'Choose matrix dimensions (2x2, 3x3, 4x4).',
      'Enter elements into Matrix A and Matrix B.',
      'Select matrix operation (A + B, A - B, A × B, det(A), A⁻¹, Transpose A).',
      'View step-by-step matrix transformations and result matrix.',
    ],
    example: {
      scenario: 'Calculate determinant of 2x2 matrix [[4, 2], [3, 5]].',
      calculation: 'det(A) = (4 × 5) - (2 × 3) = 20 - 6 = 14.',
      result: 'det(A) = 14 (Non-singular matrix, inverse exists).',
    },
    faqs: [
      {
        q: 'When can two matrices be multiplied?',
        a: 'Matrix A (m × k) and Matrix B (k × n) can only be multiplied if the number of columns in A equals the number of rows in B.',
      },
      {
        q: 'What is a singular matrix?',
        a: 'A matrix with determinant equal to 0 is called singular; its inverse does not exist.',
      },
      {
        q: 'How is matrix transpose calculated?',
        a: 'Transposition swaps rows and columns such that element A_ij becomes A_ji.',
      },
    ],
  },

  'perm-comb': {
    title: 'Permutation & Combination Calculator (nPr & nCr): Combinatorics',
    formula: 'Permutation: nPr = n! / (n - r)!\nCombination: nCr = n! / (r! × (n - r)!)',
    overview:
      'Calculate permutations (arrangements where order matters) and combinations (selections where order does not matter) with full factorial expansions and combinatorial identities.',
    stepByStep: [
      'Enter total items (n) and selected items (r) such that 0 ≤ r ≤ n.',
      'Select calculation mode (nPr or nCr).',
      'The calculator computes intermediate factorials and final count of arrangements/combinations.',
    ],
    example: {
      scenario: 'Select 3 representatives from a class of 10 students (n=10, r=3).',
      calculation: '10C3 = 10! / (3! × 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120.',
      result: '120 distinct combinations possible.',
    },
    faqs: [
      {
        q: 'What is the key difference between nPr and nCr?',
        a: 'Use Permutation (nPr) when order is important (e.g. race positions, passwords). Use Combination (nCr) when order is irrelevant (e.g. team selection, lottery numbers).',
      },
      {
        q: 'What is the value of 0! (zero factorial)?',
        a: 'By mathematical convention and definition, 0! = 1.',
      },
      {
        q: 'What is the symmetry property of combinations?',
        a: 'nCr is always equal to nC(n-r). For instance, 10C8 = 10C2 = 45.',
      },
    ],
  },

  'probability-calc': {
    title: 'Probability Calculator & Event Simulator: Odds & Bayes Theorem',
    formula: 'P(A) = Favorable Outcomes / Total Sample Space\nP(A ∪ B) = P(A) + P(B) - P(A ∩ B) | P(A|B) = P(A ∩ B) / P(B)',
    overview:
      'Evaluate theoretical probabilities for single and compound events, independent and mutually exclusive events, conditional probability, and complement odds, alongside simulated dice rolls and coin toss generators.',
    stepByStep: [
      'Select probability mode (Single Event, Compound Union/Intersection, or Bayes Conditional).',
      'Input favorable outcomes and total sample space size.',
      'View probability expressed as a decimal (0 to 1), percentage (0% to 100%), and odds ratio.',
    ],
    example: {
      scenario: 'Rolling a standard 6-sided die: probability of rolling an even number (2, 4, 6).',
      calculation: 'Favorable = 3 | Sample Space = 6 | P(Even) = 3 / 6 = 0.50.',
      result: 'P = 0.50 (50.0% / 1 in 2 chance).',
    },
    faqs: [
      {
        q: 'What is the range of valid probability values?',
        a: 'Probability is always between 0 (impossible event) and 1 (certain event), or 0% to 100%.',
      },
      {
        q: 'How does conditional probability P(A|B) work?',
        a: 'It computes the probability of event A occurring given that event B has already occurred.',
      },
      {
        q: 'What is the Law of Large Numbers in simulations?',
        a: 'As the number of simulated trials increases, the experimental frequency converges to the exact theoretical probability.',
      },
    ],
  },

  'unit-converter': {
    title: 'Comprehensive Unit Converter: Metric, Imperial & Engineering Units',
    formula: 'Standard SI conversions across Length, Weight, Temperature, Area, Speed, Volume, and Data Storage.',
    overview:
      'Instant conversion across 80+ scientific, engineering, and regional units. Supports Metric, Imperial (US/UK), and Indian land/weight measures (Bigha, Guntha, Quintal, Tola).',
    stepByStep: [
      'Select category (Length, Mass, Temperature, Area, Volume, Speed, Data).',
      'Choose source unit and destination unit.',
      'Enter quantity for instantaneous, multi-decimal precision conversion.',
    ],
    example: {
      scenario: 'Convert 100 Celsius (°C) to Fahrenheit (°F).',
      calculation: '°F = (100 × 9/5) + 32 = 180 + 32 = 212°F.',
      result: '100°C = 212°F.',
    },
    faqs: [
      {
        q: 'How many bytes are in 1 Gigabyte (GB) vs 1 Gibibyte (GiB)?',
        a: '1 GB (decimal) = 1,000,000,000 bytes (10⁹). 1 GiB (binary) = 1,073,741,824 bytes (2³⁰).',
      },
      {
        q: 'Are Indian units like Bigha and Guntha standardized?',
        a: 'The converter uses standard state gazetted definitions (e.g., 1 Guntha = 1,089 sq ft).',
      },
      {
        q: 'What is the exact conversion for 1 meter to feet?',
        a: '1 meter = 3.28084 feet.',
      },
    ],
  },

  'pomodoro': {
    title: 'Pomodoro Study Timer: 25/5 Focus Cycles & Lo-Fi Study Audio',
    formula: '25 min Focused Study + 5 min Short Break × 4 Cycles → 15-30 min Long Restorative Break',
    overview:
      'The Pomodoro Technique is an evidence-based cognitive time-management methodology designed by Francesco Cirillo. It breaks deep learning tasks into 25-minute uninterrupted intervals to maximize working memory retention and prevent burnout, supplemented by built-in ambient study sounds (Rain, Cafe, White Noise).',
    stepByStep: [
      'Pick a single academic subject or study task.',
      'Start the 25-minute Pomodoro focus interval without multitasking or phone distractions.',
      'When the alarm chimes, take a mandatory 5-minute break (stretch, hydrate).',
      'After completing 4 study pomodoros, enjoy a relaxing 15-30 minute long break.',
    ],
    example: {
      scenario: 'Studying 2 chapters of Physics over a 2-hour study block.',
      calculation: '4 Pomodoro sessions (100 mins total deep study) + 3 short breaks (15 mins) + 1 long break.',
      result: '100 minutes of 100% focused study completed with zero mental fatigue.',
    },
    faqs: [
      {
        q: 'Can I customize the timer intervals (e.g. 50/10 rule)?',
        a: 'Yes, you can customize focus intervals from 15 to 90 minutes in timer settings.',
      },
      {
        q: 'How do ambient study sounds help concentration?',
        a: 'Pink/white noise and rain sounds mask background auditory distractions, helping the prefrontal cortex sustain focus.',
      },
      {
        q: 'Does the timer work if I switch browser tabs?',
        a: 'Yes, the audio and timer countdown run continuously in the background.',
      },
    ],
  },

  'study-timer': {
    title: 'Study Stopwatch & Session Tracker: Subject-Wise Hours Logging',
    formula: 'Total Study Time = ∑ (Subject Session Intervals) | Split Lap = Current Time - Previous Lap Time',
    overview:
      'Track dedicated daily and weekly study hours per subject. Features precision millisecond stopwatch, lap timing for practice question sets, and real-time session logs.',
    stepByStep: [
      'Select or type your current subject (e.g., Mathematics, Organic Chemistry, Biology).',
      'Start the stopwatch when you begin active problem solving.',
      'Record lap splits for individual question sets or mock exam sections.',
      'Save session logs to evaluate your daily preparation consistency.',
    ],
    example: {
      scenario: 'Tracking 3 mock test question sets: Lap 1 = 25:10, Lap 2 = 22:45, Lap 3 = 19:30.',
      calculation: 'Total Study Duration = 25m 10s + 22m 45s + 19m 30s = 1 hr 07m 25s.',
      result: 'Completed 3 question sets in 67 minutes 25 seconds.',
    },
    faqs: [
      {
        q: 'Are my logged study sessions saved if I refresh the page?',
        a: 'Yes, session history is stored locally in your browser storage.',
      },
      {
        q: 'Can I use lap timing to measure my speed per question in mock exams?',
        a: 'Yes, press the Lap button after completing each question to record speed per question.',
      },
      {
        q: 'Is there a limit on session duration?',
        a: 'No limit, supports continuous multi-hour study and revision sessions.',
      },
    ],
  },

  'pdf-tools': {
    title: 'Client-Side PDF Tools: Merge, Split & Convert (100% Private)',
    formula: 'Local WebAssembly & pdf-lib Memory Execution: Zero Uploads to Remote Servers',
    overview:
      'Secure, 100% private in-browser PDF suite. Unlike traditional PDF websites that upload sensitive certificates, admit cards, marksheets, and Aadhaar documents to remote third-party cloud servers, MyStudentDesk processes all PDF files entirely in your browser memory using WebAssembly.',
    stepByStep: [
      'Select PDF action: Merge Multiple PDFs, Split/Extract Pages, or Image to PDF.',
      'Drag and drop your document files.',
      'Reorder pages or specify page extraction ranges.',
      'Click Process to instantly download the generated PDF file without internet upload latency.',
    ],
    example: {
      scenario: 'Merging 3 assignment scan pages (PDF A, PDF B, PDF C) into a single submission PDF.',
      calculation: 'Local byte stream concatenation in browser sandbox using pdf-lib.',
      result: 'Combined PDF generated in under 1 second without uploading a single byte to external servers.',
    },
    faqs: [
      {
        q: 'Is it completely safe to process private certificates and ID proofs here?',
        a: 'Yes, 100% safe. No file bytes or personal data ever leave your computer or touch any server.',
      },
      {
        q: 'Does it work offline without an active internet connection?',
        a: 'Yes, once the website is loaded, all PDF merging, splitting, and conversions function completely offline.',
      },
      {
        q: 'What is the maximum file size supported?',
        a: 'Supports large documents up to several hundred megabytes, limited only by your device memory.',
      },
    ],
  },

  'qr-gen': {
    title: 'QR Code Generator: Study Notes, Wi-Fi, Links & Custom Styling',
    formula: 'Reed-Solomon Error Correction Algorithm with 2D Quick Response Matrix Encoding',
    overview:
      'Generate customizable, high-resolution QR codes for sharing study notes, project URLs, Wi-Fi credentials, contact cards, and text snippets. Customise foreground/background colors and download high-dpi PNG images instantly.',
    stepByStep: [
      'Select QR payload type: URL Link, Plain Text / Notes, or Wi-Fi Network.',
      'Enter content details and configure custom colors.',
      'Download the crisp QR code image or copy it directly to your clipboard.',
    ],
    example: {
      scenario: 'Create a QR code for a Google Drive folder containing semester revision notes.',
      calculation: 'Encodes URL into 2D matrix with Level-H error correction.',
      result: 'High-resolution PNG QR ready for printing on student project binders or presentations.',
    },
    faqs: [
      {
        q: 'Do generated QR codes expire?',
        a: 'No. These are standard static QR codes that never expire and contain direct embedded data.',
      },
      {
        q: 'Can QR codes be scanned with any smartphone camera?',
        a: 'Yes, fully compatible with all native iOS and Android camera apps and barcode scanners.',
      },
      {
        q: 'How does Wi-Fi QR code connecting work?',
        a: 'Scanning a Wi-Fi QR code automatically connects smartphones to the network without manually typing passwords.',
      },
    ],
  },

  'citation-gen': {
    title: 'Academic Citation Generator: APA 7th, MLA 9th, IEEE & Harvard',
    formula: 'APA: Author, A. A. (Year). Title. Publisher. DOI/URL\nMLA: Author. Title. Publisher, Year.\nIEEE: [1] J. Author, "Title," Journal, vol. x, 2024.',
    overview:
      'Automatic bibliography citation generator adhering to international academic formatting standards (APA 7th Edition, MLA 9th Edition, IEEE, Harvard, and Chicago). Perfect for research papers, college thesis dissertations, and project reports.',
    stepByStep: [
      'Select source type: Book, Research Journal Article, Website, or Educational Video.',
      'Enter author names, publication title, year, and publisher or URL.',
      'Choose citation format (APA 7, MLA 9, IEEE, Harvard).',
      'Copy the perfectly punctuated citation directly to your bibliography references list.',
    ],
    example: {
      scenario: 'Cite a physics research book: Halliday, Resnick, Walker (2020), Fundamentals of Physics, Wiley.',
      calculation: 'APA 7th formatting rules applied.',
      result: 'Halliday, D., Resnick, R., & Walker, J. (2020). *Fundamentals of Physics* (11th ed.). Wiley.',
    },
    faqs: [
      {
        q: 'Which citation style is used for Engineering vs Psychology vs Humanities?',
        a: 'Engineering & Computer Science uses IEEE; Sciences and Psychology use APA 7th; Literature and Humanities use MLA 9th.',
      },
      {
        q: 'How do citations protect against plagiarism in student projects?',
        a: 'Properly referencing academic sources credits original authors and satisfies university plagiarism software requirements (Turnitin, Urkund).',
      },
      {
        q: 'Can I generate citations for YouTube videos and online articles?',
        a: 'Yes, choose Website or Video mode and input the URL and author/creator information.',
      },
    ],
  },

  'word-counter': {
    title: 'Word, Character & Reading Time Counter: Essay & Text Analyzer',
    formula: 'Words = Count of Whitespace Delimited Tokens | Reading Time = Words / 200 wpm | Speaking Time = Words / 130 wpm',
    overview:
      'Real-time text analytics tool evaluating word count, character count (with and without spaces), sentence count, paragraph count, estimated reading/speaking duration, and text case conversions (Uppercase, Lowercase, Title Case).',
    stepByStep: [
      'Paste or type your essay, assignment, or thesis text into the editor.',
      'View live counts of words, characters, sentences, and paragraphs.',
      'Check estimated presentation speaking time and reading duration.',
      'Convert text case with 1-click transformation buttons.',
    ],
    example: {
      scenario: 'Analyzing a 1,000-word college application essay.',
      calculation: 'Words: 1000 | Characters: ~5800 | Reading Time: 1000 / 200 = 5.0 mins | Speaking Time: 1000 / 130 = 7.7 mins.',
      result: '5 minutes reading duration | 7 minutes 40 seconds speaking presentation.',
    },
    faqs: [
      {
        q: 'What is standard reading speed for students?',
        a: 'Average adult reading speed is 200 to 250 words per minute (WPM). Speaking speed for presentations is ~130 WPM.',
      },
      {
        q: 'Is character limit with or without spaces used for college forms?',
        a: 'Most application portals (such as UCAS, Common App) measure characters including spaces.',
      },
      {
        q: 'Is my pasted text stored or sent to any server?',
        a: 'No, all text analysis runs 100% locally in your browser memory with zero external transmission.',
      },
    ],
  },

  'age-calc': {
    title: 'Chronological Age & Milestone Calculator: Date of Birth Analyzer',
    formula: 'Exact Age = Target Date - Date of Birth (in Years, Months, Days, and Hours)',
    overview:
      'Compute precise chronological age down to the day, hours, and minutes lived. Calculates days remaining until next birthday, day of the week you were born, and age criteria eligibility for government exam applications (UPSC, SSC, Banking, Defense).',
    stepByStep: [
      'Select your Date of Birth.',
      'Choose reference target date (defaults to today, or set custom exam eligibility cutoff date).',
      'The tool computes exact years, months, days, total weeks, and birthday countdown.',
    ],
    example: {
      scenario: 'Born on 15 August 2005, evaluated on 28 August 2026.',
      calculation: 'Age = 21 Years, 0 Months, 13 Days | Days lived = ~7,683 days.',
      result: '21 Years 13 Days old | Next birthday in 352 days.',
    },
    faqs: [
      {
        q: 'How to calculate age eligibility for competitive exam cutoffs?',
        a: 'Set the reference date to the official notification cutoff date (e.g. 1st August of the exam year).',
      },
      {
        q: 'Does the calculator account for leap years?',
        a: 'Yes, all leap year calendar variations (February 29) are mathematically accounted for.',
      },
      {
        q: 'Can I find out what day of the week I was born on?',
        a: 'Yes, the results card displays the exact weekday of your birth date.',
      },
    ],
  },

  'date-diff': {
    title: 'Date Difference & Working Days Calculator: Study Schedule Planner',
    formula: 'Total Duration = End Date - Start Date\nWorking Days = Total Days - (Weekends + Declared Holidays)',
    overview:
      'Calculate duration between two dates in total days, weeks, months, and working business days (excluding Saturdays and Sundays). Ideal for creating exam revision timetables, assignment countdowns, and semester timelines.',
    stepByStep: [
      'Select start date and target end date.',
      'Toggle weekend inclusion/exclusion (Saturday/Sunday).',
      'View total calendar days, working study days, and total weeks breakdown.',
    ],
    example: {
      scenario: 'Exam preparation timeline from 1 September to 15 November.',
      calculation: 'Total Calendar Days = 75 days | Working Days (Mon-Fri) = 55 study days.',
      result: '75 total days (10 weeks 5 days) / 55 focused study days available.',
    },
    faqs: [
      {
        q: 'Can I exclude only Sundays or both Saturdays and Sundays?',
        a: 'You can customize weekend rules to exclude Sundays only or full 2-day weekends.',
      },
      {
        q: 'Does it calculate future date addition (e.g. date + 90 days)?',
        a: 'Yes, supports both date difference between two dates and adding/subtracting days from a date.',
      },
      {
        q: 'Is it helpful for gate/neet countdown study plans?',
        a: 'Essential for breaking syllabus chapters evenly across available working days.',
      },
    ],
  },

  'bmi-calc': {
    title: 'BMI & Student Health Calculator: Ideal Weight & Daily Nutrition Guide',
    formula: 'BMI = Weight (kg) / (Height (m))²\nCategories: Underweight (<18.5), Normal (18.5 - 24.9), Overweight (25.0 - 29.9), Obese (≥30.0)',
    overview:
      'Evaluate your Body Mass Index (BMI) using World Health Organization (WHO) standards. Computes healthy weight target brackets for your height, alongside recommended daily water hydration and balanced nutrition guidelines for active students.',
    stepByStep: [
      'Enter weight in kilograms (kg) or pounds (lbs).',
      'Enter height in centimeters (cm) or feet/inches.',
      'Select biological sex and age for calibrated health benchmarks.',
      'The tool computes your BMI, weight status category, and recommended daily water intake.',
    ],
    example: {
      scenario: 'Student height 175 cm (1.75 m) and weight 68 kg.',
      calculation: 'BMI = 68 / (1.75)² = 68 / 3.0625 = 22.20 kg/m².',
      result: 'BMI = 22.20 (Normal Healthy Weight category). Ideal weight range: 57 kg - 76 kg.',
    },
    faqs: [
      {
        q: 'What is the healthy BMI range for Asian students?',
        a: 'According to WHO Asian guidelines, normal healthy BMI is 18.5 to 22.9 kg/m².',
      },
      {
        q: 'How much water should a student drink daily during exam study?',
        a: 'The general recommendation is 35 ml per kg of body weight (approx. 2.5 to 3.5 liters daily) to maintain cognitive alertness.',
      },
      {
        q: 'Does BMI distinguish between muscle mass and body fat?',
        a: 'BMI is a general screening index; athletes with high muscle mass may register higher BMI without excess body fat.',
      },
    ],
  },
};
