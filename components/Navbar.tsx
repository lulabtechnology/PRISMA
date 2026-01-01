"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { prisma } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Cierra menú al pasar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-[120] border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <div className="relative h-8 w-8 shrink-0">
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
            <span className="hidden text-[11px] font-semibold text-slate-500 sm:block">
              BROADCAST & MEDIA
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {prisma.nav.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
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

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <ButtonLink href="#contact" variant="primary">
              {prisma.nav.cta[lang]}
            </ButtonLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 shadow-soft text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200/70 bg-white/75 backdrop-blur"
          >
            <Container className="py-3">
              <div className="grid gap-2">
                {prisma.nav.links.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-extrabold text-slate-800 shadow-soft hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    {link.label[lang]}
                  </a>
                ))}

                <ButtonLink href="#contact" variant="primary" className="justify-center" >
                  {prisma.nav.cta[lang]}
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
