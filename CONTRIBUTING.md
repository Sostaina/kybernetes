# Contribuir — disciplina de trabajo

Este repo es un **sistema viable** que colabora con agentes humanos y máquinas. La disciplina existe
para dar la **variedad requisita** (Ashby) que el trabajo necesita: bucles de control, fronteras
claras, y retroalimentación. El mapa ejecutable del proceso vive en la skill `flujo`.

## Ramas (GitFlow-lite)

- **`main`** — estable. **Solo recibe releases.** Nunca push directo ni PR de feature.
- **`dev`** — integración. Todo feature/fix sale de `dev` y vuelve a `dev`.
- **Ramas de trabajo** — `feat/…`, `fix/…`, `chore/…`, `docs/…`, `ci/…`, `test/…`, desde `dev`.

```
feat/x ──PR──► dev ──(release)──► main
```

## Commits (Conventional + atómicos)

`tipo(scope): asunto` — `feat` `fix` `docs` `chore` `ci` `test` `refactor`. Un commit = un cambio
lógico. Referenciá el issue: `Refs #N`.

## TDD (test-first)

Toda regla nueva arranca con un test que falla → lo hacés pasar → refactor.

```bash
pnpm test:watch     # red → green → refactor
pnpm typecheck
pnpm test
```

Un PR no se mergea con `test`, `typecheck` o `lint:boundaries` en rojo.

## Fronteras (⭐ el corazón)

Cada paquete en `packages/*` es un **sistema viable** con una **frontera**: su interfaz pública
(`exports`). Reglas:

- Otros paquetes cruzan la frontera **por el nombre** (`import … from "@scope/paquete"`), **nunca**
  importando su `src/` interno por ruta relativa.
- La dirección de dependencias respeta la recursión (dominio ← servicios ← adaptadores).
- Todo esto lo **enforcea `dependency-cruiser`**: `pnpm lint:boundaries` (corre en CI). Un cruce
  ilegal rompe el build. Ver [`docs/FRONTERAS.md`](docs/FRONTERAS.md).

## Releases (changesets)

Cada cambio a la **frontera** de un paquete lleva un changeset:

```bash
pnpm changeset      # elegí paquetes + nivel semver + descripción
```

**Fase LIBERAR:** PR `dev → main`. Al llegar a `main`, el workflow `release` consume los changesets,
sube versiones, escribe CHANGELOG, publica y **back-mergea a `dev`** — todo con commit directo a
`main` (sin PR, para esquivar el candado de la org). Setup en [`docs/SETUP.md`](docs/SETUP.md).

> Nota: las skills `release`/`hotfix` describen la variante con release-please; acá la mecánica es
> **changesets**. El espíritu (LIBERAR vía `dev→main` + back-merge) es el mismo.

## Decisiones

Los "por qué" que condicionan el código se registran como **ADR** (`docs/decisiones/`, vía PR).
Encuadre y estado del arte viven en `docs/`.
