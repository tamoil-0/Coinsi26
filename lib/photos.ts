/**
 * Espacios para fotografías reales. Para añadir una foto, coloca un archivo
 * `public/images/real/<clave>.webp` (o .jpg / .png). La app la detecta en el
 * siguiente build y reemplaza el espacio automáticamente. Ver docs/fotografias.md.
 */
export const photoSlots = {
  infancia: "Infancia y primeras computadoras",
  ieee: "IEEE",
  cusco: "Viaje a Cusco",
  ecoing: "ECOING",
  "poder-judicial": "Poder Judicial",
  cableado: "Cableado estructurado",
  hackaru: "HackAru",
  "nasa-space-apps": "NASA Space Apps",
  dermaapp: "DermaApp",
  "coinsi-2025": "COINSI 2025",
  "flit-2026": "FLIT 2026 en Arequipa",
  "irf26-huaraz": "Equipo organizador del IRF26 en Huaraz, Áncash",
  "irf26-utec": "Final del IRF26 en UTEC, Lima",
  sep: "En el stand de SEP",
  paolo: "Paolo y equipo regional",
  angie: "Angie",
  diego: "Juan Diego",
  allprocar: "Allprocar",
  agendia: "Agendia",
  jayu: "JAYU",
  ponente: "Fotografía profesional del ponente",
  "coinsi-2026": "COINSI 2026",
} as const;

export type PhotoKey = keyof typeof photoSlots;
export type PhotoMap = Partial<Record<PhotoKey, string>>;
