# kybernetes

> κυβερνήτης — *"timonel"*, la raíz de **cibernética** y de **gobernador**.

Una **plantilla** para arrancar cualquier proyecto (código u otros) con disciplina de git → GitOps,
pensada para colaborar con **agentes humanos y máquinas (IA)**. Lo central no es "Fase 0" sino los
**ciclos de retroalimentación** y las **fronteras**: cada proyecto es un **sistema viable**. Ver
[`MANIFESTO.md`](MANIFESTO.md).

## Qué trae

- **Disciplina:** GitFlow-lite, Conventional Commits atómicos, TDD, CI. → `CONTRIBUTING.md`.
- **Fronteras enforced:** monorepo pnpm donde cada `packages/*` es un sistema viable con su
  interfaz pública (`exports`); `dependency-cruiser` prohíbe cruces ilegales. → `docs/FRONTERAS.md`.
- **Versionado/publicación:** `changesets` + `tsup` (build a `dist` + `.d.ts`). → `docs/SETUP.md`.
- **Harness de IA:** `.claude/` con las skills del flujo, los agentes `architect`/`coder`/`verifier`,
  `retro-ciclo` y `settings.json`; más `CLAUDE.md`/`AGENTS.md`.
- **Encuadre:** plantillas de espacio de diseño, SPEC, roadmap, prior-art y ADR en `docs/`.

## Cómo usarla

1. **"Use this template"** en GitHub (o cloná).
2. Seguí el checklist de [`docs/SETUP.md`](docs/SETUP.md) — incluye los *gotchas* ya resueltos (PAT
   para releases, candado de la org, environments, branch protection, token de publish).
3. Personalizá: nombre del repo, `@scope`, owners (`.github/CODEOWNERS`), el dominio en
   `CLAUDE.md`/`AGENTS.md`, y reemplazá `MANIFESTO.md` por el tuyo.
4. Multiplicá `packages/example/` como base de cada sistema viable nuevo.

## Correr

```bash
pnpm install
pnpm typecheck && pnpm test && pnpm lint:boundaries && pnpm build
```

## No-código ("u otros")

El núcleo (disciplina, docs, `.claude/`, ADRs, flujo) sirve para proyectos que no son de código.
Borrá el preset TS (`packages/`, `tsconfig`, `vitest`, `tsup`, `changeset`) y quedate con el proceso.

---

Futuro (el `;)`): un `create-kybernetes` que scaffoldee esto con variables — el "empaquetar".
