export const concepts = {
  "hero-titicaca": "Lago Titicaca desde Puno al anochecer",
  "cabina-internet": "Cabina de internet de los años 2000",
  "trabajo-remoto": "Espacio de trabajo remoto frente al lago",
  "infraestructura-electrica": "Infraestructura eléctrica en el altiplano",
  laboratorio: "Laboratorio de computación científica",
  "puno-noche": "Puno y el lago Titicaca de noche",
  amanecer: "Amanecer en el lago Titicaca",
  senderos: "Senderos en los Andes",
  startup: "Espacio de trabajo de una startup",
} as const;

export type ConceptKey = keyof typeof concepts;

/** Imagen conceptual generada con IA. Se rotula como tal: no es evidencia documental. */
export function ConceptImage({
  k,
  className = "",
  tag = true,
  position = "center",
}: {
  k: ConceptKey;
  className?: string;
  tag?: boolean;
  position?: string;
}) {
  return (
    <figure className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- recurso local, funciona offline */}
      <img src={`/images/concept/${k}.webp`} alt={concepts[k]} className="h-full w-full object-cover" style={{ objectPosition: position }} loading="lazy" />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
      {tag && (
        <figcaption className="absolute bottom-[3%] right-[3%] rounded-full bg-black/55 px-[0.8em] py-[0.25em] font-mono text-[max(10px,0.7em)] text-white/75 backdrop-blur-sm">
          Imagen conceptual · IA
        </figcaption>
      )}
    </figure>
  );
}
