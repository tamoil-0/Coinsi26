import type { Metadata } from "next";
import Link from "next/link";
import { acts, slideMeta } from "@/components/presentation/meta";
import { ConceptImage, type ConceptKey } from "@/components/ui/ConceptImage";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { getAvailablePhotos } from "@/lib/photos.server";
import type { PhotoKey } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Historia",
  description: "La ponencia De Puno al mundo en versión de lectura: experiencias, errores, aprendizajes y oportunidades.",
  alternates: { canonical: "/historia" },
};

const chapters: { act: number; title: string; slide: number; body: string[]; photo?: PhotoKey[]; concept?: ConceptKey }[] = [
  {
    act: 0,
    slide: 2,
    title: "La paradoja de la experiencia",
    body: [
      "¿Cómo consigo experiencia si me piden experiencia para empezar? Es la pregunta que casi todos nos hacemos antes de egresar.",
      "La respuesta que encontré no fue esperar. Fue entender que la formación académica y la experiencia práctica pueden avanzar al mismo tiempo, y que al final lo que cuenta es la evidencia de lo que construiste.",
    ],
  },
  {
    act: 0,
    slide: 3,
    concept: "cabina-internet",
    title: "Todo empezó con curiosidad",
    body: [
      "Cabinas de internet, videojuegos y las primeras computadoras. Antes de saber qué era la ingeniería de sistemas, ya existía la curiosidad por entender cómo funcionaba la tecnología.",
    ],
  },
  {
    act: 1,
    slide: 5,
    photo: ["flit-2026"],
    title: "Salir de mi burbuja",
    body: [
      "El primer paso no fue técnico. Fue darme cuenta de que había un mundo de oportunidades fuera del aula: IEEE, un viaje a Cusco, comunidades y personas que ya estaban haciendo cosas.",
    ],
  },
  {
    act: 1,
    slide: 7,
    concept: "infraestructura-electrica",
    title: "¿Y si no hay internet?",
    body: [
      "En mi primer trabajo, con ECOING, aprendí que “eso es sencillo” casi nunca lo es. La aplicación tenía que seguir funcionando en campo, sin señal.",
      "La solución fue una arquitectura offline-first: la app en Flutter guarda todo en SQLite; al recuperar conexión, una cola de sincronización envía los cambios a una API REST y aparecen en un dashboard para el equipo.",
    ],
  },
  {
    act: 1,
    slide: 8,
    title: "No todo es programar",
    body: [
      "El voluntariado en el Poder Judicial me enseñó desarrollo e infraestructura, cableado incluido. También me enseñó lo que no se aprende en clase: comunicación, puntualidad y disciplina.",
    ],
  },
  {
    act: 1,
    slide: 9,
    title: "Un buen proyecto no basta",
    body: [
      "Reconocimiento facial, concursos perdidos, DermaApp. Aprendí que enumerar tecnologías no convence a nadie. Lo que convence es explicar el problema, la solución, la evidencia y el impacto.",
    ],
  },
  {
    act: 1,
    slide: 10,
    photo: ["irf26-utec", "irf26-huaraz"],
    title: "Perdimos una hackathon. Ganamos una comunidad.",
    body: [
      "De HackAru llegamos a SpinOut y de ahí al Impact Regional Fellowship 2026. El networking no es pedir favores: es construir relaciones con personas que quieren hacer cosas.",
    ],
  },
  {
    act: 2,
    slide: 11,
    photo: ["angie", "diego", "paolo"],
    title: "No existe una sola ruta profesional",
    body: [
      "Sector público, prácticas remotas, investigación, comunidades, competencias y emprendimiento. Cada ruta tiene su propio camino de entrada y todas están en el directorio.",
      "Angie postuló a un PEU, se formó cerca de tres meses en Lima y desde ahí llegó una oportunidad profesional. Diego llegó a la etapa latinoamericana de la Huawei ICT Competition; la final global sigue siendo su siguiente meta. Paolo Boris Luna Luque, estudiante de Ingeniería de Sistemas, fue representante regional del IRF26.",
      "Con Allprocar, una empresa de Argentina, trabajé de forma remota desde Puno: Git, colaboración y revisiones de código. Ojo: “remoto” no siempre significa “disponible desde cualquier país”.",
    ],
  },
  {
    act: 3,
    slide: 19,
    title: "Muéstrame qué construyes",
    body: [
      "Un CV con una lista de tecnologías dice poco. Un repositorio con README, demo, arquitectura y pruebas lo dice todo.",
      "En la era de la IA, herramientas como Claude Code, Codex y los agentes aceleran el trabajo: planificar, implementar, revisar, probar y entregar. Pero generar código no significa entenderlo. Tú sigues siendo responsable.",
    ],
  },
  {
    act: 4,
    slide: 23,
    photo: ["sep"],
    title: "Puno no solo exporta talento",
    body: [
      "También puede crear oportunidades. SpinOut, Comunitarios, Agendia, el Semillero de Emprendedores Perú e IEEE lo demuestran.",
      "Recién estamos comenzando. Todavía tengo muchísimo por aprender, y esta plataforma existe para que la próxima oportunidad la descubras tú.",
    ],
  },
];

export default function StoryPage() {
  const photos = getAvailablePhotos();
  return (
    <article className="mx-auto max-w-[760px] px-5 pb-10 pt-12 md:pt-20">
      <p className="font-mono text-[13px] text-gold">La ponencia en versión de lectura</p>
      <h1 className="mt-4 font-display text-[48px] font-semibold leading-[0.95] md:text-[80px]">De Puno al mundo.</h1>
      <p className="mt-6 text-[20px] leading-snug text-ink/90">Cómo construir experiencia real antes de egresar.</p>
      {acts.map((a, ai) => {
        const items = chapters.filter((c) => c.act === ai);
        if (!items.length) return null;
        return (
          <section key={a.n} className="mt-16">
            <p className="flex items-center gap-4 font-mono text-[13px] text-faint">
              Acto {a.n} <span className="h-px flex-1 bg-line" /> {a.name}
            </p>
            {items.map((c) => (
              <div key={c.title} className="mt-10">
                <h2 className="font-display text-[28px] font-semibold leading-tight md:text-[34px]">{c.title}</h2>
                {c.concept && (
                  <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl text-[12px]">
                    <ConceptImage k={c.concept} />
                  </div>
                )}
                {c.photo && (
                  <div className={`mt-6 grid gap-3 text-[12px] ${c.photo.length === 3 ? "grid-cols-3" : c.photo.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {c.photo.map((k) => (
                      <div key={k} className={`overflow-hidden rounded-2xl ${c.photo!.length === 1 ? "aspect-[16/9]" : c.photo!.length === 3 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                        <PhotoSlot k={k} photos={photos} caption={c.photo!.length < 3} position={k === "diego" ? "center 20%" : "center 30%"} />
                      </div>
                    ))}
                  </div>
                )}
                {c.body.map((p) => (
                  <p key={p.slice(0, 20)} className="mt-4 text-[17.5px] leading-[1.75] text-ink/85">
                    {p}
                  </p>
                ))}
                <Link href={`/presentacion/${c.slide}`} className="mt-3 inline-block font-mono text-[12px] text-faint hover:text-cyan">
                  Ver diapositiva {c.slide}: {slideMeta[c.slide - 1].title}
                </Link>
              </div>
            ))}
          </section>
        );
      })}
      <div className="mt-20 rounded-2xl border border-line bg-navy/50 p-8">
        <p className="font-display text-[28px] font-semibold">¿Qué vas a empezar esta semana?</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/oportunidades" className="rounded-full bg-gold px-5 py-2.5 font-semibold text-obsidian">
            Explorar oportunidades
          </Link>
          <Link href="/ruta-profesional" className="rounded-full border border-line px-5 py-2.5">
            Reto de 30 días
          </Link>
        </div>
      </div>
    </article>
  );
}
