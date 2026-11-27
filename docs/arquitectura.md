# Arquitectura

```
app/
  layout.tsx              raíz: fuentes, metadata, Open Graph
  (site)/                 páginas con cabecera y pie
    page.tsx              landing
    oportunidades/        directorio + [slug]
    comunidades/ recursos/ ruta-profesional/ historia/ ponente/ qr/
  presentacion/           keynote a pantalla completa (sin cabecera)
  sitemap.ts robots.ts not-found.tsx
components/
  presentation/           Deck (motor: teclado, escala, vista general, lectura) · Slides (25 composiciones 1920×1080) · meta (títulos, actos, tiempos)
  opportunities/          Directory (búsqueda, filtros, favoritos, URL) · OpportunityCard · LiveStatus · ShareActions
  ui/                     AltiplanoScene (SVG original) · PhotoSlot · Mark
data/                     JSON versionados (oportunidades, comunidades, recursos)
lib/                      schema (Zod) · data (carga y valida) · status · filters · qr · photos · site
scripts/                  auditoría de datos · QR · exportar PDF
tests/                    Playwright
```

Decisiones:

- **Todo estático (SSG).** 113 páginas prerenderizadas. Sin servidor, sin base de datos, sin autenticación.
- **Escala única para las diapositivas.** Cada diapositiva es un lienzo de 1920×1080 que se escala para caber completo en cualquier pantalla (letterbox). Nunca hay scroll ni recortes.
- **Datos validados en build.** Un registro inválido se omite con aviso; CI falla si hay errores de esquema.
- **Estado efectivo.** `lib/status.ts` degrada a "cerrada" cualquier convocatoria con fecha pasada, en build y en el navegador.
- **QR honestos.** Solo se renderizan si existe una URL pública real.
- **Privacidad.** Favoritos y progreso del reto se guardan solo en `localStorage`. Sin analítica ni rastreadores.
