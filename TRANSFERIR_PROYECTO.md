# Guía de Transferencia del Proyecto Solfamidas

Esta guía explica, paso a paso, cómo transferir el proyecto **Solfamidas** (web + CMS) desde la cuenta del desarrollador actual a los titulares finales que lo usarán.

**Stack del proyecto:**
- **Astro 5** (framework web estático + serverless) desplegado en **Vercel**
- **Decap CMS** (panel `/admin`) con autenticación **DecapBridge** (login con Google / email+password)
- Contenido versionado en un repositorio **GitHub**

> **IMPORTANTE:** El proyecto depende de **3 cuentas separadas**. La transferencia no es un solo clic: hay que transferir (o dar acceso a) cada una por separado. Esta guía cubre las 3.

---

## Resumen — Qué se transfiere y a quién

| Recurso | Dónde vive | Qué hay que hacer | Complicación |
|---|---|---|---|
| Código + contenido | GitHub (`AlbertoArochal/solfamidas`) | Transferir repo a la cuenta de los titulares | Media |
| Despliegue | Vercel | Transferir proyecto + dominio | Baja |
| CMS + usuarios | DecapBridge | Transferir propiedad del sitio | Baja |
| Token de GitHub | En DecapBridge (no en el repo) | Regenerar en el nuevo owner | Baja |

---

## ANTES DE EMPEZAR (planificación — 10 minutos)

1. **Decidir quién es el titular final.** Debe ser una persona real con su propio correo (no un correo compartido de equipo, para no perder acceso si alguien se va). Idealmente el mismo correo que usará para entrar al CMS.
2. **Que el titular se cree las cuentas** (si no las tiene): GitHub y Vercel. DecapBridge puede ser la misma cuenta del titular o se transfiere después.
3. **Acordar un día/hora** para hacerlo, porque entre el paso de GitHub y el de Vercel el sitio puede quedar "colgado" unos minutos. Mejor hacerlo en ventana de baja audiencia (el sitio de momento no es crítico).
4. **Comunicar a los colaboradores del CMS** que puede haber un breve corte y que tendrán que volver a iniciar sesión.

> **Regla de oro:** nunca revoques el token de GitHub, borres el sitio de DecapBridge, ni elimines el proyecto de Vercel, hasta que el nuevo titular **haya confirmado que entra al CMS y edita algo correctamente**.

---

## PARTE 1 — Transferir el repositorio de GitHub

El código y todo el contenido (eventos, galería, biografía...) viven en el repo `AlbertoArochal/solfamidas`.

### Opción A: Transferir el repo al titular (recomendada si el titular tendrá el control total)

1. El desarrollador entra a: `https://github.com/AlbertoArochal/solfamidas/settings`
2. Baja hasta la sección **Danger Zone** → **Transfer ownership**.
3. Introduce el **nombre de usuario de GitHub** del titular.
4. Confirma escribiendo el nombre del repo (`AlbertoArochal/solfamidas`) y pulsa **Transfer**.
5. El titular recibe un **email de confirmación** de GitHub → debe aceptarlo.
6. GitHub puede pedir al titular que **verifique que el repo no tiene secrets en el historial** (no los tiene).

**Resultado:** el repo pasa a ser `Titular/solfamidas`. El historial completo se conserva.

### Opción B: El titular conserva su propia copia (fork o clone nuevo)

Usar solo si el titular NO quiere el historial o si GitHub pone pegas a la transferencia.

1. El titular crea un repo nuevo vacío en su cuenta (por ejemplo `solfamidas`).
2. Desde su máquina:
   ```bash
   git clone https://github.com/AlbertoArochal/solfamidas.git
   cd solfamidas
   git remote remove origin
   git remote add origin https://github.com/TITULAR/solfamidas.git
   git push -u origin main
   ```

---

## PARTE 2 — Actualizar el repositorio al nuevo dueño

> **Este paso es obligatorio** sea cual sea la opción de la Parte 1, porque el código tiene el nombre del repo escrito dentro del CMS.

El archivo `public/admin/config.yml` contiene la línea:

```yaml
repo: AlbertoArochal/solfamidas
```

Debe apuntar al repo del titular. También, si se cambió el dominio, hay más sitios que actualizar (ver Parte 4).

### Pasos

1. Editar `public/admin/config.yml` y cambiar:
   ```yaml
   repo: NOMBRE_TITULAR/solfamidas
   ```
2. Hacer commit y push al nuevo repo:
   ```bash
   git add public/admin/config.yml
   git commit -m "chore: actualizar repo en config del CMS"
   git push origin main
   ```

> **Para una IA:** buscar todas las apariciones de `AlbertoArochal` en el repo (`grep -rn "AlbertoArochal" .`) y reemplazar por el nuevo owner en `public/admin/config.yml`. No tocar `.env` ni `.env.local` (no están versionados).

---

## PARTE 3 — Transferir el sitio en DecapBridge

DecapBridge es el servicio de autenticación: el que permite a los colaboradores entrar con Google/email. **Tiene su propio botón de transferencia.**

1. El desarrollador entra al **dashboard de DecapBridge** (decapbridge.com) → selecciona el sitio **solfamidas**.
2. Va a **Settings** → **Transfer ownership**.
3. Introduce el **email** de un colaborador que ya exista en el sitio (por eso primero hay que invitar al titular como colaborador, ver abajo).
4. Confirma la transferencia. El nuevo owner pasa a ser el dueño del sitio; el desarrollador queda como colaborador.

**Si el titular aún no tiene cuenta en DecapBridge:**
1. En el dashboard, **invita al titular por email** (Manage collaborators → invitar).
2. El titular acepta la invitación y crea su acceso (Google o email+password).
3. Ahora sí, se hace la transferencia de propiedad como arriba.

> El plan **gratis** de DecapBridge permite al owner gestionar usuarios. Si se quiere que el desarrollador pueda seguir ayudando a gestionar invitados tras la transferencia, haría falta el plan Pro (rol admin delegado). Para entrega final, normalmente el titular queda como único owner y no hace falta.

---

## PARTE 4 — Transferir el proyecto en Vercel

Vercel es donde se despliega la web (`solfamidas.vercel.app`). Hay dos caminos.

### Opción A: Transferir el proyecto existente (conserva historial de deploys)

1. El desarrollador entra a **Vercel Dashboard** → proyecto **solfamidas**.
2. **Settings** → **General** → baja a **Danger Zone** → **Transfer Project**.
3. Introduce el email/username de la cuenta Vercel del titular y confirma.
4. El titular acepta la invitación por email desde su cuenta Vercel.

**Importante:** las **Environment Variables** se transfieren con el proyecto, pero conviene verificarlas después (Settings → Environment Variables). En este proyecto las variables requeridas son `OAUTH_GITHUB_CLIENT_ID` y `OAUTH_GITHUB_CLIENT_SECRET` — **ojo**: como ahora el CMS usa DecapBridge y no el OAuth de GitHub, es posible que ya no hagan falta o que el build las pida igualmente (la integración `astro-decap-cms-oauth` las exige en build). **Dejar las que ya están configuradas** si el build funciona.

### Opción B: Importar el repo en la cuenta del titular (recomendada para entrega limpia)

1. El titular entra a **vercel.com/new**.
2. Conecta su cuenta de GitHub y selecciona el repo `Titular/solfamidas`.
3. Vercel detecta **Astro** automáticamente. No cambiar nada: build command `npm run build`, output `dist`.
4. **Añadir las environment variables** (mismas que tuviera el proyecto original):
   - `OAUTH_GITHUB_CLIENT_ID` (si el build lo exige)
   - `OAUTH_GITHUB_CLIENT_SECRET` (si el build lo exige)
   - Cualquier otra que apareciera en Settings → Environment Variables del proyecto original.
5. Desplegar.
6. Si el dominio `solfamidas.vercel.app` se quiere conservar igual: en Settings → Domains del **nuevo** proyecto, añadir `solfamidas.vercel.app`; si Vercel lo da ocupado, contactar con soporte o usar el dominio que asigne.

---

## PARTE 5 — Cambio de dominio (si aplica)

Si el titular usa un dominio propio (p. ej. `musiketics.com`) en lugar de `solfamidas.vercel.app`, hay que actualizar **4 sitios** en el código:

| Archivo | Qué cambiar |
|---|---|
| `astro.config.mjs` | `site: "https://solfamidas.vercel.app"` → dominio nuevo |
| `public/robots.txt` | URL del sitemap |
| `public/admin/config.yml` | `site_url: https://solfamidas.vercel.app` |
| `README.md` (si se conserva) | URLs de ejemplo |

Después de cambiarlos: commit + push → Vercel reconstruye solo.

En Vercel: **Settings → Domains** → añadir el dominio propio y seguir los pasos de DNS (habitualmente un registro CNAME apuntando a `cname.vercel-dns.com`).

En DecapBridge: el campo **"Your Decap CMS login URL"** del sitio debería apuntar a la URL nueva del admin (`https://dominio-nuevo/admin/`).

---

## PARTE 6 — Verificación final (checklist)

Que el **titular** haga esto desde su propia cuenta y su propio navegador:

- [ ] Entra a GitHub y ve el repo bajo **su** cuenta
- [ ] Entra a Vercel y ve el proyecto desplegado (último deploy = Success)
- [ ] Abre `https://solfamidas.vercel.app/` (o el dominio nuevo) y ve la web con **Musiketics**
- [ ] Abre `https://solfamidas.vercel.app/admin/`
- [ ] Inicia sesión con su Google o email (invitado previamente en DecapBridge)
- [ ] Edita algo mínimo (p. ej. el texto de contacto) y pulsa **Publicar**
- [ ] Verifica que el cambio aparece en la web tras unos minutos
- [ ] (Opcional) Invita a otro colaborador desde DecapBridge y repite el test

**Solo cuando todo el checklist pase**, el desarrollador puede:
- Revocar el token de GitHub que usaba DecapBridge (si era de su cuenta)
- Retirarse como colaborador de DecapBridge
- Eliminar su acceso residual (si lo desea)

---

## Información sensible que el desarrollador NO debe compartir

- El **token de GitHub** que está guardado en DecapBridge (si es del desarrollador, se regenera en la transferencia; no debe pegarse en ningún chat)
- Las **environment variables** de Vercel (el titular las configura en su propia cuenta, no necesita ver las del desarrollador)
- Cualquier `.env` local (no está en el repo)

---

## Referencias rápidas

| Servicio | URL | Acción de transferencia |
|---|---|---|
| GitHub | github.com/settings | Repo → Settings → Danger Zone → Transfer ownership |
| Vercel | vercel.com/dashboard | Proyecto → Settings → General → Transfer Project |
| DecapBridge | decapbridge.com/dashboard | Sitio → Settings → Transfer ownership |
| CMS panel | solfamidas.vercel.app/admin | — |

---

*Documento generado para la entrega del proyecto Solfamidas. Mantener junto al README del repo.*
