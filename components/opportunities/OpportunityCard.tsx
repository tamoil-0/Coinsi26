"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck, CalendarClock, MapPin } from "lucide-react";
import type { Opportunity, Status } from "@/lib/schema";
import { categoryLabel, daysUntil, formatDate, modalityLabel, statusLabel } from "@/lib/labels";

export const categoryColor: Record<Opportunity["category"], string> = {
  "sector-publico": "#F1B86A",
  peu: "#F1B86A",
  practicas: "#438BFF",
  "empleo-junior": "#438BFF",
  investigacion: "#53D8F5",
  becas: "#53D8F5",
  startups: "#c9a2ff",
  competencias: "#ff9f80",
  cursos: "#A4B0C2",
};

export function Monogram({ org, category, size = 44 }: { org: string; category: Opportunity["category"]; size?: number }) {
  const initials = org
    .replace(/\(.*?\)/g, "")
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 || /^[A-Z]{2,}$/.test(w))
    .slice(0, 2)
    .map((w) => (/^[A-Z]{2,}$/.test(w) ? w.slice(0, 2) : w[0]))
    .join("")
    .slice(0, 3)
    .toUpperCase();
  const c = categoryColor[category];
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-xl font-display text-[13px] font-semibold"
      style={{ width: size, height: size, background: `${c}1f`, color: c, boxShadow: `inset 0 0 0 1px ${c}40` }}
    >
      {initials || "•"}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    open: "bg-mint/15 text-mint ring-mint/40",
    upcoming: "bg-cyan/10 text-cyan ring-cyan/30",
    recurring: "bg-blue/10 text-[#8db8ff] ring-blue/30",
    permanent: "bg-white/5 text-ink ring-white/15",
    unconfirmed: "bg-white/5 text-muted ring-white/10",
    closed: "bg-white/5 text-faint ring-white/10",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-medium ring-1 ${styles[status]}`}>
      {status === "open" && <span className="h-1.5 w-1.5 rounded-full bg-mint" />}
      {statusLabel[status]}
    </span>
  );
}

export function OpportunityCard({
  o,
  status,
  saved,
  onToggleSave,
}: {
  o: Opportunity;
  status: Status;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const days = status === "open" ? daysUntil(o.applicationDeadline) : null;
  const benefit = o.benefits[0];
  return (
    <article className="group relative flex min-w-0 flex-col border-b border-line py-5 sm:rounded-2xl sm:border sm:bg-navy/40 sm:p-5 sm:transition-colors sm:hover:border-[#33445f] sm:hover:bg-navy/70">
      <div className="flex items-start gap-3.5">
        <Monogram org={o.organization} category={o.category} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <StatusBadge status={status} />
            <span className="text-[12px] text-muted">{categoryLabel[o.category]}</span>
          </div>
          <h3 className="mt-1.5 font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
            <Link href={`/oportunidades/${o.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {o.title}
            </Link>
          </h3>
          <p className="mt-0.5 truncate text-[14px] text-muted">{o.organization}</p>
        </div>
        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved}
          aria-label={saved ? `Quitar ${o.title} de guardados` : `Guardar ${o.title}`}
          className={`relative z-10 -mr-1 -mt-1 rounded-lg p-2 transition-colors ${saved ? "text-gold" : "text-faint hover:text-ink"}`}
        >
          {saved ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px]">
        <div className="flex min-w-0 items-center gap-1.5 text-muted">
          <MapPin size={14} className="shrink-0 text-faint" aria-hidden />
          <dt className="sr-only">Ubicación y modalidad</dt>
          <dd className="truncate">
            {o.country}
            {o.modality ? ` · ${modalityLabel[o.modality]}` : ""}
          </dd>
        </div>
        <div className="flex min-w-0 items-center gap-1.5 text-muted">
          <CalendarClock size={14} className="shrink-0 text-faint" aria-hidden />
          <dt className="sr-only">Cierre</dt>
          <dd className="truncate font-mono text-[12px]">
            {o.applicationDeadline ? (
              <>
                <span className="hidden text-faint sm:inline">Cierre </span>
                {formatDate(o.applicationDeadline)}
                {days !== null && days >= 0 && days <= 30 && <span className="ml-1 text-gold">({days === 0 ? "hoy" : `${days} d`})</span>}
              </>
            ) : status === "permanent" ? (
              "Siempre disponible"
            ) : (
              "Cierre no publicado"
            )}
          </dd>
        </div>
        {o.eligibility && (
          <div className="col-span-2 min-w-0">
            <dt className="sr-only">Perfil elegible</dt>
            <dd className="line-clamp-2 text-muted">
              <span className="text-faint">Para: </span>
              {o.eligibility}
            </dd>
          </div>
        )}
        {benefit && (
          <div className="col-span-2 min-w-0">
            <dt className="sr-only">Beneficio principal</dt>
            <dd className="line-clamp-2 text-ink/90">
              <span className="text-faint">Ofrece: </span>
              {benefit}
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}
