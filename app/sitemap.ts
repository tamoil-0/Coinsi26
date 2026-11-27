import type { MetadataRoute } from "next";
import { opportunities } from "@/lib/data";
import { METADATA_BASE } from "@/lib/site";
import { TOTAL_SLIDES } from "@/components/presentation/meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = METADATA_BASE;
  const pages = ["", "/oportunidades", "/comunidades", "/recursos", "/ruta-profesional", "/historia", "/ponente", "/presentacion", "/qr"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "/oportunidades" ? 1 : 0.7 })),
    ...opportunities.map((o) => ({ url: `${base}/oportunidades/${o.slug}`, lastModified: o.lastVerifiedAt, priority: 0.6 })),
    ...Array.from({ length: TOTAL_SLIDES }, (_, i) => ({ url: `${base}/presentacion/${i + 1}`, priority: 0.3 })),
  ];
}
