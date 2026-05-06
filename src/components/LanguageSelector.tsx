import { Globe } from 'lucide-react';
import React from 'react';
import { Language, Translation } from '../types';

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage, t }) => {
  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' },
    { id: 'fr', label: 'Français' },
    { id: 'de', label: 'Deutsch' },
    { id: 'zh', label: '中文' },
    { id: 'hi', label: 'हिन्दी' },
    { id: 'ar', label: 'العربية' },
    { id: 'pt', label: 'Português' },
    { id: 'ja', label: '日本語' },
    { id: 'tl', label: 'Tagalog' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className="text-slate-500 dark:text-slate-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-transparent text-sm font-medium focus:outline-none dark:text-white cursor-pointer"
        aria-label={t.language}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id} className="dark:bg-slate-800">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
