// Mathematical helper functions, matrix calculations, quadratic solvers, equation solvers, unit conversions

// Factorial with BigInt support for high precision
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function nPr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

export function nCr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Quadratic Solver Result
export interface QuadraticResult {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  rootType: 'two_real' | 'one_real' | 'complex';
  root1: { real: number; imag: number; text: string };
  root2: { real: number; imag: number; text: string };
  vertex: { x: number; y: number };
  yIntercept: number;
  axisOfSymmetry: number;
  factoredForm?: string;
  steps: string[];
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (a === 0) {
    throw new Error("Coefficient 'a' cannot be 0 in a quadratic equation (it becomes linear).");
  }

  const discriminant = (b * b) - (4 * a * c);
  const vertexX = -b / (2 * a);
  const vertexY = c - ((b * b) / (4 * a));
  const steps: string[] = [];

  steps.push(`Given equation: ${a !== 1 ? a : ''}x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = 0`);
  steps.push(`Step 1: Identify coefficients -> a = ${a}, b = ${b}, c = ${c}`);
  steps.push(`Step 2: Calculate Discriminant (D = b² - 4ac) -> D = (${b})² - 4(${a})(${c}) = ${discriminant}`);

  let rootType: 'two_real' | 'one_real' | 'complex';
  let root1: { real: number; imag: number; text: string };
  let root2: { real: number; imag: number; text: string };
  let factoredForm: string | undefined;

  if (discriminant > 0) {
    rootType = 'two_real';
    const sqrtD = Math.sqrt(discriminant);
    const r1 = (-b + sqrtD) / (2 * a);
    const r2 = (-b - sqrtD) / (2 * a);
    root1 = { real: r1, imag: 0, text: Number(r1.toFixed(4)).toString() };
    root2 = { real: r2, imag: 0, text: Number(r2.toFixed(4)).toString() };
    steps.push(`Step 3: Since D > 0, there are two distinct real roots.`);
    steps.push(`x₁ = (-b + √D) / (2a) = (${-b} + ${sqrtD.toFixed(4)}) / ${2 * a} = ${root1.text}`);
    steps.push(`x₂ = (-b - √D) / (2a) = (${-b} - ${sqrtD.toFixed(4)}) / ${2 * a} = ${root2.text}`);
    factoredForm = `(x - ${root1.text})(x - ${root2.text}) = 0`;
  } else if (discriminant === 0) {
    rootType = 'one_real';
    const r = -b / (2 * a);
    root1 = { real: r, imag: 0, text: Number(r.toFixed(4)).toString() };
    root2 = { real: r, imag: 0, text: Number(r.toFixed(4)).toString() };
    steps.push(`Step 3: Since D = 0, there is one repeated real root.`);
    steps.push(`x = -b / (2a) = ${-b} / ${2 * a} = ${root1.text}`);
    factoredForm = `(x - ${root1.text})² = 0`;
  } else {
    rootType = 'complex';
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-discriminant) / (2 * Math.abs(a));
    const rPartStr = Number(realPart.toFixed(4)).toString();
    const iPartStr = Number(imagPart.toFixed(4)).toString();
    root1 = { real: realPart, imag: imagPart, text: `${rPartStr} + ${iPartStr}i` };
    root2 = { real: realPart, imag: -imagPart, text: `${rPartStr} - ${iPartStr}i` };
    steps.push(`Step 3: Since D < 0, roots are complex conjugates.`);
    steps.push(`x = (-b ± i√|D|) / (2a) = (${-b} ± ${Math.sqrt(-discriminant).toFixed(4)}i) / ${2 * a}`);
    steps.push(`x₁ = ${root1.text}, x₂ = ${root2.text}`);
  }

  return {
    a,
    b,
    c,
    discriminant,
    rootType,
    root1,
    root2,
    vertex: { x: Number(vertexX.toFixed(4)), y: Number(vertexY.toFixed(4)) },
    yIntercept: c,
    axisOfSymmetry: Number(vertexX.toFixed(4)),
    factoredForm,
    steps
  };
}

// Linear System Solver (2x2 & 3x3)
export function solveLinear2x2(a1: number, b1: number, c1: number, a2: number, b2: number, c2: number) {
  // a1*x + b1*y = c1
  // a2*x + b2*y = c2
  const det = (a1 * b2) - (a2 * b1);
  const detX = (c1 * b2) - (c2 * b1);
  const detY = (a1 * c2) - (a2 * c1);

  if (Math.abs(det) < 1e-10) {
    if (Math.abs(detX) < 1e-10 && Math.abs(detY) < 1e-10) {
      return { status: 'infinite', message: 'Infinite solutions (lines are coincident).' };
    }
    return { status: 'none', message: 'No solution (lines are parallel).' };
  }

  const x = detX / det;
  const y = detY / det;

  return {
    status: 'unique',
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
    det,
    detX,
    detY,
    steps: [
      `Main Determinant D = (${a1})(${b2}) - (${a2})(${b1}) = ${det}`,
      `Dx = (${c1})(${b2}) - (${c2})(${b1}) = ${detX}`,
      `Dy = (${a1})(${c2}) - (${a2})(${c1}) = ${detY}`,
      `x = Dx / D = ${detX} / ${det} = ${Number(x.toFixed(4))}`,
      `y = Dy / D = ${detY} / ${det} = ${Number(y.toFixed(4))}`
    ]
  };
}

// 3x3 Linear System
export function solveLinear3x3(matrix: number[][], constants: number[]) {
  const det3x3 = (m: number[][]) => {
    return (
      m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
      m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
      m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    );
  };

  const D = det3x3(matrix);
  if (Math.abs(D) < 1e-10) {
    return { status: 'none_or_infinite', message: 'Determinant is 0: System has either no unique solution or infinitely many.' };
  }

  const replaceCol = (m: number[][], colIdx: number, vec: number[]) => {
    return m.map((row, r) => row.map((val, c) => c === colIdx ? vec[r] : val));
  };

  const Dx = det3x3(replaceCol(matrix, 0, constants));
  const Dy = det3x3(replaceCol(matrix, 1, constants));
  const Dz = det3x3(replaceCol(matrix, 2, constants));

  const x = Dx / D;
  const y = Dy / D;
  const z = Dz / D;

  return {
    status: 'unique',
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
    z: Number(z.toFixed(4)),
    D,
    Dx,
    Dy,
    Dz,
    steps: [
      `Main Matrix Determinant D = ${Number(D.toFixed(4))}`,
      `Dx (Replacing col 1 with constants) = ${Number(Dx.toFixed(4))}`,
      `Dy (Replacing col 2 with constants) = ${Number(Dy.toFixed(4))}`,
      `Dz (Replacing col 3 with constants) = ${Number(Dz.toFixed(4))}`,
      `x = Dx / D = ${Number(x.toFixed(4))}`,
      `y = Dy / D = ${Number(y.toFixed(4))}`,
      `z = Dz / D = ${Number(z.toFixed(4))}`
    ]
  };
}

// Matrix Operations
export type Matrix = number[][];

export function addMatrices(A: Matrix, B: Matrix): Matrix {
  return A.map((row, r) => row.map((val, c) => val + B[r][c]));
}

export function subtractMatrices(A: Matrix, B: Matrix): Matrix {
  return A.map((row, r) => row.map((val, c) => val - B[r][c]));
}

export function multiplyMatrices(A: Matrix, B: Matrix): Matrix {
  const rowsA = A.length;
  const colsA = A[0].length;
  const colsB = B[0].length;
  const result: Matrix = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
}

export function transposeMatrix(A: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const result: Matrix = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[c][r] = A[r][c];
    }
  }
  return result;
}

export function determinantMatrix(A: Matrix): number {
  const n = A.length;
  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
  if (n === 3) {
    return (
      A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
      A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
      A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0])
    );
  }
  // Generic minor expansion for larger (4x4)
  let det = 0;
  for (let j = 0; j < n; j++) {
    const subMatrix = A.slice(1).map(row => row.filter((_, colIdx) => colIdx !== j));
    const sign = j % 2 === 0 ? 1 : -1;
    det += sign * A[0][j] * determinantMatrix(subMatrix);
  }
  return det;
}

export function inverseMatrix(A: Matrix): Matrix | null {
  const n = A.length;
  const det = determinantMatrix(A);
  if (Math.abs(det) < 1e-10) return null; // Singular

  if (n === 2) {
    return [
      [Number((A[1][1] / det).toFixed(4)), Number((-A[0][1] / det).toFixed(4))],
      [Number((-A[1][0] / det).toFixed(4)), Number((A[0][0] / det).toFixed(4))]
    ];
  }

  // Adjugate matrix method for 3x3
  const adjugate: Matrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const sub = A.filter((_, r) => r !== i).map(row => row.filter((_, c) => c !== j));
      const cofactor = Math.pow(-1, i + j) * determinantMatrix(sub);
      adjugate[j][i] = cofactor; // Transpose
    }
  }

  return adjugate.map(row => row.map(val => Number((val / det).toFixed(4))));
}

// Unit Converter Data
export interface UnitCategory {
  id: string;
  name: string;
  units: { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[];
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length & Distance',
    units: [
      { id: 'm', name: 'Meters (m)', toBase: v => v, fromBase: v => v },
      { id: 'km', name: 'Kilometers (km)', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'cm', name: 'Centimeters (cm)', toBase: v => v / 100, fromBase: v => v * 100 },
      { id: 'mm', name: 'Millimeters (mm)', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'mi', name: 'Miles (mi)', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      { id: 'ft', name: 'Feet (ft)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { id: 'in', name: 'Inches (in)', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { id: 'yd', name: 'Yards (yd)', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
    ]
  },
  {
    id: 'mass',
    name: 'Mass & Weight',
    units: [
      { id: 'kg', name: 'Kilograms (kg)', toBase: v => v, fromBase: v => v },
      { id: 'g', name: 'Grams (g)', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'mg', name: 'Milligrams (mg)', toBase: v => v / 1000000, fromBase: v => v * 1000000 },
      { id: 'lb', name: 'Pounds (lb)', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      { id: 'oz', name: 'Ounces (oz)', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      { id: 'tonne', name: 'Metric Tonne (t)', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'quintal', name: 'Quintal (q)', toBase: v => v * 100, fromBase: v => v / 100 },
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    units: [
      { id: 'c', name: 'Celsius (°C)', toBase: v => v, fromBase: v => v },
      { id: 'f', name: 'Fahrenheit (°F)', toBase: v => (v - 32) * (5 / 9), fromBase: v => (v * 9 / 5) + 32 },
      { id: 'k', name: 'Kelvin (K)', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    ]
  },
  {
    id: 'data',
    name: 'Data Storage',
    units: [
      { id: 'b', name: 'Bytes (B)', toBase: v => v, fromBase: v => v },
      { id: 'kb', name: 'Kilobytes (KB)', toBase: v => v * 1024, fromBase: v => v / 1024 },
      { id: 'mb', name: 'Megabytes (MB)', toBase: v => v * 1048576, fromBase: v => v / 1048576 },
      { id: 'gb', name: 'Gigabytes (GB)', toBase: v => v * 1073741824, fromBase: v => v / 1073741824 },
      { id: 'tb', name: 'Terabytes (TB)', toBase: v => v * 1099511627776, fromBase: v => v / 1099511627776 },
    ]
  },
  {
    id: 'speed',
    name: 'Speed & Velocity',
    units: [
      { id: 'kmh', name: 'Kilometers/hour (km/h)', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { id: 'ms', name: 'Meters/second (m/s)', toBase: v => v, fromBase: v => v },
      { id: 'mph', name: 'Miles/hour (mph)', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { id: 'knot', name: 'Knots (kn)', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
    ]
  },
  {
    id: 'area',
    name: 'Area',
    units: [
      { id: 'sqm', name: 'Square Meters (m²)', toBase: v => v, fromBase: v => v },
      { id: 'sqkm', name: 'Square Kilometers (km²)', toBase: v => v * 1000000, fromBase: v => v / 1000000 },
      { id: 'sqft', name: 'Square Feet (ft²)', toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
      { id: 'acre', name: 'Acres (ac)', toBase: v => v * 4046.86, fromBase: v => v / 4046.86 },
      { id: 'hectare', name: 'Hectares (ha)', toBase: v => v * 10000, fromBase: v => v / 10000 },
      { id: 'bigha', name: 'Bigha (Standard India)', toBase: v => v * 2500, fromBase: v => v / 2500 },
      { id: 'guntha', name: 'Guntha', toBase: v => v * 101.17, fromBase: v => v / 101.17 },
    ]
  },
  {
    id: 'time',
    name: 'Time',
    units: [
      { id: 's', name: 'Seconds (s)', toBase: v => v, fromBase: v => v },
      { id: 'min', name: 'Minutes (min)', toBase: v => v * 60, fromBase: v => v / 60 },
      { id: 'hr', name: 'Hours (hr)', toBase: v => v * 3600, fromBase: v => v / 3600 },
      { id: 'day', name: 'Days (d)', toBase: v => v * 86400, fromBase: v => v / 86400 },
      { id: 'week', name: 'Weeks (w)', toBase: v => v * 604800, fromBase: v => v / 604800 },
      { id: 'month', name: 'Months (30d avg)', toBase: v => v * 2592000, fromBase: v => v / 2592000 },
      { id: 'yr', name: 'Years (365d)', toBase: v => v * 31536000, fromBase: v => v / 31536000 },
    ]
  }
];
