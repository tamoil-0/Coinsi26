"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Grid3x3,
  Home,
  Maximize,
  Minimize,
  Rows3,
  MonitorPlay,
} from "lucide-react";
import { slides, type DeckContext } from "./Slides";
import { acts, slideMeta, TOTAL_SLIDES } from "./meta";

const W = 1920;
const H = 1080;

/** Escala un lienzo 1920×1080 dentro de su contenedor sin recortarlo. */
function ScaledSlide({ index, ctx, fit = "contain" }: { index: number; ctx: DeckContext; fit?: "contain" | "width" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(fit === "width" ? width / W : Math.min(width / W, height / H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  const Slide = slides[index];
  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden"
      style={fit === "width" ? { aspectRatio: "16 / 9", height: "auto" } : undefined}
    >
      {scale > 0 && (
        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: "center" }}
        >
          <Slide {...ctx} />
        </div>
      )}
    </div>
  );
}

export function Deck({ ctx, initial }: { ctx: Omit<DeckContext, "animate">; initial: number }) {
  const [index, setIndex] = useState(Math.min(Math.max(initial - 1, 0), TOTAL_SLIDES - 1));
  const [overview, setOverview] = useState(false);
  const [reading, setReading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [timer, setTimer] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((i: number) => {
    setIndex(() => Math.min(Math.max(i, 0), TOTAL_SLIDES - 1));
  }, []);
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, TOTAL_SLIDES - 1)), []);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // URL compartible por diapositiva sin recargar
  useEffect(() => {
    const path = `/presentacion/${index + 1}`;
    if (window.location.pathname.replace(/\/$/, "") !== path) {
      window.history.replaceState(null, "", path + window.location.search);
    }
    document.title = `${index + 1}. ${slideMeta[index].title} · De Puno al mundo`;
  }, [index]);

  // Modo lectura por defecto en pantallas pequeñas en vertical
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mq = window.matchMedia("(max-width: 820px) and (orientation: portrait)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depende del viewport del navegador
    if (params.get("modo") === "lectura" || mq.matches) setReading(true);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* el navegador puede rechazarlo; no es crítico */
    }
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Teclado
  useEffect(() => {
    if (reading) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (["ArrowRight", "PageDown", " ", "Enter", "ArrowDown"].includes(k)) {
        e.preventDefault();
        if (overview && k === "Enter") setOverview(false);
        else if (!overview) next();
      } else if (["ArrowLeft", "PageUp", "Backspace", "ArrowUp"].includes(k)) {
        e.preventDefault();
        if (!overview) prev();
      } else if (k === "Home") {
        e.preventDefault();
        go(0);
      } else if (k === "End") {
        e.preventDefault();
        go(TOTAL_SLIDES - 1);
      } else if (k === "f" || k === "F") {
        toggleFullscreen();
      } else if (k === "g" || k === "G") {
        setOverview((v) => !v);
      } else if (k === "t" || k === "T") {
        setTimer((v) => !v);
        setStartedAt((s) => s ?? Date.now());
      } else if (k === "Escape") {
        setOverview(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reading, overview, next, prev, go, toggleFullscreen]);

  // Controles discretos que se ocultan
  const poke = useCallback(() => {
    setChrome(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setChrome(false), 2600);
  }, []);
  useEffect(() => {
    hideTimeout.current = setTimeout(() => setChrome(false), 2600);
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [poke]);

  // Cronómetro de ensayo
  useEffect(() => {
    if (!timer) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [timer]);

  // Precarga de fotos reales
  useEffect(() => {
    Object.values(ctx.photos).forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [ctx.photos]);

  const fullCtx: DeckContext = { ...ctx, animate: true };
  const staticCtx: DeckContext = { ...ctx, animate: false };
  const meta = slideMeta[index];
  const elapsed = startedAt && now ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;
  const planned = slideMeta.slice(0, index + 1).reduce((a, s) => a + s.minutes, 0);

  if (reading) {
    return (
      <div className="min-h-dvh bg-obsidian">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-obsidian/90 px-4 py-3 backdrop-blur">
          <Link href="/" className="rounded-md p-2 text-muted hover:text-ink" aria-label="Ir al inicio">
            <Home size={18} />
          </Link>
          <p className="font-display text-sm font-semibold">De Puno al mundo — ponencia</p>
          <button
            type="button"
            onClick={() => setReading(false)}
            className="ml-auto flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted hover:text-ink"
          >
            <MonitorPlay size={14} /> Modo proyección
          </button>
        </div>
        <ol className="mx-auto max-w-[1100px] space-y-8 px-3 py-6 sm:px-6">
          {slides.map((_, i) => (
            <li key={i} id={`s${i + 1}`} className="scroll-mt-20">
              <p className="mb-2 px-1 font-mono text-[12px] text-faint">
                {String(i + 1).padStart(2, "0")} — Acto {acts[slideMeta[i].act].n} — {slideMeta[i].title}
              </p>
              <div className="overflow-hidden rounded-xl border border-line">
                <ScaledSlide index={i} ctx={staticCtx} fit="width" />
              </div>
            </li>
          ))}
        </ol>
        <div className="px-4 pb-12 text-center">
          <Link href="/oportunidades" className="inline-block rounded-full bg-gold px-6 py-3 font-semibold text-obsidian">
            Explorar oportunidades
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 select-none bg-black"
      onMouseMove={poke}
      onTouchStart={(e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        poke();
      }}
      onTouchEnd={(e) => {
        const s = touchStart.current;
        if (!s || overview) return;
        const dx = e.changedTouches[0].clientX - s.x;
        const dy = e.changedTouches[0].clientY - s.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
        touchStart.current = null;
      }}
      style={{ cursor: chrome ? "default" : "none" }}
    >
      {/* barra de progreso */}
      <div className="absolute inset-x-0 top-0 z-30 h-[3px] bg-white/5">
        <div className="h-full bg-gold transition-[width] duration-500" style={{ width: `${((index + 1) / TOTAL_SLIDES) * 100}%` }} />
      </div>

      <section
        aria-roledescription="diapositiva"
        aria-label={`${index + 1} de ${TOTAL_SLIDES}: ${meta.title}`}
        className="absolute inset-0"
      >
        <ScaledSlide key={index} index={index} ctx={fullCtx} />
      </section>

      {/* zonas de clic para avanzar/retroceder */}
      {!overview && (
        <>
          <button type="button" aria-label="Diapositiva anterior" className="absolute inset-y-0 left-0 z-10 w-[18%] cursor-w-resize opacity-0" onClick={prev} />
          <button type="button" aria-label="Diapositiva siguiente" className="absolute inset-y-0 right-0 z-10 w-[18%] cursor-e-resize opacity-0" onClick={next} />
        </>
      )}

      {timer && (
        <div className="absolute right-4 top-4 z-30 rounded-lg border border-line bg-obsidian/90 px-4 py-2 font-mono text-sm text-ink tabular">
          {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
          <span className="ml-3 text-faint">plan {planned.toFixed(1)} / 45 min</span>
        </div>
      )}

      {/* controles */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300 ${
          chrome || overview ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Link href="/" className="rounded-md p-2 text-muted hover:text-ink" aria-label="Ir al inicio">
          <Home size={18} />
        </Link>
        <button type="button" onClick={prev} disabled={index === 0} className="rounded-md p-2 text-muted hover:text-ink disabled:opacity-30" aria-label="Anterior">
          <ChevronLeft size={20} />
        </button>
        <span className="min-w-[64px] text-center font-mono text-sm text-ink tabular">
          {index + 1} / {TOTAL_SLIDES}
        </span>
        <button type="button" onClick={next} disabled={index === TOTAL_SLIDES - 1} className="rounded-md p-2 text-muted hover:text-ink disabled:opacity-30" aria-label="Siguiente">
          <ChevronRight size={20} />
        </button>
        <span className="ml-3 hidden truncate text-sm text-muted md:block">{meta.title}</span>
        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={() => { setTimer((v) => !v); setStartedAt((s) => s ?? Date.now()); }} className="rounded-md p-2 text-muted hover:text-ink" aria-label="Cronómetro (T)" title="Cronómetro (T)">
            <Clock size={18} />
          </button>
          <button type="button" onClick={() => setReading(true)} className="rounded-md p-2 text-muted hover:text-ink" aria-label="Modo lectura" title="Modo lectura">
            <Rows3 size={18} />
          </button>
          <button type="button" onClick={() => setOverview((v) => !v)} className="rounded-md p-2 text-muted hover:text-ink" aria-label="Vista general (G)" title="Vista general (G)">
            <Grid3x3 size={18} />
          </button>
          <button type="button" onClick={toggleFullscreen} className="rounded-md p-2 text-muted hover:text-ink" aria-label="Pantalla completa (F)" title="Pantalla completa (F)">
            {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>

      {overview && (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-obsidian/95 p-6 backdrop-blur" role="dialog" aria-label="Vista general de diapositivas">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-xl font-semibold">Vista general</p>
            <button type="button" onClick={() => setOverview(false)} className="rounded-full border border-line px-4 py-1.5 text-sm text-muted hover:text-ink">
              Cerrar (Esc)
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  go(i);
                  setOverview(false);
                }}
                className={`group text-left ${i === index ? "ring-2 ring-gold" : "ring-1 ring-line"} overflow-hidden rounded-lg`}
              >
                <div className="pointer-events-none">
                  <ScaledSlide index={i} ctx={staticCtx} fit="width" />
                </div>
                <p className="bg-navy px-3 py-2 font-mono text-[11px] text-muted group-hover:text-ink">
                  {i + 1}. {slideMeta[i].title}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
