import Link from "next/link";
import { LAKE_ALTITUDE, PUNO_COORDS, speaker, talk } from "@/lib/site";
import { lastDataUpdate } from "@/lib/data";
import { formatDate } from "@/lib/labels";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-navy/40">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl font-semibold leading-none text-ink md:text-4xl">
            No esperes a egresar
            <br />
            para comenzar.
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Las oportunidades no solamente se buscan. También se comparten y se construyen.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-ink" href="/oportunidades">Directorio de oportunidades</Link></li>
            <li><Link className="hover:text-ink" href="/comunidades">Comunidades</Link></li>
            <li><Link className="hover:text-ink" href="/recursos">Recursos y cursos</Link></li>
            <li><Link className="hover:text-ink" href="/ruta-profesional">Ruta profesional</Link></li>
            <li><Link className="hover:text-ink" href="/presentacion">Ponencia completa</Link></li>
            <li><Link className="hover:text-ink" href="/qr">Códigos QR</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{talk.eventShort}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {talk.event}
            <br />
            {talk.university}
            <br />
            {talk.dateLabel}
          </p>
          <p className="mt-4 text-sm text-muted">
            <Link className="hover:text-ink" href="/ponente">{speaker.name}</Link>
            <br />
            <a className="hover:text-ink" href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
      <div className="horizon" />
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-5 py-5 font-mono text-[12px] text-faint md:px-8">
        <span>
          {PUNO_COORDS} — lago a {LAKE_ALTITUDE}
        </span>
        <span>Datos verificados al {formatDate(lastDataUpdate)}. Confirma siempre en la fuente oficial.</span>
      </div>
    </footer>
  );
}
