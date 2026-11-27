import "server-only";
import QRCode from "qrcode";
import { absoluteUrl } from "./site";

export type QrTarget = { key: string; label: string; path: string; url: string; svg: string };

const targets = [
  { key: "oportunidades", label: "Directorio de oportunidades", path: "/oportunidades" },
  { key: "inicio", label: "Página principal", path: "/" },
  { key: "ponencia", label: "Ponencia", path: "/presentacion" },
  { key: "ponente", label: "Perfil del ponente", path: "/ponente" },
] as const;

export type QrKey = (typeof targets)[number]["key"];

/**
 * Genera los QR solo si existe una URL pública real (nunca localhost).
 * Devuelve null cuando el sitio aún no tiene URL de producción.
 */
export async function getQrCodes(): Promise<Record<QrKey, QrTarget> | null> {
  const entries = await Promise.all(
    targets.map(async (t) => {
      const url = absoluteUrl(t.path);
      if (!url) return null;
      const svg = await QRCode.toString(url, {
        type: "svg",
        errorCorrectionLevel: "M",
        margin: 2,
        color: { dark: "#080D15", light: "#F4F7FB" },
      });
      return [t.key, { ...t, url, svg }] as const;
    }),
  );
  if (entries.some((e) => e === null)) return null;
  return Object.fromEntries(entries as [QrKey, QrTarget][]) as Record<QrKey, QrTarget>;
}
