# Setup — checklist (con los gotchas ya resueltos)

Los tropezones que descubrimos bootstrappeando de verdad, para que no los repitas.

## 1. Toolchain

- [ ] Node ≥ 20, `pnpm` (ver `packageManager` en `package.json`).
- [ ] `pnpm install` → `pnpm typecheck && pnpm test && pnpm lint:boundaries && pnpm build` verde.

## 2. GitFlow

- [ ] Crear `dev` desde `main`: `git push origin main:refs/heads/dev`.
- [ ] Convención: features → `dev`; `main` solo releases (`dev → main`).
- [ ] **Branch protection** (PR obligatorio + CI verde): en repos **privados** requiere **GitHub
      Pro/Team** — en Free devuelve `403`. Si estás en Free privado, el enforcement es **social**
      (CONTRIBUTING + CI visible) hasta que subas de plan o lo hagas público.

## 3. Personalizar

- [ ] Renombrar el repo y el `@scope` de los paquetes (hoy `@sostaina/*`).
- [ ] `.github/CODEOWNERS` → tus owners.
- [ ] `CLAUDE.md`/`AGENTS.md` → el dominio del proyecto.
- [ ] Reemplazar `MANIFESTO.md`.
- [ ] Multiplicar `packages/example/` (o borrarlo).

## 4. Releases (changesets) — ⭐ el gotcha grande

El workflow `release.yml` **commitea el bump directo a `main`** a propósito: así **esquiva el candado
de la organización** que bloquea a GitHub Actions crear PRs (`"GitHub Actions is not permitted to
create or approve pull requests"`).

- [ ] Si preferís que Actions cree un "Version Packages" PR (estilo changesets/action clásico),
      necesitás **habilitar** en la org: *Settings → Actions → General → "Allow GitHub Actions to
      create and approve pull requests"* — o usar un **PAT fine-grained** (Contents + Pull requests
      RW) como secret. El default de este template **no lo necesita**.
- [ ] **Publicar** a GitHub Packages: los paquetes tienen `publishConfig.registry`. El workflow usa
      `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` + `permissions: packages: write`. Para **npm
      público**: quitá `publishConfig`, seteá `"access": "public"` en `.changeset/config.json` y un
      secret `NPM_TOKEN`.
- [ ] Para que un paquete publique, **no** debe ser `private: true` y debe tener un changeset pendiente.

## 5. Secretos y environments

- [ ] Secretos de proyecto en repo o en un **Environment** protegido. En repos privados **Free**,
      los *environments* existen pero **sin protection rules** (required reviewers = Pro).
- [ ] Nunca loguees secretos. `.env` está gitignoreado; usá `.env.example` como plantilla.
