/**
 * Genera los QR definitivos en public/qr/ (SVG y PNG de alta resolución).
 *   npm run qr -- https://tu-dominio.vercel.app
 * Se niega a generar QR hacia localhost.
 */
import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";

const base = (process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
if (!/^https:\/\//.test(base) || /localhost|127\.0\.0\.1/.test(base)) {
  console.error("Indica la URL pública real de producción (https://...). No se generan QR hacia localhost.");
  process.exit(1);
}

const targets = [
  ["oportunidades", "/oportunidades"],
  ["inicio", "/"],
  ["ponencia", "/presentacion"],
  ["ponente", "/ponente"],
] as const;

const out = path.join(__dirname, "..", "public", "qr");
fs.mkdirSync(out, { recursive: true });

(async () => {
  for (const [key, p] of targets) {
    const url = `${base}${p === "/" ? "" : p}`;
    const opts = { errorCorrectionLevel: "M" as const, margin: 2, color: { dark: "#080D15", light: "#FFFFFF" } };
    fs.writeFileSync(path.join(out, `qr-${key}.svg`), await QRCode.toString(url, { ...opts, type: "svg" }));
    await QRCode.toFile(path.join(out, `qr-${key}.png`), url, { ...opts, width: 2000 });
    console.log(`qr-${key} → ${url}`);
  }
})();
