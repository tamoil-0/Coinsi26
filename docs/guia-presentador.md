# Guía del presentador

## Antes de salir

1. Abre la URL de producción en `/presentacion/1` y pulsa **F** para pantalla completa.
2. Ten listo el **respaldo offline** (ver abajo) por si falla el internet del auditorio.
3. Comprueba que la diapositiva 22 muestra el QR (solo aparece en el sitio desplegado con su URL real).

## Teclado

| Tecla | Acción |
| --- | --- |
| → · Espacio · PageDown · Enter | Siguiente |
| ← · PageUp · Backspace | Anterior |
| Home / End | Primera / última |
| F | Pantalla completa |
| G | Vista general (clic en una para saltar) |
| Esc | Cerrar vista general |
| T | Cronómetro de ensayo con tiempo planificado acumulado |

También funciona con clic en los bordes izquierdo/derecho, deslizando en pantallas táctiles y con un presentador (clicker) que envíe flechas o PageUp/PageDown. Los controles se ocultan solos tras 2,6 s sin mover el mouse.

En celulares en vertical se abre el **modo lectura** (todas las diapositivas en columna). Puedes forzarlo con `?modo=lectura`.

## Tiempos sugeridos (45 min)

| Acto | Diapositivas | Minutos |
| --- | --- | --- |
| I. Empezar | 1–4 | 6 |
| II. Aprender haciendo | 5–10 | 12,5 |
| III. Descubrir oportunidades | 11–18 | 14 |
| IV. Prepararse y actuar | 19–22 | 7 |
| V. Regresar y construir | 23–25 | 3,5 |
| Margen / preguntas | | 2 |

La diapositiva 22 (QR grande) puede quedarse proyectada mientras el público escanea.

## Respaldo offline

Opción A, PDF: `de-puno-al-mundo.pdf` (25 páginas 16:9). Se abre con cualquier visor en pantalla completa.

Opción B, sitio local completo:

```bash
npm install
NEXT_PUBLIC_SITE_URL=https://TU-URL.vercel.app npm run offline   # sirve en http://localhost:4000
```

Definir `NEXT_PUBLIC_SITE_URL` hace que los QR del respaldo apunten al sitio público real. Todas las imágenes y fuentes son locales: no se carga nada externo durante la presentación.
