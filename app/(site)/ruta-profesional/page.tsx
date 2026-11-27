import type { Metadata } from "next";
import { RoutePlanner } from "@/components/route/RoutePlanner";

export const metadata: Metadata = {
  title: "Ruta profesional",
  description: "Qué hacer en cada etapa de la carrera de Ingeniería de Sistemas y un reto de 30 días con progreso guardado.",
  alternates: { canonical: "/ruta-profesional" },
};

export default function RoutePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <section className="pb-10 pt-12 md:pt-20">
        <h1 className="font-display text-[44px] font-semibold leading-[0.95] md:text-[80px]">
          No esperes a egresar
          <br />
          para comenzar.
        </h1>
        <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-muted">
          La formación académica y la experiencia práctica pueden avanzar en paralelo. Elige tu semestre para ver en qué enfocarte y qué
          oportunidades encajan contigo.
        </p>
      </section>
      <RoutePlanner />
    </div>
  );
}
