import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // la frontera: solo el punto de entrada público
  format: ["esm"], // ESM. Para dual ESM/CJS: format: ["esm", "cjs"]
  dts: true, // emite .d.ts (el contrato tipado que cruza la frontera)
  clean: true,
  sourcemap: true,
});
