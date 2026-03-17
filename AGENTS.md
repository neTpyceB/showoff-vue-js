# AGENTS Rules

## Development standards
- Keep implementation concise and explicit.
- Use latest stable dependencies and Node 22+.
- Any code change must be followed by lint, type-check, and full test suite.

## Required validation sequence
1. `npm run lint`
2. `npm run type-check`
3. `npm run test:unit`
4. `npm run test:smoke`
5. `npm run test:api`
6. `npm run test:e2e`

## Project docs
- Keep `README.md`, `docs/architecture.md`, `docs/roadmap.md`, `docs/rules.md`, and `docs/security-audit.md` synchronized.
