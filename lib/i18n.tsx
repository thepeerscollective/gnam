'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { D, Key, Lang } from './dict';

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key, vars?: Record<string, string | number>) => string };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pl');
  useEffect(() => {
    try {
      const s = localStorage.getItem('gnam-lang');
      if (s === 'pl' || s === 'en') setLangState(s);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('gnam-lang', l); } catch {}
  }, []);
  const t = useCallback(
    (k: Key, vars?: Record<string, string | number>) => {
      let s = D[k][lang];
      if (vars) for (const [a, b] of Object.entries(vars)) s = s.replaceAll(`{${a}}`, String(b));
      return s;
    },
    [lang],
  );
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error('useLang outside provider');
  return c;
}
