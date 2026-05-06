import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { Theme, Translation } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: Translation;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme, t }) => {
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 text-sm font-medium dark:text-white"
      aria-label={theme === 'light' ? t.darkMode : t.lightMode}
    >
      {theme === 'light' ? (
        <>
          <Moon size={18} />
          <span className="hidden sm:inline">{t.darkMode}</span>
        </>
      ) : (
        <>
          <Sun size={18} />
          <span className="hidden sm:inline">{t.lightMode}</span>
        </>
      )}
    </button>
  );
};
