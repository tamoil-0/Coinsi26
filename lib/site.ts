export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date().toISOString();

/** URL absoluta para metadata. Nunca se usa para QR si está vacía. */
export const METADATA_BASE = SITE_URL || "http://localhost:3000";

export const talk = {
  title: "De Puno al mundo",
  subtitle: "Cómo construir experiencia real antes de egresar",
  event: "VI Congreso Internacional de Ingeniería de Sistemas",
  eventShort: "COINSI 2026",
  university: "Universidad Nacional del Altiplano",
  universityShort: "UNA Puno",
  city: "Puno, Perú",
  date: "2026-11-27",
  dateLabel: "27 de noviembre de 2026",
  time: "9:45 a. m. – 10:30 a. m.",
  duration: "45 minutos",
  concept: "El lugar donde comienzas no determina hasta dónde puedes llegar.",
} as const;

export const speaker = {
  name: "Jhon Marco Aracayo Mamani",
  shortName: "Jhon Marco",
  role: "Egresado de Ingeniería de Sistemas",
  focus: "Desarrollo Full Stack y Mobile",
  interests: "Tecnología, innovación, inteligencia artificial e impacto regional",
  linkedin: "https://www.linkedin.com/in/jhonmarcoaracayomamani/",
  // GitHub: pendiente de confirmación por el ponente. No se publica un usuario no verificado.
  github: null as string | null,
} as const;

export const nav = [
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/comunidades", label: "Comunidades" },
  { href: "/ruta-profesional", label: "Ruta" },
  { href: "/recursos", label: "Recursos" },
  { href: "/historia", label: "Historia" },
  { href: "/presentacion", label: "Ponencia" },
] as const;

export function absoluteUrl(path: string): string | null {
  if (!SITE_URL) return null;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Altitud del lago Titicaca, usada como detalle de identidad. */
export const LAKE_ALTITUDE = "3812 m s. n. m.";
export const PUNO_COORDS = "15.84° S, 70.02° O";
