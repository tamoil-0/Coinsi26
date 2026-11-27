import type { Category, Funding, Modality, Region, Status } from "./schema";

export const categoryLabel: Record<Category, string> = {
  "sector-publico": "Sector público",
  peu: "PEU",
  practicas: "Prácticas",
  "empleo-junior": "Empleo junior",
  investigacion: "Investigación",
  becas: "Becas",
  startups: "Startups",
  competencias: "Competencias",
  cursos: "Cursos",
};

export const statusLabel: Record<Status, string> = {
  open: "Abierta",
  upcoming: "Próxima",
  recurring: "Recurrente",
  permanent: "Permanente",
  unconfirmed: "Por confirmar",
  closed: "Cerrada",
};

export const statusHint: Record<Status, string> = {
  open: "Acepta postulaciones según su fuente oficial.",
  upcoming: "Tiene una próxima edición anunciada oficialmente.",
  recurring: "Se repite periódicamente; la próxima convocatoria aún no está publicada.",
  permanent: "Disponible todo el año.",
  unconfirmed: "No se pudo confirmar su estado actual. Revisa la fuente oficial.",
  closed: "La última convocatoria terminó y no hay una nueva anunciada.",
};

export const regionLabel: Record<Region, string> = {
  peru: "Perú",
  latam: "Latinoamérica",
  internacional: "Internacional",
};

export const modalityLabel: Record<Modality, string> = {
  remoto: "Remoto",
  presencial: "Presencial",
  hibrido: "Híbrido",
};

export const fundingLabel: Record<Funding, string> = {
  pagado: "Remunerado",
  "beca-completa": "Beca completa",
  "beca-parcial": "Beca parcial",
  subvencion: "Subvención",
  gratuito: "Gratuito",
  "no-remunerado": "No remunerado",
  premio: "Premios",
};

export const NOT_PUBLISHED = "No publicado";

const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];

export function formatDate(iso: string | null): string {
  if (!iso) return NOT_PUBLISHED;
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

export function daysUntil(iso: string | null, today: Date = new Date()): number | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const target = Date.UTC(y, m - 1, d);
  const now = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.round((target - now) / 86_400_000);
}
