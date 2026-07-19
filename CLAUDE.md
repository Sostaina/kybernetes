# CLAUDE.md

> Puente para agentes. La **fuente de verdad operativa** es [`AGENTS.md`](AGENTS.md) — leelo primero.
> Este repo nació de [`kybernetes`](https://github.com/Sostaina/kybernetes).

## No te lo saltes

- **Cómo trabajamos:** GitFlow-lite (`dev` integra, `main` solo releases). Ver [`CONTRIBUTING.md`](CONTRIBUTING.md).
- **Fronteras:** cada paquete es un sistema viable; su frontera es `exports`. No cruces `src/` ajeno.
  Lo enforcea `pnpm lint:boundaries`. Ver [`docs/FRONTERAS.md`](docs/FRONTERAS.md).
- **Test-first.** Nada se mergea con CI en rojo.
- **Decisiones → ADR** (`docs/decisiones/`). **Cambio de frontera → `pnpm changeset`.**
- **El flujo** (encuadrar/decidir/ejecutar/liberar/retroalimentar) vive en `.claude/skills/`. El
  cierre de ciclo, en `.claude/commands/retro-ciclo.md`.

## El dominio

<!-- Reemplazá esto por tu producto: -->
- **Qué es:** <PRODUCTO — 1-2 párrafos>.
- **Frontera del sistema:** <lo que NO hace>.
- **Objeto de dominio de primera clase:** <el concepto central>.

## Cómo correr

```bash
pnpm install
pnpm test         # unit
pnpm typecheck
pnpm build
pnpm lint:boundaries
```
