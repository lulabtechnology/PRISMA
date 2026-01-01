import Container from "@/components/ui/Container";

export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute inset-0 opacity-[0.22] bg-grid" />

      <div
        className="absolute -top-44 left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.22), rgba(59,130,246,0.10), rgba(2,6,23,0.00))"
        }}
      />

      <div
        className="absolute right-[-240px] top-[360px] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,165,233,0.18), rgba(59,130,246,0.06), rgba(2,6,23,0.00))"
        }}
      />

      <Container className="relative">
        <svg className="absolute left-0 top-10 h-[680px] w-full opacity-[0.18]" viewBox="0 0 1200 680" fill="none">
          <defs>
            <linearGradient id="circuit" x1="0" y1="0" x2="1200" y2="680">
              <stop stopColor="rgb(37 99 235)" stopOpacity="0.9" />
              <stop offset="1" stopColor="rgb(2 132 199)" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <path
            d="M70 140H340C380 140 380 220 420 220H780C820 220 820 120 860 120H1130"
            stroke="url(#circuit)"
            strokeWidth="1.2"
          />
          <path
            d="M120 320H420C470 320 470 420 520 420H860C910 420 910 300 960 300H1120"
            stroke="url(#circuit)"
            strokeWidth="1.2"
          />
          <path
            d="M90 520H310C360 520 360 580 410 580H760C820 580 820 480 880 480H1100"
            stroke="url(#circuit)"
            strokeWidth="1.2"
          />

          {[
            [340, 140],
            [420, 220],
            [780, 220],
            [860, 120],
            [420, 320],
            [520, 420],
            [860, 420],
            [960, 300],
            [310, 520],
            [410, 580],
            [760, 580],
            [880, 480]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill="rgb(37 99 235)" opacity="0.9" />
          ))}
        </svg>
      </Container>
    </div>
  );
}
