import { photoSlots, type PhotoKey, type PhotoMap } from "@/lib/photos";

/**
 * Muestra la fotografía real si existe en public/images/real/<clave>.*;
 * si no, un espacio discreto que indica qué foto va ahí.
 */
export function PhotoSlot({
  k,
  photos,
  className = "",
  showHint = true,
}: {
  k: PhotoKey;
  photos: PhotoMap;
  className?: string;
  showHint?: boolean;
}) {
  const src = photos[k];
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- funciona igual en export estático/offline
      <img src={src} alt={photoSlots[k]} className={`h-full w-full object-cover ${className}`} loading="eager" />
    );
  }
  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden bg-[linear-gradient(135deg,#172233,#101827_60%,#0d1522)] ${className}`}
      aria-label={`Espacio reservado para fotografía: ${photoSlots[k]}`}
      role="img"
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-60" aria-hidden>
        <path d="M0 220 L80 150 L130 190 L210 110 L300 180 L360 140 L400 170 L400 300 L0 300 Z" fill="#1b2840" />
        <line x1="0" y1="232" x2="400" y2="232" stroke="#F1B86A" strokeOpacity="0.35" />
      </svg>
      {showHint && (
        <span className="relative m-[6%] font-mono text-[max(11px,0.9em)] leading-tight text-faint">
          Foto: {photoSlots[k]}
        </span>
      )}
    </div>
  );
}
