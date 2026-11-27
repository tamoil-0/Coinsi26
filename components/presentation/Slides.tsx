import type { CSSProperties, ReactNode } from "react";
import { AltiplanoScene } from "@/components/ui/AltiplanoScene";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import type { PhotoMap } from "@/lib/photos";
import { acts, slideMeta, TOTAL_SLIDES } from "./meta";

export type DeckQr = { url: string; svg: string };

export type DeckContext = {
  qr: { oportunidades: DeckQr; inicio: DeckQr; ponente: DeckQr } | null;
  routeCounts: { label: string; count: number; href: string }[];
  stateOrgs: { name: string; listed: boolean }[];
  research: { title: string; organization: string; status: string; when: string }[];
  totalOpportunities: number;
  photos: PhotoMap;
  speakerName: string;
  linkedin: string;
  animate: boolean;
};

/* ---------- utilidades de composición ---------- */

function useRise(ctx: DeckContext) {
  return (delay: number, extra = ""): { className: string; style?: CSSProperties } =>
    ctx.animate
      ? { className: `animate-rise ${extra}`, style: { animationDelay: `${delay}s` } }
      : { className: extra };
}

function Frame({
  n,
  children,
  className = "",
  bleed,
  chrome = true,
}: {
  n: number;
  children: ReactNode;
  className?: string;
  bleed?: ReactNode;
  chrome?: boolean;
}) {
  const meta = slideMeta[n - 1];
  const act = acts[meta.act];
  return (
    <div className={`relative h-[1080px] w-[1920px] overflow-hidden bg-obsidian text-ink ${className}`}>
      {bleed}
      {chrome && (
        <div className="absolute inset-x-[120px] top-[64px] z-10 flex items-baseline justify-between font-mono text-[22px] text-faint">
          <span>
            Acto {act.n} <span className="text-muted">{act.name}</span>
          </span>
          <span className="tabular">
            {String(n).padStart(2, "0")} / {TOTAL_SLIDES}
          </span>
        </div>
      )}
      <div className="relative z-[5] h-full w-full">{children}</div>
    </div>
  );
}

function Qr({ qr, size, caption }: { qr: DeckQr | null | undefined; size: number; caption?: boolean }) {
  if (!qr) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-2xl border border-dashed border-line p-6 text-center font-mono text-[20px] text-faint"
      >
        El QR se genera con la URL real de producción
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        style={{ width: size, height: size }}
        className="overflow-hidden rounded-2xl bg-ink p-3 [&_svg]:h-full [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: qr.svg }}
        role="img"
        aria-label={`Código QR hacia ${qr.url}`}
      />
      {caption && <span className="font-mono text-[22px] text-muted">{qr.url.replace(/^https?:\/\//, "")}</span>}
    </div>
  );
}

function Chain({ items, accent = "#53D8F5", size = 40, dashedLast = false, gap = 120 }: { items: string[]; accent?: string; size?: number; dashedLast?: boolean; gap?: number }) {
  return (
    <div className="flex items-center">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        const dashed = dashedLast && last;
        return (
          <div key={it} className="flex items-center">
            <div className={`flex items-center gap-4 ${dashed ? "opacity-70" : ""}`}>
              <span
                className="block h-4 w-4 rounded-full"
                style={dashed ? { border: `2px dashed ${accent}` } : { background: accent }}
              />
              <span className="font-display font-medium" style={{ fontSize: size }}>
                {it}
              </span>
            </div>
            {!last && (
              <svg width={gap} height="20" className="mx-5 shrink-0" aria-hidden>
                <line
                  x1="0"
                  y1="10"
                  x2={gap - 16}
                  y2="10"
                  stroke={accent}
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeDasharray={dashedLast && i === items.length - 2 ? "6 8" : undefined}
                />
                <path d={`M${gap - 20} 4 L${gap - 10} 10 L${gap - 20} 16`} fill="none" stroke={accent} strokeOpacity="0.8" strokeWidth="2" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

const H = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <h2 className={`font-display font-semibold leading-[0.92] ${className}`} style={style}>
    {children}
  </h2>
);

/* ---------- diapositivas ---------- */

function S1(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame
      n={1}
      chrome={false}
      bleed={<AltiplanoScene className="absolute inset-x-0 bottom-0 h-[900px] w-full" animate={ctx.animate} />}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,13,21,0.85),rgba(8,13,21,0.2)_55%,transparent)]" />
      <div className="relative flex h-full flex-col justify-between px-[120px] py-[96px]">
        <p {...r(0.1, "font-mono text-[24px] text-muted")}>
          COINSI 2026 · UNA Puno · Jhon Marco Aracayo Mamani
        </p>
        <div>
          <h1 {...r(0.25, "font-display text-[200px] font-bold leading-[0.84] tracking-[-0.05em]")}>
            DE PUNO
            <br />
            AL MUNDO.
          </h1>
          <p {...r(0.5, "mt-10 max-w-[1000px] text-[44px] leading-tight text-ink/90")}>
            Cómo construir experiencia real antes de egresar.
          </p>
        </div>
        <p {...r(0.7, "font-mono text-[22px] text-faint")}>
          VI Congreso Internacional de Ingeniería de Sistemas — 27 de noviembre de 2026
        </p>
      </div>
    </Frame>
  );
}

function S2(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={2}>
      <div className="flex h-full items-center px-[120px]">
        <div className="max-w-[1250px]">
          <H className="text-[132px]">
            <span {...r(0.1, "block")}>¿Cómo consigo</span>
            <span {...r(0.3, "block text-muted")}>experiencia si me</span>
            <span {...r(0.5, "block text-muted")}>piden experiencia</span>
            <span {...r(0.7, "block")}>para empezar?</span>
          </H>
        </div>
        <svg viewBox="0 0 400 400" className="ml-auto h-[520px] w-[520px]" aria-label="Ciclo: sin experiencia no hay trabajo, sin trabajo no hay experiencia">
          <circle cx="200" cy="200" r="150" fill="none" stroke="#243247" strokeWidth="2" />
          <path
            d="M200 50 A150 150 0 1 1 64 136"
            fill="none"
            stroke="#F1B86A"
            strokeWidth="3"
            className={ctx.animate ? "animate-draw" : undefined}
            style={{ ["--len" as string]: 900 } as CSSProperties}
          />
          <path d="M56 150 L64 132 L80 144" fill="none" stroke="#F1B86A" strokeWidth="3" />
          <text x="200" y="40" textAnchor="middle" fill="#F4F7FB" fontSize="22" fontFamily="var(--font-geist-mono)">experiencia</text>
          <text x="200" y="378" textAnchor="middle" fill="#F4F7FB" fontSize="22" fontFamily="var(--font-geist-mono)">trabajo</text>
          <text x="200" y="210" textAnchor="middle" fill="#A4B0C2" fontSize="20" fontFamily="var(--font-geist-mono)">¿por dónde entro?</text>
        </svg>
      </div>
    </Frame>
  );
}

function S3(ctx: DeckContext) {
  const r = useRise(ctx);
  const moments = ["Cabinas de internet", "Videojuegos", "Primeras computadoras", "Interés por la tecnología"];
  return (
    <Frame n={3}>
      <div className="grid h-full grid-cols-[1fr_760px] gap-[100px] px-[120px] pb-[110px] pt-[190px]">
        <div className="flex flex-col">
          <H className="text-[120px]">
            <span {...r(0.1, "block")}>Todo empezó</span>
            <span {...r(0.25, "block")}>con curiosidad.</span>
          </H>
          <ol className="mt-auto space-y-6">
            {moments.map((m, i) => (
              <li key={m} {...r(0.4 + i * 0.12, "flex items-baseline gap-8 border-t border-line pt-6")}>
                <span className="font-mono text-[24px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[40px]">{m}</span>
              </li>
            ))}
          </ol>
        </div>
        <div {...r(0.3, "relative overflow-hidden rounded-[28px]")}>
          {ctx.photos.infancia ? (
            <PhotoSlot k="infancia" photos={ctx.photos} />
          ) : (
            <CrtIllustration />
          )}
        </div>
      </div>
    </Frame>
  );
}

function CrtIllustration() {
  return (
    <svg viewBox="0 0 760 780" className="h-full w-full" role="img" aria-label="Ilustración conceptual de un monitor CRT en una cabina de internet">
      <defs>
        <radialGradient id="crtglow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#F1B86A" stopOpacity="0.35" />
          <stop offset="1" stopColor="#F1B86A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f3a5a" />
          <stop offset="1" stopColor="#0d1a2b" />
        </linearGradient>
      </defs>
      <rect width="760" height="780" fill="#101827" />
      <rect width="760" height="780" fill="url(#crtglow)" />
      {/* divisores de cabina */}
      <rect x="0" y="0" width="40" height="780" fill="#172233" />
      <rect x="720" y="0" width="40" height="780" fill="#172233" />
      {/* monitor */}
      <rect x="150" y="150" width="460" height="380" rx="30" fill="#c9c0ad" />
      <rect x="150" y="150" width="460" height="380" rx="30" fill="#080D15" opacity="0.35" />
      <rect x="195" y="190" width="370" height="280" rx="22" fill="url(#screen)" />
      {Array.from({ length: 28 }, (_, i) => (
        <line key={i} x1="195" x2="565" y1={194 + i * 10} y2={194 + i * 10} stroke="#53D8F5" strokeOpacity="0.06" />
      ))}
      <text x="225" y="250" fill="#66E3B4" fontSize="22" fontFamily="var(--font-geist-mono)">C:\&gt; _</text>
      <rect x="225" y="280" width="180" height="10" fill="#53D8F5" opacity="0.35" />
      <rect x="225" y="302" width="260" height="10" fill="#53D8F5" opacity="0.22" />
      <rect x="225" y="324" width="140" height="10" fill="#53D8F5" opacity="0.22" />
      <circle cx="560" cy="500" r="6" fill="#66E3B4" />
      <path d="M300 530 L460 530 L490 600 L270 600 Z" fill="#a8a08f" />
      {/* teclado */}
      <rect x="140" y="630" width="480" height="70" rx="10" fill="#b8b09d" />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => (
          <rect key={`${row}-${col}`} x={156 + col * 33} y={640 + row * 14} width="27" height="10" rx="2" fill="#8d8676" />
        )),
      )}
      <line x1="40" y1="720" x2="720" y2="720" stroke="#F1B86A" strokeOpacity="0.4" />
      <text x="60" y="760" fill="#6B788C" fontSize="18" fontFamily="var(--font-geist-mono)">ilustración conceptual</text>
    </svg>
  );
}

function S4(ctx: DeckContext) {
  const r = useRise(ctx);
  const academic = ["Fundamentos", "Algoritmos", "Bases de datos", "Ingeniería de software", "Tesis"];
  const practical = ["Curiosidad", "Comunidades", "Primer proyecto real", "Prácticas", "Portafolio"];
  return (
    <Frame n={4}>
      <div className="flex h-full flex-col px-[120px] pb-[110px] pt-[190px]">
        <H className="text-[112px]">
          <span {...r(0.1)}>Dos caminos que</span>
          <br />
          <span {...r(0.2)}>pueden convivir.</span>
        </H>
        <div className="relative mt-auto">
          <svg viewBox="0 0 1680 360" className="w-full" aria-hidden>
            <path
              d="M0 90 C 600 90, 1000 90, 1400 170"
              fill="none"
              stroke="#438BFF"
              strokeWidth="4"
              className={ctx.animate ? "animate-draw" : undefined}
              style={{ ["--len" as string]: 1800 } as CSSProperties}
            />
            <path
              d="M0 270 C 600 270, 1000 270, 1400 190"
              fill="none"
              stroke="#F1B86A"
              strokeWidth="4"
              className={ctx.animate ? "animate-draw" : undefined}
              style={{ ["--len" as string]: 1800, animationDelay: "0.3s" } as CSSProperties}
            />
            {academic.map((_, i) => (
              i < 4 ? <circle key={`a${i}`} cx={80 + i * 300} cy={90 + (i > 2 ? 12 : 0)} r="9" fill="#438BFF" /> : null
            ))}
            {practical.map((_, i) => (
              i < 4 ? <circle key={`p${i}`} cx={80 + i * 300} cy={270 - (i > 2 ? 12 : 0)} r="9" fill="#F1B86A" /> : null
            ))}
          </svg>
          <div className="absolute inset-0">
            {academic.map((a, i) => (
              <span key={a} className="absolute -translate-x-1/4 text-[26px] text-ink" style={{ left: `${((80 + i * 300) / 1680) * 100}%`, top: 10 }}>
                {i === 4 ? "" : a}
              </span>
            ))}
            {practical.map((p, i) => (
              <span key={p} className="absolute -translate-x-1/4 text-[26px] text-ink" style={{ left: `${((80 + i * 300) / 1680) * 100}%`, top: 300 }}>
                {i === 4 ? "" : p}
              </span>
            ))}
            <span className="absolute right-0 top-[130px] w-[230px] font-display text-[38px] font-semibold leading-tight">
              Egresas con
              <br />
              <span className="text-gold">evidencia</span>
            </span>
          </div>
          <div className="mt-10 flex gap-16 font-mono text-[24px]">
            <span className="text-blue">— Formación académica</span>
            <span className="text-gold">— Experiencia práctica</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S5(ctx: DeckContext) {
  const r = useRise(ctx);
  const rings = [
    { label: "Mi universidad", r: 90 },
    { label: "IEEE", r: 170 },
    { label: "Viaje a Cusco", r: 250 },
    { label: "Comunidades", r: 330 },
    { label: "Oportunidades", r: 410 },
  ];
  return (
    <Frame n={5}>
      <svg viewBox="0 0 1100 1080" className="absolute right-[-120px] top-0 h-full" aria-hidden>
        {rings.map((ring, i) => (
          <g key={ring.label}>
            <circle
              cx="560"
              cy="600"
              r={ring.r}
              fill="none"
              stroke={i === 0 ? "#F1B86A" : "#438BFF"}
              strokeOpacity={i === 0 ? 0.9 : 0.75 - i * 0.12}
              strokeWidth="2"
              strokeDasharray={i === rings.length - 1 ? "4 10" : undefined}
            />
            <text x="560" y={600 - ring.r - 14} textAnchor="middle" fill={i === 0 ? "#F1B86A" : "#A4B0C2"} fontSize="24" fontFamily="var(--font-geist-mono)">
              {ring.label}
            </text>
          </g>
        ))}
        <circle cx="560" cy="560" r="10" fill="#F1B86A" />
      </svg>
      <div className="flex h-full flex-col justify-center px-[120px]">
        <H className="text-[150px]">
          <span {...r(0.1, "block")}>Salir de</span>
          <span {...r(0.25, "block")}>mi burbuja.</span>
        </H>
        <p {...r(0.45, "mt-12 max-w-[760px] text-[38px] leading-snug text-muted")}>
          El primer paso no fue técnico. Fue darme cuenta de que había un mundo de oportunidades fuera del aula.
        </p>
        <div {...r(0.6, "mt-14 flex gap-6")}>
          <div className="h-[200px] w-[300px] overflow-hidden rounded-2xl"><PhotoSlot k="ieee" photos={ctx.photos} /></div>
          <div className="h-[200px] w-[300px] overflow-hidden rounded-2xl"><PhotoSlot k="cusco" photos={ctx.photos} /></div>
        </div>
      </div>
    </Frame>
  );
}

function S6(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={6}>
      <div className="grid h-full grid-cols-2">
        <div className="flex flex-col justify-center border-r border-line px-[120px]">
          <p {...r(0.1, "font-mono text-[26px] text-gold")}>Expectativa</p>
          <p {...r(0.25, "mt-8 font-display text-[96px] font-semibold leading-[0.95]")}>
            “Sí, ingeniero,
            <br />
            eso es sencillo.”
          </p>
        </div>
        <div className="flex flex-col justify-center bg-navy px-[110px]">
          <p {...r(0.5, "font-mono text-[26px] text-cyan")}>Realidad</p>
          <p {...r(0.6, "mt-8 font-display text-[96px] font-semibold leading-[0.95]")}>¿Por qué no funciona?</p>
          <div {...r(0.8, "mt-12 rounded-2xl border border-line bg-obsidian p-8 font-mono text-[24px] leading-relaxed text-muted")}>
            <span className="text-faint">$</span> sync --push
            <br />
            <span className="text-[#ff8f8f]">error: no hay conexión a internet</span>
            <br />
            <span className="text-faint">{"// el campo no es la oficina"}</span>
          </div>
          <p {...r(1, "mt-12 text-[34px]")}>
            Mi primer trabajo: <span className="font-semibold text-gold">ECOING</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

function S7(ctx: DeckContext) {
  const r = useRise(ctx);
  const box = (x: number, y: number, w: number, label: string, sub: string, color: string, delay: number) => (
    <g className={ctx.animate ? "animate-rise" : undefined} style={ctx.animate ? { animationDelay: `${delay}s` } : undefined}>
      <rect x={x} y={y} width={w} height="150" rx="20" fill="#101827" stroke={color} strokeWidth="2" />
      <text x={x + 32} y={y + 66} fill="#F4F7FB" fontSize="38" fontFamily="var(--font-display)" fontWeight="600">
        {label}
      </text>
      <text x={x + 32} y={y + 110} fill="#A4B0C2" fontSize="22" fontFamily="var(--font-geist-mono)">
        {sub}
      </text>
    </g>
  );
  const arrow = (x1: number, x2: number, y: number, color: string, dashed = false) => (
    <g>
      <line x1={x1} y1={y} x2={x2 - 10} y2={y} stroke={color} strokeWidth="3" strokeDasharray={dashed ? "8 10" : undefined} />
      <path d={`M${x2 - 18} ${y - 10} L${x2} ${y} L${x2 - 18} ${y + 10}`} fill="none" stroke={color} strokeWidth="3" />
    </g>
  );
  return (
    <Frame n={7}>
      <div className="px-[120px] pt-[170px]">
        <H className="text-[120px]">
          <span {...r(0.05)}>¿Y si no hay internet?</span>
        </H>
        <p {...r(0.2, "mt-6 max-w-[1200px] text-[34px] text-muted")}>
          Caso ECOING: una app que tenía que seguir funcionando en campo, sin señal. Arquitectura offline-first.
        </p>
      </div>
      <svg viewBox="0 0 1680 520" className="absolute bottom-[90px] left-[120px] w-[1680px]" aria-label="Flutter, SQLite, sincronización, API REST y dashboard">
        <rect x="0" y="20" width="640" height="480" rx="28" fill="none" stroke="#F1B86A" strokeOpacity="0.4" strokeDasharray="6 10" />
        <text x="32" y="70" fill="#F1B86A" fontSize="26" fontFamily="var(--font-geist-mono)">Sin conexión — en campo</text>
        <rect x="700" y="20" width="980" height="480" rx="28" fill="none" stroke="#53D8F5" strokeOpacity="0.4" strokeDasharray="6 10" />
        <text x="732" y="70" fill="#53D8F5" fontSize="26" fontFamily="var(--font-geist-mono)">Al recuperar internet</text>

        {box(40, 140, 250, "Flutter", "app móvil", "#F1B86A", 0.4)}
        {arrow(290, 350, 215, "#F1B86A")}
        {box(350, 140, 250, "SQLite", "datos locales", "#F1B86A", 0.6)}
        <text x="40" y="380" fill="#A4B0C2" fontSize="24" fontFamily="var(--font-geist-sans)">Se registra todo localmente.</text>
        <text x="40" y="418" fill="#A4B0C2" fontSize="24" fontFamily="var(--font-geist-sans)">Nada se pierde si no hay señal.</text>

        {arrow(600, 760, 215, "#66E3B4", true)}
        {box(760, 140, 270, "Sincronización", "cola de cambios", "#53D8F5", 0.9)}
        {arrow(1030, 1090, 215, "#53D8F5")}
        {box(1090, 140, 240, "API REST", "servidor", "#438BFF", 1.1)}
        {arrow(1330, 1390, 215, "#438BFF")}
        {box(1390, 140, 260, "Dashboard", "seguimiento", "#438BFF", 1.3)}
        <text x="760" y="380" fill="#A4B0C2" fontSize="24" fontFamily="var(--font-geist-sans)">Los cambios pendientes se envían, se validan</text>
        <text x="760" y="418" fill="#A4B0C2" fontSize="24" fontFamily="var(--font-geist-sans)">y aparecen en el panel para el equipo.</text>
      </svg>
    </Frame>
  );
}

function S8(ctx: DeckContext) {
  const r = useRise(ctx);
  const tech = ["Desarrollo", "Infraestructura", "Cableado"];
  const human = ["Comunicación", "Puntualidad", "Disciplina"];
  return (
    <Frame n={8}>
      <div className="grid h-full grid-cols-[1fr_620px] gap-[90px] px-[120px] pb-[110px] pt-[190px]">
        <div className="flex flex-col">
          <H className="text-[130px]">
            <span {...r(0.1, "block")}>No todo es</span>
            <span {...r(0.2, "block")}>programar.</span>
          </H>
          <p {...r(0.35, "mt-8 text-[36px] text-muted")}>Voluntariado en el Poder Judicial.</p>
          <div className="mt-auto grid grid-cols-2 gap-x-16">
            <div>
              <p className="font-mono text-[24px] text-cyan">Lo técnico</p>
              {tech.map((t, i) => (
                <p key={t} {...r(0.5 + i * 0.1, "border-b border-line py-5 text-[44px] font-display")}>{t}</p>
              ))}
            </div>
            <div>
              <p className="font-mono text-[24px] text-gold">Lo que nadie te enseña en clase</p>
              {human.map((t, i) => (
                <p key={t} {...r(0.8 + i * 0.1, "border-b border-line py-5 text-[44px] font-display")}>{t}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-6">
          <div className="overflow-hidden rounded-3xl"><PhotoSlot k="poder-judicial" photos={ctx.photos} /></div>
          <div className="overflow-hidden rounded-3xl"><PhotoSlot k="cableado" photos={ctx.photos} /></div>
        </div>
      </div>
    </Frame>
  );
}

function S9(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={9}>
      <div className="flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <H className="text-[120px]">
          <span {...r(0.1)}>Un buen proyecto no basta.</span>
        </H>
        <div {...r(0.25, "mt-10 flex gap-5 font-mono text-[26px] text-muted")}>
          <span className="rounded-full border border-line px-5 py-2">Reconocimiento facial</span>
          <span className="rounded-full border border-line px-5 py-2">Concursos perdidos</span>
          <span className="rounded-full border border-gold/60 px-5 py-2 text-gold">DermaApp</span>
        </div>
        <div className="mt-auto grid grid-cols-[560px_1fr] gap-20">
          <div {...r(0.45, "rounded-3xl border border-line bg-navy/60 p-10")}>
            <p className="font-mono text-[24px] text-faint">Enumerar tecnologías</p>
            <p className="mt-6 text-[34px] leading-snug text-muted line-through decoration-[#ff8f8f]/70">
              “Usamos inteligencia artificial, una app móvil y una base de datos en la nube.”
            </p>
          </div>
          <div {...r(0.65, "")}>
            <p className="font-mono text-[24px] text-gold">Comunicar valor</p>
            <div className="mt-8">
              <Chain items={["Problema", "Solución", "Evidencia", "Impacto"]} accent="#F1B86A" size={42} gap={64} />
            </div>
            <p className="mt-10 max-w-[900px] text-[32px] leading-snug text-muted">
              El jurado no evalúa cuántas tecnologías usaste. Evalúa si entendiste el problema y si puedes demostrar que tu solución sirve.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S10(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={10}>
      <div className="flex h-full flex-col px-[120px] pb-[100px] pt-[180px]">
        <H className="text-[110px]">
          <span {...r(0.1, "block")}>Perdimos una hackathon.</span>
          <span {...r(0.3, "block text-gold")}>Ganamos una comunidad.</span>
        </H>
        <div {...r(0.5, "mt-14")}>
          <Chain items={["HackAru", "SpinOut", "IRF26"]} size={52} />
        </div>
        <div className="mt-auto grid grid-cols-4 gap-6">
          {(["hackaru", "flit-2026", "ieee", "irf26-utec"] as const).map((k, i) => (
            <div key={k} {...r(0.7 + i * 0.1, "h-[300px] overflow-hidden rounded-2xl")}>
              <PhotoSlot k={k} photos={ctx.photos} />
            </div>
          ))}
        </div>
        <p {...r(1.1, "mt-8 text-[30px] text-muted")}>
          El networking no es pedir favores. Es construir relaciones con personas que quieren hacer cosas.
        </p>
      </div>
    </Frame>
  );
}

function S11(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={11}>
      <div className="flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <H className="text-[112px]">
          <span {...r(0.1)}>No existe una sola</span>
          <br />
          <span {...r(0.2)}>ruta profesional.</span>
        </H>
        <div className="mt-auto grid grid-cols-6 border-t border-line">
          {ctx.routeCounts.map((route, i) => (
            <div key={route.label} {...r(0.35 + i * 0.1, "border-r border-line px-6 pt-8 last:border-r-0")}>
              <p className="font-display text-[110px] font-semibold leading-none text-ink tabular">{route.count}</p>
              <p className="mt-6 text-[32px] leading-tight">{route.label}</p>
            </div>
          ))}
        </div>
        <p {...r(1, "mt-8 font-mono text-[22px] text-faint")}>
          Entradas en el directorio por ruta. Todas enlazan a su fuente oficial.
        </p>
      </div>
    </Frame>
  );
}

function S12(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={12}>
      <div className="grid h-full grid-cols-[640px_1fr]">
        <div className="h-full"><PhotoSlot k="angie" photos={ctx.photos} /></div>
        <div className="flex flex-col justify-center px-[100px]">
          <p {...r(0.1, "font-mono text-[26px] text-gold")}>Historia de una compañera</p>
          <H className="mt-6 text-[120px]">
            <span {...r(0.2, "block")}>Angie:</span>
            <span {...r(0.3, "block")}>de un PEU a</span>
            <span {...r(0.4, "block")}>una práctica.</span>
          </H>
          <div className="mt-16 space-y-0">
            {[
              ["Postulación", "a un Programa de Extensión Universitaria"],
              ["≈ 3 meses", "de formación en Lima"],
              ["Oportunidad profesional", "a partir del programa"],
            ].map(([a, b], i) => (
              <div key={a} {...r(0.6 + i * 0.15, "flex items-baseline gap-10 border-t border-line py-6")}>
                <span className="font-mono text-[24px] text-cyan tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[42px] font-display font-semibold">{a}</span>
                <span className="text-[30px] text-muted">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S13(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={13}>
      <div className="grid h-full grid-cols-[1fr_380px] gap-[80px] px-[120px] pb-[110px] pt-[180px]">
        <div className="flex flex-col">
          <H className="text-[112px]">
            <span {...r(0.1)}>El Estado también</span>
            <br />
            <span {...r(0.2)}>busca talento.</span>
          </H>
          <div className="mt-auto flex flex-wrap gap-x-12 gap-y-6">
            {ctx.stateOrgs.map((o, i) => (
              <span
                key={o.name}
                {...r(0.35 + i * 0.05, `font-display text-[56px] font-semibold ${o.listed ? "text-ink" : "text-faint"}`)}
              >
                {o.name}
              </span>
            ))}
          </div>
          <p {...r(1, "mt-10 text-[30px] text-muted")}>
            PEU, cursos de extensión, prácticas preprofesionales y profesionales. Cada uno con carreras y requisitos distintos.
          </p>
        </div>
        <div {...r(0.6, "flex flex-col items-center justify-end")}>
          <Qr qr={ctx.qr?.oportunidades} size={340} />
          <p className="mt-5 text-center font-mono text-[22px] text-muted">Filtra por “Sector público” y “PEU”</p>
        </div>
      </div>
    </Frame>
  );
}

function S14(ctx: DeckContext) {
  const r = useRise(ctx);
  const steps = ["Universidad", "Regional", "Nacional", "Latinoamérica"];
  return (
    <Frame n={14}>
      <div className="flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <p {...r(0.05, "font-mono text-[26px] text-gold")}>Huawei ICT Competition</p>
        <H className="mt-6 text-[120px]">
          <span {...r(0.1)}>Diego: competir</span>
          <br />
          <span {...r(0.2)}>internacionalmente.</span>
        </H>
        <div className="relative mt-auto">
          <svg viewBox="0 0 1680 360" className="w-full" aria-label="Etapas: universidad, regional, nacional, Latinoamérica; China como siguiente meta">
            {steps.map((s, i) => {
              const x = 120 + i * 350;
              const y = 300 - i * 70;
              return (
                <g key={s}>
                  {i > 0 && <line x1={x - 350} y1={y + 70} x2={x} y2={y} stroke="#53D8F5" strokeWidth="3" />}
                  <circle cx={x} cy={y} r="14" fill="#53D8F5" />
                  <text x={x} y={y + 56} textAnchor="middle" fill="#F4F7FB" fontSize="32" fontFamily="var(--font-display)">{s}</text>
                </g>
              );
            })}
            <line x1={120 + 3 * 350} y1={300 - 3 * 70} x2={1560} y2={20} stroke="#F1B86A" strokeWidth="3" strokeDasharray="8 12" />
            <circle cx={1560} cy={20} r="14" fill="none" stroke="#F1B86A" strokeWidth="3" strokeDasharray="4 5" />
            <text x={1540} y={78} textAnchor="end" fill="#F1B86A" fontSize="30" fontFamily="var(--font-display)">China</text>
            <text x={1540} y={112} textAnchor="end" fill="#A4B0C2" fontSize="22" fontFamily="var(--font-geist-mono)">siguiente meta</text>
          </svg>
        </div>
        <div className="mt-8 flex items-end justify-between">
          <p {...r(0.8, "max-w-[1000px] text-[30px] text-muted")}>
            Llegar a la etapa latinoamericana desde Puno ya demuestra que se puede. La final global sigue siendo una meta pendiente.
          </p>
          <div className="h-[170px] w-[260px] overflow-hidden rounded-2xl"><PhotoSlot k="diego" photos={ctx.photos} /></div>
        </div>
      </div>
    </Frame>
  );
}

function S15(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={15}>
      <div className="grid h-full grid-cols-[1fr_640px] gap-[90px] px-[120px] pb-[110px] pt-[180px]">
        <div className="flex flex-col">
          <p {...r(0.05, "font-mono text-[26px] text-gold")}>Un fellow de nuestra universidad</p>
          <H className="mt-6 text-[110px]">
            <span {...r(0.15, "block")}>Paolo Boris</span>
            <span {...r(0.25, "block")}>Luna Luque</span>
          </H>
          <p {...r(0.4, "mt-10 max-w-[900px] text-[36px] leading-snug text-muted")}>
            Estudiante de Ingeniería de Sistemas y representante regional del Impact Regional Fellowship 2026 (IRF26).
          </p>
          <div {...r(0.6, "mt-auto rounded-3xl border border-line bg-navy/60 p-10")}>
            <p className="font-mono text-[24px] text-cyan">¿Qué es un fellowship?</p>
            <p className="mt-4 text-[32px] leading-snug">
              Un programa de duración definida que selecciona a un grupo de personas para formarse, conectarse y desarrollar un proyecto con mentoría.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex-1 overflow-hidden rounded-3xl"><PhotoSlot k="paolo" photos={ctx.photos} /></div>
          <p {...r(0.8, "font-display text-[40px] font-semibold leading-tight")}>Las oportunidades existen antes de egresar.</p>
        </div>
      </div>
    </Frame>
  );
}

function S16(ctx: DeckContext) {
  const r = useRise(ctx);
  const skills = ["Git", "Colaboración", "Revisiones de código", "Postulaciones"];
  return (
    <Frame n={16}>
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M1100 860 Q 1450 300 1760 640" fill="none" stroke="url(#g16)" strokeWidth="3" className={ctx.animate ? "animate-draw" : undefined} style={{ ["--len" as string]: 900 } as CSSProperties} />
        <defs>
          <linearGradient id="g16" x1="0" x2="1">
            <stop offset="0" stopColor="#F1B86A" />
            <stop offset="1" stopColor="#53D8F5" />
          </linearGradient>
        </defs>
        <circle cx="1100" cy="860" r="12" fill="#F1B86A" />
        <text x="1100" y="920" textAnchor="middle" fill="#F1B86A" fontSize="30" fontFamily="var(--font-geist-mono)">Puno</text>
        <circle cx="1760" cy="640" r="12" fill="#53D8F5" />
        <text x="1760" y="700" textAnchor="middle" fill="#53D8F5" fontSize="30" fontFamily="var(--font-geist-mono)">Argentina</text>
        {skills.map((s, i) => {
          const t = (i + 1) / (skills.length + 1);
          const x = (1 - t) * (1 - t) * 1100 + 2 * (1 - t) * t * 1450 + t * t * 1760;
          const y = (1 - t) * (1 - t) * 860 + 2 * (1 - t) * t * 300 + t * t * 640;
          const pos = i < 2 ? { dx: -18, dy: 8, a: "end" } : i === 2 ? { dx: 0, dy: -24, a: "middle" } : { dx: 18, dy: 10, a: "start" };
          return (
            <g key={s}>
              <circle cx={x} cy={y} r="6" fill="#F4F7FB" />
              <text x={x + pos.dx} y={y + pos.dy} textAnchor={pos.a as "end" | "middle" | "start"} fill="#A4B0C2" fontSize="26" fontFamily="var(--font-geist-sans)">{s}</text>
            </g>
          );
        })}
      </svg>
      <div className="relative flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <H className="text-[112px]">
          <span {...r(0.1, "block")}>Trabajar desde Puno</span>
          <span {...r(0.2, "block")}>para otros países.</span>
        </H>
        <p {...r(0.35, "mt-10 max-w-[820px] text-[36px] leading-snug text-muted")}>
          Práctica remota con <span className="text-ink">Allprocar</span>, una empresa de Argentina. El idioma de trabajo fue Git: ramas, pull requests y revisiones.
        </p>
        <div {...r(0.6, "mt-auto max-w-[820px] rounded-3xl border border-line bg-navy/60 p-10")}>
          <p className="font-mono text-[24px] text-gold">Ojo</p>
          <p className="mt-3 text-[30px] leading-snug">“Remoto” no siempre significa “disponible desde cualquier país”. Revisa siempre la restricción geográfica.</p>
        </div>
      </div>
    </Frame>
  );
}

function S17(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={17}>
      <div className="grid h-full grid-cols-[1fr_360px] gap-[80px] px-[120px] pb-[110px] pt-[180px]">
        <div className="flex flex-col">
          <H className="text-[100px]">
            <span {...r(0.1, "block")}>Investigación y</span>
            <span {...r(0.2, "block")}>oportunidades internacionales.</span>
          </H>
          <div className="mt-auto">
            {ctx.research.slice(0, 4).map((o, i) => (
              <div key={o.title} {...r(0.35 + i * 0.08, "grid grid-cols-[1fr_auto] items-baseline gap-8 border-t border-line py-5")}>
                <div>
                  <span className="block font-display text-[36px] font-semibold leading-tight">{o.title}</span>
                  <span className="text-[24px] text-muted">{o.organization}</span>
                </div>
                <span className="font-mono text-[24px] text-cyan">{o.when}</span>
              </div>
            ))}
          </div>
        </div>
        <div {...r(0.6, "flex flex-col items-center justify-end")}>
          <Qr qr={ctx.qr?.oportunidades} size={320} />
          <p className="mt-5 text-center font-mono text-[22px] text-muted">Requisitos completos y fechas en el directorio</p>
        </div>
      </div>
    </Frame>
  );
}

function S18(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={18}>
      <div className="flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <H className="text-[112px]">
          <span {...r(0.1, "block")}>De una idea a una</span>
          <span {...r(0.2, "block")}>solución real.</span>
        </H>
        <div {...r(0.35, "mt-12")}>
          <Chain items={["Problema", "Prototipo", "Validación", "Crecimiento"]} accent="#66E3B4" size={48} />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-8">
          {[
            { k: "jayu" as const, name: "JAYU", note: "Emprendimiento en desarrollo" },
            { k: "agendia" as const, name: "Agendia", note: "Emprendimiento en desarrollo" },
            { k: null, name: "ROWAN", note: "Aprendizajes" },
          ].map((p, i) => (
            <div key={p.name} {...r(0.55 + i * 0.12, "overflow-hidden rounded-3xl border border-line bg-navy/50")}>
              <div className="h-[190px]">
                {p.k ? <PhotoSlot k={p.k} photos={ctx.photos} /> : <div className="h-full bg-[linear-gradient(135deg,#172233,#0d1522)]" />}
              </div>
              <div className="p-7">
                <p className="font-display text-[44px] font-semibold">{p.name}</p>
                <p className="mt-1 text-[26px] text-muted">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p {...r(0.95, "mt-8 font-mono text-[22px] text-faint")}>
          Ecosistema: incubación · aceleración · concursos · capital semilla · mentorías
        </p>
      </div>
    </Frame>
  );
}

function S19(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={19}>
      <div className="flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <H className="text-[100px]">
          <span {...r(0.1, "block text-muted")}>No me digas qué sabes.</span>
          <span {...r(0.25, "block")}>Muéstrame qué construyes.</span>
        </H>
        <div className="mt-auto grid grid-cols-[1fr_1.3fr] gap-14">
          <div {...r(0.45, "rounded-3xl border border-line p-10")}>
            <p className="font-mono text-[24px] text-faint">CV con lista de tecnologías</p>
            <p className="mt-6 text-[38px] leading-relaxed text-faint">
              Java, Python, JavaScript, React, Flutter, SQL, Docker, Git, Linux, Figma…
            </p>
            <p className="mt-6 text-[28px] text-muted">¿Qué construiste con eso?</p>
          </div>
          <div {...r(0.65, "rounded-3xl border border-gold/50 bg-navy p-10 font-mono")}>
            <p className="text-[24px] text-gold">README.md</p>
            <div className="mt-6 space-y-4 text-[30px]">
              {[
                ["#", "Problema que resuelve"],
                ["▶", "Demo en vivo"],
                ["◇", "Arquitectura"],
                ["✓", "Pruebas automatizadas"],
                ["↗", "Resultados y aprendizajes"],
              ].map(([icon, t]) => (
                <p key={t} className="flex gap-6">
                  <span className="w-8 text-cyan">{icon}</span>
                  <span className="text-ink">{t}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S20(ctx: DeckContext) {
  const r = useRise(ctx);
  const loop = ["Planificar", "Implementar", "Revisar", "Probar", "Entregar"];
  return (
    <Frame n={20}>
      <div className="grid h-full grid-cols-[1fr_760px] px-[120px] pb-[110px] pt-[180px]">
        <div className="flex flex-col">
          <H className="text-[112px]">
            <span {...r(0.1, "block")}>El ingeniero en</span>
            <span {...r(0.2, "block")}>la era de la IA.</span>
          </H>
          <p {...r(0.35, "mt-8 text-[34px] text-muted")}>Claude Code, Codex y agentes que trabajan contigo.</p>
          <p {...r(0.55, "mt-auto font-display text-[72px] font-semibold leading-[1] text-gold")}>
            Generar código no significa entenderlo.
          </p>
          <p {...r(0.75, "mt-8 max-w-[900px] text-[28px] leading-snug text-muted")}>
            Esta misma plataforma se planificó, construyó y desplegó con agentes de IA. Cada dato del directorio se verificó contra su fuente oficial.
          </p>
        </div>
        <svg viewBox="0 0 760 760" className="h-[760px] w-[760px] self-center" aria-label="Ciclo: planificar, implementar, revisar, probar, entregar">
          <circle cx="380" cy="380" r="220" fill="none" stroke="#243247" strokeWidth="2" />
          <circle
            cx="380"
            cy="380"
            r="220"
            fill="none"
            stroke="#53D8F5"
            strokeWidth="3"
            strokeDasharray="1383"
            className={ctx.animate ? "animate-draw" : undefined}
            style={{ ["--len" as string]: 1383 } as CSSProperties}
            transform="rotate(-90 380 380)"
          />
          {loop.map((l, i) => {
            const a = (i / loop.length) * Math.PI * 2 - Math.PI / 2;
            const x = 380 + Math.cos(a) * 220;
            const y = 380 + Math.sin(a) * 220;
            const lx = 380 + Math.cos(a) * 300;
            const ly = 380 + Math.sin(a) * 300 + (Math.sin(a) > 0.5 ? 18 : 0);
            return (
              <g key={l}>
                <circle cx={x} cy={y} r="14" fill={i === 2 ? "#F1B86A" : "#53D8F5"} />
                <text x={lx} y={ly + 10} textAnchor="middle" fill="#F4F7FB" fontSize="30" fontFamily="var(--font-display)">{l}</text>
              </g>
            );
          })}
          <text x="380" y="372" textAnchor="middle" fill="#A4B0C2" fontSize="24" fontFamily="var(--font-geist-mono)">tú sigues siendo</text>
          <text x="380" y="408" textAnchor="middle" fill="#A4B0C2" fontSize="24" fontFamily="var(--font-geist-mono)">responsable</text>
        </svg>
      </div>
    </Frame>
  );
}

function S21(ctx: DeckContext) {
  const r = useRise(ctx);
  const weeks = [
    ["Semana 1", "Preparar perfil", "LinkedIn, GitHub y un CV de una página con enlaces."],
    ["Semana 2", "Construir un proyecto", "Pequeño, real y con README, demo y pruebas."],
    ["Semana 3", "Conectar con comunidades", "Un evento, una comunidad, tres conversaciones."],
    ["Semana 4", "Postular", "Al menos tres convocatorias del directorio."],
  ];
  return (
    <Frame n={21}>
      <div className="flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <H className="text-[112px]">
          <span {...r(0.1, "block")}>Tu próximo mes</span>
          <span {...r(0.2, "block")}>puede verse así.</span>
        </H>
        <div className="relative mt-auto grid grid-cols-4 gap-10">
          <div className="absolute left-0 right-0 top-[11px] h-[2px] bg-[linear-gradient(90deg,#F1B86A,#53D8F5)]" />
          {weeks.map(([w, t, d], i) => (
            <div key={w} {...r(0.35 + i * 0.15, "relative")}>
              <span className="block h-6 w-6 rounded-full border-4 border-obsidian bg-gold" />
              <p className="mt-8 font-mono text-[24px] text-gold">{w}</p>
              <p className="mt-3 font-display text-[46px] font-semibold leading-tight">{t}</p>
              <p className="mt-4 text-[28px] leading-snug text-muted">{d}</p>
            </div>
          ))}
        </div>
        <p {...r(1, "mt-12 font-mono text-[24px] text-faint")}>Checklist con progreso guardado en /ruta-profesional</p>
      </div>
    </Frame>
  );
}

function S22(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={22}>
      <div className="grid h-full grid-cols-[1fr_auto] items-center gap-[120px] px-[120px] pt-[60px]">
        <div>
          <H className="text-[150px]">
            <span {...r(0.1, "block")}>Escanea.</span>
            <span {...r(0.25, "block")}>Explora.</span>
            <span {...r(0.4, "block text-gold")}>Comparte.</span>
          </H>
          <p {...r(0.6, "mt-12 max-w-[820px] text-[36px] leading-snug text-muted")}>
            {ctx.totalOpportunities} oportunidades verificadas con fuente oficial: prácticas, PEU, becas, investigación, competencias y emprendimiento. Sin registro.
          </p>
        </div>
        <div {...r(0.3)}>
          <Qr qr={ctx.qr?.oportunidades} size={600} caption />
        </div>
      </div>
    </Frame>
  );
}

function S23(ctx: DeckContext) {
  const r = useRise(ctx);
  const items = [
    { name: "SpinOut", note: "Impact Regional Fellowship" },
    { name: "Comunitarios", note: "Comunidad" },
    { name: "Agendia", note: "Emprendimiento" },
    { name: "SEP", note: "Semillero de Emprendedores Perú" },
    { name: "IEEE", note: "Rama estudiantil" },
  ];
  return (
    <Frame n={23} bleed={<AltiplanoScene className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-70" connections={false} tone="dawn" animate={false} />}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#080D15_35%,rgba(8,13,21,0.4))]" />
      <div className="relative flex h-full flex-col px-[120px] pb-[110px] pt-[180px]">
        <H className="text-[112px]">
          <span {...r(0.1, "block")}>Puno no solo</span>
          <span {...r(0.2, "block")}>exporta talento.</span>
        </H>
        <p {...r(0.35, "mt-8 text-[44px] text-gold")}>También puede crear oportunidades.</p>
        <div className="mt-auto grid grid-cols-5 gap-6">
          {items.map((it, i) => (
            <div key={it.name} {...r(0.5 + i * 0.1, "border-t-2 border-gold/70 pt-6")}>
              <p className="font-display text-[46px] font-semibold">{it.name}</p>
              <p className="mt-2 text-[24px] text-muted">{it.note}</p>
            </div>
          ))}
        </div>
        <p {...r(1.1, "mt-10 font-mono text-[22px] text-faint")}>
          IRF27 y nuevas iniciativas: proyecciones, sujetas a confirmación oficial.
        </p>
      </div>
    </Frame>
  );
}

function S24(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame n={24}>
      <div className="grid h-full grid-cols-[1fr_820px] gap-[90px] px-[120px] pb-[110px] pt-[180px]">
        <div className="flex flex-col justify-center">
          <H className="text-[130px]">
            <span {...r(0.1, "block")}>Recién estamos</span>
            <span {...r(0.25, "block")}>comenzando.</span>
          </H>
          <p {...r(0.45, "mt-12 max-w-[820px] text-[38px] leading-snug text-muted")}>
            Todavía tengo muchísimo por aprender. Gracias a cada persona, comunidad y compañero que compartió una oportunidad conmigo.
          </p>
        </div>
        <div className="grid grid-rows-2 gap-6">
          <div {...r(0.3, "overflow-hidden rounded-3xl")}><PhotoSlot k="coinsi-2025" photos={ctx.photos} /></div>
          <div {...r(0.45, "overflow-hidden rounded-3xl")}><PhotoSlot k="coinsi-2026" photos={ctx.photos} /></div>
        </div>
      </div>
    </Frame>
  );
}

function S25(ctx: DeckContext) {
  const r = useRise(ctx);
  return (
    <Frame
      n={25}
      chrome={false}
      bleed={<AltiplanoScene className="absolute inset-x-0 bottom-0 h-[900px] w-full opacity-60" tone="dawn" labels={false} animate={ctx.animate} />}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,13,21,0.95)_40%,rgba(8,13,21,0.5))]" />
      <div className="relative grid h-full grid-cols-[1fr_auto] items-center gap-[100px] px-[120px]">
        <div>
          <h2 {...r(0.1, "font-display text-[150px] font-bold leading-[0.88] tracking-[-0.045em]")}>
            ¿Qué vas a
            <br />
            empezar esta
            <br />
            semana?
          </h2>
          <p {...r(0.4, "mt-12 text-[44px] text-gold")}>No esperes a egresar para comenzar.</p>
          <div {...r(0.6, "mt-16 font-mono text-[26px] text-muted")}>
            <p className="text-ink">{ctx.speakerName}</p>
            <p className="mt-2">{ctx.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</p>
          </div>
        </div>
        <div {...r(0.4)}>
          <Qr qr={ctx.qr?.oportunidades} size={440} caption />
        </div>
      </div>
    </Frame>
  );
}

export const slides = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24, S25];
