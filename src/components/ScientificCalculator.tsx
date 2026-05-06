import { Delete, History } from 'lucide-react';
import React, { useState } from 'react';
import { evaluateExpression } from '../lib/mathUtils';
import { Translation } from '../types';

interface ScientificCalculatorProps {
  t: Translation;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ t }) => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const append = (value: string) => {
    if (isCalculated) {
      if (['+', '-', '×', '÷', '^', '%'].includes(value)) {
        setDisplay(display + value);
      } else {
        setDisplay(value);
      }
      setIsCalculated(false);
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const clear = () => {
    setDisplay('0');
    setIsCalculated(false);
  };

  const removeLast = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const calculate = () => {
    const result = evaluateExpression(display);
    if (result !== 'Error') {
      setHistory((prev) => [display + ' = ' + result, ...prev].slice(0, 5));
    }
    setDisplay(result);
    setIsCalculated(true);
  };

  const buttons = [
    { label: 'sin', type: 'sci', val: 'sin(' },
    { label: 'cos', type: 'sci', val: 'cos(' },
    { label: 'tan', type: 'sci', val: 'tan(' },
    { label: 'ln', type: 'sci', val: 'ln(' },
    { label: 'log', type: 'sci', val: 'log(' },
    { label: 'π', type: 'sci', val: 'π' },
    { label: 'e', type: 'sci', val: 'e' },
    { label: '^', type: 'op', val: '^' },
    { label: '√', type: 'sci', val: '√(' },
    { label: '(', type: 'op', val: '(' },
    { label: ')', type: 'op', val: ')' },
    { label: t.clear, type: 'action', action: clear },
    { label: '÷', type: 'op', val: '÷' },
    { label: '7', type: 'num', val: '7' },
    { label: '8', type: 'num', val: '8' },
    { label: '9', type: 'num', val: '9' },
    { label: '×', type: 'op', val: '×' },
    { label: '4', type: 'num', val: '4' },
    { label: '5', type: 'num', val: '5' },
    { label: '6', type: 'num', val: '6' },
    { label: '-', type: 'op', val: '-' },
    { label: '1', type: 'num', val: '1' },
    { label: '2', type: 'num', val: '2' },
    { label: '3', type: 'num', val: '3' },
    { label: '+', type: 'op', val: '+' },
    { label: '0', type: 'num', val: '0' },
    { label: '.', type: 'num', val: '.' },
    { label: 'DEL', type: 'action', action: removeLast, icon: <Delete size={20} /> },
    { label: '=', type: 'equal', action: calculate },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4 text-right">
        <div className="h-16 flex flex-col justify-end items-end overflow-hidden">
          {history.length > 0 && (
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-1 flex items-center gap-1 opacity-60">
              <History size={12} />
              {history[0].split('=')[0]}
            </div>
          )}
          <div className="text-3xl font-light tracking-tight text-slate-900 dark:text-white font-mono break-all line-clamp-2 leading-tight">
            {display}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 flex-grow">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => (btn.action ? btn.action() : append(btn.val!))}
            className={`calc-btn ${
              btn.type === 'num'
                ? 'calc-btn-num'
                : btn.type === 'op'
                ? 'calc-btn-op'
                : btn.type === 'sci'
                ? 'calc-btn-sci'
                : btn.type === 'action'
                ? 'calc-btn-action'
                : 'calc-btn-equal'
            } ${btn.label === '0' ? 'col-span-1' : ''}`}
            aria-label={btn.label}
          >
            {btn.icon || btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
