/**
 * Composición SVG original del altiplano: cielo, cordillera, lago Titicaca y
 * la ciudad de Puno en la orilla. Ilustración conceptual, no fotografía documental.
 * Las conexiones parten de Puno hacia destinos mencionados en la ponencia.
 */

type Destination = { label: string; x: number; y: number; dashed?: boolean };

const W = 1920;
const H = 900;
const LAKE_Y = 600;

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function ridge(seed: number, base: number, amp: number, step: number, peaks: [number, number][]): string {
  const r = rand(seed);
  const pts: string[] = [];
  for (let x = -20; x <= W + 20; x += step) {
    let y = base + (r() - 0.5) * amp * 0.35;
    for (const [px, ph] of peaks) {
      const d = Math.abs(x - px);
      y -= Math.max(0, ph - d * (ph / 260)) * (0.85 + r() * 0.3);
    }
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M-20,${LAKE_Y + 4} L${pts.join(" L")} L${W + 20},${LAKE_Y + 4} Z`;
}

const far = ridge(7, 470, 40, 24, [
  [260, 120],
  [690, 170],
  [1180, 110],
  [1520, 190],
  [1790, 120],
]);
const mid = ridge(13, 520, 50, 18, [
  [120, 60],
  [520, 90],
  [980, 70],
  [1380, 100],
  [1700, 70],
]);
const near = ridge(29, 575, 30, 14, [
  [80, 50],
  [400, 30],
  [1600, 40],
  [1880, 60],
]);

const shimmerLines = Array.from({ length: 22 }, (_, i) => {
  const r = rand(100 + i);
  const y = LAKE_Y + 14 + i * i * 0.55 + i * 4;
  const x = r() * W * 0.8;
  const w = 60 + r() * 380;
  return { x, y, w, o: 0.08 + r() * 0.22, d: r() * 4 };
});

const cityLights = Array.from({ length: 38 }, (_, i) => {
  const r = rand(400 + i);
  return { x: 1120 + r() * 280, y: LAKE_Y - 4 - r() * 26, s: 0.8 + r() * 1.6 };
});

export const PUNO_POINT = { x: 1260, y: LAKE_Y - 14 };

export const defaultDestinations: Destination[] = [
  { label: "Lima", x: 1430, y: 340 },
  { label: "Buenos Aires", x: 1560, y: 220 },
  { label: "Ginebra", x: 1680, y: 110 },
  { label: "Okinawa", x: 1830, y: 260 },
  { label: "Shenzhen", x: 1760, y: 420, dashed: true },
];

export function AltiplanoScene({
  className = "",
  connections = true,
  destinations = defaultDestinations,
  labels = true,
  tone = "night",
  animate = true,
}: {
  className?: string;
  connections?: boolean;
  destinations?: Destination[];
  labels?: boolean;
  tone?: "night" | "dawn";
  animate?: boolean;
}) {
  const dawn = tone === "dawn";
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      role="img"
      aria-label="Ilustración del altiplano y el lago Titicaca con líneas que conectan Puno con el mundo"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#080D15" />
          <stop offset="0.55" stopColor={dawn ? "#1a2a44" : "#101827"} />
          <stop offset="0.9" stopColor={dawn ? "#5a4a45" : "#1b2a40"} />
          <stop offset="1" stopColor={dawn ? "#c98f55" : "#2d3a4c"} />
        </linearGradient>
        <radialGradient id="glow" cx="0.62" cy="0.66" r="0.5">
          <stop offset="0" stopColor="#F1B86A" stopOpacity={dawn ? 0.55 : 0.22} />
          <stop offset="1" stopColor="#F1B86A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dawn ? "#3a4a63" : "#1c2b42"} />
          <stop offset="0.35" stopColor="#101b2c" />
          <stop offset="1" stopColor="#080D15" />
        </linearGradient>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3a55" />
          <stop offset="1" stopColor="#1b2840" />
        </linearGradient>
        <linearGradient id="arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#F1B86A" />
          <stop offset="0.5" stopColor="#53D8F5" />
          <stop offset="1" stopColor="#438BFF" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill="url(#sky)" />
      <rect width={W} height={H} fill="url(#glow)" />

      {/* estrellas discretas */}
      {Array.from({ length: 70 }, (_, i) => {
        const r = rand(900 + i);
        return (
          <circle
            key={i}
            cx={r() * W}
            cy={r() * 380}
            r={r() * 1.2 + 0.3}
            fill="#F4F7FB"
            opacity={dawn ? r() * 0.25 : r() * 0.6 + 0.1}
          />
        );
      })}

      <path d={far} fill="url(#far)" />
      {/* nieve sugerida en cumbres lejanas */}
      <path d={far} fill="none" stroke="#a4b0c2" strokeOpacity="0.18" strokeWidth="1.5" />
      <path d={mid} fill="#141f31" />
      <path d={near} fill="#0d1522" />

      {/* lago */}
      <rect x="0" y={LAKE_Y} width={W} height={H - LAKE_Y} fill="url(#lake)" />
      <line x1="0" y1={LAKE_Y} x2={W} y2={LAKE_Y} stroke="#F1B86A" strokeOpacity="0.55" strokeWidth="1.2" />
      {shimmerLines.map((l, i) => (
        <rect
          key={i}
          x={l.x}
          y={l.y}
          width={l.w}
          height={1.4}
          fill={i % 3 === 0 ? "#F1B86A" : "#53D8F5"}
          opacity={l.o}
          className={animate ? "animate-shimmer" : undefined}
          style={animate ? { animationDelay: `${l.d}s` } : undefined}
        />
      ))}
      {/* islas */}
      <path d={`M1180 ${LAKE_Y} q60 -22 140 -8 q40 4 70 8 z`} fill="#0d1522" />
      <path d={`M1500 ${LAKE_Y} q30 -12 80 -4 l20 4 z`} fill="#0d1522" />

      {/* luces de Puno */}
      {cityLights.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.s} fill="#F1B86A" opacity={0.75} />
      ))}

      {connections && (
        <g fill="none">
          {destinations.map((d, i) => {
            const cx = (PUNO_POINT.x + d.x) / 2;
            const cy = Math.min(PUNO_POINT.y, d.y) - 160;
            const path = `M${PUNO_POINT.x},${PUNO_POINT.y} Q${cx},${cy} ${d.x},${d.y}`;
            return (
              <g key={d.label}>
                <path
                  d={path}
                  stroke="url(#arc)"
                  strokeWidth={1.6}
                  strokeOpacity={d.dashed ? 0.55 : 0.85}
                  strokeDasharray={d.dashed ? "6 9" : undefined}
                  className={animate && !d.dashed ? "animate-draw" : undefined}
                  style={animate && !d.dashed ? ({ ["--len" as string]: 1800, animationDelay: `${0.4 + i * 0.25}s` } as React.CSSProperties) : undefined}
                />
                <circle cx={d.x} cy={d.y} r={4} fill={d.dashed ? "none" : "#53D8F5"} stroke="#53D8F5" strokeWidth={1.5} />
                {labels && (
                  <text
                    x={d.x > 1700 ? d.x - 12 : d.x + 12}
                    y={d.x > 1700 ? d.y - 14 : d.y + 5}
                    textAnchor={d.x > 1700 ? "end" : "start"}
                    fill="#A4B0C2"
                    fontSize="20"
                    fontFamily="var(--font-geist-mono), monospace"
                  >
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
          <circle cx={PUNO_POINT.x} cy={PUNO_POINT.y} r={6} fill="#F1B86A" />
          <circle cx={PUNO_POINT.x} cy={PUNO_POINT.y} r={16} stroke="#F1B86A" strokeOpacity="0.5" />
          {labels && (
            <text x={PUNO_POINT.x} y={PUNO_POINT.y + 44} fill="#F1B86A" fontSize="22" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace">
              Puno
            </text>
          )}
        </g>
      )}
    </svg>
  );
}
