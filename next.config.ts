import type { NextConfig } from "next";

/**
 * URL pública del sitio.
 * Orden de prioridad:
 * 1. NEXT_PUBLIC_SITE_URL (definida manualmente en Vercel o .env.local)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (variable de sistema que Vercel expone en cada build)
 * 3. vacío → los QR no se renderizan (nunca apuntan a localhost)
 */
function resolveSiteUrl(): string {
  const manual = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (manual) return manual.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "";
}

const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: resolveSiteUrl(),
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  ...(staticExport ? { output: "export", images: { unoptimized: true }, trailingSlash: true } : {}),
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
