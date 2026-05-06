import { AnimatePresence, motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { GlassContainer } from './components/GlassContainer';
import { LanguageSelector } from './components/LanguageSelector';
import { ScientificCalculator } from './components/ScientificCalculator';
import { ThemeToggle } from './components/ThemeToggle';
import { UnitConverter } from './components/UnitConverter';
import { translations } from './translations';
import { Language, Mode, Theme } from './types';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<Mode>('calculator');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = translations[language];

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-8 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
    } relative overflow-hidden font-sans`}>
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-500/10 blur-[150px] animate-pulse delay-700" />
      <div className="absolute top-[20%] right-[15%] w-[20%] h-[20%] rounded-full bg-blue-500/15 blur-[100px]" />

      <main className="z-10 w-full max-w-xl flex flex-col gap-6">
        
        {/* Header Bar */}
        <header className="flex items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <span className="text-white font-black text-lg">P</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              {t.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSelector language={language} setLanguage={setLanguage} t={t} />
            <ThemeToggle theme={theme} setTheme={setTheme} t={t} />
          </div>
        </header>

        {/* Main Interface */}
        <GlassContainer theme={theme} className="w-full flex-grow min-h-[500px] flex flex-col">
          
          {/* Mode Switcher Tabs */}
          <nav className="w-full border-b border-white/10 flex items-center justify-center p-2 gap-2">
            <button
              onClick={() => setMode('calculator')}
              className={`flex-1 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                mode === 'calculator'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-500 hover:bg-white/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-bold">{t.calculator}</span>
            </button>
            <button
              onClick={() => setMode('converter')}
              className={`flex-1 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                mode === 'converter'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-500 hover:bg-white/10'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="text-sm font-bold">{t.converter}</span>
            </button>
          </nav>

          {/* Content Area */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {mode === 'calculator' ? (
                <motion.div
                  key="calculator"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ScientificCalculator t={t} />
                </motion.div>
              ) : (
                <motion.div
                  key="converter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <UnitConverter t={t} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassContainer>

        <footer className="px-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-600 font-medium tracking-wide uppercase">
            Built with React & TypeScript • Optimized for Discovery
          </p>
        </footer>
      </main>
    </div>
  );
}
