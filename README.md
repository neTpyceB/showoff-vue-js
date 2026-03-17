# Large-scale Social / Content Platform Frontend

Nuxt SSR frontend with:
- SSR and Nitro edge caching rules
- complex feed state orchestration
- real-time feed updates over SSE
- distributed feed/profile/discovery service integration
- production-focused performance configuration
- Docker plus CI/CD and Kubernetes-ready manifests

## Local URLs
- App: http://localhost:5173
- Feed service: http://localhost:4101
- Profile service: http://localhost:4102
- Discovery service: http://localhost:4103

## Quality gates
- `npm run lint`
- `npm run type-check`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:smoke`
- `npm run test:e2e`
