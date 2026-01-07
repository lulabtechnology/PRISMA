"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { prisma } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";

function PMark() {
  return (
    <svg viewBox="0 0 120 120" className="h-16 w-16" aria-hidden="true">
      <defs>
        <linearGradient id="pgrad" x1="0" y1="0" x2="120" y2="120">
          <stop stopColor="rgb(37 99 235)" />
          <stop offset="1" stopColor="rgb(14 165 233)" />
        </linearGradient>
      </defs>
      <path
        d="M36 22h30c18 0 30 10 30 26s-12 26-30 26H52v24H36V22zm16 14v24h14c9 0 14-4 14-12s-5-12-14-12H52z"
        fill="url(#pgrad)"
      />
    </svg>
  );
}

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section className="relative pt-14 sm:pt-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {prisma.hero.title}
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-base font-semibold text-slate-600 sm:text-lg">
            {prisma.hero.tagline[lang]}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#services" variant="primary">
              {prisma.hero.primaryCta[lang]}
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              {prisma.hero.secondaryCta[lang]}
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          className="relative"
        >
          <Card className="relative overflow-hidden p-6">
            {/* BG image for the entire panel */}
            <div className="pointer-events-none absolute inset-0">
              <Image
                src="/images/hero/panel-bg.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover opacity-[0.22]"
                priority={false}
              />
              {/* Tech glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(900px circle at 25% 25%, rgba(37,99,235,0.26), rgba(14,165,233,0.12), rgba(255,255,255,0.0))"
                }}
              />
              {/* Keep readability */}
              <div className="absolute inset-0 bg-white/65 backdrop-blur-[1px]" />
            </div>

            {/* Existing grid overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.22] bg-grid" />

            <div className="relative flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <PMark />
                  <div>
                    <p className="text-sm font-extrabold tracking-wide text-slate-900">PRISMA</p>
                    <p className="text-xs font-semibold text-slate-600">BROADCAST & MEDIA</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {[
                    { k: "Sports", v: "Broadcast" },
                    { k: "Technology", v: "Media" },
                    { k: "PRISMA", v: "Ecosystem" }
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between gap-6 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-xs font-extrabold text-slate-700 shadow-soft"
                    >
                      <span className="text-slate-500">{row.k}</span>
                      <span className="text-slate-900">{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden h-44 w-44 sm:block">
                <Image
                  src="/images/hero/hero-tech.jpg"
                  alt=""
                  fill
                  sizes="176px"
                  className="rounded-2xl object-cover opacity-90"
                  priority
                />
              </div>
            </div>

            <div
              className="pointer-events-none absolute left-0 top-0 h-20 w-full opacity-40"
              style={{
                background: "linear-gradient(180deg, rgba(37,99,235,0.18), rgba(255,255,255,0))"
              }}
            />
          </Card>
        </motion.div>
      </Container>

      <div className="mt-14 border-t border-slate-200/70" />
    </section>
  );
}
