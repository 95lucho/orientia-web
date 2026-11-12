import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

declare global {
  interface Window { orientiaTheme: { toggle: () => void }; }
}

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains('dark'));
    window.addEventListener('orientia-theme-change', sync);
    return () => window.removeEventListener('orientia-theme-change', sync);
  }, []);
  const label = dark ? 'Activar modo claro' : 'Activar modo oscuro';
  return (
    <button type="button" onClick={() => window.orientiaTheme.toggle()}
      aria-label={label} title={label} aria-pressed={dark}
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors">
      {dark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
      <span className="hidden xl:inline text-xs font-semibold">{dark ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  );
}
