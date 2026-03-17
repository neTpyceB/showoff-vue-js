# Architecture

## Overview
- Frontend Vue app connects to REST + WebSocket API.
- API uses Express for auth/state endpoints and `ws` for live event fanout.

## Runtime flow
1. User authenticates via `POST /auth/login`.
2. Client fetches snapshot from `GET /state`.
3. Client opens `ws://.../ws?token=...`.
4. Role-authorized updates use `PATCH /state` and are broadcast to all websocket clients.
5. Notifications are emitted on join and state mutation.

## Permissions
- `admin`, `editor`: can mutate state.
- `viewer`: read-only (enforced in backend and UI).
