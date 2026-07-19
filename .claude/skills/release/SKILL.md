---
name: release
description: >-
  Corta un release liberando el trabajo acumulado en `dev` hacia `main` con el
  flujo GitFlow-lite + release-please. Usala cuando el usuario quiere "hacer el
  release", "cortar versión", "liberar dev a main" o escribe /release. Es la
  fase LIBERAR del flujo: PR dev→main (merge commit) → release-please corta el
  tag/CHANGELOG/Release → back-merge main→dev. NO es para subir un fix suelto
  (eso es /hotfix) ni para abrir trabajo nuevo.
---

Esta skill codifica cómo el PO corta un release. El humano decide *cuándo*; vos ejecutás
el procedimiento y **parás a avisar** ante cualquier cosa que no esté verde. El número de
versión y el CHANGELOG **nunca** los tocás a mano: los calcula release-please leyendo los
Conventional Commits.

## Cuándo usarla
- `dev` tiene trabajo acumulado y validado y el PO quiere liberarlo. Se invoca con `/release`
  o pidiéndolo en palabras ("hagamos el release", "cortemos versión").
- **No** la uses para un bug suelto urgente → eso es `/hotfix`. **No** la uses si `dev` no
  está listo: el release libera *todo* lo que hay en `dev`.

## Precondiciones (verificá antes de tocar nada)
- El repo usa release-please sobre `main` (mirá `.github/workflows/`). Si no, pará y decilo.
- `main` y `dev` están **protegidos**: PR + CI verde obligatorios, nunca push directo.
- El head de `dev` tiene CI verde. Si está rojo o pendiente, pará y reportá.
- **El milestone de la versión refleja el alcance:** mirá `gh issue list --milestone X.Y.Z
  --state open`. Si quedan issues abiertos del milestone, ese trabajo **no** entra al corte —
  traélo al PO antes de liberar (¿se cierra, se reasigna a la próxima, o se espera?).

## El procedimiento
1. **Resumí lo que entra** — listá los Conventional Commits desde el último tag
   (`git log <ultimo-tag>..origin/dev`). Detectá el bump probable: breaking (`!`) o feat →
   minor en 0.x; solo fix/docs → patch. Decíselo al PO en una línea.
2. **PR `dev → main`** — `gh pr create --base main --head dev` con un cuerpo que resuma
   breaking/features/fixes. Título tipo `release: dev → main (vX.Y.Z)`.
3. **Esperá CI verde del PR** (`gh pr checks <n> --watch`). Si falla, pará y reportá la causa.
4. **Mergeá con MERGE COMMIT** (`gh pr merge <n> --merge`) — **no squash**: release-please
   necesita leer cada commit individual para armar el CHANGELOG.
5. **Dejá correr release-please** — abre solo un PR `chore(main): release X.Y.Z`. Esperá a
   que aparezca.
6. **Revisá el PR de release** — confirmá que la versión y el CHANGELOG tienen sentido
   (secciones BREAKING/Features/Bug Fixes). Si algo se ve mal, pará y avisá.
7. **Mergeá el PR de release con SQUASH** (`gh pr merge <n> --squash`) — así el commit queda
   exactamente `chore(main): release X.Y.Z`, que es lo que release-please necesita. Esperá
   CI verde del PR primero; si la protección lo bloquea, **esperá los checks, no uses
   `--admin`**.
8. **Verificá el corte** — el tag `vX.Y.Z` y el GitHub Release existen
   (`gh release list`, `git tag`).
9. **Back-merge `main → dev`** — como `dev` está protegido, va por **PR de sincronización**
   (`gh pr create --base dev --head main --title "chore: back-merge release vX.Y.Z a dev"`),
   CI verde, **merge commit**. Esto trae el commit de release + CHANGELOG de vuelta a `dev`
   para que las ramas no diverjan. **Es obligatorio, no opcional.**

10. **Cerrá el milestone** — `gh api repos/:owner/:repo/milestones/<n> -X PATCH -f state=closed`.
    Cerrar el milestone de la versión es parte del corte, no un paso opcional.

## Cierra cuando
El tag/Release existe, `dev` quedó sincronizado con `main` y el milestone de la versión está
cerrado. Reportá al PO: versión cortada, link al Release, back-merge hecho y milestone cerrado.

## No-negociables (lecciones de la experiencia)
- **Dos merges distintos a propósito:** `dev→main` es merge commit; el PR de release es squash.
  Confundirlos rompe el corte.
- **Nunca `--admin`** para saltar la protección. Si CI no está verde, se espera o se arregla.
- **Nunca** bumpeás versión ni editás `CHANGELOG.md` a mano — eso es de release-please.
- **El back-merge es parte del comando**, no un paso aparte que se hace después "si me acuerdo".
- Si en cualquier paso algo no está verde o el diff sorprende, **pará y diagnosticá** antes de
  seguir. Reportá la causa raíz, no la maquilles.
