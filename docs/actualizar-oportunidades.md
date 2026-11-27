# Cómo actualizar oportunidades

Los datos están en `data/opportunities/*.json` (un archivo por grupo). El esquema se define con Zod en `lib/schema.ts`.

## Añadir una oportunidad

1. Copia un objeto existente del archivo que corresponda.
2. Cambia `id` y `slug` (mismo valor, en minúsculas con guiones, único).
3. Completa los campos con información de la **fuente oficial**. Lo que no esté publicado va como `null` (o `[]` en listas); la web mostrará "No publicado".
4. `lastVerifiedAt`: la fecha en que lo verificaste (`YYYY-MM-DD`).
5. Ejecuta `npm run validate:data` y haz commit. Vercel despliega solo.

## Estados

| Estado | Úsalo cuando |
| --- | --- |
| `open` | La fuente oficial muestra que acepta postulaciones **hoy**. Una fecha futura no basta. |
| `upcoming` | Hay una apertura anunciada oficialmente. |
| `recurring` | Se repite cada año o semestre; la próxima convocatoria aún no se publica. |
| `permanent` | Siempre disponible (portales de empleo, plataformas). |
| `unconfirmed` | No se pudo confirmar el estado actual. |
| `closed` | Terminó y no hay nueva edición anunciada. |

La web nunca muestra como abierta una convocatoria con fecha de cierre pasada: la recalcula con la fecha del visitante. Pero el JSON debe actualizarse a mano: nada se marca como `open` automáticamente.

## Auditoría

- `npm run validate:data`: esquema, duplicados, vencidas, datos incompletos, verificaciones con más de 90 días.
- `npm run audit:data`: lo anterior + enlaces rotos (requiere internet).
- GitHub Actions ejecuta la validación en cada push y la auditoría de enlaces cada lunes; el resultado aparece en el resumen del workflow.

Comunidades: `data/communities/comunidades.json`. Recursos: `data/resources/recursos.json`. No publiques invitaciones privadas de WhatsApp o Telegram sin autorización de la comunidad.
