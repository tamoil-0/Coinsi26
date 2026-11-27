import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AltiplanoScene } from "@/components/ui/AltiplanoScene";
import { communities, opportunities, resources } from "@/lib/data";
import { effectiveStatus } from "@/lib/status";
import { categoryLabel, formatDate } from "@/lib/labels";
import { speaker, talk, LAKE_ALTITUDE } from "@/lib/site";
import { LiveStatus } from "@/components/opportunities/LiveStatus";

const byCat = (cats: string[]) => opportunities.filter((o) => cats.includes(o.category)).length;

const routes = [
  { name: "Sector público", text: "PEU, cursos de extensión y prácticas en entidades del Estado.", href: "/oportunidades?c=sector-publico,peu", count: byCat(["sector-publico", "peu"]) },
  { name: "Prácticas remotas", text: "Empresas de otros países que contratan desde Perú, y portales para encontrarlas.", href: "/oportunidades?c=practicas,empleo-junior", count: byCat(["practicas", "empleo-junior"]) },
  { name: "Investigación", text: "Pasantías de verano, open source y becas internacionales.", href: "/oportunidades?c=investigacion,becas", count: byCat(["investigacion", "becas"]) },
  { name: "Comunidades", text: "Personas que comparten oportunidades antes de que lleguen a ti.", href: "/comunidades", count: communities.length },
  { name: "Competencias", text: "Hackatones y concursos que ponen a prueba lo que construyes.", href: "/oportunidades?c=competencias", count: byCat(["competencias"]) },
  { name: "Emprendimiento", text: "Incubación, aceleración y capital semilla para ideas con impacto.", href: "/oportunidades?c=startups", count: byCat(["startups"]) },
];

const stories = [
  {
    name: "Angie",
    title: "De un PEU a una práctica",
    text: "Postuló a un Programa de Extensión Universitaria, se formó cerca de tres meses en Lima y desde ahí llegó una oportunidad profesional.",
  },
  {
    name: "Diego",
    title: "Competir internacionalmente",
    text: "En la Huawei ICT Competition pasó de la etapa universitaria a la regional, nacional y latinoamericana. La final global sigue siendo su siguiente meta.",
  },
  {
    name: "Paolo Boris Luna Luque",
    title: "Un fellow de nuestra universidad",
    text: "Estudiante de Ingeniería de Sistemas y representante regional del Impact Regional Fellowship 2026. Las oportunidades existen antes de egresar.",
  },
];

const month = [
  ["Semana 1", "Prepara tu perfil", "LinkedIn, GitHub y un CV de una página con enlaces a lo que construiste."],
  ["Semana 2", "Construye un proyecto", "Pequeño y real. Con README, una demo y pruebas."],
  ["Semana 3", "Conecta con comunidades", "Asiste a un evento y conversa con tres personas."],
  ["Semana 4", "Postula", "Al menos a tres convocatorias del directorio."],
];

export default function Home() {
  const today = new Date();
  const featured = opportunities
    .map((o) => ({ o, s: effectiveStatus(o, today) }))
    .filter(({ o, s }) => o.featured && s !== "closed")
    .slice(0, 6);
  const featuredCommunities = communities.filter((c) => c.featured).slice(0, 6);
  const openCount = opportunities.filter((o) => effectiveStatus(o, today) === "open").length;

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-14 overflow-hidden md:-mt-16">
        <div className="relative h-[92svh] min-h-[600px] w-full">
          <AltiplanoScene className="absolute inset-0 h-full w-full max-md:[&_text]:hidden" align="xMaxYMax" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,13,21,0.55),rgba(8,13,21,0)_35%,rgba(8,13,21,0.15)_65%,#080D15)] md:bg-[linear-gradient(90deg,rgba(8,13,21,0.9),rgba(8,13,21,0.25)_60%,transparent),linear-gradient(180deg,transparent_70%,#080D15)]" />
          <div className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-14 md:justify-center md:px-8 md:pb-0">
            <p className="animate-rise font-mono text-[12px] text-muted md:text-[13px]">
              {talk.eventShort} · {talk.universityShort} · {speaker.name}
            </p>
            <h1 className="animate-rise mt-5 font-display text-[clamp(60px,10.5vw,164px)] font-bold leading-[0.84] tracking-[-0.05em]" style={{ animationDelay: "0.1s" }}>
              DE PUNO
              <br />
              AL MUNDO.
            </h1>
            <p className="animate-rise mt-6 max-w-[30ch] text-[19px] leading-snug text-ink/90 md:text-[26px]" style={{ animationDelay: "0.25s" }}>
              {talk.subtitle}.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
              <Link href="/oportunidades" className="rounded-full bg-gold px-6 py-3.5 text-[16px] font-semibold text-obsidian shadow-[0_0_0_6px_rgba(241,184,106,0.12)] transition hover:bg-[#f6c988]">
                Explorar oportunidades
              </Link>
              <Link href="/presentacion" className="rounded-full border border-ink/25 px-6 py-3.5 text-[16px] text-ink transition hover:border-ink/60">
                Ver la ponencia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LA PARADOJA */}
      <section className="mx-auto grid max-w-[1320px] gap-8 px-5 py-20 md:grid-cols-[1.3fr_1fr] md:items-end md:px-8 md:py-28">
        <h2 className="font-display text-[38px] font-semibold leading-[0.98] md:text-[64px]">
          ¿Cómo consigo experiencia si me piden experiencia para empezar?
        </h2>
        <div className="text-[17px] leading-relaxed text-muted md:text-[18px]">
          <p>
            La respuesta no es esperar a egresar. Es construir evidencia mientras estudias: proyectos, comunidades, programas públicos,
            competencias y prácticas.
          </p>
          <p className="mt-4">
            Aquí están las rutas que funcionaron para estudiantes de nuestra universidad, y un directorio para empezar la tuya hoy.
          </p>
        </div>
      </section>

      <div className="horizon mx-auto max-w-[1320px]" />

      {/* SEIS CAMINOS */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[34px] font-semibold leading-none md:text-[52px]">Seis caminos profesionales</h2>
          <p className="text-[14px] text-muted">El número indica cuántas entradas tiene hoy el directorio.</p>
        </div>
        <ol className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <li key={r.name} className="border-b border-line sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
              <Link href={r.href} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-navy/60 md:p-8">
                <span className="font-display text-[56px] font-semibold leading-none text-ink tabular md:text-[72px]">{r.count}</span>
                <span className="mt-2 flex items-center gap-2 font-display text-[22px] font-semibold">
                  {r.name}
                  <ArrowUpRight size={18} className="text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                </span>
                <span className="text-[15px] leading-relaxed text-muted">{r.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* HISTORIAS */}
      <section className="bg-navy/40 py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <h2 className="max-w-[18ch] font-display text-[34px] font-semibold leading-[1] md:text-[52px]">Historias de estudiantes cercanos</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {stories.map((s) => (
              <article key={s.name} className="border-t-2 border-gold/70 pt-6">
                <p className="font-mono text-[13px] text-gold">{s.name}</p>
                <h3 className="mt-3 font-display text-[26px] font-semibold leading-tight">{s.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.text}</p>
              </article>
            ))}
          </div>
          <Link href="/historia" className="mt-12 inline-flex items-center gap-2 text-[15px] text-cyan underline-offset-4 hover:underline">
            Leer la historia completa <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* DESTACADAS */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[34px] font-semibold leading-none md:text-[52px]">Oportunidades destacadas</h2>
            <Link href="/oportunidades" className="text-[15px] text-cyan underline-offset-4 hover:underline">
              Ver las {opportunities.length}
              {openCount ? `, ${openCount} abiertas` : ""}
            </Link>
          </div>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {featured.map(({ o, s }) => (
              <li key={o.slug}>
                <Link
                  href={`/oportunidades/${o.slug}`}
                  className="group grid gap-2 py-5 transition-colors hover:bg-navy/40 md:grid-cols-[1fr_200px_160px_24px] md:items-center md:gap-6 md:px-3"
                >
                  <span>
                    <span className="block font-display text-[20px] font-semibold leading-snug md:text-[22px]">{o.title}</span>
                    <span className="text-[14px] text-muted">{o.organization}</span>
                  </span>
                  <span className="text-[14px] text-muted">{categoryLabel[o.category]}</span>
                  <span className="flex items-center gap-3">
                    <LiveStatus status={o.status} deadline={o.applicationDeadline} />
                    {s === "open" && o.applicationDeadline && <span className="font-mono text-[12px] text-muted">{formatDate(o.applicationDeadline)}</span>}
                  </span>
                  <ArrowUpRight size={18} className="hidden text-faint group-hover:text-gold md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COMUNIDADES */}
      <section className="relative overflow-hidden border-y border-line bg-[radial-gradient(ellipse_at_80%_0%,rgba(67,139,255,0.14),transparent_60%)] py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="font-display text-[34px] font-semibold leading-[1] md:text-[52px]">Comunidades que vale la pena conocer</h2>
              <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-muted">
                Perdimos una hackathon y ganamos una comunidad. Muchas oportunidades llegan primero a quienes ya están conectados.
              </p>
              <Link href="/comunidades" className="mt-8 inline-flex rounded-full border border-ink/25 px-5 py-2.5 text-[15px] hover:border-ink/60">
                Ver las {communities.length} comunidades
              </Link>
            </div>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {featuredCommunities.map((c) => (
                <li key={c.slug} className="border-t border-line py-5">
                  <Link href={`/comunidades#${c.slug}`} className="group block">
                    <p className="font-display text-[21px] font-semibold group-hover:text-gold">{c.name}</p>
                    <p className="mt-1 line-clamp-2 text-[14.5px] leading-relaxed text-muted">{c.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RUTA 30 DÍAS */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 md:px-8 md:py-28">
        <h2 className="font-display text-[34px] font-semibold leading-none md:text-[52px]">Tu próximo mes puede verse así</h2>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
          <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-[linear-gradient(90deg,#F1B86A,#53D8F5)] md:block" aria-hidden />
          {month.map(([w, t, d]) => (
            <li key={w} className="relative pl-8 md:pl-0">
              <span className="absolute left-0 top-1 block h-[18px] w-[18px] rounded-full border-4 border-obsidian bg-gold md:static" aria-hidden />
              <p className="font-mono text-[13px] text-gold md:mt-6">{w}</p>
              <p className="mt-2 font-display text-[22px] font-semibold">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ol>
        <Link href="/ruta-profesional" className="mt-12 inline-flex rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-obsidian hover:bg-white">
          Empezar el reto de 30 días
        </Link>
      </section>

      {/* PUNO ECOSISTEMA */}
      <section className="relative overflow-hidden">
        <AltiplanoScene className="absolute inset-0 h-full w-full opacity-50" connections={false} tone="dawn" animate={false} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#080D15,rgba(8,13,21,0.6)_50%,#080D15)]" />
        <div className="relative mx-auto max-w-[1320px] px-5 py-28 md:px-8 md:py-40">
          <p className="font-mono text-[13px] text-gold">Puno, {LAKE_ALTITUDE}</p>
          <h2 className="mt-4 max-w-[16ch] font-display text-[40px] font-semibold leading-[0.98] md:text-[72px]">
            Puno no solo exporta talento. También puede crear oportunidades.
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-muted">
            SpinOut, Comunitarios, Agendia, el Semillero de Emprendedores Perú e IEEE muestran que el ecosistema también se construye desde
            aquí. Las próximas ediciones e iniciativas se anunciarán cuando estén confirmadas.
          </p>
        </div>
      </section>

      {/* PONENTE + RECURSOS */}
      <section className="mx-auto grid max-w-[1320px] gap-16 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <div>
          <h2 className="font-display text-[30px] font-semibold leading-none md:text-[40px]">El ponente</h2>
          <p className="mt-6 font-display text-[24px] font-semibold">{speaker.name}</p>
          <p className="mt-1 text-[15px] text-muted">
            {speaker.role}. {speaker.focus}.
          </p>
          <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-muted">
            Recién estoy comenzando mi carrera profesional y tengo muchísimo por aprender. Esta plataforma existe para compartir lo que me
            hubiera gustado saber antes.
          </p>
          <div className="mt-6 flex gap-4 text-[15px]">
            <Link href="/ponente" className="text-cyan underline-offset-4 hover:underline">
              Perfil
            </Link>
            <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan underline-offset-4 hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-display text-[30px] font-semibold leading-none md:text-[40px]">Recursos para aprender</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {resources.slice(0, 5).map((r) => (
              <li key={r.id}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between gap-4 py-3.5 hover:text-gold">
                  <span className="text-[16px]">{r.name}</span>
                  <span className="shrink-0 text-[13px] text-muted">{r.provider}</span>
                </a>
              </li>
            ))}
          </ul>
          <Link href="/recursos" className="mt-6 inline-block text-[15px] text-cyan underline-offset-4 hover:underline">
            Ver los {resources.length} recursos
          </Link>
        </div>
      </section>
    </>
  );
}
