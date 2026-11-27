import type { Opportunity, Status } from "./schema";

/**
 * Estado efectivo: si una convocatoria figura como abierta o próxima pero su
 * fecha de cierre ya pasó, se muestra como cerrada. Nunca se "abre" nada automáticamente.
 */
export function effectiveStatus(o: Pick<Opportunity, "status" | "applicationDeadline">, today = new Date()): Status {
  if ((o.status === "open" || o.status === "upcoming") && o.applicationDeadline) {
    const todayIso = today.toISOString().slice(0, 10);
    if (o.applicationDeadline < todayIso) return "closed";
  }
  return o.status;
}
