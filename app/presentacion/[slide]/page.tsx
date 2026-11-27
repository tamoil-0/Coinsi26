import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Deck } from "@/components/presentation/Deck";
import { slideMeta, TOTAL_SLIDES } from "@/components/presentation/meta";
import { getDeckContext } from "@/lib/deck";

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: TOTAL_SLIDES }, (_, i) => ({ slide: String(i + 1) }));
}

export async function generateMetadata({ params }: PageProps<"/presentacion/[slide]">): Promise<Metadata> {
  const { slide } = await params;
  const meta = slideMeta[Number(slide) - 1];
  return {
    title: meta ? `${slide}. ${meta.title}` : "Ponencia",
    alternates: { canonical: `/presentacion/${slide}` },
  };
}

export default async function SlidePage({ params }: PageProps<"/presentacion/[slide]">) {
  const { slide } = await params;
  const n = Number(slide);
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_SLIDES) notFound();
  const ctx = await getDeckContext();
  return <Deck ctx={ctx} initial={n} />;
}
