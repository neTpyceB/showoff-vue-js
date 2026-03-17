# Architecture

## Overview
- Vue frontend talks only to the gateway service.
- Auth service owns identity and tenant memberships.
- Module service owns tenant manifests, enabled modules, and action authorization.
- Gateway composes both services into a frontend-friendly bootstrap contract.

## Frontend model
- Tenant switch changes the active bootstrap payload.
- Dynamic routes are registered from backend module manifests.
- Plugin registry maps module keys to frontend module views.
- Permission engine evaluates backend-issued policies for `view`, `manage`, and `configure`.

## Backend model
- `POST /auth/login` and `GET /session` come from auth service.
- `GET /tenants/:tenantId/bootstrap` and module actions come from module service.
- Gateway exposes `POST /auth/login`, `GET /bootstrap`, and `POST /tenants/:tenantId/modules/:moduleKey/run`.
