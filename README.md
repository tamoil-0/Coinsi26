# De Puno al mundo

**Cómo construir experiencia real antes de egresar.**
Ponencia magistral de Jhon Marco Aracayo Mamani en el VI Congreso Internacional de Ingeniería de Sistemas (COINSI 2026), Universidad Nacional del Altiplano, Puno, 27 de noviembre de 2026.

La plataforma tiene dos experiencias:

- **Ponencia interactiva** (`/presentacion`): 25 diapositivas web 16:9 para proyectar en el auditorio.
- **Directorio público de oportunidades** (`/oportunidades`): prácticas, PEU, becas, investigación, competencias, emprendimiento y comunidades, cada una con fuente oficial y fecha de verificación. Sin registro.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Landing |
| `/presentacion`, `/presentacion/[1-25]` | Keynote (enlace directo a cada diapositiva) |
| `/historia` | Versión de lectura de la ponencia |
| `/oportunidades`, `/oportunidades/[slug]` | Directorio y detalle |
| `/comunidades` | Comunidades |
| `/recursos` | Cursos y certificaciones |
| `/ruta-profesional` | Ruta por semestre y reto de 30 días |
| `/ponente` | Perfil |
| `/qr` | QR oficiales (SVG y PNG) |

## Ejecutar localmente

```bash
npm install
npm run dev            # http://localhost:3000
```

Comprobaciones:

```bash
npm run validate:data  # esquema, duplicados, fechas vencidas
npm run lint
npm run typecheck
npm run build
npm test               # Playwright (CHROME_PATH=/ruta/a/chrome si no instalaste navegadores)
```

## Stack

Next.js 16 (App Router, todo estático) · React 19 · TypeScript estricto · Tailwind CSS 4 · Zod · Lucide · qrcode · Playwright. Sin base de datos, sin autenticación, sin rastreadores. El contenido vive en archivos JSON versionados en `data/`.

## Documentación

- [Guía del presentador](docs/guia-presentador.md)
- [Cómo actualizar oportunidades](docs/actualizar-oportunidades.md)
- [Cómo sustituir fotografías](docs/fotografias.md)
- [Despliegue](docs/despliegue.md)
- [Arquitectura](docs/arquitectura.md)
- [Inventario de fuentes y limitaciones](docs/fuentes-y-limitaciones.md)
