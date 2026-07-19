# Fronteras — sistemas viables y su gobernanza

En el **Viable System Model** un sistema viable tiene una **frontera** que lo separa de su entorno, y
la **recursión** significa que cada subsistema es a su vez viable, con *su propia* frontera. En este
repo eso se hace código: **cada paquete de `packages/*` es un sistema viable**, y su **frontera es su
interfaz pública** (`exports`).

## Las reglas

1. **La frontera = `exports`.** Solo lo declarado en `exports` del `package.json` cruza. Lo interno
   (helpers no exportados, `src/` privado) queda del lado de adentro.
2. **Se cruza por el nombre, no por el `src/`.** Un paquete usa a otro con
   `import { x } from "@scope/otro"` — nunca `import … from "../../otro/src/…"`.
3. **Dirección de dependencias.** Dentro de un paquete: dominio ← servicios ← adaptadores. Los
   adaptadores dependen del dominio, nunca al revés.
4. **La frontera versionada = el contrato.** Cambiarla es un acto explícito: `pnpm changeset` con su
   impacto semver.

## Cómo se enforcea

`dependency-cruiser` (`.dependency-cruiser.cjs`) corre en CI vía `pnpm lint:boundaries`:

- **`frontera-entre-paquetes`** (error): un módulo de `packages/X/src` no puede importar
  `packages/Y/src` por ruta relativa. Cruzá por `@scope/Y`.
- **`no-circular`** (error): sin ciclos — un ciclo son fronteras difusas.
- **`no-huerfanos`** (warn): sin código muerto.

Probalo: introducí un import ilegal entre dos paquetes y `pnpm lint:boundaries` **rompe**.

## Por qué (cibernética)

La frontera es donde se gestiona la **variedad** (Ashby): la interfaz **atenúa** la variedad interna
del paquete y **amplifica** solo lo necesario hacia afuera. Fronteras nítidas = sistema gobernable =
sistema viable. Difuminarlas es perder el control del bucle.
