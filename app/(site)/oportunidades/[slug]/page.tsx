import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getOpportunity, opportunities } from "@/lib/data";
import { effectiveStatus } from "@/lib/status";
import {
  categoryLabel,
  formatDate,
  fundingLabel,
  modalityLabel,
  NOT_PUBLISHED,
  regionLabel,
} from "@/lib/labels";
import { Monogram } from "@/components/opportunities/OpportunityCard";
import { LiveStatus } from "@/components/opportunities/LiveStatus";
import { ShareActions } from "@/components/opportunities/ShareActions";
import { SaveButton } from "@/components/opportunities/SaveButton";

export const dynamicParams = false;

export function generateStaticParams() {
  return opportunities.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/oportunidades/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const o = getOpportunity(slug);
  if (!o) return {};
  const description = o.description.slice(0, 180);
  return {
    title: o.title,
    description,
    alternates: { canonical: `/oportunidades/${o.slug}` },
    openGraph: { title: `${o.title} — ${o.organization}`, description, images: [{ url: "/og.png", width: 1200, height: 630 }] },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line py-7 md:grid-cols-[220px_1fr] md:gap-10">
      <h2 className="font-display text-[18px] font-semibold text-ink">{title}</h2>
      <div className="text-[16px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  if (!items.length) return <p>{NOT_PUBLISHED}</p>;
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span className="mt-[11px] h-1 w-3 shrink-0 bg-gold/70" aria-hidden />
          <span className="text-ink/90">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-[13px] text-faint">{label}</dt>
      <dd className="mt-0.5 font-mono text-[14px] text-ink">{value || NOT_PUBLISHED}</dd>
    </div>
  );
}

export default async function OpportunityPage({ params }: PageProps<"/oportunidades/[slug]">) {
  const { slug } = await params;
  const o = getOpportunity(slug);
  if (!o) notFound();
  const status = effectiveStatus(o);
  const host = (u: string) => {
    try {
      return new URL(u).hostname.replace(/^www\./, "");
    } catch {
      return u;
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: o.title,
    description: o.description,
    about: { "@type": "Organization", name: o.organization, url: o.officialUrl },
    dateModified: o.lastVerifiedAt,
  };

  return (
    <article className="mx-auto max-w-[1000px] px-5 pb-10 pt-8 md:px-8 md:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/oportunidades" className="inline-flex items-center gap-1.5 text-[14px] text-muted hover:text-ink">
        <ArrowLeft size={15} /> Todas las oportunidades
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3">
          <Monogram org={o.organization} category={o.category} size={52} />
          <div>
            <p className="text-[15px] text-ink">{o.organization}</p>
            <p className="text-[13px] text-muted">
              {categoryLabel[o.category]} · {o.country} · {regionLabel[o.region]}
            </p>
          </div>
        </div>
        <h1 className="mt-6 font-display text-[34px] font-semibold leading-[1.02] md:text-[54px]">{o.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <LiveStatus status={o.status} deadline={o.applicationDeadline} hint />
        </div>
        {status !== o.status && (
          <p className="mt-2 text-[13px] text-gold">La fecha de cierre registrada ya pasó; se muestra como cerrada.</p>
        )}
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={o.applicationUrl ?? o.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[15px] font-semibold text-obsidian hover:bg-[#f6c988]"
          >
            {o.applicationUrl && status === "open" ? "Ir a postular" : "Ver convocatoria oficial"} <ExternalLink size={15} />
          </a>
          <SaveButton slug={o.slug} />
        </div>
        <div className="mt-4">
          <ShareActions title={o.title} path={`/oportunidades/${o.slug}`} />
        </div>
      </header>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-line bg-navy/50 p-5 sm:grid-cols-3 md:p-6">
        <Field label="Apertura" value={o.applicationStart ? formatDate(o.applicationStart) : null} />
        <Field
          label="Cierre"
          value={o.applicationDeadline ? `${formatDate(o.applicationDeadline)}${o.deadlineTimezone ? ` (${o.deadlineTimezone})` : ""}` : null}
        />
        <Field label="Duración" value={o.duration} />
        <Field label="Modalidad" value={o.modality ? modalityLabel[o.modality] : null} />
        <Field label="Financiamiento" value={o.fundingType ? fundingLabel[o.fundingType] : null} />
        <Field label="Costo de postulación" value={o.applicationCost} />
        {(o.programStart || o.programEnd) && (
          <Field label="Programa" value={`${formatDate(o.programStart)} – ${formatDate(o.programEnd)}`} />
        )}
        {o.nextExpectedEdition && <Field label="Próxima edición" value={o.nextExpectedEdition} />}
      </dl>

      <div className="mt-10">
        <Section title="Qué es">
          <p className="text-ink/90">{o.description}</p>
        </Section>
        <Section title="Para quién es">
          <p className="text-ink/90">{o.eligibility ?? NOT_PUBLISHED}</p>
          <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
            <div>
              <dt className="text-faint">Carreras admitidas</dt>
              <dd className="text-ink/90">{o.eligibleCareers.length ? o.eligibleCareers.join(", ") : NOT_PUBLISHED}</dd>
            </div>
            <div>
              <dt className="text-faint">Ciclo o semestre</dt>
              <dd className="text-ink/90">{o.academicCycles ?? NOT_PUBLISHED}</dd>
            </div>
            <div>
              <dt className="text-faint">Idioma</dt>
              <dd className="text-ink/90">{o.languageRequirements ?? NOT_PUBLISHED}</dd>
            </div>
          </dl>
        </Section>
        <Section title="Qué ofrece">
          <List items={o.benefits} />
        </Section>
        <Section title="Requisitos">
          <List items={o.requirements} />
        </Section>
        <Section title="Cómo postular">
          {o.applicationSteps.length ? (
            <ol className="space-y-3">
              {o.applicationSteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-mono text-[14px] text-gold">{i + 1}.</span>
                  <span className="text-ink/90">{s}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p>{NOT_PUBLISHED}. Revisa la convocatoria oficial.</p>
          )}
        </Section>
        <Section title="Fuente oficial">
          <ul className="space-y-2">
            {[o.officialUrl, ...o.sourceUrls.filter((u) => u !== o.officialUrl)].map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 break-all text-cyan underline-offset-4 hover:underline">
                  {host(u)}
                  <ExternalLink size={13} />
                </a>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Última actualización">
          <p>
            Verificado el <span className="font-mono text-ink">{formatDate(o.lastVerifiedAt)}</span>. Las convocatorias cambian: confirma fechas y
            requisitos en la fuente oficial antes de postular.
          </p>
        </Section>
      </div>
    </article>
  );
}
