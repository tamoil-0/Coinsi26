import type { Metadata } from "next";
import { getAvailablePhotos } from "@/lib/photos.server";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { speaker } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ponente",
  description: `${speaker.name}, egresado de Ingeniería de Sistemas. Desarrollo Full Stack y Mobile.`,
  alternates: { canonical: "/ponente" },
};

const groups = [
  {
    name: "Experiencia laboral y prácticas",
    items: [
      { n: "ECOING", d: "Primer trabajo. Desarrollo de una solución offline-first para trabajo en campo." },
      { n: "Allprocar", d: "Práctica remota para una empresa de Argentina." },
    ],
  },
  { name: "Voluntariado", items: [{ n: "Poder Judicial", d: "Desarrollo, infraestructura y cableado estructurado." }] },
  {
    name: "Proyectos y emprendimiento",
    items: [
      { n: "Agendia", d: "Emprendimiento en desarrollo." },
      { n: "JAYU", d: "Emprendimiento en desarrollo." },
      { n: "DermaApp", d: "Proyecto propio y aprendizaje sobre cómo comunicar valor." },
    ],
  },
  {
    name: "Comunidades e innovación",
    items: [
      { n: "SpinOut e IRF26", d: "Impact Regional Fellowship 2026." },
      { n: "Comunitarios", d: "Comunidad de impacto en Puno." },
      { n: "Semillero de Emprendedores Perú (SEP)", d: "Comunidad de emprendimiento." },
      { n: "IEEE", d: "Comunidad estudiantil." },
      { n: "FLIT", d: "Participación en FLIT 2026." },
    ],
  },
  { name: "Por precisar", items: [{ n: "Friding", d: "Tipo de colaboración pendiente de confirmar." }] },
];

export default function SpeakerPage() {
  const photos = getAvailablePhotos();
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-10 pt-12 md:px-8 md:pt-20">
      <div className="grid gap-10 md:grid-cols-[1fr_340px] md:items-end">
        <div>
          <h1 className="font-display text-[44px] font-semibold leading-[0.95] md:text-[72px]">{speaker.name}</h1>
          <p className="mt-5 text-[19px] text-ink/90">
            {speaker.role}. {speaker.focus}.
          </p>
          <p className="mt-2 text-[16px] text-muted">{speaker.interests}.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gold px-5 py-2.5 font-semibold text-obsidian">
              LinkedIn
            </a>
            {speaker.github && (
              <a href={speaker.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-2.5">
                GitHub
              </a>
            )}
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-3xl">
          <PhotoSlot k={photos.ponente ? "ponente" : "sep"} photos={photos} caption position="78% center" />
        </div>
      </div>

      <blockquote className="mt-16 border-l-2 border-gold pl-6 font-display text-[24px] leading-snug text-ink md:text-[30px]">
        Recién estoy comenzando mi carrera profesional. Tengo muchísimo por aprender y muchas metas por alcanzar. No quiero que recuerden mi
        experiencia: quiero que descubran su próxima oportunidad.
      </blockquote>

      <div className="mt-16">
        {groups.map((g) => (
          <section key={g.name} className="grid gap-4 border-t border-line py-8 md:grid-cols-[260px_1fr]">
            <h2 className="font-display text-[19px] font-semibold text-gold">{g.name}</h2>
            <ul className="space-y-4">
              {g.items.map((it) => (
                <li key={it.n}>
                  <p className="font-display text-[22px] font-semibold">{it.n}</p>
                  <p className="text-[15.5px] text-muted">{it.d}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-faint">
        Las experiencias se agrupan por tipo; no corresponden a empleos simultáneos a tiempo completo. Fechas y detalles pendientes de
        completar con el ponente.
      </p>
    </div>
  );
}
