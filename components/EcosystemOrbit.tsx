"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { prisma, type PrismaService } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";
import { Film, Gamepad2, Headphones, Layers3, PlayCircle, Radio, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  sport: Trophy,
  connect: Radio,
  replay: PlayCircle,
  content: Layers3,
  studio: Headphones,
  production: Film,
  play: Gamepad2
} as const;

function CenterMark() {
  return (
    <div className="grid h-28 w-28 place-items-center rounded-3xl border border-slate-200 bg-white/70 shadow-glow backdrop-blur">
      <div
        className="grid h-16 w-16 place-items-center rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(14,165,233,0.85))" }}
      >
        <span className="text-2xl font-black text-white">P</span>
      </div>
      <span className="mt-2 text-xs font-black tracking-wide text-slate-900">PRISMA</span>
    </div>
  );
}

type Slot = {
  key: PrismaService["key"];
  leftPct: number; // 0..100
  topPct: number; // 0..100
};

export default function EcosystemOrbit() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const items = prisma.services.items;

  // Layout tipo PDF: 3 izquierda + 3 derecha + 1 abajo centro
  const slots: Slot[] = useMemo(
    () => [
      { key: "prisma-sport", leftPct: 16, topPct: 20 },
      { key: "prisma-play", leftPct: 84, topPct: 20 },

      { key: "prisma-connect", leftPct: 16, topPct: 50 },
      { key: "prisma-production", leftPct: 84, topPct: 50 },

      { key: "prisma-replay", leftPct: 16, topPct: 80 },
      { key: "prisma-studio", leftPct: 84, topPct: 80 },

      { key: "prisma-content", leftPct: 50, topPct: 90 }
    ],
    []
  );

  const byKey = useMemo(() => {
    const m = new Map<PrismaService["key"], PrismaService>();
    for (const s of items) m.set(s.key, s);
    return m;
  }, [items]);

  // SVG coords para líneas (viewBox fijo)
  const VB_W = 1200;
  const VB_H = 620;
  const center = { x: VB_W / 2, y: VB_H / 2 }; // 600, 310

  function slotToPoint(s: Slot) {
    return { x: (s.leftPct / 100) * VB_W, y: (s.topPct / 100) * VB_H };
  }

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <Card className="relative overflow-hidden p-6 sm:p-10">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px circle at 50% 35%, rgba(37,99,235,0.20), rgba(14,165,233,0.10), rgba(255,255,255,0))"
              }}
            />
            <div className="absolute inset-0 opacity-[0.22] bg-grid" />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/50" />
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70" />
          </div>

          {/* DESKTOP: diagrama (igualito) */}
          <div className="relative mx-auto hidden w-full max-w-6xl lg:block" style={{ height: 620 }}>
            {/* líneas */}
            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VB_W} ${VB_H}`} fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="link" x1="0" y1="0" x2={VB_W} y2={VB_H}>
                  <stop stopColor="rgb(37 99 235)" stopOpacity="0.60" />
                  <stop offset="1" stopColor="rgb(14 165 233)" stopOpacity="0.45" />
                </linearGradient>
              </defs>

              {slots.map((s) => {
                const p = slotToPoint(s);
                // “corta” un poquito antes del card para que se vea fino
                const dx = p.x - center.x;
                const dy = p.y - center.y;
                const t = 0.86; // 0..1
                const x2 = center.x + dx * t;
                const y2 = center.y + dy * t;

                return (
                  <path
                    key={s.key}
                    d={`M ${center.x} ${center.y} L ${x2} ${y2}`}
                    stroke="url(#link)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* centro */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <CenterMark />
              </motion.div>
            </div>

            {/* cards acomodadas (por % fijo -> SIEMPRE simétrico) */}
            {slots.map((slot, idx) => {
              const s = byKey.get(slot.key);
              if (!s) return null;

              const Icon = ICONS[s.iconHint];

              return (
                <motion.div
                  key={slot.key}
                  className="absolute z-30"
                  style={{
                    left: `${slot.leftPct}%`,
                    top: `${slot.topPct}%`
                  }}
                  animate={reduce ? {} : { y: [0, -7, 0] }}
                  transition={{ duration: 4 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Importante: el centrado lo hace el wrapper, NO el motion (para no romper transform) */}
                  <div className="-translate-x-1/2 -translate-y-1/2">
                    <div
                      className={cn(
                        "rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-soft backdrop-blur",
                        "ring-1 ring-blue-200/30"
                      )}
                      style={{
                        width: "min(300px, 26vw)" // se ve pro y no se sale
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-slate-900">{s.name}</p>
                          <p className="truncate text-xs font-black text-slate-500">{s.focus[lang]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE: grid limpio */}
          <div className="relative grid gap-3 lg:hidden sm:grid-cols-2">
            {items.map((s) => {
              const Icon = ICONS[s.iconHint];
              return (
                <div key={s.key} className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-soft backdrop-blur">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{s.name}</p>
                      <p className="mt-1 text-xs font-black text-slate-500">{s.focus[lang]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </Container>
    </section>
  );
}
