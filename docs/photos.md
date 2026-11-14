# Publicar fotos

Las fotos que pongas en una carpeta de tu Mac aparecen en `gastoncorbalan.com/photos`.

| Hacés | Qué pasa |
| --- | --- |
| Copiás o exportás una foto a `~/Pictures/gastoncorbalan.com` | Se publica en la próxima sincronización |
| Reemplazás el archivo (misma foto editada) | Se actualiza |
| La borrás de la carpeta | Se despublica |

La carpeta se crea sola la primera vez. Sirve exportar desde Lightroom, desde la app Fotos
(Archivo → Exportar) o arrastrar los archivos de la cámara. Acepta JPG, PNG, TIFF, WebP y HEIC.

## Qué se muestra

- **Título**: el título de la foto si lo pusiste en Lightroom o Fotos (IPTC/XMP); si no, el
  nombre del archivo (`Atardecer en el Retiro.jpg` → "Atardecer en el Retiro"). Los nombres que
  pone la cámara (`IMG_2210`, `DSCF0042`…) se ignoran y la foto queda solo con la fecha.
- **Texto alternativo**: la descripción/pie de foto si la tiene; si no, el título.
- **Fecha**: la de la toma (EXIF); si no hay, la del archivo.
- **Datos de cámara**: cámara, focal, diafragma, velocidad e ISO, en gris debajo.
- Orden: de la más nueva a la más vieja según la fecha de toma.

## Cómo funciona

`scripts/photos-sync.mjs` corre **en tu Mac** y nunca modifica la carpeta de origen ni sube
los originales. Por cada foto genera tres versiones WebP (640, 1200 y 1800 px de ancho) en
`public/photos/` y guarda los datos en `content/photos.json`. Las versiones publicadas no llevan
EXIF ni ubicación GPS. Las fotos ya procesadas no se vuelven a procesar.

## Publicación automática (recomendado)

Una sola vez, desde la carpeta del repo en tu Mac:

```bash
git checkout main && git pull
npm install
npm run photos:install
```

Cada 5 minutos revisa la carpeta y, si cambió algo, hace commit y push a `main` y Vercel lo
publica. Si ya instalaste la de Bear, node ya tiene el permiso de disco que necesita.

```bash
npm run photos:status      # si está activo y las últimas líneas del log
npm run photos:uninstall   # desactivarlo
```

Log: `~/Library/Logs/photos-sync.log`.

## Uso manual

```bash
npm run photos:sync        # genera las fotos sin tocar git (para revisar con npm run dev)
npm run photos:publish     # genera, commitea y pushea a main
node scripts/photos-sync.mjs --dry-run   # solo muestra qué haría
```

## Otra carpeta

`PHOTOS_DIR=~/ruta/a/otra/carpeta npm run photos:install` (también vale para `photos:sync`).
