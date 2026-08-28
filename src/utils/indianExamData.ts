// Indian Competitive Exams and Academic Data & Models

export interface JeePredictionResult {
  marks: number;
  percentileMin: number;
  percentileMax: number;
  estimatedPercentile: number;
  airRankMin: number;
  airRankMax: number;
  estimatedAir: number;
  categoryRank: number;
  isJeeAdvQualified: boolean;
  categoryCutoffs: { category: string; cutoffPercentile: number; status: 'Cleared' | 'Borderline' | 'Not Cleared' }[];
  collegePredictions: { collegeType: string; branch: string; chance: 'High' | 'Moderate' | 'Low' }[];
}

export const JEE_TOTAL_CANDIDATES = 1450000;

export function predictJeeRank(marks: number, category: string, difficulty: 'easy' | 'moderate' | 'hard' = 'moderate'): JeePredictionResult {
  const m = Math.max(0, Math.min(300, marks));
  
  // Difficulty shift offset (Hard shifts give higher percentile for same marks)
  let shiftMultiplier = 1.0;
  if (difficulty === 'easy') shiftMultiplier = 0.95;
  if (difficulty === 'hard') shiftMultiplier = 1.06;

  // Calibrated marks to percentile curve
  let basePercentile = 0;
  if (m >= 280) basePercentile = 99.9 + ((m - 280) / 20) * 0.09;
  else if (m >= 240) basePercentile = 99.4 + ((m - 240) / 40) * 0.5;
  else if (m >= 200) basePercentile = 98.8 + ((m - 200) / 40) * 0.6;
  else if (m >= 160) basePercentile = 97.2 + ((m - 160) / 40) * 1.6;
  else if (m >= 130) basePercentile = 94.8 + ((m - 130) / 30) * 2.4;
  else if (m >= 100) basePercentile = 89.5 + ((m - 100) / 30) * 5.3;
  else if (m >= 75) basePercentile = 80.0 + ((m - 75) / 25) * 9.5;
  else if (m >= 50) basePercentile = 63.0 + ((m - 50) / 25) * 17.0;
  else if (m >= 30) basePercentile = 42.0 + ((m - 30) / 20) * 21.0;
  else basePercentile = (m / 30) * 42.0;

  const adjustedPercentile = Math.min(99.99, Math.max(0.1, basePercentile * shiftMultiplier));
  const percentileMin = Math.max(0.1, Number((adjustedPercentile - 0.35).toFixed(2)));
  const percentileMax = Math.min(99.99, Number((adjustedPercentile + 0.35).toFixed(2)));
  const estimatedPercentile = Number(adjustedPercentile.toFixed(2));

  // Rank estimation formula
  const airRankMin = Math.max(1, Math.round(((100 - percentileMax) / 100) * JEE_TOTAL_CANDIDATES));
  const airRankMax = Math.max(1, Math.round(((100 - percentileMin) / 100) * JEE_TOTAL_CANDIDATES));
  const estimatedAir = Math.max(1, Math.round(((100 - estimatedPercentile) / 100) * JEE_TOTAL_CANDIDATES));

  // Category Rank Multipliers
  let catRatio = 1.0;
  if (category === 'OBC-NCL') catRatio = 0.28;
  else if (category === 'EWS') catRatio = 0.12;
  else if (category === 'SC') catRatio = 0.07;
  else if (category === 'ST') catRatio = 0.035;
  else if (category === 'PwD') catRatio = 0.005;

  const categoryRank = Math.max(1, Math.round(estimatedAir * catRatio));

  const standardCutoffs = [
    { category: 'General (UR)', cutoffPercentile: 93.2 },
    { category: 'Gen-EWS', cutoffPercentile: 81.3 },
    { category: 'OBC-NCL', cutoffPercentile: 79.5 },
    { category: 'SC', cutoffPercentile: 60.1 },
    { category: 'ST', cutoffPercentile: 46.7 },
    { category: 'PwD', cutoffPercentile: 0.1 },
  ];

  const categoryCutoffs = standardCutoffs.map(c => {
    let status: 'Cleared' | 'Borderline' | 'Not Cleared' = 'Not Cleared';
    if (estimatedPercentile >= c.cutoffPercentile + 1.0) status = 'Cleared';
    else if (estimatedPercentile >= c.cutoffPercentile - 1.0) status = 'Borderline';
    return { ...c, status };
  });

  const myCutoff = standardCutoffs.find(c => c.category.toLowerCase().includes(category.toLowerCase())) || standardCutoffs[0];
  const isJeeAdvQualified = estimatedPercentile >= myCutoff.cutoffPercentile;

  // College chances
  const collegePredictions = [
    {
      collegeType: 'Top 5 NITs (Trichy, Surathkal, Warangal)',
      branch: 'CSE / Data Science',
      chance: estimatedAir <= 3500 ? 'High' : (estimatedAir <= 7000 ? 'Moderate' : 'Low') as 'High' | 'Moderate' | 'Low'
    },
    {
      collegeType: 'Top 5 NITs',
      branch: 'ECE / Mechanical / Electrical',
      chance: estimatedAir <= 12000 ? 'High' : (estimatedAir <= 20000 ? 'Moderate' : 'Low') as 'High' | 'Moderate' | 'Low'
    },
    {
      collegeType: 'Top IIITs (Hyderabad, Allahabad, Bangalore)',
      branch: 'CSE / IT',
      chance: estimatedAir <= 8000 ? 'High' : (estimatedAir <= 15000 ? 'Moderate' : 'Low') as 'High' | 'Moderate' | 'Low'
    },
    {
      collegeType: 'Mid NITs (Calicut, Rourkela, Jaipur, Kurukshetra)',
      branch: 'CSE / IT / ECE',
      chance: estimatedAir <= 22000 ? 'High' : (estimatedAir <= 35000 ? 'Moderate' : 'Low') as 'High' | 'Moderate' | 'Low'
    },
    {
      collegeType: 'Newer NITs / IIITs / GFTIs',
      branch: 'Core / Emerging Tech',
      chance: estimatedAir <= 55000 ? 'High' : (estimatedAir <= 85000 ? 'Moderate' : 'Low') as 'High' | 'Moderate' | 'Low'
    }
  ];

  return {
    marks: m,
    percentileMin,
    percentileMax,
    estimatedPercentile,
    airRankMin,
    airRankMax,
    estimatedAir,
    categoryRank,
    isJeeAdvQualified,
    categoryCutoffs,
    collegePredictions
  };
}

export interface NeetPredictionResult {
  totalMarks: number;
  physicsMarks: number;
  chemistryMarks: number;
  biologyMarks: number;
  estimatedAir: number;
  airRange: string;
  categoryRank: number;
  qualificationStatus: 'Qualified' | 'Not Qualified';
  govtMBSChance: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Private/Deemed Only';
  bdsAyushChance: 'High' | 'Moderate' | 'Low';
}

export function calculateNeetScore(
  physicsCorrect: number, physicsWrong: number,
  chemCorrect: number, chemWrong: number,
  bioCorrect: number, bioWrong: number,
  category: string
): NeetPredictionResult {
  const pMarks = Math.max(-45, (physicsCorrect * 4) - (physicsWrong * 1));
  const cMarks = Math.max(-45, (chemCorrect * 4) - (chemWrong * 1));
  const bMarks = Math.max(-90, (bioCorrect * 4) - (bioWrong * 1));
  const total = Math.max(0, Math.min(720, pMarks + cMarks + bMarks));

  let air = 1;
  let airRange = "1 - 100";

  if (total >= 710) { air = Math.round(1 + ((720 - total) * 15)); airRange = "1 - 150"; }
  else if (total >= 690) { air = Math.round(150 + ((710 - total) / 20) * 1500); airRange = "150 - 1,800"; }
  else if (total >= 670) { air = Math.round(1800 + ((690 - total) / 20) * 4500); airRange = "1,800 - 6,500"; }
  else if (total >= 640) { air = Math.round(6500 + ((670 - total) / 30) * 12000); airRange = "6,500 - 18,500"; }
  else if (total >= 600) { air = Math.round(18500 + ((640 - total) / 40) * 22000); airRange = "18,500 - 41,000"; }
  else if (total >= 550) { air = Math.round(41000 + ((600 - total) / 50) * 38000); airRange = "41,000 - 79,000"; }
  else if (total >= 500) { air = Math.round(79000 + ((550 - total) / 50) * 48000); airRange = "79,000 - 127,000"; }
  else if (total >= 400) { air = Math.round(127000 + ((500 - total) / 100) * 120000); airRange = "127,000 - 250,000"; }
  else if (total >= 300) { air = Math.round(250000 + ((400 - total) / 100) * 200000); airRange = "250,000 - 450,000"; }
  else { air = Math.round(450000 + ((300 - total) / 300) * 900000); airRange = "450,000+"; }

  let catRatio = 1.0;
  if (category === 'OBC') catRatio = 0.45;
  else if (category === 'EWS') catRatio = 0.15;
  else if (category === 'SC') catRatio = 0.08;
  else if (category === 'ST') catRatio = 0.035;

  const categoryRank = Math.max(1, Math.round(air * catRatio));
  const qualCutoff = category === 'General' ? 135 : 105;
  const qualificationStatus = total >= qualCutoff ? 'Qualified' : 'Not Qualified';

  let govtMBSChance: 'Very High' | 'High' | 'Moderate' | 'Low' | 'Private/Deemed Only' = 'Private/Deemed Only';
  if (total >= 660) govtMBSChance = 'Very High';
  else if (total >= 625) govtMBSChance = 'High';
  else if (total >= 595) govtMBSChance = 'Moderate';
  else if (total >= 550 && (category === 'SC' || category === 'ST' || category === 'OBC')) govtMBSChance = 'Moderate';
  else if (total >= 480 && (category === 'SC' || category === 'ST')) govtMBSChance = 'High';
  else if (total >= 540) govtMBSChance = 'Low';

  let bdsAyushChance: 'High' | 'Moderate' | 'Low' = 'Low';
  if (total >= 540) bdsAyushChance = 'High';
  else if (total >= 460) bdsAyushChance = 'Moderate';

  return {
    totalMarks: total,
    physicsMarks: pMarks,
    chemistryMarks: cMarks,
    biologyMarks: bMarks,
    estimatedAir: air,
    airRange,
    categoryRank,
    qualificationStatus,
    govtMBSChance,
    bdsAyushChance
  };
}

export const CBSE_GRADE_TABLE = [
  { grade: 'A1', min: 91, max: 100, gp: 10, remark: 'Outstanding' },
  { grade: 'A2', min: 81, max: 90, gp: 9, remark: 'Excellent' },
  { grade: 'B1', min: 71, max: 80, gp: 8, remark: 'Very Good' },
  { grade: 'B2', min: 61, max: 70, gp: 7, remark: 'Good' },
  { grade: 'C1', min: 51, max: 60, gp: 6, remark: 'Fair' },
  { grade: 'C2', min: 41, max: 50, gp: 5, remark: 'Average' },
  { grade: 'D', min: 33, max: 40, gp: 4, remark: 'Pass' },
  { grade: 'E', min: 0, max: 32, gp: 0, remark: 'Essential Repeat / Fail' },
];

export function getCbseGrade(marks: number) {
  const row = CBSE_GRADE_TABLE.find(r => marks >= r.min && marks <= r.max);
  return row || CBSE_GRADE_TABLE[CBSE_GRADE_TABLE.length - 1];
}
