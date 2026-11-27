# Cómo sustituir fotografías

La app detecta fotos reales automáticamente. Copia el archivo en `public/images/real/` con el nombre de la clave y haz commit:

| Clave (nombre de archivo) | Dónde aparece |
| --- | --- |
| `infancia` | Diapositiva 3 |
| `ieee`, `cusco` | Diapositiva 5 (y `ieee` en la 10) |
| `poder-judicial`, `cableado` | Diapositiva 8 |
| `hackaru`, `flit-2026`, `irf26-utec` | Diapositiva 10 |
| `angie` | Diapositiva 12 |
| `diego` | Diapositiva 14 |
| `paolo` | Diapositiva 15 |
| `jayu`, `agendia` | Diapositiva 18 |
| `coinsi-2025`, `coinsi-2026` | Diapositiva 24 |
| `ponente` | Página `/ponente` |

Disponibles también (sin espacio asignado aún): `ecoing`, `nasa-space-apps`, `dermaapp`, `irf26-huaraz`, `allprocar`.

Formatos: `.webp` (recomendado), `.avif`, `.jpg`, `.png`. Ejemplo: `public/images/real/angie.webp`.

Recomendaciones: 1600 px en el lado largo, WebP calidad 80 (`cwebp -q 80 foto.jpg -o angie.webp`). Publica fotos de terceros solo con su autorización.

Las ilustraciones actuales (altiplano, monitor CRT, diagramas) son SVG originales y conceptuales: no son evidencia documental. Ver `public/images/MANIFIESTO.md`.

## Imágenes conceptuales (IA)

`public/images/concept/` contiene imágenes generadas con IA en Figma (archivo "De Puno al mundo — imágenes conceptuales"). Las versiones actuales son ampliaciones de miniaturas. Para mejorar la nitidez, exporta cada imagen desde Figma en PNG y reemplaza el archivo con el mismo nombre (`hero-titicaca`, `cabina-internet`, `trabajo-remoto`, `infraestructura-electrica`, `laboratorio`) en formato `.webp`.
