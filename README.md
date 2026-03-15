# Developer Knowledge Base Platform

Vue 3 + REST API knowledge base platform with:
- authentication
- markdown editing + live preview
- tagging system
- search and tag filtering
- REST API integration

## Default demo credentials
- email: `dev@kb.local`
- password: `devpass`

## Run local
```bash
npm ci
npm run dev
```
- Web: http://localhost:5173
- API: http://localhost:3000

## Docker
```bash
docker compose up --build
```

## Test gates
```bash
npm run lint
npm run type-check
npm run test:unit
npm run test:smoke
npm run test:api
npm run test:e2e
```
