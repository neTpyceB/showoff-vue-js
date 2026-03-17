# Modular SaaS Admin Platform

Vue + microservices admin platform with:
- multi-tenant architecture
- plugin/module system
- dynamic routing from backend manifests
- permission engine
- gateway + auth + module microservices

## Demo users
- `owner@saas.local` / `ownerpass`
- `ops@saas.local` / `opspass`

## Local URLs
- App: http://localhost:5173
- Gateway: http://localhost:3000
- Auth service: http://localhost:3001
- Module service: http://localhost:3002

## Quality gates
- `npm run lint`
- `npm run type-check`
- `npm run test:unit`
- `npm run test:smoke`
- `npm run test:api`
- `npm run test:e2e`
