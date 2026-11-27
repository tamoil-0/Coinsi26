import type { Metadata } from "next";
import Link from "next/link";
import { Directory } from "@/components/opportunities/Directory";
import { communities, lastDataUpdate, opportunities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Oportunidades",
  description:
    "Prácticas, PEU, becas, investigación, competencias y emprendimiento para estudiantes de Ingeniería de Sistemas. Con fuente oficial y fecha de verificación.",
  alternates: { canonical: "/oportunidades" },
  openGraph: {
    title: "Tu próxima oportunidad empieza aquí",
    description: "Directorio abierto de oportunidades reales para estudiantes. Sin registro.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-8">
      <section className="pb-6 pt-10 md:pb-8 md:pt-16">
        <h1 className="font-display text-[40px] font-semibold leading-[0.95] sm:text-[56px] md:text-[76px]">
          Tu próxima oportunidad
          <br />
          empieza aquí.
        </h1>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[56ch] text-[16px] leading-relaxed text-muted md:text-[18px]">
            Explora prácticas, becas, comunidades, programas públicos y oportunidades para construir tu futuro. Cada entrada enlaza a su fuente
            oficial.
          </p>
          <p className="flex gap-4 text-[14px]">
            <Link href="/comunidades" className="text-cyan underline-offset-4 hover:underline">
              {communities.length} comunidades
            </Link>
            <Link href="/presentacion" className="text-cyan underline-offset-4 hover:underline">
              Ver la ponencia
            </Link>
          </p>
        </div>
      </section>
      <Directory items={opportunities} lastUpdate={lastDataUpdate} />
    </div>
  );
}
