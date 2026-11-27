import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { METADATA_BASE, talk, speaker } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(METADATA_BASE),
  title: {
    default: `${talk.title} — ${talk.subtitle}`,
    template: `%s · De Puno al mundo`,
  },
  description:
    "Ponencia y directorio abierto de oportunidades para estudiantes de Ingeniería de Sistemas: prácticas, PEU, becas, investigación, comunidades, competencias y emprendimiento. COINSI 2026, UNA Puno.",
  applicationName: "De Puno al mundo",
  authors: [{ name: speaker.name, url: speaker.linkedin }],
  keywords: ["COINSI 2026", "UNA Puno", "Ingeniería de Sistemas", "prácticas", "PEU", "becas", "oportunidades", "Puno"],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "De Puno al mundo",
    title: `${talk.title}. ${talk.subtitle}.`,
    description: "Directorio abierto de oportunidades reales para estudiantes. Escanea, explora, comparte.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "De Puno al mundo — COINSI 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${talk.title}. ${talk.subtitle}.`,
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#080D15",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
