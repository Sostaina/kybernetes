# Fase 0 — el walking skeleton

Antes de construir el destino, se prueba el **patrón** con el esqueleto más chico que lo atraviesa
entero. Fase 0 no construye la arquitectura: **prueba una hipótesis y produce la evidencia** que
decide la arquitectura.

## La regla

1. Escribí la **hipótesis falsable** en una frase: *"si hacemos X mínimo, entonces Y observable"*.
2. Construí el **walking skeleton**: el camino más corto de punta a punta que ejercita todas las
   piezas del patrón en su versión más chica.
3. La **Definition of Done es binaria y observable** — se marca sí/no mirando un artefacto, no
   "avanzamos".
4. Las decisiones abiertas (🧪) las **falsea la evidencia**, no el debate.

## Por qué (cibernética)

Fase 0 es el **primer bucle de retroalimentación cerrado**: el sistema produce una salida real,
observa el resultado y ajusta. Sin ese loop, todo es hipótesis no falsada — variedad no gobernada.

## Cómo encuadrar

Usá las plantillas de `docs/` en orden:
1. `DESIGN-SPACE.template.md` — el espacio de decisiones (heurística previa).
2. `SPEC.template.md` — el contrato mínimo, derivado de lo decidido.
3. `ROADMAP.template.md` — las fases con su DoD.
4. `prior-art.template.md` — qué reusar en vez de construir.

Y registrá los porqués como **ADR** (`docs/decisiones/`).
