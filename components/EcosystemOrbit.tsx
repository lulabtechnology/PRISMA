"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { prisma, type PrismaService } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";
import { Film, Gamepad2, Headphones, Layers3, PlayCircle, Radio, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

const ICONS = {
  sport: Trophy,
  connect: Radio,
  replay: PlayCircle,
  content: Layers3,
  studio: Headphones,
  production: Film,
  play: Gamepad2
} as const;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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

/**
 * Orden y “layout” tipo la imagen:
 * Sport ↖, Play ↗, Production →, Studio ↘, Content ↓, Replay ↙, Connect ←
 * Usamos coords normalizadas ([-1..1]) para escalar según ancho del contenedor.
 */
const POSN: Record<PrismaService["key"], { x: number; y: number }> = {
  "prisma-sport": { x: -0.78, y: -0.58 },
  "prisma-play": { x: 0.78, y: -0.58 },
  "prisma-production": { x: 0.95, y: 0.06 },
  "prisma-studio": { x: 0.70, y: 0.72 },
  "prisma-content": { x: 0.00, y: 0.92 },
  "prisma-replay": { x: -0.70, y: 0.72 },
  "prisma-connect": { x: -0.95, y: 0.06 }
};

export default function EcosystemOrbit() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const items = prisma.services.items;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setW(cr.width);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dims = useMemo(() => {
    // Ancho útil para distribuir tarjetas SIN que se salgan
    const usable = clamp(w || 980, 820, 1100);
    const radiusX = clamp(usable * 0.36, 240, 340);
    const radiusY = clamp(usable * 0.30, 200, 300);
    const cardW = clamp(usable * 0.25, 210, 260);
    return { usable, radiusX, radiusY, cardW };
  }, [w]);

  return (
    <section className="py-14 sm:py-16">
      <Container>
        {/* OJO: overflow-visible para que NO se recorten tarjetas */}
        <Card className="relative p-6 sm:p-10 overflow-visible">
          {/* Background clipped inside */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px circle at 50% 35%, rgba(37,99,235,0.18), rgba(14,165,233,0.08), rgba(255,255,255,0.0))"
              }}
            />
            <div className="absolute inset-0 opacity-[0.22] bg-grid" />
          </div>

          {/* Desktop diagram */}
          <div ref={wrapRef} className="relative mx-auto hidden h-[560px] w-full max-w-5xl lg:block">
            {/* rings */}
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70" />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/50" />

            {/* connectors */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 560" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="link" x1="0" y1="0" x2="1000" y2="560">
                  <stop stopColor="rgb(37 99 235)" stopOpacity="0.55" />
                  <stop offset="1" stopColor="rgb(14 165 233)" stopOpacity="0.40" />
                </linearGradient>
              </defs>
              {/* center at (500,280) */}
              {items.map((s) => {
                const p = POSN[s.key];
                const x2 = 500 + p.x * (dims.radiusX * 0.86);
                const y2 = 280 + p.y * (dims.radiusY * 0.86);
                return (
                  <path
                    key={s.key}
                    d={`M500 280 L ${x2} ${y2}`}
                    stroke="url(#link)"
                    strokeWidth="1.2"
                  />
                );
              })}
            </svg>

            {/* center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <CenterMark />
              </motion.div>
            </div>

            {/* orbit cards */}
            {items.map((s, idx) => {
              const p = POSN[s.key];
              const Icon = ICONS[s.iconHint];

              const x = p.x * dims.radiusX;
              const y = p.y * dims.radiusY;

              return (
                <motion.div
                  key={s.key}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  animate={reduce ? {} : { y: [0, -7, 0] }}
                  transition={{ duration: 4 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    className="rounded-2xl border border-slate-200 bg-white/78 px-4 py-3 shadow-soft backdrop-blur"
                    style={{ width: dims.cardW }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-slate-900">{s.name}</p>
                        <p className="truncate text-xs font-black text-slate-500">{s.focus[lang]}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile grid */}
          <div className="relative grid gap-3 lg:hidden sm:grid-cols-2">
            {items.map((s) => {
              const Icon = ICONS[s.iconHint];
              return (
                <div
                  key={s.key}
                  className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-soft backdrop-blur"
                >
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
