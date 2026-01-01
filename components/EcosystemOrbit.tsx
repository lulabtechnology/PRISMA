"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
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
 * Orbit por ángulos (se ve ordenado SIEMPRE):
 * Sport ↖ 140°, Play ↗ 40°, Production → 0°, Studio ↘ 320°,
 * Content ↓ 270°, Replay ↙ 220°, Connect ← 180°
 */
const ANGLES: Record<PrismaService["key"], number> = {
  "prisma-sport": 140,
  "prisma-play": 40,
  "prisma-production": 0,
  "prisma-studio": 320,
  "prisma-content": 270,
  "prisma-replay": 220,
  "prisma-connect": 180
};

export default function EcosystemOrbit() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const items = prisma.services.items;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setBox({ w: cr.width, h: cr.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dims = useMemo(() => {
    // Contenedor real
    const W = clamp(box.w || 980, 820, 1200);
    const H = clamp(box.h || 620, 560, 720);

    // Cards
    const cardW = clamp(W * 0.24, 210, 260);
    const cardHEst = 86; // estimado visual (icon + 2 líneas)

    // Margen seguro para que NUNCA se salgan
    const pad = 28;

    const maxX = W / 2 - pad - cardW / 2;
    const maxY = H / 2 - pad - cardHEst / 2;

    // Radios “bonitos” pero limitados por maxX/maxY
    const rx = Math.min(clamp(W * 0.36, 250, 360), maxX);
    const ry = Math.min(clamp(W * 0.28, 200, 310), maxY);

    // Anillos
    const ringBase = clamp(Math.min(W, H) * 0.72, 380, 520);
    const ringInner = ringBase - 90;
    const ringOuter = ringBase;

    return {
      W,
      H,
      rx: Math.max(220, rx),
      ry: Math.max(170, ry),
      cardW,
      ringInner,
      ringOuter
    };
  }, [box.w, box.h]);

  // Coordenadas por ángulo (ordenado, simétrico)
  const coords = useMemo(() => {
    const out: Record<string, { x: number; y: number; a: number }> = {};
    for (const s of items) {
      const a = degToRad(ANGLES[s.key]);
      out[s.key] = {
        a,
        x: Math.cos(a) * dims.rx,
        y: Math.sin(a) * dims.ry
      };
    }
    return out as Record<PrismaService["key"], { x: number; y: number; a: number }>;
  }, [items, dims.rx, dims.ry]);

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <Card className="relative overflow-visible p-6 sm:p-10">
          {/* BG */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px circle at 50% 35%, rgba(37,99,235,0.18), rgba(14,165,233,0.08), rgba(255,255,255,0))"
              }}
            />
            <div className="absolute inset-0 opacity-[0.22] bg-grid" />
          </div>

          {/* Desktop */}
          <div
            ref={wrapRef}
            className="relative mx-auto hidden w-full max-w-6xl lg:block"
            style={{ height: 620 }}
          >
            {/* rings (calculados) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/70"
              style={{ width: dims.ringInner, height: dims.ringInner }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/50"
              style={{ width: dims.ringOuter, height: dims.ringOuter }}
            />

            {/* connectors */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 620" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="link" x1="0" y1="0" x2="1200" y2="620">
                  <stop stopColor="rgb(37 99 235)" stopOpacity="0.55" />
                  <stop offset="1" stopColor="rgb(14 165 233)" stopOpacity="0.40" />
                </linearGradient>
              </defs>

              {/* centro (600,310) */}
              {items.map((s) => {
                const p = coords[s.key];
                const x2 = 600 + p.x * 0.90;
                const y2 = 310 + p.y * 0.90;
                return <path key={s.key} d={`M600 310 L ${x2} ${y2}`} stroke="url(#link)" strokeWidth="1.2" />;
              })}
            </svg>

            {/* center */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <CenterMark />
              </motion.div>
            </div>

            {/* cards */}
            {items.map((s, idx) => {
              const p = coords[s.key];
              const Icon = ICONS[s.iconHint];

              const baseX = p.x;
              const baseY = p.y;

              return (
                <motion.div
                  key={s.key}
                  className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ x: baseX, y: baseY }}
                  animate={reduce ? { y: baseY } : { y: [baseY, baseY - 7, baseY] }}
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

          {/* Mobile */}
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
