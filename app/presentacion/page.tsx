import type { Metadata } from "next";
import { Deck } from "@/components/presentation/Deck";
import { getDeckContext } from "@/lib/deck";

export const metadata: Metadata = {
  title: "Ponencia",
  description: "De Puno al mundo: la ponencia completa de COINSI 2026 en 25 diapositivas.",
  alternates: { canonical: "/presentacion" },
};

export default async function PresentationPage() {
  const ctx = await getDeckContext();
  return <Deck ctx={ctx} initial={1} />;
}
