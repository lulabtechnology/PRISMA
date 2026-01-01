"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/content/prisma";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

export const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "prisma_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
