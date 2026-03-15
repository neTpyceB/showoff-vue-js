# Interactive Task Manager (Vue)

A minimal senior-grade Vue 3 app with:
- CRUD tasks
- localStorage persistence
- component composition
- robust form handling
- basic routing

## Stack
- Vue 3 + TypeScript + Vue Router
- Vitest (unit + smoke)
- Playwright (e2e)
- Docker + Docker Compose

## Run locally
```bash
npm ci
npm run dev
```

## Run with Docker
```bash
docker compose up --build
```
App: [http://localhost:5173](http://localhost:5173)

## Quality checks
```bash
npm run lint
npm run type-check
npm run test:unit
npm run test:smoke
npm run test:e2e
```

## CI
GitHub Actions workflow: `.github/workflows/ci.yml`
