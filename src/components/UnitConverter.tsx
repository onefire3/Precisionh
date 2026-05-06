import { ArrowRightLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { convertUnits, unitCategories } from '../lib/mathUtils';
import { Translation } from '../types';

interface UnitConverterProps {
  t: Translation;
}

export const UnitConverter: React.FC<UnitConverterProps> = ({ t }) => {
  const [categoryId, setCategoryId] = useState(unitCategories[0].id);
  const [fromUnit, setFromUnit] = useState(unitCategories[0].units[0].id);
  const [toUnit, setToUnit] = useState(unitCategories[0].units[1].id);
  const [inputValue, setInputValue] = useState('1');
  const [result, setResult] = useState<number>(0);

  const currentCategory = unitCategories.find(c => c.id === categoryId)!;

  useEffect(() => {
    const val = parseFloat(inputValue) || 0;
    setResult(convertUnits(val, fromUnit, toUnit, categoryId));
  }, [inputValue, fromUnit, toUnit, categoryId]);

  const handleCategoryChange = (newId: string) => {
    setCategoryId(newId);
    const cat = unitCategories.find(c => c.id === newId)!;
    setFromUnit(cat.units[0].id);
    setToUnit(cat.units[1].id);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      {/* Category Tabs */}
      <div className="flex gap-2 p-1 bg-white/10 dark:bg-black/20 rounded-2xl">
        {unitCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              categoryId === cat.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/10'
            }`}
          >
            {t[cat.id as keyof typeof t]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {/* From Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
            {t.from}
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl px-5 py-4 text-2xl font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-24 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl px-3 py-4 text-center font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {currentCategory.units.map((u) => (
                <option key={u.id} value={u.id} className="dark:bg-slate-800">
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={swapUnits}
            className="p-3 bg-indigo-600 rounded-full text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
            aria-label="Swap units"
          >
            <ArrowRightLeft size={20} />
          </button>
        </div>

        {/* To Result */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
            {t.to}
          </label>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl px-5 py-4 text-2xl font-mono text-slate-400 dark:text-slate-400">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-24 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl px-3 py-4 text-center font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {currentCategory.units.map((u) => (
                <option key={u.id} value={u.id} className="dark:bg-slate-800">
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-auto bg-indigo-100/30 dark:bg-indigo-900/20 p-5 rounded-3xl border border-indigo-200/50 dark:border-indigo-400/10">
        <p className="text-xs text-indigo-600 dark:text-indigo-400 uppercase font-black tracking-tighter mb-1">
          {t.result}
        </p>
        <p className="text-3xl font-light text-slate-900 dark:text-white break-all">
          {result.toLocaleString(undefined, { maximumFractionDigits: 10 })} {toUnit}
        </p>
      </div>
    </div>
  );
};
