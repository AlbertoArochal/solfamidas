# Solfamidas — MVP Web para Músicos Clásicos

Web one-page para solistas de música clásica (piano y violín) construida con **Astro 5** + **Decap CMS**, lista para desplegar en **Vercel**.

## Stack

- **Astro 5** (SSG + rutas SSR para el CMS) con adapter `@astrojs/vercel`
- **Decap CMS** (panel `/admin` para editar contenido sin tocar código)
- **`astro-decap-cms-oauth`** — monta `/admin` y las rutas OAuth `/oauth` y `/oauth/callback`
- Contenido en Markdown/YAML versionado en este repo de GitHub

## Contenido editable desde /admin

| Colección | Descripción | Ubicación |
|---|---|---|
| Configuración General | Nombre, especialidad, contacto, SEO, texto de contacto | `src/data/site.json` |
| Agenda y Eventos | Conciertos con fecha, sala, ciudad, tipo, enlace | `src/content/eventos/` |
| Galería de Fotos | Imágenes con categoría | `src/content/galeria/` |
| Multimedia | Embeds de YouTube, SoundCloud, Spotify, Vimeo | `src/content/media/` |
| Biografía | Título + contenido markdown | `src/content/bio/` |
| Repertorio | Título, intro y lista de piezas | `src/data/site.json` |

## Despliegue en Vercel

1. **Importa el repo** en [vercel.com/new](https://vercel.com/new) seleccionando `AlbertoArochal/solfamidas`.
   - Framework: **Astro** (detectado automáticamente).
   - Build command: `npm run build` · Output: `dist` (Vercel lo detecta con el adapter).

2. **Crea la GitHub OAuth App**:
   - GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth app.
   - **Homepage URL**: `https://solfamidas.vercel.app`
   - **Authorization callback URL**: `https://solfamidas.vercel.app/oauth/callback`
   - Copia el **Client ID** y genera un **Client Secret**.

3. **Configura las env vars en Vercel** (Settings → Environment Variables):
   ```
   OAUTH_GITHUB_CLIENT_ID=<client id>
   OAUTH_GITHUB_CLIENT_SECRET=<client secret>
   ```

4. **Despliega**. El panel queda en `https://solfamidas.vercel.app/admin/`.

> Si usas un dominio propio, actualiza `site` en `astro.config.mjs`, `base_url` en `public/admin/config.yml` y `public/robots.txt`, y recrea la OAuth App con la nueva URL.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build con adapter Vercel
```

Para probar el panel `/admin` en local con el backend local de Decap (sin GitHub OAuth):

```bash
npx decap-server   # en otra terminal
npm run dev
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar (ver `.env.example` para descripción de cada variable).
