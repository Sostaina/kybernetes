# Espacio de Diseño — <PROYECTO>

> Plantilla. Documento **pre-SPEC** y **pre-ADR**: la heurística de diseño. Mapeá el espacio de fase,
> ordená las decisiones por **valor de información** (qué pregunta parte más el espacio = un bit) y
> agrupalas en **capas**. Objetivo: encuadrar para poder **paralelizar**.

## Cómo leer esto

Cada decisión es una pregunta que **parte el espacio en dos**. Bit alto = colapsa muchas decisiones
aguas abajo; bit bajo = local y reversible. Estados: 🔒 axioma · ✅ decidida · ⏳ diferida (con
gatillo) · 🧪 abierta (la evidencia la falsea).

## Capas

```
Capa 0 · POSTURA        ← los bits raíz (axiomas)
Capa 1 · TOPOLOGÍA      ← estructura, estado
Capa 2 · CONTRATO       ← el artefacto/interfaz
Capa 3 · …              ← (según el dominio)
```

## Matriz de decisiones

| ID | Capa | Decisión | Descripción | Estado | Qué habilita |
|----|------|----------|-------------|--------|--------------|
| D0.1 | 0 | … | … | 🔒 | … |
| D1.1 | 1 | … | … | ✅ | … |
| …  | | | | 🧪 | |

## Jerarquía por valor de información

```
B0  D0.x  → fijan el paradigma (axiomas)
B1  D1.x  → el bit abierto más caro
…
```
**Camino crítico:** … . **Camino de valor (el moat):** … (distinto del crítico).

## Los cortes que paralelizan

Las interfaces que, fijadas, dejan a cada rol trabajar sin bloquear al otro.

## Diferenciación (opcional)

Hipótesis falsables sobre dónde está el espacio en blanco defendible.
