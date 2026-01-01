"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { prisma } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";

export default function Navbar() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-[120] border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          <div className="relative h-8 w-8">
            <Image
              src="/images/logo/prisma-mark.png"
              alt="PRISMA logo mark"
              fill
              sizes="32px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-wide text-slate-900">{prisma.brand.short}</span>
            <span className="text-[11px] font-semibold text-slate-500">BROADCAST & MEDIA</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {prisma.nav.links.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-slate-200 bg-white/70 p-1 shadow-soft">
            <button
              onClick={() => setLang("es")}
              className={cn(
                "rounded-lg px-3 py-1 text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-blue-500/40",
                lang === "es" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              )}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "rounded-lg px-3 py-1 text-xs font-black transition focus:outline-none focus:ring-2 focus:ring-blue-500/40",
                lang === "en" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              )}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          <div className="hidden sm:block">
            <ButtonLink href="#contact" variant="primary">
              {prisma.nav.cta[lang]}
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* Mobile links row */}
      <div className="border-t border-slate-200/70 md:hidden">
        <Container className="flex items-center gap-2 overflow-x-auto py-2">
          {prisma.nav.links.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="shrink-0 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-black text-slate-700 shadow-soft hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {link.label[lang]}
            </a>
          ))}
          <a
            href="#contact"
            className="shrink-0 rounded-xl bg-slate-900 px-3 py-2 text-xs font-black text-white shadow-glow focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {prisma.nav.cta[lang]}
          </a>
        </Container>
      </div>
    </header>
  );
}
