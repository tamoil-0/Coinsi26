import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { resources } from "@/lib/data";
import type { Resource } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Recursos",
  description: "Cursos, certificaciones, herramientas e inglés para estudiantes de Ingeniería de Sistemas. Distinguimos acceso gratuito de certificación de pago.",
  alternates: { canonical: "/recursos" },
};

const catLabel: Record<Resource["category"], string> = {
  cursos: "Cursos",
  certificaciones: "Certificaciones",
  herramientas: "Herramientas y beneficios",
  ingles: "Inglés",
  ia: "Inteligencia artificial",
};
const costLabel: Record<Resource["cost"], { t: string; c: string }> = {
  gratuito: { t: "Gratuito", c: "text-mint" },
  freemium: { t: "Gratis con opciones de pago", c: "text-cyan" },
  "gratis-con-certificado-de-pago": { t: "Curso gratis · certificado de pago", c: "text-gold" },
  pago: { t: "De pago", c: "text-muted" },
};
const order: Resource["category"][] = ["cursos", "ia", "certificaciones", "herramientas", "ingles"];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 md:px-8">
      <section className="pb-10 pt-12 md:pt-20">
        <h1 className="font-display text-[44px] font-semibold leading-[0.95] md:text-[76px]">Aprende con lo que ya existe.</h1>
        <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-muted">
          {resources.length} plataformas para formarte y certificarte. Te indicamos cuándo el acceso es gratuito y cuándo el certificado tiene
          costo.
        </p>
      </section>
      {order.map((cat) => {
        const items = resources.filter((r) => r.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="border-t border-line py-10">
            <h2 className="font-display text-[24px] font-semibold">{catLabel[cat]}</h2>
            <ul className="mt-4 divide-y divide-line">
              {items.map((r) => (
                <li key={r.id} className="grid gap-2 py-5 md:grid-cols-[1fr_220px] md:gap-8">
                  <div>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-display text-[21px] font-semibold hover:text-gold">
                      {r.name} <ExternalLink size={14} className="text-faint group-hover:text-gold" />
                    </a>
                    <p className="text-[13.5px] text-faint">{r.provider}</p>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{r.description}</p>
                    {r.notes && <p className="mt-2 text-[13.5px] text-faint">Nota: {r.notes}</p>}
                  </div>
                  <p className={`text-[14px] ${costLabel[r.cost].c}`}>{costLabel[r.cost].t}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
