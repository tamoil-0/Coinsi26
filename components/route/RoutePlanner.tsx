"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { useLocalSet } from "@/hooks/useLocalSet";

const stages = [
  {
    id: "1-2",
    label: "Semestres 1–2",
    title: "Fundamentos",
    focus: ["Lógica y programación", "Inglés desde el primer día", "Git y GitHub", "Hábitos de estudio"],
    action: "Crea tu cuenta de GitHub y sube cada ejercicio que hagas. Empieza un curso de inglés gratuito.",
    links: [
      { label: "Cursos gratuitos", href: "/recursos" },
      { label: "Comunidades", href: "/comunidades" },
    ],
  },
  {
    id: "3-4",
    label: "Semestres 3–4",
    title: "Proyectos y comunidades",
    focus: ["Bases de datos", "APIs", "Primer proyecto propio", "Una comunidad activa"],
    action: "Construye algo que alguien más use. Únete a una comunidad y asiste a tu primer evento.",
    links: [
      { label: "Competencias", href: "/oportunidades?c=competencias" },
      { label: "Comunidades", href: "/comunidades" },
    ],
  },
  {
    id: "5-6",
    label: "Semestres 5–6",
    title: "Experiencia real",
    focus: ["Voluntariado técnico", "Proyectos con usuarios reales", "Hackatones y competencias", "Open source"],
    action: "Participa en una hackathon aunque no ganes. Contribuye a un proyecto open source o haz un voluntariado técnico.",
    links: [
      { label: "Competencias", href: "/oportunidades?c=competencias" },
      { label: "Investigación y open source", href: "/oportunidades?c=investigacion" },
    ],
  },
  {
    id: "7-8",
    label: "Semestres 7–8",
    title: "Prácticas y especialización",
    focus: ["Prácticas preprofesionales", "PEU del sector público", "Portafolio", "Especialización"],
    action: "Postula a PEU y prácticas. Revisa qué ciclo pide cada convocatoria: muchas exigen los últimos semestres.",
    links: [
      { label: "PEU y sector público", href: "/oportunidades?c=peu,sector-publico" },
      { label: "Prácticas", href: "/oportunidades?c=practicas" },
    ],
  },
  {
    id: "9-10",
    label: "Semestres 9–10",
    title: "Consolidación",
    focus: ["Tesis con impacto", "Investigación internacional", "Emprendimiento", "Primer empleo"],
    action: "Convierte tu tesis o proyecto en algo que se pueda mostrar. Explora pasantías de investigación y programas de emprendimiento.",
    links: [
      { label: "Becas e investigación", href: "/oportunidades?c=becas,investigacion" },
      { label: "Emprendimiento", href: "/oportunidades?c=startups" },
      { label: "Empleo junior", href: "/oportunidades?c=empleo-junior" },
    ],
  },
];

const checklist = [
  { week: "Semana 1 · Prepara tu perfil", items: ["Foto y titular claros en LinkedIn", "Perfil de GitHub con README personal", "CV de una página con enlaces a proyectos", "Revisa tu nivel de inglés con una prueba gratuita"] },
  { week: "Semana 2 · Construye un proyecto", items: ["Elige un problema real y pequeño", "Publica el código en GitHub", "Escribe un README: problema, demo, arquitectura", "Agrega al menos una prueba automatizada"] },
  { week: "Semana 3 · Conecta con comunidades", items: ["Únete a una comunidad del directorio", "Asiste a un evento presencial o virtual", "Conversa con tres personas nuevas", "Comparte lo que construiste"] },
  { week: "Semana 4 · Postula", items: ["Guarda cinco oportunidades del directorio", "Revisa requisitos y fechas en la fuente oficial", "Postula al menos a tres", "Comparte una oportunidad con un compañero"] },
];

export function RoutePlanner() {
  const [stage, setStage] = useState(stages[2].id);
  const done = useLocalSet("dpam:reto-30-dias");
  const current = stages.find((s) => s.id === stage)!;
  const total = checklist.reduce((a, w) => a + w.items.length, 0);
  const progress = Math.round((done.items.size / total) * 100);

  return (
    <>
      <section className="border-t border-line py-12 md:py-16">
        <h2 className="font-display text-[28px] font-semibold md:text-[40px]">¿En qué semestre estás?</h2>
        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-[15px] h-px bg-line" aria-hidden />
          <div role="tablist" aria-label="Semestre" className="no-scrollbar relative flex gap-2 overflow-x-auto md:grid md:grid-cols-5">
            {stages.map((s) => {
              const active = s.id === stage;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls="etapa"
                  onClick={() => setStage(s.id)}
                  className="group flex shrink-0 flex-col items-start gap-3 pr-4 text-left"
                >
                  <span className={`h-[30px] w-[30px] rounded-full border-[6px] border-obsidian ${active ? "bg-gold" : "bg-surface group-hover:bg-faint"}`} />
                  <span className={`font-mono text-[13px] ${active ? "text-gold" : "text-muted"}`}>{s.label}</span>
                  <span className={`font-display text-[18px] font-semibold ${active ? "text-ink" : "text-muted"}`}>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div id="etapa" role="tabpanel" className="mt-10 grid gap-8 rounded-2xl border border-line bg-navy/50 p-6 md:grid-cols-[1fr_1.2fr] md:p-10">
          <div>
            <p className="font-mono text-[13px] text-gold">{current.label}</p>
            <p className="mt-2 font-display text-[32px] font-semibold leading-tight">{current.title}</p>
            <ul className="mt-5 space-y-2">
              {current.focus.map((f) => (
                <li key={f} className="flex gap-3 text-[16px] text-ink/90">
                  <span className="mt-[11px] h-1 w-3 shrink-0 bg-cyan/70" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[18px] leading-relaxed text-ink">{current.action}</p>
            <p className="mt-6 text-[14px] text-muted">Oportunidades compatibles:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {current.links.map((l) => (
                <Link key={l.href + l.label} href={l.href} className="rounded-full bg-gold px-4 py-2 text-[14px] font-semibold text-obsidian hover:bg-[#f6c988]">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12 md:py-16" aria-labelledby="reto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="reto" className="font-display text-[28px] font-semibold md:text-[40px]">
            Reto de 30 días
          </h2>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[14px] text-muted tabular">
              {done.items.size}/{total} · {progress}%
            </p>
            {done.items.size > 0 && (
              <button type="button" onClick={done.clear} className="text-[13px] text-faint underline-offset-4 hover:text-ink hover:underline">
                Reiniciar
              </button>
            )}
          </div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso del reto">
          <div className="h-full bg-[linear-gradient(90deg,#F1B86A,#66E3B4)] transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-[13px] text-faint">Tu progreso se guarda solo en este dispositivo.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {checklist.map((w) => (
            <fieldset key={w.week} className="rounded-2xl border border-line p-6">
              <legend className="px-2 font-display text-[18px] font-semibold">{w.week}</legend>
              <ul className="space-y-1">
                {w.items.map((it) => {
                  const id = `${w.week}:${it}`;
                  const checked = done.items.has(id);
                  return (
                    <li key={it}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-navy/60">
                        <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => done.toggle(id)} />
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-cyan ${
                            checked ? "border-mint bg-mint text-obsidian" : "border-faint"
                          }`}
                        >
                          {checked && <Check size={14} strokeWidth={3} />}
                        </span>
                        <span className={`text-[15.5px] ${checked ? "text-muted line-through decoration-faint" : "text-ink/90"}`}>{it}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ))}
        </div>
      </section>
    </>
  );
}
