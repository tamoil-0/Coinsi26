import type { Metadata } from "next";
import QRCode from "qrcode";
import { getQrCodes } from "@/lib/qr";

export const metadata: Metadata = {
  title: "Códigos QR",
  description: "Códigos QR oficiales de De Puno al mundo.",
  alternates: { canonical: "/qr" },
};

export default async function QrPage() {
  const codes = await getQrCodes();
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-10 pt-12 md:px-8 md:pt-20">
      <h1 className="font-display text-[44px] font-semibold leading-[0.95] md:text-[72px]">Escanea. Explora. Comparte.</h1>
      {!codes ? (
        <p className="mt-8 max-w-[60ch] rounded-2xl border border-dashed border-line p-6 text-[16px] text-muted">
          Los códigos QR se generan automáticamente con la URL real de producción al desplegar el sitio. Este build no tiene una URL pública
          configurada, así que no se muestra ningún QR (nunca apuntamos a localhost).
        </p>
      ) : (
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {await Promise.all(
            Object.values(codes).map(async (c, i) => {
              const png = await QRCode.toDataURL(c.url, { width: 1600, margin: 2, errorCorrectionLevel: "M", color: { dark: "#080D15", light: "#FFFFFF" } });
              const svgHref = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(c.svg)}`;
              return (
                <figure key={c.key} className={i === 0 ? "sm:col-span-2 sm:grid sm:grid-cols-[minmax(0,420px)_1fr] sm:items-center sm:gap-10" : ""}>
                  <div className="overflow-hidden rounded-2xl bg-ink p-3 [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: c.svg }} />
                  <figcaption className="mt-4">
                    <p className="font-display text-[22px] font-semibold">{c.label}</p>
                    <p className="mt-1 break-all font-mono text-[13px] text-muted">{c.url}</p>
                    <p className="mt-3 flex gap-4 text-[14px]">
                      <a download={`qr-${c.key}.svg`} href={svgHref} className="text-cyan underline-offset-4 hover:underline">
                        Descargar SVG
                      </a>
                      <a download={`qr-${c.key}.png`} href={png} className="text-cyan underline-offset-4 hover:underline">
                        Descargar PNG
                      </a>
                    </p>
                  </figcaption>
                </figure>
              );
            }),
          )}
        </div>
      )}
    </div>
  );
}
