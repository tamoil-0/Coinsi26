import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { communities } from "@/lib/data";
import { getAvailablePhotos } from "@/lib/photos.server";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { formatDate } from "@/lib/labels";
import type { Community } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Comunidades",
  description: "Comunidades tecnológicas, de innovación y emprendimiento para estudiantes de Puno y del Perú: qué ofrecen y cómo unirte.",
  alternates: { canonical: "/comunidades" },
};

const scopeOrder: Community["scope"][] = ["puno", "peru", "latam", "global"];
const scopeLabel: Record<Community["scope"], string> = {
  puno: "En Puno y el sur",
  peru: "En el Perú",
  latam: "En Latinoamérica",
  global: "En el mundo",
};
const typeLabel: Record<Community["type"], string> = {
  "comunidad-tech": "Comunidad tech",
  emprendimiento: "Emprendimiento",
  estudiantil: "Estudiantil",
  investigacion: "Investigación",
  eventos: "Eventos",
};
const linkLabel: Record<keyof Community["links"], string> = {
  web: "Web",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  discord: "Discord",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  luma: "Luma",
  meetup: "Meetup",
};

export default function CommunitiesPage() {
  const photos = getAvailablePhotos();
  const groups = scopeOrder
    .map((s) => ({ scope: s, items: communities.filter((c) => c.scope === s).sort((a, b) => Number(b.featured) - Number(a.featured)) }))
    .filter((g) => g.items.length);

  return (
    <div className="mx-auto max-w-[1320px] px-5 md:px-8">
      <section className="grid gap-8 pb-10 pt-12 md:grid-cols-[1.3fr_1fr] md:items-end md:pb-16 md:pt-20">
        <h1 className="font-display text-[44px] font-semibold leading-[0.95] md:text-[84px]">
          Perdimos una hackathon. Ganamos una comunidad.
        </h1>
        <p className="text-[17px] leading-relaxed text-muted">
          Las comunidades comparten convocatorias, organizan eventos y te presentan a personas que están construyendo cosas. Aquí están{" "}
          {communities.length}, con sus canales públicos oficiales. No publicamos grupos privados ni invitaciones sin autorización.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 pb-14 text-[12px] md:grid-cols-4 md:grid-rows-2 md:gap-4" aria-label="Galería de comunidades">
        <div className="col-span-2 aspect-[16/10] overflow-hidden rounded-3xl md:row-span-2 md:aspect-auto">
          <PhotoSlot k="irf26-utec" photos={photos} caption />
        </div>
        <div className="aspect-square overflow-hidden rounded-3xl md:aspect-auto md:h-[220px]">
          <PhotoSlot k="irf26-huaraz" photos={photos} caption />
        </div>
        <div className="aspect-square overflow-hidden rounded-3xl md:aspect-auto md:h-[220px]">
          <PhotoSlot k="sep" photos={photos} caption />
        </div>
        <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-3xl md:aspect-auto md:h-[220px]">
          <PhotoSlot k="flit-2026" photos={photos} caption />
        </div>
      </section>

      {groups.map((g) => (
        <section key={g.scope} className="border-t border-line py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <h2 className="font-display text-[26px] font-semibold md:sticky md:top-24 md:self-start">
              {scopeLabel[g.scope]}
              <span className="ml-2 font-mono text-[14px] text-faint">{g.items.length}</span>
            </h2>
            <ul className="grid gap-x-10 md:grid-cols-2">
              {g.items.map((c) => {
                const links = (Object.keys(c.links) as (keyof Community["links"])[]).filter((k) => c.links[k]);
                return (
                  <li key={c.slug} id={c.slug} className="scroll-mt-28 border-b border-line py-7 first:pt-0 md:[&:nth-child(2)]:pt-0">
                    <p className="font-mono text-[12px] text-faint">{typeLabel[c.type]}</p>
                    <h3 className="mt-1.5 font-display text-[26px] font-semibold leading-tight">
                      {c.name}
                      {c.featured && <span className="ml-2 inline-block h-2 w-2 -translate-y-1 rounded-full bg-gold" aria-label="destacada" />}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{c.description}</p>
                    {c.whatOffers.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {c.whatOffers.map((w) => (
                          <li key={w} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink/85">
                            {w}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-4 text-[14.5px] leading-relaxed">
                      <span className="text-gold">Cómo unirte: </span>
                      <span className="text-ink/90">{c.howToJoin}</span>
                    </p>
                    {links.length > 0 ? (
                      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
                        {links.map((k) => (
                          <a key={k} href={c.links[k]!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan underline-offset-4 hover:underline">
                            {linkLabel[k]} <ExternalLink size={12} />
                          </a>
                        ))}
                      </p>
                    ) : (
                      <p className="mt-4 text-[13px] text-faint">Canales oficiales por confirmar.</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
      <p className="border-t border-line py-6 font-mono text-[12px] text-faint">
        Verificado el {formatDate(communities.map((c) => c.lastVerifiedAt).sort().at(-1) ?? null)}. ¿Falta tu comunidad? Escríbele al ponente por
        LinkedIn.
      </p>
    </div>
  );
}
