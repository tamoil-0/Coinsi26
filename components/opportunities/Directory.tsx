"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X, Bookmark } from "lucide-react";
import type { Category, Funding, Modality, Opportunity, Region, Status } from "@/lib/schema";
import { CATEGORIES, FUNDING, MODALITIES, REGIONS, STATUSES } from "@/lib/schema";
import { categoryLabel, daysUntil, formatDate, fundingLabel, modalityLabel, regionLabel, statusLabel } from "@/lib/labels";
import { effectiveStatus } from "@/lib/status";
import { admitsSystems, matchesQuery, needsEnglish, searchText, stages } from "@/lib/filters";
import { useLocalSet } from "@/hooks/useLocalSet";
import { OpportunityCard, StatusBadge } from "./OpportunityCard";

type Sort = "relevancia" | "cierre" | "az";

type State = {
  q: string;
  c: Set<Category>;
  r: Set<Region>;
  m: Set<Modality>;
  s: Set<Status>;
  f: Set<Funding>;
  career: boolean;
  stage: "" | "estudiantes" | "egresados";
  lang: "" | "sin-ingles";
  fav: boolean;
  sort: Sort;
};

const empty = (): State => ({
  q: "",
  c: new Set(),
  r: new Set(),
  m: new Set(),
  s: new Set(),
  f: new Set(),
  career: false,
  stage: "",
  lang: "",
  fav: false,
  sort: "relevancia",
});

function parseSet<T extends string>(v: string | null, allowed: readonly T[]): Set<T> {
  if (!v) return new Set();
  return new Set(v.split(",").filter((x): x is T => (allowed as readonly string[]).includes(x)));
}

function fromUrl(): State {
  const p = new URLSearchParams(window.location.search);
  const sort = p.get("orden");
  const stage = p.get("etapa");
  return {
    q: p.get("q") ?? "",
    c: parseSet(p.get("c"), CATEGORIES),
    r: parseSet(p.get("region"), REGIONS),
    m: parseSet(p.get("modalidad"), MODALITIES),
    s: parseSet(p.get("estado"), STATUSES),
    f: parseSet(p.get("financiamiento"), FUNDING),
    career: p.get("carrera") === "sistemas",
    stage: stage === "estudiantes" || stage === "egresados" ? stage : "",
    lang: p.get("idioma") === "sin-ingles" ? "sin-ingles" : "",
    fav: p.get("guardados") === "1",
    sort: sort === "cierre" || sort === "az" ? sort : "relevancia",
  };
}

function toUrl(st: State): string {
  const p = new URLSearchParams();
  if (st.q) p.set("q", st.q);
  if (st.c.size) p.set("c", [...st.c].join(","));
  if (st.r.size) p.set("region", [...st.r].join(","));
  if (st.m.size) p.set("modalidad", [...st.m].join(","));
  if (st.s.size) p.set("estado", [...st.s].join(","));
  if (st.f.size) p.set("financiamiento", [...st.f].join(","));
  if (st.career) p.set("carrera", "sistemas");
  if (st.stage) p.set("etapa", st.stage);
  if (st.lang) p.set("idioma", st.lang);
  if (st.fav) p.set("guardados", "1");
  if (st.sort !== "relevancia") p.set("orden", st.sort);
  const s = p.toString();
  return s ? `?${s}` : "";
}

function toggleIn<T>(set: Set<T>, v: T): Set<T> {
  const n = new Set(set);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
}

const statusOrder: Record<Status, number> = { open: 0, upcoming: 1, recurring: 2, permanent: 3, unconfirmed: 4, closed: 5 };

function Chip({ active, onClick, children, count }: { active: boolean; onClick: () => void; children: React.ReactNode; count?: number }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13.5px] transition-colors ${
        active ? "border-gold bg-gold text-obsidian" : "border-line text-muted hover:border-[#3a4c69] hover:text-ink"
      }`}
    >
      {children}
      {count !== undefined && <span className={`font-mono text-[11.5px] ${active ? "text-obsidian/70" : "text-faint"}`}>{count}</span>}
    </button>
  );
}

export function Directory({ items, lastUpdate }: { items: Opportunity[]; lastUpdate: string | null }) {
  const [st, setSt] = useState<State>(empty);
  const [hydrated, setHydrated] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const fav = useLocalSet("dpam:favoritos");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado inicial desde la URL compartida
    setSt(fromUrl());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const url = `${window.location.pathname}${toUrl(st)}`;
    window.history.replaceState(null, "", url);
  }, [st, hydrated]);

  // "/" enfoca la búsqueda
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enriched = useMemo(() => {
    const today = new Date();
    return items.map((o) => ({ o, status: effectiveStatus(o, today), text: searchText(o) }));
  }, [items]);

  // Filtros excepto categoría (para contar por categoría)
  const baseFiltered = useMemo(
    () =>
      enriched.filter(({ o, status, text }) => {
        if (st.q && !matchesQuery(text, st.q)) return false;
        if (st.r.size && !st.r.has(o.region)) return false;
        if (st.m.size && (!o.modality || !st.m.has(o.modality))) return false;
        if (st.s.size && !st.s.has(status)) return false;
        if (st.f.size && (!o.fundingType || !st.f.has(o.fundingType))) return false;
        if (st.career && admitsSystems(o) === "no") return false;
        if (st.stage && !stages(o).has(st.stage)) return false;
        if (st.lang === "sin-ingles" && needsEnglish(o) === true) return false;
        if (st.fav && !fav.items.has(o.slug)) return false;
        return true;
      }),
    [enriched, st, fav.items],
  );

  const catCounts = useMemo(() => {
    const m = new Map<Category, number>();
    for (const { o } of baseFiltered) m.set(o.category, (m.get(o.category) ?? 0) + 1);
    return m;
  }, [baseFiltered]);

  const results = useMemo(() => {
    const r = baseFiltered.filter(({ o }) => !st.c.size || st.c.has(o.category));
    const byDeadline = (a: (typeof r)[number], b: (typeof r)[number]) => {
      const da = a.status === "open" || a.status === "upcoming" ? a.o.applicationDeadline ?? "9999" : "9999";
      const db = b.status === "open" || b.status === "upcoming" ? b.o.applicationDeadline ?? "9999" : "9999";
      return da.localeCompare(db);
    };
    if (st.sort === "cierre") r.sort((a, b) => byDeadline(a, b) || statusOrder[a.status] - statusOrder[b.status]);
    else if (st.sort === "az") r.sort((a, b) => a.o.title.localeCompare(b.o.title, "es"));
    else
      r.sort(
        (a, b) =>
          statusOrder[a.status] - statusOrder[b.status] ||
          Number(b.o.featured) - Number(a.o.featured) ||
          byDeadline(a, b) ||
          a.o.title.localeCompare(b.o.title, "es"),
      );
    return r;
  }, [baseFiltered, st.c, st.sort]);

  const closingSoon = useMemo(
    () =>
      enriched
        .filter(({ o, status }) => status === "open" && o.applicationDeadline && (daysUntil(o.applicationDeadline) ?? 999) <= 60)
        .sort((a, b) => (a.o.applicationDeadline ?? "").localeCompare(b.o.applicationDeadline ?? ""))
        .slice(0, 6),
    [enriched],
  );

  const openCount = enriched.filter((e) => e.status === "open").length;
  const activeFilters =
    st.r.size + st.m.size + st.s.size + st.f.size + (st.career ? 1 : 0) + (st.stage ? 1 : 0) + (st.lang ? 1 : 0);
  const anyFilter = activeFilters > 0 || st.c.size > 0 || st.q !== "" || st.fav;

  return (
    <div data-hydrated={hydrated ? "true" : "false"}>
      {/* Búsqueda */}
      <div className="sticky top-14 z-30 -mx-5 border-b border-line/70 bg-obsidian/92 px-5 pb-3 pt-3 backdrop-blur-md md:top-16 md:mx-0 md:rounded-b-2xl md:px-0">
        <label htmlFor="buscar" className="sr-only">
          Buscar oportunidades
        </label>
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" aria-hidden />
          <input
            id="buscar"
            ref={searchRef}
            type="search"
            inputMode="search"
            autoComplete="off"
            value={st.q}
            onChange={(e) => setSt((s) => ({ ...s, q: e.target.value }))}
            placeholder="Busca: Osiptel, Flutter, remoto, CERN, beca…"
            className="h-12 w-full rounded-xl border border-line bg-navy pl-11 pr-11 text-[16px] text-ink placeholder:text-faint focus:border-blue focus:outline-none"
          />
          {st.q && (
            <button
              type="button"
              onClick={() => setSt((s) => ({ ...s, q: "" }))}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-faint hover:text-ink"
              aria-label="Borrar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Categorías">
          <Chip active={st.c.size === 0} onClick={() => setSt((s) => ({ ...s, c: new Set() }))} count={baseFiltered.length}>
            Todas
          </Chip>
          {CATEGORIES.filter((c) => (catCounts.get(c) ?? 0) > 0 || st.c.has(c)).map((c) => (
            <Chip key={c} active={st.c.has(c)} onClick={() => setSt((s) => ({ ...s, c: toggleIn(s.c, c) }))} count={catCounts.get(c) ?? 0}>
              {categoryLabel[c]}
            </Chip>
          ))}
          <Link
            href="/comunidades"
            className="inline-flex shrink-0 items-center rounded-full border border-dashed border-line px-3.5 py-1.5 text-[13.5px] text-muted hover:text-ink"
          >
            Comunidades
          </Link>
        </div>
      </div>

      {/* Próximos cierres */}
      {closingSoon.length > 0 && !anyFilter && (
        <section aria-labelledby="cierres" className="mt-8">
          <h2 id="cierres" className="font-display text-lg font-semibold">
            Cierran pronto
          </h2>
          <ol className="no-scrollbar -mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-3 md:px-0">
            {closingSoon.map(({ o }) => {
              const d = daysUntil(o.applicationDeadline);
              return (
                <li key={o.slug} className="w-[78%] shrink-0 snap-start md:w-auto">
                  <Link href={`/oportunidades/${o.slug}`} className="block h-full rounded-xl border border-mint/25 bg-mint/[0.04] p-4 hover:border-mint/50">
                    <p className="font-mono text-[12px] text-mint">
                      {d === 0 ? "Cierra hoy" : `Cierra en ${d} días`} · {formatDate(o.applicationDeadline)}
                    </p>
                    <p className="mt-1.5 font-display text-[16px] font-semibold leading-snug">{o.title}</p>
                    <p className="mt-0.5 truncate text-[13px] text-muted">{o.organization}</p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* Barra de resultados */}
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
        <p className="text-[14px] text-muted" aria-live="polite">
          <span className="font-semibold text-ink tabular">{results.length}</span> de {items.length} oportunidades
          {openCount > 0 && (
            <>
              {" "}
              · <span className="text-mint">{openCount} abiertas</span>
            </>
          )}
        </p>
        <div className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto">
          <button
            type="button"
            onClick={() => setSt((s) => ({ ...s, fav: !s.fav }))}
            aria-pressed={st.fav}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] ${
              st.fav ? "border-gold text-gold" : "border-line text-muted hover:text-ink"
            }`}
          >
            <Bookmark size={14} /> Guardados{fav.items.size ? ` (${fav.items.size})` : ""}
          </button>
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            aria-controls="mas-filtros"
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] ${
              activeFilters ? "border-blue text-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            <SlidersHorizontal size={14} /> Filtros{activeFilters ? ` (${activeFilters})` : ""}
          </button>
          <label className="sr-only" htmlFor="orden">
            Ordenar
          </label>
          <select
            id="orden"
            value={st.sort}
            onChange={(e) => setSt((s) => ({ ...s, sort: e.target.value as Sort }))}
            className="min-w-0 flex-1 rounded-lg border border-line bg-navy px-2.5 py-2 text-[13px] text-ink sm:flex-none"
          >
            <option value="relevancia">Relevancia</option>
            <option value="cierre">Cierre más próximo</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </div>

      {showMore && (
        <div id="mas-filtros" className="mt-4 grid gap-6 rounded-2xl border border-line bg-navy/50 p-5 md:grid-cols-2 xl:grid-cols-3">
          <FilterGroup label="Estado de convocatoria">
            {STATUSES.map((s) => (
              <Chip key={s} active={st.s.has(s)} onClick={() => setSt((x) => ({ ...x, s: toggleIn(x.s, s) }))}>
                {statusLabel[s]}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Alcance">
            {REGIONS.map((r) => (
              <Chip key={r} active={st.r.has(r)} onClick={() => setSt((x) => ({ ...x, r: toggleIn(x.r, r) }))}>
                {regionLabel[r]}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Modalidad">
            {MODALITIES.map((m) => (
              <Chip key={m} active={st.m.has(m)} onClick={() => setSt((x) => ({ ...x, m: toggleIn(x.m, m) }))}>
                {modalityLabel[m]}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Financiamiento">
            {FUNDING.map((f) => (
              <Chip key={f} active={st.f.has(f)} onClick={() => setSt((x) => ({ ...x, f: toggleIn(x.f, f) }))}>
                {fundingLabel[f]}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Carrera y etapa">
            <Chip active={st.career} onClick={() => setSt((x) => ({ ...x, career: !x.career }))}>
              Admite Sistemas o afines
            </Chip>
            <Chip active={st.stage === "estudiantes"} onClick={() => setSt((x) => ({ ...x, stage: x.stage === "estudiantes" ? "" : "estudiantes" }))}>
              Para estudiantes
            </Chip>
            <Chip active={st.stage === "egresados"} onClick={() => setSt((x) => ({ ...x, stage: x.stage === "egresados" ? "" : "egresados" }))}>
              Para egresados
            </Chip>
          </FilterGroup>
          <FilterGroup label="Idioma">
            <Chip active={st.lang === "sin-ingles"} onClick={() => setSt((x) => ({ ...x, lang: x.lang ? "" : "sin-ingles" }))}>
              Sin requisito de inglés publicado
            </Chip>
          </FilterGroup>
          <p className="text-[12.5px] leading-relaxed text-faint md:col-span-2 xl:col-span-3">
            Los filtros de carrera, etapa e idioma se basan en el texto publicado por cada convocatoria. Si una fuente no publica el dato, la
            oportunidad no se excluye por carrera. Confirma siempre en la fuente oficial.
          </p>
        </div>
      )}

      {anyFilter && (
        <div className="mt-4">
          <button type="button" onClick={() => setSt(empty())} className="text-[13px] text-cyan underline-offset-4 hover:underline">
            Limpiar búsqueda y filtros
          </button>
        </div>
      )}

      {/* Resultados */}
      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map(({ o, status }) => (
            <OpportunityCard key={o.slug} o={o} status={status} saved={fav.items.has(o.slug)} onToggleSave={() => fav.toggle(o.slug)} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center">
          <p className="font-display text-xl font-semibold">
            {st.fav && fav.items.size === 0 ? "Aún no guardaste oportunidades." : "Ninguna oportunidad coincide con esta búsqueda."}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-muted">
            {st.fav && fav.items.size === 0
              ? "Toca el ícono de marcador en cualquier tarjeta para guardarla en este dispositivo."
              : "Prueba con menos filtros o con otra palabra, por ejemplo “prácticas”, “remoto” o el nombre de una institución."}
          </p>
          <button type="button" onClick={() => setSt(empty())} className="mt-5 rounded-full bg-gold px-5 py-2 text-[14px] font-semibold text-obsidian">
            Ver todas las oportunidades
          </button>
        </div>
      )}

      <p className="mt-10 flex flex-wrap items-center gap-2 font-mono text-[12px] text-faint">
        <StatusBadge status="open" /> solo si la fuente oficial confirma que acepta postulaciones.
        {lastUpdate && <span>Última verificación: {formatDate(lastUpdate)}.</span>}
      </p>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-[13px] font-medium text-ink">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
