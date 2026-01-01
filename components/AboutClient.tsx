"use client";

import { prisma } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";

export default function AboutClient() {
  const { lang } = useLanguage();

  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {prisma.about.title[lang]}
      </h2>
      <p className="mt-4 max-w-3xl text-pretty text-sm font-semibold leading-7 text-slate-600 sm:text-base">
        {prisma.about.body[lang]}
      </p>
    </>
  );
}
