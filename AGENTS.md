# AGENTS.md — guía canónica para agentes

> Fuente de verdad operativa. Si sos agente (humano o máquina), leé esto **primero**.
> Dueño: 👥 (colectivo). Estado: bootstrap (nacido de `kybernetes`).

## Qué es <PRODUCTO>

<!-- Reemplazá los placeholders. -->
- **Narrativa:** <qué resuelve y para quién>.
- **Frontera:** <lo que NO hace>.
- **Objeto de dominio de primera clase:** <el concepto central del sistema>.

## Convenciones

- **Flujo:** GitFlow-lite (`dev`/`main`), fase LIBERAR con changesets. Ver `CONTRIBUTING.md`.
- **Commits:** Conventional Commits, atómicos.
- **Decisiones:** ADR en `docs/decisiones/` (vía PR).
- **Fronteras:** cada paquete `packages/*` es un sistema viable; su interfaz pública (`exports`) es
  la frontera. Cruces ilegales rompen `pnpm lint:boundaries`. Ver `docs/FRONTERAS.md`.
- **Versionado:** un cambio de frontera → `pnpm changeset`. Ver `docs/SETUP.md`.
- **Ritmo:** deliberado. Encuadrar antes de ejecutar; retroalimentar al cerrar.

## Estructura del repo

```
packages/*        # sistemas viables (cada uno con su frontera)
docs/             # FASE-0, FRONTERAS, SETUP, plantillas, decisiones/ (ADRs)
.claude/          # skills (flujo), agents (architect/coder/verifier), commands (retro-ciclo), settings
.github/          # workflows (ci, release), CODEOWNERS, templates
```

## Cómo correr

```bash
pnpm install
pnpm typecheck && pnpm test && pnpm lint:boundaries && pnpm build
```

**Gate de CI:** `ci.yml` corre typecheck + test + fronteras + build en cada PR. No se mergea en rojo.

## Code style

- **Lenguaje:** TypeScript estricto (`tsconfig.json`). ESM.
- **Tests:** `vitest`, co-locados (`packages/*/src/**/*.test.ts`), test-first.
- **Build de paquetes:** `tsup` → `dist/` (JS + `.d.ts`). Lo que se publica.
- Importá entre paquetes por nombre (`@scope/x`), nunca por `src/` ajeno.

## Notas de desarrollo

- `pnpm-lock.yaml` es archivo caliente: commitealo. CI usa `--frozen-lockfile`.
- Al paralelizar trabajo entre agentes: archivos/fronteras disjuntas para evitar conflictos.
