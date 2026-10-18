# Publicar desde Bear

Escribís en Bear y las notas con la etiqueta `#blog/publicado` aparecen en `/blog`.

| Etiqueta | Qué pasa |
| --- | --- |
| `#blog/idea`, `#blog/borrador`, `#blog/recursos` | Nada, quedan privadas |
| `#blog/publicado` | Se publica en `gastoncorbalan.com/blog/<slug>` |
| Sacás `#blog/publicado` o mandás la nota a la papelera | Se despublica en la próxima sincronización |

## Cómo funciona

`scripts/bear-sync.mjs` corre **en tu Mac**: abre la base de Bear en solo lectura
(`~/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data/database.sqlite`),
toma las notas con `#blog/publicado` y escribe un `.md` por nota en `content/posts/`
(y las imágenes y adjuntos en `public/blog/<slug>/`). Con `--push` hace commit y push, y el deploy
del sitio se encarga del resto.

- **Título**: la primera línea `# Título` de la nota.
- **Slug**: se genera del título la primera vez y después no cambia aunque edites el título.
- **Fecha**: la del día en que se publicó por primera vez.
- **Resumen**: el primer párrafo.
- Las líneas que son solo etiquetas se quitan; `==resaltado==` se respeta; `[[otra nota]]`
  se convierte en enlace si esa nota también está publicada.
- Las notas bloqueadas (cifradas) no se publican.

## Publicación automática (recomendado)

Una sola vez, desde la carpeta del repo en tu Mac:

```bash
git checkout main && git pull
npm run bear:install
```

Después dale **Acceso total al disco** a node (el comando te muestra la ruta exacta):
Ajustes del Sistema → Privacidad y seguridad → Acceso total al disco → "+" →
Cmd+Shift+G → pegá la ruta → activalo.

Listo: cada 5 minutos revisa Bear y, si cambió algo en una nota con `#blog/publicado`,
hace commit y push a `main`, y Vercel lo publica. Sigue funcionando después de reiniciar.

```bash
npm run bear:status      # si está activo y las últimas líneas del log
npm run bear:uninstall   # desactivarlo
```

El log completo está en `~/Library/Logs/bear-sync.log`. Si movés la carpeta del repo
o cambiás de versión de node, volvé a correr `npm run bear:install`.

## Uso manual

Requiere Node 22.13 o superior (usa `node:sqlite`, sin dependencias extra).

```bash
npm run bear:sync          # genera los .md sin tocar git (para revisar)
npm run bear:publish       # genera, commitea lo pendiente y pushea a main
node --no-warnings scripts/bear-sync.mjs --dry-run   # solo muestra qué haría
```

`bear:publish` solo publica desde la rama `main`.

## Variables opcionales

- `BEAR_PUBLISH_TAG` (por defecto `blog/publicado`)
- `BEAR_DATA_DIR` / `BEAR_DB` si la base de Bear está en otro lugar
