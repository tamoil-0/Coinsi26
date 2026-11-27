import type { Opportunity, Status } from "@/lib/schema";
import { effectiveStatus } from "@/lib/status";
import { categoryLabel, statusLabel } from "@/lib/labels";
import { categoryColor } from "./OpportunityCard";

const statusColor: Record<Status, string> = {
  open: "#66E3B4",
  upcoming: "#53D8F5",
  recurring: "#438BFF",
  permanent: "#A4B0C2",
  unconfirmed: "#3a4c69",
  closed: "#243247",
};
const order: Status[] = ["open", "upcoming", "recurring", "permanent", "unconfirmed", "closed"];

/** Gráfico compacto derivado de los datos: estado de las convocatorias y categorías. */
export function DirectoryStats({ items, variant = "full" }: { items: Opportunity[]; variant?: "full" | "compact" }) {
  const total = items.length;
  const byStatus = order.map((s) => ({ s, n: items.filter((o) => effectiveStatus(o) === s).length })).filter((x) => x.n);
  const cats = Object.entries(
    items.reduce<Record<string, number>>((acc, o) => ((acc[o.category] = (acc[o.category] ?? 0) + 1), acc), {}),
  )
    .sort((a, b) => b[1] - a[1])
    .map(([c, n]) => ({ c: c as Opportunity["category"], n }));
  const max = Math.max(...cats.map((c) => c.n));

  return (
    <div className="rounded-2xl border border-line bg-navy/50 p-5 md:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-[15px] font-semibold">Estado de las convocatorias</p>
        <p className="font-mono text-[12px] text-faint">{total} en total</p>
      </div>
      <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-surface" role="img" aria-label={byStatus.map((x) => `${statusLabel[x.s]}: ${x.n}`).join(", ")}>
        {byStatus.map((x) => (
          <span key={x.s} style={{ width: `${(x.n / total) * 100}%`, background: statusColor[x.s] }} className="h-full border-r border-obsidian/60 last:border-0" />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] text-muted">
        {byStatus.map((x) => (
          <li key={x.s} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: statusColor[x.s] }} />
            {statusLabel[x.s]} <span className="font-mono text-faint">{x.n}</span>
          </li>
        ))}
      </ul>
      {variant === "full" && (
        <>
          <p className="mt-6 font-display text-[15px] font-semibold">Por categoría</p>
          <ul className="mt-3 space-y-2">
            {cats.map(({ c, n }) => (
              <li key={c} className="grid grid-cols-[110px_1fr_28px] items-center gap-3 text-[13px]">
                <span className="truncate text-muted">{categoryLabel[c]}</span>
                <span className="h-2 overflow-hidden rounded-full bg-surface">
                  <span className="block h-full rounded-full" style={{ width: `${(n / max) * 100}%`, background: categoryColor[c] }} />
                </span>
                <span className="text-right font-mono text-faint tabular">{n}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
