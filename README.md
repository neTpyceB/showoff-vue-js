# Real-time Collaboration Dashboard

Vue + WebSocket collaboration dashboard with:
- WebSocket integration
- shared live state updates
- notifications feed
- role-based permissions (`admin`, `editor`, `viewer`)
- dockerized frontend + API services

## Demo users
- `admin@collab.local` / `adminpass`
- `editor@collab.local` / `editorpass`
- `viewer@collab.local` / `viewerpass`

## Local URLs
- App: http://localhost:5173
- API: http://localhost:3000
- Health: http://localhost:3000/health

## Quality gates
- `npm run lint`
- `npm run type-check`
- `npm run test:unit`
- `npm run test:smoke`
- `npm run test:api`
- `npm run test:e2e`
