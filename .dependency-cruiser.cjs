/**
 * Fronteras de los sistemas viables (VSM).
 * La frontera de un paquete = su interfaz pública (`exports`). Un paquete cruza la
 * frontera de otro SOLO por su nombre (`@scope/name`), nunca importando su `src/`
 * interno por ruta relativa. Esto mantiene la recursión de sistemas viables limpia.
 *
 * @type {import('dependency-cruiser').IConfiguration}
 */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      comment:
        "Sin ciclos: la recursión de sistemas viables debe ser acíclica (un ciclo = fronteras difusas).",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "frontera-entre-paquetes",
      comment:
        "Un módulo de packages/X/src no puede importar el src/ interno de packages/Y/src por ruta relativa. Cruzá por la frontera pública: import desde '@scope/Y'.",
      severity: "error",
      from: { path: "^packages/([^/]+)/src/" },
      to: {
        path: "^packages/([^/]+)/src/",
        pathNot: "^packages/$1/src/",
      },
    },
    {
      name: "no-huerfanos",
      comment: "Módulos huérfanos = código muerto. El index (entrada/frontera) se excluye.",
      severity: "warn",
      from: {
        orphan: true,
        pathNot: ["\\.d\\.ts$", "(^|/)index\\.ts$", "(^|/)tsup\\.config\\.ts$"],
      },
      to: {},
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: ["\\.test\\.ts$", "(^|/)dist/"] },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
  },
};
