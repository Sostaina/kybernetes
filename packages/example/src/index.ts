// La FRONTERA de este sistema viable = lo que este archivo `export`-a.
// Todo lo demás (helpers no exportados) queda del lado de adentro del sistema.
// Otros paquetes solo pueden cruzar esta frontera importando '@sostaina/example'.

/**
 * Un controlador de feedback mínimo (guiño cibernético): acerca un valor a su
 * objetivo por una fracción `gain`. Es solo un ejemplo de función pública —
 * reemplazala por el dominio de tu paquete.
 */
export function step(actual: number, objetivo: number, gain = 0.5): number {
  return actual + clamp(gain, 0, 1) * (objetivo - actual);
}

// Interno: NO cruza la frontera (no se exporta).
function clamp(x: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, x));
}
