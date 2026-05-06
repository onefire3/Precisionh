import { UnitCategory } from '../types';

export const unitCategories: UnitCategory[] = [
  {
    id: 'weight',
    label: 'weight',
    units: [
      { id: 'kg', label: 'kg', ratio: 1 },
      { id: 'g', label: 'g', ratio: 0.001 },
      { id: 'lb', label: 'lb', ratio: 0.453592 },
      { id: 'oz', label: 'oz', ratio: 0.0283495 },
    ],
  },
  {
    id: 'measurement',
    label: 'measurement',
    units: [
      { id: 'm', label: 'm', ratio: 1 },
      { id: 'km', label: 'km', ratio: 1000 },
      { id: 'ft', label: 'ft', ratio: 0.3048 },
      { id: 'in', label: 'in', ratio: 0.0254 },
      { id: 'mi', label: 'mi', ratio: 1609.34 },
    ],
  },
];

export function convertUnits(value: number, fromUnitId: string, toUnitId: string, categoryId: string): number {
  const category = unitCategories.find((c) => c.id === categoryId);
  if (!category) return 0;

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return 0;

  // Convert to base unit then to target unit
  const valueInBase = value * fromUnit.ratio;
  return valueInBase / toUnit.ratio;
}

export function evaluateExpression(expression: string): string {
  try {
    // Replace visual symbols with math equivalents
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**');

    // Basic safety check: only allow numbers, operators, and Math functions
    const result = new Function(`return ${sanitized}`)();
    
    if (isNaN(result) || !isFinite(result)) return 'Error';
    
    // Format result: limit decimals if they are too long
    const strResult = result.toString();
    return strResult.length > 12 ? result.toPrecision(8) : strResult;
  } catch (error) {
    return 'Error';
  }
}
