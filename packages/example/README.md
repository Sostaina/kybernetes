# @sostaina/example

Un **sistema viable de ejemplo** dentro del monorepo. Su razón de ser es demostrar el patrón; no lo
uses en producción — **clonalo y multiplicalo**.

- **Frontera:** `src/index.ts` es lo único público (declarado en `exports` del `package.json`). Lo
  interno queda adentro. Otros paquetes cruzan la frontera con `import { step } from "@sostaina/example"`,
  nunca por ruta relativa a `src/` (lo enforcea `dependency-cruiser`).
- **Build:** `tsup` → `dist/` (JS + `.d.ts`). Es lo que se publica.
- **Versión:** por `changeset` (ver `.changeset/`).

## Para crear un paquete nuevo

1. Copiá esta carpeta a `packages/<tu-paquete>`.
2. Cambiá `name`, `description` y el contenido de `src/`.
3. `pnpm install` (enlaza el workspace) · `pnpm changeset` cuando toques su frontera.
