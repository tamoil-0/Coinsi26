import sectorPublico from "@/data/opportunities/sector-publico.json";
import internacional from "@/data/opportunities/internacional.json";
import emprendimiento from "@/data/opportunities/emprendimiento-competencias.json";
import comunidades from "@/data/communities/comunidades.json";
import recursos from "@/data/resources/recursos.json";
import {
  communitySchema,
  opportunitySchema,
  resourceSchema,
  type Community,
  type Opportunity,
  type Resource,
  type Status,
} from "./schema";
import type { z } from "zod";

function parseAll<T>(schema: z.ZodType<T>, rows: unknown[], label: string): T[] {
  const out: T[] = [];
  for (const row of rows) {
    const res = schema.safeParse(row);
    if (res.success) out.push(res.data);
    else {
      const id = (row as { id?: string })?.id ?? "?";
      console.warn(`[data] ${label} "${id}" inválido y omitido:`, res.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
    }
  }
  return out;
}

function dedupe<T extends { slug: string }>(rows: T[]): T[] {
  const seen = new Set<string>();
  return rows.filter((r) => (seen.has(r.slug) ? false : (seen.add(r.slug), true)));
}

const statusRank: Record<Status, number> = {
  open: 0,
  upcoming: 1,
  recurring: 2,
  permanent: 3,
  unconfirmed: 4,
  closed: 5,
};

export const opportunities: Opportunity[] = dedupe(
  parseAll(opportunitySchema, [...sectorPublico, ...internacional, ...emprendimiento] as unknown[], "oportunidad"),
).sort((a, b) => statusRank[a.status] - statusRank[b.status] || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title, "es"));

export const communities: Community[] = dedupe(parseAll(communitySchema, comunidades as unknown[], "comunidad"));

export const resources: Resource[] = parseAll(resourceSchema, recursos as unknown[], "recurso");

export function getOpportunity(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}

export const lastDataUpdate: string | null = [...opportunities, ...communities, ...resources]
  .map((o) => o.lastVerifiedAt)
  .sort()
  .at(-1) ?? null;

export { effectiveStatus } from "./status";
