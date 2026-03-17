# AGENTS Rules

## Development standards
- Keep implementation concise, explicit, and production-oriented.
- Use latest stable dependencies and Node 22+.
- Any code change must be followed by lint, type-check, and the full automated suite.

## Required validation sequence
1. `npm run lint`
2. `npm run type-check`
3. `npm run test:unit`
4. `npm run test:integration`
5. `npm run test:smoke`
6. `npm run test:e2e`

## Project docs
- Keep `README.md`, `docs/architecture.md`, `docs/roadmap.md`, `docs/rules.md`, and `docs/security-audit.md` synchronized with the Nuxt SSR and distributed-service architecture.
