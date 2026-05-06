export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'hi' | 'ar' | 'pt' | 'ja' | 'tl';
export type Mode = 'calculator' | 'converter';

export interface Translation {
  title: string;
  calculator: string;
  converter: string;
  scientific: string;
  weight: string;
  measurement: string;
  clear: string;
  delete: string;
  result: string;
  selectUnit: string;
  from: string;
  to: string;
  darkMode: string;
  lightMode: string;
  language: string;
}

export type Translations = Record<Language, Translation>;

export interface UnitCategory {
  id: string;
  label: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  label: string;
  ratio: number; // relative to base unit (kg for weight, meters for measurement)
}
