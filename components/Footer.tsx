"use client";

import Container from "@/components/ui/Container";
import { prisma } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur">
      <Container className="py-10">
        <div className="grid gap-6 sm:grid-cols-2 sm:items-end">
          <div>
            <p className="text-sm font-black text-slate-900">PRISMA</p>
            <p className="mt-2 max-w-xl text-pretty text-sm font-semibold text-slate-600">
              {prisma.footer.phrase[lang]}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex gap-2 text-sm font-black text-slate-600">
              <a className="rounded-lg px-2 py-1 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40" href="#about">
                {prisma.nav.links[0].label[lang]}
              </a>
              <a className="rounded-lg px-2 py-1 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40" href="#services">
                {prisma.nav.links[1].label[lang]}
              </a>
              <a className="rounded-lg px-2 py-1 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40" href="#contact">
                {prisma.nav.links[2].label[lang]}
              </a>
            </div>

            <p className="text-xs font-black text-slate-500">© {year} PRISMA</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
