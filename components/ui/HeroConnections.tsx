/** Líneas que parten de Puno (sobre la fotografía del lago) hacia destinos de la ponencia. */
const PUNO = { x: 1500, y: 880 };
const dests = [
  { label: "Lima", x: 1180, y: 470 },
  { label: "Buenos Aires", x: 1330, y: 300 },
  { label: "Ginebra", x: 1560, y: 170 },
  { label: "Okinawa", x: 1800, y: 280 },
  { label: "Shenzhen", x: 1760, y: 480, dashed: true },
];

export function HeroConnections({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMaxYMax slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="hc-arc" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F1B86A" />
          <stop offset="0.6" stopColor="#53D8F5" />
          <stop offset="1" stopColor="#438BFF" />
        </linearGradient>
      </defs>
      {dests.map((d, i) => {
        const cx = (PUNO.x + d.x) / 2 + (d.x < PUNO.x ? -80 : 80);
        const cy = Math.min(PUNO.y, d.y) - 180;
        return (
          <g key={d.label}>
            <path
              d={`M${PUNO.x},${PUNO.y} Q${cx},${cy} ${d.x},${d.y}`}
              fill="none"
              stroke="url(#hc-arc)"
              strokeWidth="2"
              strokeOpacity={d.dashed ? 0.6 : 0.9}
              strokeDasharray={d.dashed ? "7 10" : undefined}
              className={d.dashed ? undefined : "animate-draw"}
              style={d.dashed ? undefined : ({ ["--len" as string]: 1600, animationDelay: `${0.5 + i * 0.2}s` } as React.CSSProperties)}
            />
            <circle cx={d.x} cy={d.y} r="5" fill={d.dashed ? "none" : "#53D8F5"} stroke="#53D8F5" strokeWidth="2" />
            <text x={d.x + (d.x > 1700 ? -14 : 14)} y={d.y - 12} textAnchor={d.x > 1700 ? "end" : "start"} fill="#E6ECF5" fontSize="22" fontFamily="var(--font-geist-mono), monospace" className="max-md:hidden">
              {d.label}
            </text>
          </g>
        );
      })}
      <circle cx={PUNO.x} cy={PUNO.y} r="8" fill="#F1B86A" />
      <circle cx={PUNO.x} cy={PUNO.y} r="22" fill="none" stroke="#F1B86A" strokeOpacity="0.6" className="animate-shimmer" />
      <text x={PUNO.x} y={PUNO.y + 52} textAnchor="middle" fill="#F1B86A" fontSize="24" fontFamily="var(--font-geist-mono), monospace">
        Puno
      </text>
    </svg>
  );
}
