"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { prisma, type PrismaService } from "@/content/prisma";
import { useLanguage } from "@/components/i18n/useLanguage";
import { deriveBullets } from "@/lib/deriveBullets";
import { cn } from "@/lib/utils";
import { Film, Gamepad2, Headphones, Layers3, PlayCircle, Radio, Trophy } from "lucide-react";

function iconFor(hint: PrismaService["iconHint"]) {
  const props = { className: "h-4 w-4" };
  switch (hint) {
    case "sport": return <Trophy {...props} />;
    case "connect": return <Radio {...props} />;
    case "replay": return <PlayCircle {...props} />;
    case "content": return <Layers3 {...props} />;
    case "studio": return <Headphones {...props} />;
    case "production": return <Film {...props} />;
    case "play": return <Gamepad2 {...props} />;
  }
}

export default function ServicesTabs() {
  const { lang } = useLanguage();
  const items = prisma.services.items;

  const [active, setActive] = useState(items[0].key);

  const current = useMemo(() => items.find((s) => s.key === active)!, [items, active]);
  const bullets = useMemo(() => deriveBullets(current.description[lang], 3), [current, lang]);

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, items.length);
  }, [items.length]);

  function onKeyDown(e: React.KeyboardEvent) {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;

    e.preventDefault();
    const idx = items.findIndex((x) => x.key === active);
    let next = idx;

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = Math.max(0, idx - 1);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = Math.min(items.length - 1, idx + 1);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;

    const nextKey = items[next].key;
    setActive(nextKey);
    btnRefs.current[next]?.focus();
  }

  return (
    <section id="services" className="py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {prisma.services.sectionTitle[lang]}
            </h2>
            {prisma.services.sectionBody[lang] ? (
              <p className="mt-3 max-w-2xl text-pretty text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                {prisma.services.sectionBody[lang]}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_2fr]">
          <Card className="p-3">
            <div
              role="tablist"
              aria-label="Services tabs"
              className="flex flex-col gap-1"
              onKeyDown={onKeyDown}
            >
              {items.map((s, i) => {
                const selected = s.key === active;
                return (
                  <button
                    key={s.key}
                    ref={(el) => { btnRefs.current[i] = el; }}
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${s.key}`}
                    id={`tab-${s.key}`}
                    onClick={() => setActive(s.key)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-extrabold transition",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
                      selected ? "bg-slate-900 text-white shadow-glow" : "text-slate-800 hover:bg-slate-100/70"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid h-7 w-7 place-items-center rounded-lg",
                          selected ? "bg-white/12" : "bg-blue-50 border border-blue-100"
                        )}
                      >
                        <span className={cn(selected ? "text-white" : "text-blue-700")}>
                          {iconFor(s.iconHint)}
                        </span>
                      </span>
                      {s.name}
                    </span>
                    <span className={cn("text-xs font-black", selected ? "text-white/80" : "text-slate-400")}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key + lang}
                id={`panel-${current.key}`}
                role="tabpanel"
                aria-labelledby={`tab-${current.key}`}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
              >
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-black text-slate-700 shadow-soft">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    {current.focus[lang]}
                  </div>

                  <h3 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    {current.name}
                  </h3>

                  <p className="mt-3 text-pretty text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                    {current.description[lang]}
                  </p>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {bullets.map((b, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-black text-slate-700 shadow-soft"
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                {/* IMAGE: FIX (no cropping on desktop) */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-soft">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(800px circle at 30% 20%, rgba(37,99,235,0.18), rgba(14,165,233,0.08), rgba(255,255,255,0.0))"
                    }}
                  />
                  <div className="absolute inset-0 bg-white/35" />

                  <Image
                    src={current.imageSrc}
                    alt={current.imageAlt[lang]}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="relative h-[280px] w-full object-contain p-4 sm:h-[340px] lg:h-[420px]"
                    priority={active === items[0].key}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </Container>
    </section>
  );
}
