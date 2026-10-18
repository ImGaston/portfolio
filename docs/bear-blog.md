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
(y las imágenes en `public/blog/<slug>/`). Con `--push` hace commit y push, y el deploy
del sitio se encarga del resto.

- **Título**: la primera línea `# Título` de la nota.
- **Slug**: se genera del título la primera vez y después no cambia aunque edites el título.
- **Fecha**: la del día en que se publicó por primera vez.
- **Resumen**: el primer párrafo.
- Las líneas que son solo etiquetas se quitan; `==resaltado==` se respeta; `[[otra nota]]`
  se convierte en enlace si esa nota también está publicada.
- Las notas bloqueadas (cifradas) no se publican.

## Uso manual

Requiere Node 22.13 o superior (usa `node:sqlite`, sin dependencias extra).

```bash
cd ~/Code/portfolio        # donde tengas el repo
npm run bear:sync          # genera los cambios sin tocar git (para revisar)
npm run bear:publish       # genera, commitea y pushea
node --no-warnings scripts/bear-sync.mjs --dry-run   # solo muestra qué haría
```

La primera vez macOS puede pedir permiso para que Terminal acceda a datos de otras apps.
Si falla con un error de permisos: Ajustes del Sistema → Privacidad y seguridad →
Acceso total al disco → activá Terminal.

## Automático cada 15 minutos (opcional)

1. Editá `scripts/com.gastoncorbalan.bear-sync.plist` y cambiá `$HOME/Code/portfolio`
   por la ruta de tu repo.
2. Instalalo:
   ```bash
   cp scripts/com.gastoncorbalan.bear-sync.plist ~/Library/LaunchAgents/
   launchctl load ~/Library/LaunchAgents/com.gastoncorbalan.bear-sync.plist
   ```
3. Dale **Acceso total al disco** a `/bin/zsh` y a tu `node`
   (`which node`, p. ej. `/opt/homebrew/bin/node`), porque launchd no hereda el permiso de Terminal.
4. El log queda en `/tmp/bear-sync.log`. Para desactivarlo:
   `launchctl unload ~/Library/LaunchAgents/com.gastoncorbalan.bear-sync.plist`.

El job usa la misma autenticación de git que tu Terminal (llavero o clave SSH).

## Variables opcionales

- `BEAR_PUBLISH_TAG` (por defecto `blog/publicado`)
- `BEAR_DATA_DIR` / `BEAR_DB` si la base de Bear está en otro lugar
