"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Toast({
  open,
  message,
  onClose
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-1/2 z-[200] w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-soft backdrop-blur"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">{message}</p>
            <button
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
