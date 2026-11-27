import type { CSSProperties, ReactNode } from "react";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { photoSlots, type PhotoMap } from "@/lib/photos";
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

type Concept =
  | "puno-noche"
  | "dos-caminos"
  | "campo-offline"
  | "rack"
  | "escenario"
  | "senderos"
  | "estado"
  | "startup"
  | "codigo"
  | "agentes-ia"
  | "amanecer"
  | "noche-estrellas"
  | "hero-titicaca"
  | "cabina-internet"
  | "trabajo-remoto"
  | "infraestructura-electrica"
  | "laboratorio";

/* ====================== primitivas ====================== */

function rise(ctx: DeckContext) {
  return (delay: number, extra = ""): { className: string; style?: CSSProperties } =>
    ctx.animate ? { className: `animate-rise ${extra}`, style: { animationDelay: `${delay}s` } } : { className: extra };
}

const mono = "font-mono tracking-[0.02em]";

/** Fondo fotográfico a sangre con movimiento lento y capas de luz. */
function Bg({
  src,
  ctx,
  overlay = "left",
  dim = 0.55,
  position = "center",
}: {
  src: Concept;
  ctx: DeckContext;
  overlay?: "left" | "bottom" | "full" | "right" | "center";
  dim?: number;
  position?: string;
}) {
  const overlays: Record<string, string> = {
    left: "linear-gradient(90deg, rgba(5,8,14,0.96) 0%, rgba(5,8,14,0.78) 38%, rgba(5,8,14,0.25) 70%, rgba(5,8,14,0.45) 100%)",
    right: "linear-gradient(270deg, rgba(5,8,14,0.96) 0%, rgba(5,8,14,0.75) 40%, rgba(5,8,14,0.2) 75%)",
    bottom: "linear-gradient(0deg, rgba(5,8,14,0.97) 0%, rgba(5,8,14,0.7) 40%, rgba(5,8,14,0.15) 75%, rgba(5,8,14,0.5) 100%)",
    full: "linear-gradient(0deg, rgba(5,8,14,0.9), rgba(5,8,14,0.6))",
    center: "radial-gradient(ellipse at center, rgba(5,8,14,0.55), rgba(5,8,14,0.95) 75%)",
  };
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- recurso local, funciona offline */}
      <img
        src={`/images/concept/${src}.webp`}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${ctx.animate ? "animate-kenburns" : ""}`}
        style={{ objectPosition: position, filter: "saturate(1.08) contrast(1.05)" }}
      />
      <div className="absolute inset-0" style={{ background: overlays[overlay] }} />
      <div className="absolute inset-0" style={{ background: `rgba(5,8,14,${Math.max(0, dim - 0.5)})` }} />
      <div className="absolute inset-0 shadow-[inset_0_0_240px_rgba(0,0,0,0.8)]" />
      <div className="grain absolute inset-0" />
    </div>
  );
}

/** Marco HUD: esquinas, progreso por actos, coordenadas. */
function Frame({ n, children, bleed, concept = false }: { n: number; children: ReactNode; bleed?: ReactNode; concept?: boolean }) {
  const meta = slideMeta[n - 1];
  const act = acts[meta.act];
  const corner = "absolute h-[34px] w-[34px] border-cyan/50";
  return (
    <div className="relative h-[1080px] w-[1920px] overflow-hidden bg-[#05080e] text-ink">
      {bleed ?? (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(67,139,255,0.16),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(241,184,106,0.10),transparent_50%)]" />
          <div className="hud-grid absolute inset-0" />
          <div className="grain absolute inset-0" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 z-10">
        <span className={`${corner} left-[56px] top-[48px] border-l-2 border-t-2`} />
        <span className={`${corner} right-[56px] top-[48px] border-r-2 border-t-2`} />
        <span className={`${corner} bottom-[48px] left-[56px] border-b-2 border-l-2`} />
        <span className={`${corner} bottom-[48px] right-[56px] border-b-2 border-r-2`} />
        <div className={`absolute left-[120px] right-[120px] top-[58px] flex items-center gap-8 text-[20px] text-white/60 ${mono}`}>
          <span className="text-white/90">DE PUNO AL MUNDO</span>
          <span className="h-px w-10 bg-white/25" />
          <span>
            ACTO {act.n} · <span className="text-cyan">{act.name.toUpperCase()}</span>
          </span>
          <span className="ml-auto flex items-center gap-2">
            {acts.map((a, i) => (
              <span key={a.n} className={`h-[5px] rounded-full ${i < meta.act ? "w-10 bg-cyan/70" : i === meta.act ? "w-16 bg-gold" : "w-10 bg-white/15"}`} />
            ))}
          </span>
          <span className="tabular text-white/90">
            {String(n).padStart(2, "0")}
            <span className="text-white/40"> / {TOTAL_SLIDES}</span>
          </span>
        </div>
        <div className={`absolute bottom-[56px] left-[120px] right-[120px] flex items-center justify-between text-[18px] text-white/40 ${mono}`}>
          <span>15.84°S 70.02°O · 3812 m s. n. m.</span>
          <span>{concept ? "Fotografía conceptual generada con IA" : "COINSI 2026 · UNA PUNO"}</span>
        </div>
      </div>
      <div className="relative z-[5] h-full w-full">{children}</div>
    </div>
  );
}

function Qr({ qr, size, caption }: { qr: DeckQr | null | undefined; size: number; caption?: boolean }) {
  if (!qr) {
    return (
      <div style={{ width: size, height: size }} className={`glass flex items-center justify-center rounded-[28px] p-8 text-center text-[20px] text-white/50 ${mono}`}>
        El QR se genera con la URL real de producción
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="absolute -inset-6 rounded-[44px] bg-[conic-gradient(from_120deg,#53D8F5,#438BFF,#F1B86A,#53D8F5)] opacity-50 blur-2xl" />
        <div
          style={{ width: size, height: size }}
          className="relative overflow-hidden rounded-[28px] bg-ink p-4 [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: qr.svg }}
          role="img"
          aria-label={`Código QR hacia ${qr.url}`}
        />
      </div>
      {caption && <span className={`text-[24px] text-white/80 ${mono}`}>{qr.url.replace(/^https?:\/\//, "")}</span>}
    </div>
  );
}

function Kicker({ children, color = "text-cyan" }: { children: ReactNode; color?: string }) {
  return (
    <p className={`flex items-center gap-4 text-[24px] ${color} ${mono}`}>
      <span className="h-[2px] w-12 bg-current" />
      {children}
    </p>
  );
}

function Flow({ items, color = "#53D8F5", size = 40 }: { items: string[]; color?: string; size?: number }) {
  return (
    <div className="flex items-center">
      {items.map((it, i) => (
        <div key={it} className="flex items-center">
          <div className="glass flex items-center gap-4 rounded-full px-7 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-[18px] font-semibold text-obsidian" style={{ background: color }}>
              {i + 1}
            </span>
            <span className="font-display font-medium" style={{ fontSize: size }}>
              {it}
            </span>
          </div>
          {i < items.length - 1 && <span className="mx-3 h-[2px] w-12" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />}
        </div>
      ))}
    </div>
  );
}

function Photo({
  k,
  ctx,
  className = "",
  position = "center",
  caption = true,
}: {
  k: keyof typeof photoSlots;
  ctx: DeckContext;
  className?: string;
  position?: string;
  caption?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-white/10 text-[21px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <PhotoSlot k={k} photos={ctx.photos} caption={caption} position={position} />
    </div>
  );
}

const H = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <h2 className={`font-display font-semibold leading-[0.92] tracking-[-0.04em] ${className}`} style={style}>
    {children}
  </h2>
);

/* ====================== diapositivas ====================== */

function S1(ctx: DeckContext) {
  const r = rise(ctx);
  const P = { x: 1500, y: 860 };
  const dests = [
    { l: "Lima", x: 1230, y: 480, d: false },
    { l: "Buenos Aires", x: 1380, y: 330, d: false },
    { l: "Ginebra", x: 1610, y: 210, d: false },
    { l: "Okinawa", x: 1790, y: 330, d: false },
    { l: "Shenzhen", x: 1740, y: 520, d: true },
  ];
  return (
    <Frame n={1} concept bleed={<Bg src="puno-noche" ctx={ctx} overlay="left" position="right center" />}>
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="s1a" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#F1B86A" />
            <stop offset="0.6" stopColor="#53D8F5" />
            <stop offset="1" stopColor="#438BFF" />
          </linearGradient>
        </defs>
        {dests.map((d, i) => (
          <g key={d.l}>
            <path
              d={`M${P.x},${P.y} Q${(P.x + d.x) / 2 + (d.x < P.x ? -90 : 90)},${Math.min(P.y, d.y) - 200} ${d.x},${d.y}`}
              fill="none"
              stroke="url(#s1a)"
              strokeWidth="2.5"
              strokeDasharray={d.d ? "8 12" : undefined}
              className={ctx.animate && !d.d ? "animate-draw" : undefined}
              style={ctx.animate && !d.d ? ({ ["--len" as string]: 1400, animationDelay: `${0.6 + i * 0.2}s` } as CSSProperties) : undefined}
            />
            <circle cx={d.x} cy={d.y} r="7" fill={d.d ? "none" : "#53D8F5"} stroke="#53D8F5" strokeWidth="2" />
            <circle cx={d.x} cy={d.y} r="18" fill="none" stroke="#53D8F5" strokeOpacity="0.35" className={ctx.animate ? "animate-glow" : undefined} />
            <text x={d.x + (d.x > 1700 ? -26 : 26)} y={d.y - 16} textAnchor={d.x > 1700 ? "end" : "start"} fill="#E8F4FF" fontSize="24" fontFamily="var(--font-geist-mono)">
              {d.l}
            </text>
          </g>
        ))}
        <circle cx={P.x} cy={P.y} r="10" fill="#F1B86A" />
        <circle cx={P.x} cy={P.y} r="30" fill="none" stroke="#F1B86A" strokeOpacity="0.6" className={ctx.animate ? "animate-glow" : undefined} />
        <text x={P.x} y={P.y + 62} textAnchor="middle" fill="#F1B86A" fontSize="26" fontFamily="var(--font-geist-mono)">
          PUNO
        </text>
      </svg>
      <div className="relative flex h-full flex-col justify-center px-[120px]">
        <div {...r(0.1, "")}>
          <Kicker color="text-gold">COINSI 2026 · UNA PUNO</Kicker>
        </div>
        <h1 {...r(0.25, "mt-10 font-display text-[210px] font-bold leading-[0.82] tracking-[-0.055em]")}>
          <span className="block text-gradient">DE PUNO</span>
          <span className="block">AL MUNDO.</span>
        </h1>
        <p {...r(0.5, "mt-12 max-w-[900px] text-[46px] leading-tight text-white/90")}>Cómo construir experiencia real antes de egresar.</p>
        <div {...r(0.7, "mt-14 flex items-center gap-6")}>
          <span className="glass rounded-full px-7 py-3 text-[26px]">{ctx.speakerName}</span>
          <span className={`text-[22px] text-white/60 ${mono}`}>27 · 11 · 2026</span>
        </div>
      </div>
    </Frame>
  );
}

function S2(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={2} concept bleed={<Bg src="escenario" ctx={ctx} overlay="left" dim={0.75} />}>
      <div className="flex h-full items-center px-[120px]">
        <div className="max-w-[1200px]">
          <Kicker>LA PARADOJA</Kicker>
          <H className="mt-10 text-[124px]">
            <span {...r(0.1, "block")}>¿Cómo consigo</span>
            <span {...r(0.25, "block text-white/55")}>experiencia si me</span>
            <span {...r(0.4, "block text-white/55")}>piden experiencia</span>
            <span {...r(0.55, "block text-gradient-gold")}>para empezar?</span>
          </H>
        </div>
        <div className="relative ml-auto h-[540px] w-[540px]">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-label="Ciclo: sin experiencia no hay trabajo y sin trabajo no hay experiencia">
            <defs>
              <linearGradient id="s2g" x1="0" x2="1">
                <stop offset="0" stopColor="#F1B86A" />
                <stop offset="1" stopColor="#53D8F5" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" />
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="url(#s2g)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="900"
              className={ctx.animate ? "animate-draw" : undefined}
              style={{ ["--len" as string]: 900 } as CSSProperties}
              transform="rotate(-90 200 200)"
            />
            <circle cx="200" cy="50" r="9" fill="#F1B86A" />
            <circle cx="200" cy="350" r="9" fill="#53D8F5" />
          </svg>
          <span className={`glass absolute left-1/2 top-[-6px] -translate-x-1/2 rounded-full px-6 py-2 text-[24px] ${mono}`}>experiencia</span>
          <span className={`glass absolute bottom-[-6px] left-1/2 -translate-x-1/2 rounded-full px-6 py-2 text-[24px] ${mono}`}>trabajo</span>
          <span className={`absolute inset-0 flex items-center justify-center text-[30px] text-white/70 ${mono}`}>¿por dónde entro?</span>
        </div>
      </div>
    </Frame>
  );
}

function S3(ctx: DeckContext) {
  const r = rise(ctx);
  const moments = ["Cabinas de internet", "Videojuegos", "Primeras computadoras", "Interés por la tecnología"];
  return (
    <Frame n={3} concept bleed={<Bg src="cabina-internet" ctx={ctx} overlay="left" position="right center" />}>
      <div className="flex h-full flex-col justify-center px-[120px]">
        <Kicker color="text-gold">EL ORIGEN</Kicker>
        <H className="mt-8 text-[132px]">
          <span {...r(0.1, "block")}>Todo empezó</span>
          <span {...r(0.25, "block text-gradient-gold")}>con curiosidad.</span>
        </H>
        <ol className="mt-16 grid max-w-[1000px] grid-cols-2 gap-5">
          {moments.map((m, i) => (
            <li key={m} {...r(0.45 + i * 0.12, "glass flex items-center gap-6 rounded-2xl px-7 py-6")}>
              <span className={`text-[24px] text-gold ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[34px]">{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

function S4(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={4} concept bleed={<Bg src="dos-caminos" ctx={ctx} overlay="bottom" dim={0.5} />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <H className="text-[120px]">
          <span {...r(0.1, "block")}>Dos caminos que</span>
          <span {...r(0.25, "block text-gradient")}>pueden convivir.</span>
        </H>
        <div className="mt-auto grid grid-cols-[1fr_auto_1fr] items-end gap-10">
          <div {...r(0.45, "glass rounded-3xl p-9")}>
            <p className={`text-[22px] text-[#8db8ff] ${mono}`}>FORMACIÓN ACADÉMICA</p>
            <p className="mt-4 text-[34px] leading-snug">Fundamentos · Algoritmos · Bases de datos · Ingeniería de software</p>
          </div>
          <div {...r(0.75, "pb-6 text-center")}>
            <p className={`text-[22px] text-white/60 ${mono}`}>CONVERGEN EN</p>
            <p className="mt-2 font-display text-[56px] font-semibold text-gradient-gold">Evidencia</p>
          </div>
          <div {...r(0.6, "glass rounded-3xl p-9")}>
            <p className={`text-[22px] text-gold ${mono}`}>EXPERIENCIA PRÁCTICA</p>
            <p className="mt-4 text-[34px] leading-snug">Curiosidad · Comunidades · Primer proyecto real · Prácticas</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S5(ctx: DeckContext) {
  const r = rise(ctx);
  const rings = ["Mi universidad", "IEEE", "Viaje a Cusco", "Comunidades", "Oportunidades"];
  return (
    <Frame n={5} concept bleed={<Bg src="noche-estrellas" ctx={ctx} overlay="left" dim={0.6} />}>
      <svg viewBox="0 0 1000 1000" className="absolute right-[-60px] top-[70px] h-[960px] w-[960px]" aria-hidden>
        {rings.map((l, i) => {
          const rr = 90 + i * 85;
          return (
            <g key={l}>
              <circle
                cx="500"
                cy="500"
                r={rr}
                fill="none"
                stroke={i === 0 ? "#F1B86A" : "#53D8F5"}
                strokeOpacity={i === 0 ? 0.9 : 0.55 - i * 0.07}
                strokeWidth={i === 0 ? 3 : 1.6}
                strokeDasharray={i === rings.length - 1 ? "4 10" : undefined}
              />
              <rect x={500 - l.length * 8 - 18} y={500 - rr - 22} width={l.length * 16 + 36} height="44" rx="22" fill="rgba(5,8,14,0.85)" stroke="rgba(255,255,255,0.15)" />
              <text x="500" y={500 - rr + 8} textAnchor="middle" fill={i === 0 ? "#F1B86A" : "#E8F4FF"} fontSize="24" fontFamily="var(--font-geist-mono)">
                {l}
              </text>
            </g>
          );
        })}
        <circle cx="500" cy="500" r="14" fill="#F1B86A" className={ctx.animate ? "animate-glow" : undefined} />
      </svg>
      <div className="relative flex h-full flex-col justify-center px-[120px]">
        <H className="text-[140px]">
          <span {...r(0.1, "block")}>Salir de</span>
          <span {...r(0.25, "block text-gradient")}>mi burbuja.</span>
        </H>
        <p {...r(0.45, "mt-10 max-w-[760px] text-[36px] leading-snug text-white/75")}>
          El primer paso no fue técnico. Fue darme cuenta de que había un mundo de oportunidades fuera del aula.
        </p>
        <div {...r(0.6, "mt-14 flex gap-6")}>
          <Photo k={ctx.photos.ieee ? "ieee" : "flit-2026"} ctx={ctx} className="h-[260px] w-[390px]" />
          <Photo k={ctx.photos.cusco ? "cusco" : "irf26-huaraz"} ctx={ctx} className="h-[260px] w-[390px]" />
        </div>
      </div>
    </Frame>
  );
}

function S6(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={6} concept bleed={<Bg src="campo-offline" ctx={ctx} overlay="full" dim={0.72} position="center" />}>
      <div className="grid h-full grid-cols-2">
        <div className="flex flex-col justify-center px-[120px]">
          <div {...r(0.1, "")}>
            <Kicker color="text-gold">EXPECTATIVA</Kicker>
          </div>
          <p {...r(0.25, "mt-10 font-display text-[100px] font-semibold leading-[0.95] tracking-[-0.04em]")}>
            “Sí, ingeniero,
            <br />
            eso es sencillo.”
          </p>
        </div>
        <div className="flex flex-col justify-center pr-[120px]">
          <div {...r(0.5, "")}>
            <Kicker>REALIDAD</Kicker>
          </div>
          <p {...r(0.6, "mt-10 font-display text-[100px] font-semibold leading-[0.95] tracking-[-0.04em] text-gradient")}>¿Por qué no funciona?</p>
          <div {...r(0.8, `glass mt-12 rounded-3xl p-9 text-[26px] leading-relaxed ${mono}`)}>
            <span className="text-white/40">$</span> sync --push
            <br />
            <span className="text-[#ff8f8f]">✕ error: no hay conexión a internet</span>
            <br />
            <span className="text-white/40">{"// el campo no es la oficina"}</span>
          </div>
          <p {...r(1, "mt-12 text-[38px]")}>
            Mi primer trabajo: <span className="font-semibold text-gradient-gold">ECOING</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

function S7(ctx: DeckContext) {
  const r = rise(ctx);
  const node = (label: string, sub: string, color: string, delay: number) => {
    const p = r(delay, "glass min-w-[220px] rounded-2xl px-7 py-6");
    return (
      <div className={p.className} style={{ ...p.style, boxShadow: `inset 0 0 0 1px ${color}55, 0 0 40px -10px ${color}66` }}>
        <p className="font-display text-[36px] font-semibold">{label}</p>
        <p className={`mt-1 text-[20px] text-white/60 ${mono}`}>{sub}</p>
      </div>
    );
  };
  const arrow = (c: string, dashed = false) => (
    <svg width="64" height="24" className="shrink-0" aria-hidden>
      <line x1="2" y1="12" x2="52" y2="12" stroke={c} strokeWidth="3" strokeDasharray={dashed ? "6 7" : undefined} />
      <path d="M46 4 L60 12 L46 20" fill="none" stroke={c} strokeWidth="3" />
    </svg>
  );
  return (
    <Frame n={7} concept bleed={<Bg src="infraestructura-electrica" ctx={ctx} overlay="full" dim={0.62} />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <Kicker color="text-gold">CASO ECOING · OFFLINE-FIRST</Kicker>
        <H className="mt-8 text-[120px]">
          <span {...r(0.05)}>¿Y si no hay internet?</span>
        </H>
        <p {...r(0.2, "mt-6 max-w-[1300px] text-[34px] text-white/75")}>Una app que tenía que seguir funcionando en campo, sin señal.</p>
        <div className="mt-auto flex items-stretch gap-4">
          <div className="rounded-[32px] border-2 border-dashed border-gold/50 bg-black/20 p-8">
            <p className={`mb-6 text-[22px] text-gold ${mono}`}>SIN CONEXIÓN · EN CAMPO</p>
            <div className="flex items-center gap-3">
              {node("Flutter", "app móvil", "#F1B86A", 0.4)}
              {arrow("#F1B86A")}
              {node("SQLite", "datos locales", "#F1B86A", 0.55)}
            </div>
            <p className="mt-6 text-[24px] text-white/70">Todo se registra localmente.</p>
          </div>
          <div className="flex items-center">{arrow("#66E3B4", true)}</div>
          <div className="flex-1 rounded-[32px] border-2 border-dashed border-cyan/50 bg-black/20 p-8">
            <p className={`mb-6 text-[22px] text-cyan ${mono}`}>AL RECUPERAR INTERNET</p>
            <div className="flex items-center gap-3">
              {node("Sync", "cola de cambios", "#53D8F5", 0.8)}
              {arrow("#53D8F5")}
              {node("API REST", "servidor", "#438BFF", 0.95)}
              {arrow("#438BFF")}
              {node("Dashboard", "seguimiento", "#438BFF", 1.1)}
            </div>
            <p className="mt-6 text-[24px] text-white/70">Los cambios se envían, se validan y llegan al panel del equipo.</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S8(ctx: DeckContext) {
  const r = rise(ctx);
  const tech = ["Desarrollo", "Infraestructura", "Cableado"];
  const human = ["Comunicación", "Puntualidad", "Disciplina"];
  return (
    <Frame n={8} concept bleed={<Bg src="rack" ctx={ctx} overlay="left" position="right center" />}>
      <div className="flex h-full flex-col justify-center px-[120px]">
        <Kicker color="text-gold">VOLUNTARIADO · PODER JUDICIAL</Kicker>
        <H className="mt-8 text-[140px]">
          <span {...r(0.1, "block")}>No todo es</span>
          <span {...r(0.25, "block text-gradient")}>programar.</span>
        </H>
        <div className="mt-16 grid max-w-[1050px] grid-cols-2 gap-8">
          <div {...r(0.45, "glass rounded-3xl p-9")}>
            <p className={`text-[22px] text-cyan ${mono}`}>LO TÉCNICO</p>
            {tech.map((t) => (
              <p key={t} className="mt-4 font-display text-[44px]">
                {t}
              </p>
            ))}
          </div>
          <div {...r(0.65, "glass rounded-3xl p-9")}>
            <p className={`text-[22px] text-gold ${mono}`}>LO QUE NO TE ENSEÑAN EN CLASE</p>
            {human.map((t) => (
              <p key={t} className="mt-4 font-display text-[44px]">
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S9(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={9} concept bleed={<Bg src="escenario" ctx={ctx} overlay="bottom" dim={0.55} />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <H className="text-[124px]">
          <span {...r(0.1)}>Un buen proyecto </span>
          <span {...r(0.2, "text-gradient-gold")}>no basta.</span>
        </H>
        <div {...r(0.3, `mt-8 flex gap-4 text-[24px] ${mono}`)}>
          {["Reconocimiento facial", "Concursos perdidos", "DermaApp"].map((t, i) => (
            <span key={t} className={`glass rounded-full px-6 py-2 ${i === 2 ? "text-gold" : "text-white/75"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-[480px_1fr] items-end gap-12">
          <div {...r(0.5, "glass rounded-3xl p-9 opacity-80")}>
            <p className={`text-[22px] text-white/50 ${mono}`}>✕ ENUMERAR TECNOLOGÍAS</p>
            <p className="mt-5 text-[30px] leading-snug text-white/50 line-through decoration-[#ff8f8f]/80">“Usamos IA, una app móvil y una base de datos en la nube.”</p>
          </div>
          <div {...r(0.7, "")}>
            <p className={`mb-6 text-[22px] text-gold ${mono}`}>✓ COMUNICAR VALOR</p>
            <Flow items={["Problema", "Solución", "Evidencia", "Impacto"]} color="#F1B86A" size={32} />
            <p className="mt-8 max-w-[1000px] text-[30px] leading-snug text-white/80">
              El jurado no evalúa cuántas tecnologías usaste: evalúa si entendiste el problema y si puedes demostrar que tu solución sirve.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S10(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={10}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <H className="text-[108px]">
          <span {...r(0.1, "block")}>Perdimos una hackathon.</span>
          <span {...r(0.3, "block text-gradient-gold")}>Ganamos una comunidad.</span>
        </H>
        <div {...r(0.5, "mt-10")}>
          <Flow items={["HackAru", "SpinOut", "IRF26"]} size={34} />
        </div>
        <div className="mt-auto grid grid-cols-[1.4fr_1fr_1fr] grid-rows-2 gap-5" style={{ height: 440 }}>
          <div {...r(0.6, "row-span-2")}>
            <Photo k="irf26-utec" ctx={ctx} className="h-full" />
          </div>
          <div {...r(0.7, "")}>
            <Photo k="irf26-huaraz" ctx={ctx} className="h-full" />
          </div>
          <div {...r(0.8, "")}>
            <Photo k="flit-2026" ctx={ctx} className="h-full" />
          </div>
          <div {...r(0.9, "col-span-2")}>
            <Photo k="sep" ctx={ctx} className="h-full" position="center 40%" />
          </div>
        </div>
      </div>
    </Frame>
  );
}

function S11(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={11} concept bleed={<Bg src="senderos" ctx={ctx} overlay="bottom" dim={0.5} />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <H className="text-[120px]">
          <span {...r(0.1, "block")}>No existe una sola</span>
          <span {...r(0.2, "block text-gradient")}>ruta profesional.</span>
        </H>
        <div className="mt-auto grid grid-cols-6 gap-5">
          {ctx.routeCounts.map((route, i) => (
            <div key={route.label} {...r(0.35 + i * 0.1, "glass rounded-3xl px-7 pb-7 pt-6")}>
              <p className="font-display text-[100px] font-semibold leading-none tabular text-gradient">{route.count}</p>
              <p className="mt-4 text-[28px] leading-tight">{route.label}</p>
            </div>
          ))}
        </div>
        <p {...r(1, `mt-6 text-[20px] text-white/55 ${mono}`)}>ENTRADAS EN EL DIRECTORIO · TODAS CON FUENTE OFICIAL</p>
      </div>
    </Frame>
  );
}

function S12(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={12}>
      <div className="absolute inset-y-0 left-0 w-[820px]">
        <PhotoSlot k="angie" photos={ctx.photos} position="center 30%" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,#05080e),linear-gradient(180deg,rgba(5,8,14,0.85),transparent_22%,transparent_78%,rgba(5,8,14,0.9))]" />
      </div>
      <div className="relative ml-[860px] flex h-full flex-col justify-center pr-[120px]">
        <Kicker color="text-gold">HISTORIA DE UNA COMPAÑERA</Kicker>
        <H className="mt-8 text-[120px]">
          <span {...r(0.2, "block")}>Angie:</span>
          <span {...r(0.3, "block")}>de un PEU a</span>
          <span {...r(0.4, "block text-gradient")}>una práctica.</span>
        </H>
        <div className="mt-14 space-y-4">
          {[
            ["Postulación", "a un PEU"],
            ["≈ 3 meses", "de formación en Lima"],
            ["Oportunidad", "profesional"],
          ].map(([a, b], i) => (
            <div key={a} {...r(0.6 + i * 0.15, "glass flex items-baseline gap-8 rounded-2xl px-8 py-5")}>
              <span className={`text-[24px] text-cyan ${mono}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[40px] font-semibold">{a}</span>
              <span className="text-[28px] text-white/60">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function S13(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={13} concept bleed={<Bg src="estado" ctx={ctx} overlay="left" dim={0.6} />}>
      <div className="grid h-full grid-cols-[1fr_380px] gap-[80px] px-[120px] pb-[130px] pt-[150px]">
        <div className="flex flex-col">
          <H className="text-[120px]">
            <span {...r(0.1, "block")}>El Estado también</span>
            <span {...r(0.2, "block text-gradient")}>busca talento.</span>
          </H>
          <div className="mt-auto flex flex-wrap gap-4">
            {ctx.stateOrgs.map((o, i) => (
              <span key={o.name} {...r(0.35 + i * 0.04, `glass rounded-2xl px-6 py-3 font-display text-[38px] font-semibold ${o.listed ? "text-ink" : "text-white/35"}`)}>
                {o.name}
              </span>
            ))}
          </div>
          <p {...r(1, "mt-8 text-[28px] text-white/70")}>PEU, cursos de extensión y prácticas. Cada programa tiene carreras y requisitos distintos.</p>
        </div>
        <div {...r(0.6, "flex flex-col items-center justify-end")}>
          <Qr qr={ctx.qr?.oportunidades} size={340} />
          <p className={`mt-6 text-center text-[21px] text-white/70 ${mono}`}>FILTRA “SECTOR PÚBLICO” Y “PEU”</p>
        </div>
      </div>
    </Frame>
  );
}

function S14(ctx: DeckContext) {
  const r = rise(ctx);
  const steps = ["Universidad", "Regional", "Nacional", "Latinoamérica"];
  return (
    <Frame n={14} concept bleed={<Bg src="noche-estrellas" ctx={ctx} overlay="left" dim={0.65} />}>
      <div className="grid h-full grid-cols-[1fr_460px] gap-[80px] px-[120px] pb-[130px] pt-[150px]">
        <div className="flex flex-col">
          <Kicker color="text-gold">HUAWEI ICT COMPETITION</Kicker>
          <H className="mt-8 text-[112px]">
            <span {...r(0.1, "block")}>Juan Diego:</span>
            <span {...r(0.2, "block text-gradient")}>competir afuera.</span>
          </H>
          <svg viewBox="0 -60 1100 420" className="mt-auto w-full" aria-label="Etapas: universidad, regional, nacional, Latinoamérica; China como siguiente meta">
            {steps.map((s, i) => {
              const x = 110 + i * 245;
              const y = 270 - i * 55;
              return (
                <g key={s}>
                  {i > 0 && <line x1={x - 245} y1={y + 55} x2={x} y2={y} stroke="#53D8F5" strokeWidth="4" />}
                  <circle cx={x} cy={y} r="16" fill="#53D8F5" />
                  <circle cx={x} cy={y} r="30" fill="none" stroke="#53D8F5" strokeOpacity="0.35" />
                  <text x={x} y={y + 62} textAnchor="middle" fill="#F4F7FB" fontSize="28" fontFamily="var(--font-display)">
                    {s}
                  </text>
                </g>
              );
            })}
            <line x1={110 + 3 * 245} y1={270 - 3 * 55} x2={1040} y2={30} stroke="#F1B86A" strokeWidth="4" strokeDasharray="10 12" />
            <circle cx={1040} cy={30} r="16" fill="none" stroke="#F1B86A" strokeWidth="4" strokeDasharray="5 5" />
            <text x={1010} y={-18} textAnchor="end" fill="#F1B86A" fontSize="30" fontFamily="var(--font-display)">
              China · siguiente meta
            </text>
          </svg>
          <p {...r(0.8, "mt-6 text-[30px] leading-snug text-white/75")}>Llegar a la etapa latinoamericana desde Puno demuestra que se puede.</p>
        </div>
        <div {...r(0.3, "flex items-center")}>
          <Photo k="diego" ctx={ctx} className="h-[700px] w-full" position="center 15%" />
        </div>
      </div>
    </Frame>
  );
}

function S15(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={15}>
      <div className="grid h-full grid-cols-[1fr_620px] gap-[90px] px-[120px] pb-[130px] pt-[150px]">
        <div className="flex min-h-0 flex-col">
          <Kicker color="text-gold">UN FELLOW DE NUESTRA UNIVERSIDAD</Kicker>
          <H className="mt-8 text-[116px]">
            <span {...r(0.15, "block")}>Paolo Boris</span>
            <span {...r(0.25, "block text-gradient")}>Luna Luque</span>
          </H>
          <p {...r(0.4, "mt-10 max-w-[900px] text-[34px] leading-snug text-white/75")}>
            Estudiante de Ingeniería de Sistemas y representante regional del Impact Regional Fellowship 2026.
          </p>
          <div {...r(0.6, "glass mt-auto rounded-3xl p-9")}>
            <p className={`text-[22px] text-cyan ${mono}`}>¿QUÉ ES UN FELLOWSHIP?</p>
            <p className="mt-4 text-[30px] leading-snug">
              Un programa de duración definida que selecciona a un grupo para formarse, conectarse y desarrollar un proyecto con mentoría.
            </p>
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-6">
          <Photo k="paolo" ctx={ctx} className="min-h-0 flex-1" position="center 35%" caption={false} />
          <p {...r(0.8, "font-display text-[40px] font-semibold leading-tight text-gradient-gold")}>Las oportunidades existen antes de egresar.</p>
        </div>
      </div>
    </Frame>
  );
}

function S16(ctx: DeckContext) {
  const r = rise(ctx);
  const skills = ["Git", "Colaboración", "Revisiones de código", "Postulaciones"];
  return (
    <Frame n={16} concept bleed={<Bg src="trabajo-remoto" ctx={ctx} overlay="left" position="right center" />}>
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="s16" x1="0" x2="1">
            <stop offset="0" stopColor="#F1B86A" />
            <stop offset="1" stopColor="#53D8F5" />
          </linearGradient>
        </defs>
        <path d="M1220 800 Q 1500 280 1760 500" fill="none" stroke="url(#s16)" strokeWidth="3" className={ctx.animate ? "animate-draw" : undefined} style={{ ["--len" as string]: 1000 } as CSSProperties} />
        <circle cx="1220" cy="800" r="12" fill="#F1B86A" />
        <circle cx="1760" cy="500" r="12" fill="#53D8F5" />
        <text x="1220" y="860" textAnchor="middle" fill="#fff" fontSize="26" fontFamily="var(--font-geist-mono)">
          PUNO
        </text>
        <text x="1760" y="560" textAnchor="middle" fill="#fff" fontSize="26" fontFamily="var(--font-geist-mono)">
          ARGENTINA
        </text>
      </svg>
      <div className="relative flex h-full flex-col justify-center px-[120px]">
        <Kicker color="text-gold">PRÁCTICA REMOTA · ALLPROCAR</Kicker>
        <H className="mt-8 text-[116px]">
          <span {...r(0.1, "block")}>Trabajar desde Puno</span>
          <span {...r(0.2, "block text-gradient")}>para otros países.</span>
        </H>
        <div {...r(0.4, "mt-12 flex max-w-[1000px] flex-wrap gap-4")}>
          {skills.map((k) => (
            <span key={k} className="glass rounded-full px-7 py-3 text-[30px]">
              {k}
            </span>
          ))}
        </div>
        <div {...r(0.6, "glass mt-12 max-w-[900px] rounded-3xl p-8")}>
          <p className={`text-[22px] text-gold ${mono}`}>OJO</p>
          <p className="mt-3 text-[30px] leading-snug">“Remoto” no siempre significa “disponible desde cualquier país”. Revisa la restricción geográfica.</p>
        </div>
      </div>
    </Frame>
  );
}

function S17(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={17} concept bleed={<Bg src="laboratorio" ctx={ctx} overlay="left" dim={0.55} />}>
      <div className="grid h-full grid-cols-[1fr_380px] gap-[80px] px-[120px] pb-[130px] pt-[150px]">
        <div className="flex flex-col">
          <H className="text-[104px]">
            <span {...r(0.1, "block")}>Investigación y</span>
            <span {...r(0.2, "block text-gradient")}>oportunidades globales.</span>
          </H>
          <div className="mt-auto space-y-4">
            {ctx.research.slice(0, 4).map((o, i) => (
              <div key={o.title} {...r(0.35 + i * 0.08, "glass grid grid-cols-[1fr_auto] items-center gap-8 rounded-2xl px-8 py-5")}>
                <div>
                  <span className="block font-display text-[32px] font-semibold leading-tight">{o.title}</span>
                  <span className="text-[22px] text-white/60">{o.organization}</span>
                </div>
                <span className={`rounded-full px-5 py-2 text-[22px] ${o.status === "open" ? "bg-mint/15 text-mint" : "bg-white/10 text-cyan"} ${mono}`}>{o.when}</span>
              </div>
            ))}
          </div>
        </div>
        <div {...r(0.6, "flex flex-col items-center justify-end")}>
          <Qr qr={ctx.qr?.oportunidades} size={330} />
          <p className={`mt-6 text-center text-[21px] text-white/70 ${mono}`}>REQUISITOS Y FECHAS EN EL DIRECTORIO</p>
        </div>
      </div>
    </Frame>
  );
}

function S18(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={18} concept bleed={<Bg src="startup" ctx={ctx} overlay="bottom" dim={0.55} />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <H className="text-[120px]">
          <span {...r(0.1, "block")}>De una idea a una</span>
          <span {...r(0.2, "block text-gradient-gold")}>solución real.</span>
        </H>
        <div {...r(0.35, "mt-10")}>
          <Flow items={["Problema", "Prototipo", "Validación", "Crecimiento"]} color="#66E3B4" size={32} />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-6">
          {[
            ["JAYU", "Emprendimiento en desarrollo"],
            ["Agendia", "Emprendimiento en desarrollo"],
            ["ROWAN", "Aprendizajes"],
          ].map(([n, d], i) => (
            <div key={n} {...r(0.55 + i * 0.12, "glass rounded-3xl p-8")}>
              <p className="font-display text-[52px] font-semibold">{n}</p>
              <p className="mt-1 text-[26px] text-white/65">{d}</p>
            </div>
          ))}
        </div>
        <p {...r(0.95, `mt-6 text-[20px] text-white/55 ${mono}`)}>INCUBACIÓN · ACELERACIÓN · CONCURSOS · CAPITAL SEMILLA · MENTORÍAS</p>
      </div>
    </Frame>
  );
}

function S19(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={19} concept bleed={<Bg src="codigo" ctx={ctx} overlay="left" dim={0.6} position="right center" />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <H className="text-[104px]">
          <span {...r(0.1, "block text-white/50")}>No me digas qué sabes.</span>
          <span {...r(0.25, "block text-gradient")}>Muéstrame qué construyes.</span>
        </H>
        <div className="mt-auto grid grid-cols-[1fr_1.25fr] gap-10">
          <div {...r(0.45, "glass rounded-3xl p-10 opacity-75")}>
            <p className={`text-[22px] text-white/50 ${mono}`}>CV CON LISTA DE TECNOLOGÍAS</p>
            <p className="mt-6 text-[36px] leading-relaxed text-white/45">Java, Python, React, Flutter, SQL, Docker, Git, Linux…</p>
            <p className="mt-6 text-[28px] text-white/70">¿Qué construiste con eso?</p>
          </div>
          <div {...r(0.65, `glass rounded-3xl p-10 ${mono}`)}>
            <p className="text-[22px] text-gold">README.md</p>
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
                  <span>{t}</span>
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
  const r = rise(ctx);
  const loop = ["Planificar", "Implementar", "Revisar", "Probar", "Entregar"];
  return (
    <Frame n={20} concept bleed={<Bg src="agentes-ia" ctx={ctx} overlay="left" dim={0.5} position="right center" />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <Kicker>CLAUDE CODE · CODEX · AGENTES</Kicker>
        <H className="mt-8 text-[120px]">
          <span {...r(0.1, "block")}>El ingeniero en</span>
          <span {...r(0.2, "block text-gradient")}>la era de la IA.</span>
        </H>
        <div {...r(0.4, "mt-12 flex flex-wrap items-center gap-3")}>
          {loop.map((l, i) => (
            <span key={l} className="flex items-center gap-3">
              <span className={`glass rounded-full px-6 py-3 text-[30px] ${i === 2 ? "text-gold" : ""}`}>{l}</span>
              {i < loop.length - 1 && <span className="text-[28px] text-cyan">→</span>}
            </span>
          ))}
        </div>
        <p {...r(0.6, "mt-auto max-w-[1300px] font-display text-[84px] font-semibold leading-[0.98] tracking-[-0.03em] text-gradient-gold")}>
          Generar código no significa entenderlo.
        </p>
        <p {...r(0.8, "mt-8 max-w-[1100px] text-[28px] leading-snug text-white/70")}>
          Esta plataforma se planificó, construyó y desplegó con agentes de IA, y cada dato del directorio se verificó contra su fuente oficial.
        </p>
      </div>
    </Frame>
  );
}

function S21(ctx: DeckContext) {
  const r = rise(ctx);
  const weeks = [
    ["Semana 1", "Prepara tu perfil", "LinkedIn, GitHub y un CV de una página con enlaces."],
    ["Semana 2", "Construye un proyecto", "Pequeño, real, con README, demo y pruebas."],
    ["Semana 3", "Conecta", "Un evento, una comunidad, tres conversaciones."],
    ["Semana 4", "Postula", "Al menos a tres convocatorias del directorio."],
  ];
  return (
    <Frame n={21} concept bleed={<Bg src="amanecer" ctx={ctx} overlay="bottom" dim={0.5} />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <H className="text-[120px]">
          <span {...r(0.1, "block")}>Tu próximo mes</span>
          <span {...r(0.2, "block text-gradient-gold")}>puede verse así.</span>
        </H>
        <div className="mt-auto grid grid-cols-4 gap-6">
          {weeks.map(([w, t, d], i) => (
            <div key={w} {...r(0.35 + i * 0.15, "glass relative rounded-3xl p-8")}>
              <span className="absolute -top-3 left-8 h-6 w-6 rounded-full border-4 border-[#05080e] bg-gold" />
              <p className={`text-[22px] text-gold ${mono}`}>{w.toUpperCase()}</p>
              <p className="mt-3 font-display text-[42px] font-semibold leading-tight">{t}</p>
              <p className="mt-3 text-[26px] leading-snug text-white/70">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function S22(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={22} concept bleed={<Bg src="noche-estrellas" ctx={ctx} overlay="left" dim={0.55} />}>
      <div className="grid h-full grid-cols-[1fr_auto] items-center gap-[100px] px-[120px] pt-[20px]">
        <div>
          <Kicker color="text-gold">SIN REGISTRO · DESDE TU CELULAR</Kicker>
          <H className="mt-8 text-[156px]">
            <span {...r(0.1, "block")}>Escanea.</span>
            <span {...r(0.25, "block")}>Explora.</span>
            <span {...r(0.4, "block text-gradient-gold")}>Comparte.</span>
          </H>
          <p {...r(0.6, "mt-10 max-w-[800px] text-[34px] leading-snug text-white/80")}>
            {ctx.totalOpportunities} oportunidades con fuente oficial: prácticas, PEU, becas, investigación, competencias y emprendimiento.
          </p>
        </div>
        <div {...r(0.3)}>
          <Qr qr={ctx.qr?.oportunidades} size={580} caption />
        </div>
      </div>
    </Frame>
  );
}

function S23(ctx: DeckContext) {
  const r = rise(ctx);
  const items = [
    ["SpinOut", "Impact Regional Fellowship"],
    ["Comunitarios", "Comunidad"],
    ["Agendia", "Emprendimiento"],
    ["SEP", "Semillero de Emprendedores Perú"],
    ["IEEE", "Rama estudiantil"],
  ];
  return (
    <Frame n={23} concept bleed={<Bg src="hero-titicaca" ctx={ctx} overlay="bottom" dim={0.55} />}>
      <div className="flex h-full flex-col px-[120px] pb-[130px] pt-[150px]">
        <div className="grid grid-cols-[1fr_800px] gap-10">
          <div>
            <H className="text-[112px]">
              <span {...r(0.1, "block")}>Puno no solo</span>
              <span {...r(0.2, "block")}>exporta talento.</span>
            </H>
            <p {...r(0.35, "mt-8 text-[44px] text-gradient-gold")}>También puede crear oportunidades.</p>
          </div>
          <div className="grid grid-cols-2 gap-5" style={{ height: 360 }}>
            <div {...r(0.45, "")}>
              <Photo k="sep" ctx={ctx} className="h-full" />
            </div>
            <div {...r(0.55, "")}>
              <Photo k="irf26-huaraz" ctx={ctx} className="h-full" />
            </div>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-5 gap-5">
          {items.map(([n, d], i) => (
            <div key={n} {...r(0.6 + i * 0.1, "glass rounded-3xl p-7")}>
              <p className="font-display text-[42px] font-semibold">{n}</p>
              <p className="mt-1 text-[22px] text-white/65">{d}</p>
            </div>
          ))}
        </div>
        <p {...r(1.1, `mt-6 text-[20px] text-white/55 ${mono}`)}>IRF27 Y NUEVAS INICIATIVAS: PROYECCIONES SUJETAS A CONFIRMACIÓN OFICIAL</p>
      </div>
    </Frame>
  );
}

function S24(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={24} concept bleed={<Bg src="amanecer" ctx={ctx} overlay="left" dim={0.6} />}>
      <div className="grid h-full grid-cols-[1fr_880px] gap-[80px] px-[120px] pb-[130px] pt-[150px]">
        <div className="flex flex-col justify-center">
          <H className="text-[130px]">
            <span {...r(0.1, "block")}>Recién</span>
            <span {...r(0.2, "block")}>estamos</span>
            <span {...r(0.3, "block text-gradient-gold")}>comenzando.</span>
          </H>
          <p {...r(0.5, "mt-12 max-w-[760px] text-[34px] leading-snug text-white/80")}>
            Todavía tengo muchísimo por aprender. Gracias a cada persona, comunidad y compañero que compartió una oportunidad conmigo.
          </p>
        </div>
        <div {...r(0.3, "flex items-center")}>
          <Photo k={ctx.photos["coinsi-2026"] ? "coinsi-2026" : "irf26-utec"} ctx={ctx} className="h-[620px] w-full" />
        </div>
      </div>
    </Frame>
  );
}

function S25(ctx: DeckContext) {
  const r = rise(ctx);
  return (
    <Frame n={25} concept bleed={<Bg src="puno-noche" ctx={ctx} overlay="left" dim={0.6} position="right center" />}>
      <div className="grid h-full grid-cols-[1fr_auto] items-center gap-[100px] px-[120px]">
        <div>
          <h2 {...r(0.1, "font-display text-[150px] font-bold leading-[0.86] tracking-[-0.05em]")}>
            ¿Qué vas a
            <br />
            empezar esta
            <br />
            <span className="text-gradient-gold">semana?</span>
          </h2>
          <p {...r(0.4, "mt-12 text-[46px] text-white/90")}>No esperes a egresar para comenzar.</p>
          <div {...r(0.6, "glass mt-14 inline-flex flex-col rounded-3xl px-9 py-6")}>
            <span className="font-display text-[34px] font-semibold">{ctx.speakerName}</span>
            <span className={`mt-1 text-[24px] text-cyan ${mono}`}>{ctx.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
          </div>
        </div>
        <div {...r(0.4)}>
          <Qr qr={ctx.qr?.oportunidades} size={460} caption />
        </div>
      </div>
    </Frame>
  );
}

export const slides = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20, S21, S22, S23, S24, S25];
