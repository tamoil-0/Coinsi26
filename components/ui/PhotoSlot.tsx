import { photoSlots, type PhotoKey, type PhotoMap } from "@/lib/photos";

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Arte generativo de respaldo: curvas de nivel del altiplano, distinto para cada clave. */
export function ContourArt({ seed, className = "" }: { seed: string; className?: string }) {
  const h = hash(seed);
  const hue = [
    ["#172233", "#0d1522", "#438BFF"],
    ["#1b2840", "#101827", "#53D8F5"],
    ["#22202a", "#101827", "#F1B86A"],
  ][h % 3];
  const lines = Array.from({ length: 14 }, (_, i) => {
    const amp = 10 + ((h >> (i % 16)) & 15);
    const y = 40 + i * 20;
    const ph = ((h >> i) & 7) * 20;
    return `M-10 ${y} C ${80 + ph} ${y - amp}, ${160 - ph} ${y + amp}, 240 ${y} S ${360 + ph / 2} ${y - amp}, 420 ${y}`;
  });
  return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" className={`h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`g${h}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={hue[0]} />
          <stop offset="1" stopColor={hue[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="320" fill={`url(#g${h})`} />
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={hue[2]} strokeOpacity={0.08 + (i % 4) * 0.05} strokeWidth="1.2" />
      ))}
      <circle cx={80 + (h % 240)} cy={60 + (h % 180)} r="5" fill={hue[2]} opacity="0.7" />
    </svg>
  );
}

/**
 * Fotografía real si existe en public/images/real/<clave>.*;
 * si no, arte generativo discreto (sin texto de relleno).
 */
export function PhotoSlot({
  k,
  photos,
  className = "",
  caption = false,
  position = "center",
}: {
  k: PhotoKey;
  photos: PhotoMap;
  className?: string;
  caption?: boolean;
  position?: string;
}) {
  const src = photos[k];
  if (src) {
    return (
      <figure className={`relative h-full w-full overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- funciona igual en export estático/offline */}
        <img src={src} alt={photoSlots[k]} className="h-full w-full object-cover" style={{ objectPosition: position }} loading="eager" />
        {caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-[5%] pb-[4%] pt-[12%] text-[max(11px,0.8em)] leading-tight text-white/90">
            {photoSlots[k]}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} role="presentation">
      <ContourArt seed={k} />
    </div>
  );
}

export function hasPhoto(photos: PhotoMap, k: PhotoKey) {
  return Boolean(photos[k]);
}
