# AGENTS Rules

## Development standards
- Keep implementations minimal, composable, and explicit.
- Use latest stable dependencies and Node 22+.
- Any code change must be followed by lint, type-check, unit, smoke, and e2e tests.

## Project quality gates
- Required commands after modifications:
  - `npm run lint`
  - `npm run type-check`
  - `npm run test:unit`
  - `npm run test:smoke`
  - `npm run test:e2e`

## Delivery docs
- Keep `README.md`, `docs/architecture.md`, `docs/roadmap.md`, `docs/rules.md`, and `docs/security-audit.md` synchronized with the implementation.
