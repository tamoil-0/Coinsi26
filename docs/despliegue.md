# Despliegue

## Vercel (producción)

Proyecto `coinsi26` (equipo tamoils-projects). URL de producción: https://coinsi26.vercel.app


1. https://vercel.com/new → importa `tamoil-0/Coinsi26`.
2. Framework: Next.js (autodetectado). Root directory: `./`. Build: `next build`. Rama de producción: `main`.
3. Variables de entorno: ninguna obligatoria. La URL pública se toma de `VERCEL_PROJECT_PRODUCTION_URL`, que Vercel expone en cada build. Si usas un dominio propio, define `NEXT_PUBLIC_SITE_URL=https://tu-dominio` y vuelve a desplegar.
4. Cada push a `main` despliega automáticamente.

## QR

Se generan en build con la URL real (`/qr` y diapositivas 13, 17, 22 y 25). Para archivos sueltos de imprenta:

```bash
npm run qr -- https://TU-URL.vercel.app    # escribe public/qr/*.svg y *.png
```

## Sin Vercel

Todo el sitio es estático: `STATIC_EXPORT=1 npm run build` genera `out/`, que puede servirse desde cualquier hosting estático.
