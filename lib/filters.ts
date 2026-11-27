import type { Opportunity } from "./schema";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Texto indexado para la búsqueda instantánea. */
export function searchText(o: Opportunity): string {
  return norm(
    [o.title, o.organization, o.description, o.country, o.eligibility ?? "", o.tags.join(" "), o.eligibleCareers.join(" "), o.benefits.join(" ")].join(
      " ",
    ),
  );
}

export function matchesQuery(text: string, q: string): boolean {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  return terms.every((t) => text.includes(t));
}

const SYSTEMS = /sistemas|informatic|software|computac|computer|datos|data|tecnolog|ingenier|stem|todas las carreras|cualquier carrera|any (field|major|discipline)/;

/** Admite Ing. de Sistemas o afines, o no restringe la carrera. */
export function admitsSystems(o: Opportunity): "si" | "no-publicado" | "no" {
  if (o.eligibleCareers.length === 0) return "no-publicado";
  return SYSTEMS.test(norm(o.eligibleCareers.join(" "))) ? "si" : "no";
}

/** Etapa académica a partir de los textos publicados (heurística transparente). */
export function stages(o: Opportunity): Set<"estudiantes" | "egresados"> {
  const t = norm(`${o.academicCycles ?? ""} ${o.eligibility ?? ""} ${o.requirements.join(" ")}`);
  const s = new Set<"estudiantes" | "egresados">();
  if (/estudiant|ciclo|semestre|student|undergrad|pregrado|matricul|enrolled/.test(t)) s.add("estudiantes");
  if (/egresad|bachiller|titulad|graduate|recien|junior/.test(t)) s.add("egresados");
  return s;
}

export function needsEnglish(o: Opportunity): boolean | null {
  if (!o.languageRequirements) return null;
  return /ingles|english|toefl|ielts|b1|b2|c1/.test(norm(o.languageRequirements));
}
